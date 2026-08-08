import pandas as pd
import os
import json
import re

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

import google.generativeai as genai


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


# ============================================================
# FLASK APP
# ============================================================

app = Flask(__name__)

CORS(app)


# ============================================================
# GEMINI CONFIGURATION
# ============================================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(
    "gemini-3.6-flash"
)


# ============================================================
# VALID DASHBOARD BLOCK TYPES
# ============================================================

VALID_BLOCK_TYPES = {

    "stat_card": [
        "label",
        "value"
    ],

    "table": [
        "title",
        "columns",
        "rows"
    ],

    "line_chart": [
        "title",
        "data"
    ],

    "bar_chart": [
        "title",
        "data"
    ],

    "pie_chart": [
        "title",
        "data"
    ],

    "list": [
        "title",
        "items"
    ],

    "progress_bar": [
        "label",
        "value",
        "max"
    ],
}


# ============================================================
# GEMINI SYSTEM PROMPT
# ============================================================

SYSTEM_PROMPT = """
You are an AI Business Intelligence Assistant.

Analyze the uploaded CSV dataset carefully.

Return ONLY valid JSON.

The JSON format must be:

{
  "title": "Dashboard Title",

  "blocks": [

    {
      "type": "stat_card",
      "label": "",
      "value": "",
      "sublabel": ""
    },

    {
      "type": "line_chart",
      "title": "",
      "x_label": "",
      "y_label": "",
      "data": []
    },

    {
      "type": "bar_chart",
      "title": "",
      "x_label": "",
      "y_label": "",
      "data": []
    },

    {
      "type": "pie_chart",
      "title": "",
      "data": []
    },

    {
      "type": "table",
      "title": "",
      "columns": [],
      "rows": []
    },

    {
      "type": "progress_bar",
      "label": "",
      "value": 0,
      "max": 100,
      "unit": "%"
    }

  ],

  "insights": [
    "",
    "",
    "",
    "",
    ""
  ],

  "recommendations": [
    "",
    "",
    "",
    "",
    ""
  ]
}

Rules:

- Analyze the uploaded CSV.
- Create 4 KPI cards when possible.
- Create 1 line chart when numerical data exists.
- Create 1 bar chart when numerical data exists.
- Create 1 pie chart when categorical data exists.
- Create 1 table using actual dataset values.
- Generate 5 business insights.
- Generate 5 business recommendations.
- Use real column names whenever possible.
- Return ONLY JSON.
"""


# ============================================================
# EXTRACT JSON FROM GEMINI RESPONSE
# ============================================================

def extract_json(raw_text):

    raw_text = raw_text.strip()

    # Remove markdown code fences

    if raw_text.startswith("```"):

        raw_text = re.sub(
            r"^```(json)?",
            "",
            raw_text
        )

        raw_text = re.sub(
            r"```$",
            "",
            raw_text
        )

        raw_text = raw_text.strip()

    # Find JSON object

    first_brace = raw_text.find("{")

    last_brace = raw_text.rfind("}")

    if first_brace != -1 and last_brace != -1:

        raw_text = raw_text[
            first_brace:last_brace + 1
        ]

    return json.loads(raw_text)


# ============================================================
# VALIDATE GEMINI DASHBOARD
# ============================================================

def validate_and_clean(ui_json):

    warnings = []

    # -----------------------------------------
    # TITLE
    # -----------------------------------------

    if (
        "title" not in ui_json
        or not isinstance(ui_json["title"], str)
    ):

        ui_json["title"] = "Generated Dashboard"

        warnings.append(
            "Missing title, used default."
        )


    # -----------------------------------------
    # BLOCKS
    # -----------------------------------------

    if (
        "blocks" not in ui_json
        or not isinstance(ui_json["blocks"], list)
    ):

        ui_json["blocks"] = []

        warnings.append(
            "Missing blocks array."
        )

        return ui_json, warnings


    cleaned_blocks = []


    # -----------------------------------------
    # CHECK EACH BLOCK
    # -----------------------------------------

    for i, block in enumerate(
        ui_json["blocks"]
    ):

        if (
            not isinstance(block, dict)
            or "type" not in block
        ):

            warnings.append(
                f"Block {i} skipped: missing type."
            )

            continue


        block_type = block["type"]


        if block_type not in VALID_BLOCK_TYPES:

            warnings.append(
                f"Block {i} skipped: "
                f"unknown type '{block_type}'."
            )

            continue


        required_fields = VALID_BLOCK_TYPES[
            block_type
        ]


        missing = [
            field
            for field in required_fields
            if field not in block
        ]


        if missing:

            warnings.append(
                f"Block {i} ({block_type}) "
                f"skipped: missing {missing}."
            )

            continue


        cleaned_blocks.append(block)


    ui_json["blocks"] = cleaned_blocks


    # -----------------------------------------
    # INSIGHTS
    # -----------------------------------------

    if "insights" not in ui_json:

        ui_json["insights"] = []


    # -----------------------------------------
    # RECOMMENDATIONS
    # -----------------------------------------

    if "recommendations" not in ui_json:

        ui_json["recommendations"] = []


    # -----------------------------------------
    # WARNING IF EMPTY
    # -----------------------------------------

    if len(cleaned_blocks) == 0:

        warnings.append(
            "All blocks were invalid."
        )


    return ui_json, warnings


# ============================================================
# FALLBACK DASHBOARD
# ============================================================

def create_fallback_dashboard(
    df,
    user_request
):

    """
    Creates a dashboard directly from the CSV.

    This is used when Gemini returns 429,
    quota exceeded, or another API error.
    """

    blocks = []


    # ========================================================
    # NUMERIC COLUMNS
    # ========================================================

    numeric_columns = df.select_dtypes(
        include="number"
    ).columns.tolist()


    # ========================================================
    # KPI CARDS
    # ========================================================

    for column in numeric_columns[:4]:

        values = df[column].dropna()

        if len(values) == 0:
            continue


        total = float(
            values.sum()
        )


        blocks.append({

            "type": "stat_card",

            "label": f"Total {column}",

            "value": round(
                total,
                2
            )

        })


    # If no numeric columns

    if len(blocks) == 0:

        blocks.append({

            "type": "stat_card",

            "label": "Total Records",

            "value": int(
                len(df)
            )

        })


        blocks.append({

            "type": "stat_card",

            "label": "Total Columns",

            "value": int(
                len(df.columns)
            )

        })


    # ========================================================
    # LINE + BAR CHART
    # ========================================================

    if numeric_columns:

        column = numeric_columns[0]


        chart_df = df[
            [column]
        ].dropna().head(12)


        chart_data = []


        for index, row in chart_df.iterrows():

            chart_data.append({

                "x": str(
                    index + 1
                ),

                "y": float(
                    row[column]
                )

            })


        if chart_data:

            blocks.append({

                "type": "line_chart",

                "title": (
                    f"{column} Trend"
                ),

                "data": chart_data

            })


            blocks.append({

                "type": "bar_chart",

                "title": (
                    f"{column} Overview"
                ),

                "data": chart_data

            })


    # ========================================================
    # PIE CHART
    # ========================================================

    categorical_columns = df.select_dtypes(
        exclude="number"
    ).columns.tolist()


    if categorical_columns:

        column = categorical_columns[0]


        counts = (
            df[column]
            .dropna()
            .astype(str)
            .value_counts()
            .head(6)
        )


        pie_data = []


        for category, count in counts.items():

            pie_data.append({

                "x": str(
                    category
                ),

                "y": int(
                    count
                )

            })


        if pie_data:

            blocks.append({

                "type": "pie_chart",

                "title": (
                    f"{column} Distribution"
                ),

                "data": pie_data

            })


    # ========================================================
    # TABLE
    # ========================================================

    table_df = df.head(10)


    blocks.append({

        "type": "table",

        "title": "Dataset Preview",

        "columns": [
            str(column)
            for column in table_df.columns
        ],

        "rows": [

            [
                str(value)
                for value in row
            ]

            for row in table_df.values.tolist()

        ]

    })


    # ========================================================
    # INSIGHTS
    # ========================================================

    insights = []


    insights.append(
        f"The dataset contains {len(df)} records."
    )


    insights.append(
        f"The dataset contains "
        f"{len(df.columns)} columns."
    )


    for column in numeric_columns[:3]:

        values = df[column].dropna()


        if len(values) > 0:

            average = float(
                values.mean()
            )


            insights.append(

                f"{column} has an average "
                f"value of {round(average, 2)}."

            )


    if categorical_columns:

        column = categorical_columns[0]


        counts = (
            df[column]
            .dropna()
            .astype(str)
            .value_counts()
        )


        if len(counts) > 0:

            insights.append(

                f"The most common "
                f"{column} is "
                f"{counts.index[0]}."

            )


    # Make exactly 5 insights

    while len(insights) < 5:

        insights.append(
            "Further analysis can be "
            "performed using the available "
            "dataset fields."
        )


    # ========================================================
    # RECOMMENDATIONS
    # ========================================================

    recommendations = [

        "Monitor the key metrics regularly.",

        "Investigate categories with "
        "unusually high or low values.",

        "Compare important metrics "
        "across different groups.",

        "Track trends when historical "
        "data is available.",

        "Use the dashboard to identify "
        "opportunities for improvement."

    ]


    # ========================================================
    # FINAL FALLBACK DASHBOARD
    # ========================================================

    return {

        "title":
            "AI Business Intelligence Dashboard",

        "description":
            "Dashboard generated from "
            "the uploaded CSV.",

        "blocks":
            blocks,

        "insights":
            insights[:5],

        "recommendations":
            recommendations,

        "fallback":
            True

    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.route(
    "/api/health",
    methods=["GET"]
)
def health():

    return jsonify({

        "status": "ok",

        "message":
            "Flask server is running"

    })


# ============================================================
# GENERATE DASHBOARD
# ============================================================

@app.route(
    "/api/generate-ui",
    methods=["POST"]
)
def generate_ui():

    # ========================================================
    # GET FILE
    # ========================================================

    file = request.files.get(
        "file"
    )


    print(
        "FILES:",
        request.files
    )

    print(
        "FORM:",
        request.form
    )

    print(
        "FILE:",
        file
    )


    # ========================================================
    # GET USER REQUEST
    # ========================================================

    user_request = request.form.get(
        "request",
        ""
    ).strip()


    # ========================================================
    # CHECK FILE
    # ========================================================

    if file is None:

        return jsonify({

            "error":
                "Please upload a CSV file."

        }), 400


    # ========================================================
    # CHECK CSV
    # ========================================================

    if not file.filename.lower().endswith(
        ".csv"
    ):

        return jsonify({

            "error":
                "Only CSV files are allowed."

        }), 400


    # ========================================================
    # DEFAULT REQUEST
    # ========================================================

    if not user_request:

        user_request = (
            "Analyze this dataset "
            "and generate a dashboard."
        )


    # ========================================================
    # READ CSV
    # ========================================================

    try:

        df = pd.read_csv(
            file
        )

    except Exception as e:

        return jsonify({

            "error":
                f"Cannot read CSV: {str(e)}"

        }), 400


    # ========================================================
    # DATASET INFORMATION
    # ========================================================

    dataset_info = f"""

Dataset Columns:
{list(df.columns)}

Number of Rows:
{len(df)}

Number of Columns:
{len(df.columns)}

First Five Rows:
{df.head().to_string()}

"""


    raw_text = None


    # ========================================================
    # TRY GEMINI
    # ========================================================

    try:

        full_prompt = f"""

{SYSTEM_PROMPT}

{dataset_info}

User Request:
{user_request}

"""


        print(
            "Sending request to Gemini..."
        )


        # ====================================================
        # GEMINI CALL
        # ====================================================

        response = model.generate_content(
            full_prompt
        )


        raw_text = response.text


        print(
            "Gemini response received."
        )


        # ====================================================
        # EXTRACT JSON
        # ====================================================

        ui_json = extract_json(
            raw_text
        )


        # ====================================================
        # VALIDATE
        # ====================================================

        cleaned_json, warnings = (
            validate_and_clean(
                ui_json
            )
        )


        if warnings:

            cleaned_json[
                "_warnings"
            ] = warnings


        return jsonify(
            cleaned_json
        ), 200


    # ========================================================
    # INVALID JSON FROM GEMINI
    # ========================================================

    except json.JSONDecodeError:

        print(
            "Gemini returned invalid JSON."
        )

        print(
            "Creating fallback dashboard..."
        )


        fallback = (
            create_fallback_dashboard(
                df,
                user_request
            )
        )


        return jsonify(
            fallback
        ), 200


    # ========================================================
    # GEMINI ERROR
    # ========================================================

    except Exception as e:

        error_message = str(e)


        print(
            "GEMINI ERROR:",
            error_message
        )


        # ====================================================
        # 429 / QUOTA ERROR
        # ====================================================

        if (

            "429"
            in error_message

            or

            "quota"
            in error_message.lower()

            or

            "resource exhausted"
            in error_message.lower()

        ):


            print(
                "Gemini quota exceeded."
            )


            print(
                "Creating fallback dashboard "
                "from CSV..."
            )


            fallback = (
                create_fallback_dashboard(
                    df,
                    user_request
                )
            )


            print(
                "Fallback dashboard created "
                "successfully."
            )


            # IMPORTANT:
            # Return 200, NOT 429

            return jsonify(
                fallback
            ), 200


        # ====================================================
        # OTHER GEMINI ERRORS
        # ====================================================

        print(
            "Gemini unavailable."
        )


        print(
            "Creating fallback dashboard..."
        )


        fallback = (
            create_fallback_dashboard(
                df,
                user_request
            )
        )


        return jsonify(
            fallback
        ), 200


# ============================================================
# START FLASK
# ============================================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )