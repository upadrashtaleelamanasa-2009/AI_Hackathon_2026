# 🚀 AI Dashboard Generator

### Transform CSV Data into Intelligent Business Dashboards using Generative AI

AI Dashboard Generator is an AI-powered web application that converts raw CSV datasets into interactive business intelligence dashboards automatically.

Instead of manually cleaning data, selecting charts, calculating KPIs, and writing business insights, users can simply upload a CSV file and describe what they want to analyze. The application uses Generative AI to understand the dataset and generate a meaningful dashboard containing KPIs, charts, tables, business insights, and recommendations.

---

## 🏆 Hackathon Achievement

🥇 **1st Prize – Hackathon 2026**

Our project was developed as a practical AI-based solution for making data analysis faster, easier, and accessible to users without advanced data visualization skills.

---

## 💡 Problem Statement

Traditional data analysis often requires users to:

- Clean and understand datasets manually
- Select appropriate visualization techniques
- Calculate important KPIs
- Identify trends and patterns
- Interpret business results
- Create dashboards manually

This process can be time-consuming and requires technical knowledge.

### Our Solution

AI Dashboard Generator automates this entire process.

```text
Upload CSV
     ↓
Dataset Analysis
     ↓
Generative AI Processing
     ↓
Automatic KPI Generation
     ↓
Automatic Charts & Tables
     ↓
AI Business Insights
     ↓
AI Recommendations
     ↓
Interactive Dashboard

✨ Key Features
📂 1. CSV Upload

Users can upload a CSV dataset directly through the web application.

The system automatically reads the dataset and extracts:

Column names
Number of rows
Number of columns
Sample records
Dataset structure
🤖 2. AI-Powered Data Analysis

The application uses Google's Gemini Generative AI model to analyze the uploaded dataset.

Gemini understands the dataset structure and generates dashboard components based on the available data.

📊 3. Automatic KPI Generation

The system automatically generates important Key Performance Indicators such as:

Total Revenue
Total Orders
Customers
Profit
Average Sales
Other relevant metrics

The KPIs depend on the uploaded dataset.

📈 4. Automatic Data Visualization

The AI generates suitable visualizations from the dataset.

Supported visualizations include:

Line Charts
Bar Charts
Tables
Progress Indicators
KPI Cards

Charts are rendered dynamically using React and Recharts.

🧠 5. AI Business Insights

The system doesn't stop at creating charts.

It also explains what the data means.

Example:

Revenue increased significantly during the latest period.

The South region generated the highest sales.

Electronics was the top-performing category.

These insights help users understand their data without manually interpreting every chart.

💡 6. AI Recommendations

The application generates actionable recommendations based on the dataset.

For example:

Increase inventory for high-performing products.
Focus marketing efforts on high-performing regions.
Investigate low-performing categories.
Optimize resources based on observed trends.
📋 7. Interactive Dashboard

Generated dashboards contain:

Dashboard title
KPI cards
Interactive charts
Data tables
AI insights
Business recommendations

The dashboard is generated dynamically based on the uploaded dataset.

🕘 8. Dashboard History

Previously generated dashboards can be stored and viewed through the History section.

Users can review previous:

Dashboard titles
Prompts
Datasets
Generated results
Creation dates
🔐 9. User Authentication

The project includes a login system designed to provide a personalized experience.

Users can sign in before accessing the dashboard generation functionality.

Firebase can be used to provide secure authentication and Google Sign-In integration.

🏗️ System Architecture
                  USER
                    │
                    ▼
            ┌───────────────┐
            │ React Frontend│
            └───────┬───────┘
                    │
             CSV + User Prompt
                    │
                    ▼
            ┌───────────────┐
            │ Flask Backend │
            └───────┬───────┘
                    │
                    ▼
              Pandas Analysis
                    │
                    ▼
            ┌───────────────┐
            │ Gemini AI     │
            │ Model         │
            └───────┬───────┘
                    │
              Dashboard JSON
                    │
                    ▼
            ┌───────────────┐
            │ React Renderer│
            └───────┬───────┘
                    │
                    ▼
          Interactive AI Dashboard
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
      Insights           Recommendations
🛠️ Technologies Used
Frontend
React.js
React Router
Bootstrap
CSS
Recharts
JavaScript
Backend
Python
Flask
Flask-CORS
Pandas
Artificial Intelligence
Google Gemini Generative AI
Gemini Flash Model
Authentication
Firebase Authentication
Data Processing
Pandas
JSON
Development Tools
Visual Studio Code
Git
GitHub
npm
Python Virtual Environment
🤖 Why Gemini?

Gemini is used as the intelligence layer of the application.

It receives information about the uploaded dataset and user request and generates structured dashboard information.

Gemini is responsible for:

Understanding the dataset
Identifying useful metrics
Selecting meaningful visualizations
Generating dashboard content
Producing business insights
Generating recommendations

The backend validates the AI-generated JSON before sending it to the React frontend.

🔄 How the Application Works
Step 1 – Upload Dataset

The user uploads a CSV file.

Step 2 – Enter Analysis Request

The user can provide a request such as:

Analyze sales performance by region and category.
Step 3 – Backend Processing

Flask receives the CSV and user request.

Pandas extracts information about the dataset.

Step 4 – AI Analysis

The dataset summary and user request are sent to Gemini.

Step 5 – Structured Output

Gemini generates structured JSON containing dashboard components.

Example:

{
  "title": "Sales Analytics Dashboard",
  "blocks": [],
  "insights": [],
  "recommendations": []
}
Step 6 – Validation

The Flask backend validates the generated JSON and removes invalid dashboard blocks.

Step 7 – Dashboard Rendering

React receives the JSON and dynamically renders the dashboard.

🌟 What Makes Our Project Different?

Most dashboard applications require users to manually:

Select charts
Configure visualizations
Calculate KPIs
Interpret data
Write reports

Our system combines data visualization + Generative AI + business intelligence into a single automated workflow.

Traditional Dashboard
Dataset
  ↓
Manual Analysis
  ↓
Manual KPI Calculation
  ↓
Manual Chart Selection
  ↓
Manual Insights
  ↓
Dashboard
Our AI Dashboard Generator
Dataset + User Request
        ↓
       AI
        ↓
KPIs + Charts + Insights + Recommendations
        ↓
    Dashboard

The key innovation is that the system does not simply visualize data — it also interprets the data and provides actionable business recommendations.

🔒 Security

Sensitive API keys are stored using environment variables.

Example:

GEMINI_API_KEY=your_api_key

The .env file should never be committed to GitHub.

The project uses .gitignore to prevent sensitive files and generated dependencies from being uploaded.

📁 Project Structure
AI_Hackathon_2026/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── KPICard.js
│   │   │   ├── Charts.js
│   │   │   ├── Insights.js
│   │   │   ├── Recommendations.js
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── HistoryPage.js
│   │   │   ├── AboutPage.js
│   │   │   └── Login.js
│   │   │
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── package.json
│   └── ...
│
├── tests/
│
├── .gitignore
└── README.md
⚙️ Installation
1. Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd AI_Hackathon_2026
🐍 Backend Setup

Create a virtual environment:

python -m venv hackathon_env

Activate it on Windows:

hackathon_env\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Create a .env file:

GEMINI_API_KEY=your_gemini_api_key

Run the Flask backend:

python app.py

The backend will run on:

http://localhost:5000
⚛️ Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the React application:

npm start

The frontend will run on:

http://localhost:3000
📊 Example Use Cases

The application can be used for datasets such as:

🛒 Sales Analytics

Analyze:

Revenue
Products
Categories
Regions
Orders
🏨 Hotel Analytics

Analyze:

Bookings
Cancellations
Countries
Revenue
Customer behavior
👥 Customer Analytics

Analyze:

Customer segments
Purchase patterns
Customer value
Retention
👨‍💼 Employee Analytics

Analyze:

Salaries
Departments
Experience
Performance
📦 Inventory Analytics

Analyze:

Stock levels
Product demand
Low-stock products
Category performance
🔮 Future Scope

Future versions can include:

Real-time database integration
More visualization types
Advanced predictive analytics
Machine learning forecasting
Automated report generation
PDF/Excel dashboard export
Voice-based data analysis
Natural-language conversational analytics
Multi-dataset analysis
Role-based authentication
Cloud deployment
Real-time collaborative dashboards
🎯 Vision

Our vision is to make advanced data analytics accessible to everyone.

Users should not need to know SQL, Python, statistics, or data visualization to understand their data.

With AI Dashboard Generator:

Ask → Upload → Analyze → Understand → Decide
👥 Team

Developed by our team as part of Hackathon 2026.

Team Members
Member 1 – [GitHub Profile]
Member 2 – [GitHub Profile]
Member 3 – [GitHub Profile]
Member 4 – [GitHub Profile]
🏆 Achievement

🥇 1st Prize – Hackathon 2026

Built with:

React + Flask + Pandas + Gemini AI + Recharts + Firebase

⭐ If you found this project interesting

Give the repository a ⭐ and feel free to explore the project!

📜 License

This project is developed for educational and hackathon purposes.


### One important change before you paste it

I intentionally wrote **"Gemini Flash Model"** rather than locking the README to a potentially incorrect model version. In your actual code, make sure the model name you document matches the model you're currently using.

Also, **don't put your actual Gemini API key or Firebase private credentials in the README.** Your `.env` should stay out of GitHub.

And because this is your **winning project**, I'd put this right near the top:

> 🥇 **1st Prize – Hackathon 2026**

That immediately tells anyone visiting the repository that this wasn't just a practice project. 🏆


## 📸 Project Screenshots

### 🏠 Home Page
![Home Page](Screenshots/home%20page.png)

### 📊 Dashboard
![Dashboard](Screenshots/dashboard.png)

### 📁 File Upload
![File Upload](Screenshots/fileupload.png)

### 🕒 History
![History](Screenshots/history.png)

### ℹ️ About
![About](Screenshots/about.png)

### 📄 Page 1
![Page 1](Screenshots/page1.png)