import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

import "../styles/Charts.css";

const COLORS = [
  "#2F80ED",
  "#27AE60",
  "#F2994A",
  "#9B51E0",
  "#EB5757",
  "#56CCF2"
];

function Charts({ block }) {

  const {
    type,
    data = [],
    title,
    x_label,
    y_label
  } = block;

  return (
    <div className="chart-card">

      <h3 className="chart-title">
        {title}
      </h3>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        {/* LINE CHART */}

        {type === "line_chart" && (

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="x"
              label={{
                value: x_label || "",
                position: "insideBottom",
                offset: -5
              }}
            />

            <YAxis
              label={{
                value: y_label || "",
                angle: -90,
                position: "insideLeft"
              }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="y"
              stroke="#2F80ED"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </LineChart>

        )}


        {/* BAR CHART */}

        {type === "bar_chart" && (

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="x"
              label={{
                value: x_label || "",
                position: "insideBottom",
                offset: -5
              }}
            />

            <YAxis
              label={{
                value: y_label || "",
                angle: -90,
                position: "insideLeft"
              }}
            />

            <Tooltip />

            <Bar
              dataKey="y"
              fill="#2F80ED"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        )}


        {/* PIE CHART */}

        {type === "pie_chart" && (

          <PieChart>

            <Pie
              data={data}
              dataKey="y"
              nameKey="x"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        )}

      </ResponsiveContainer>

    </div>
  );
}

export default Charts;