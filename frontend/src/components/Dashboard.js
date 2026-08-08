import React from "react";

import KPICard from "./KPICard";
import Charts from "./Chart";
import Insights from "./Insights";
import Recommendations from "./Recommendations";

import "../styles/Dashboard.css";


function Dashboard({ dashboardData }) {


    if(!dashboardData){
        return null;
    }


    const statCards =
        dashboardData.blocks?.filter(
            block => block.type === "stat_card"
        ) || [];


    const charts =
    dashboardData.blocks?.filter(
        block =>
            block.type === "line_chart" ||
            block.type === "bar_chart" ||
            block.type === "pie_chart"
    ) || [];


    const table =
        dashboardData.blocks?.find(
            block => block.type === "table"
        );


    return (

    <div className="dashboard-container">


        {/* Dashboard Header */}

        <div className="dashboard-header">

            <h1>
                {dashboardData.title}
            </h1>

            <p>
                AI Generated Business Intelligence Dashboard
            </p>

        </div>



        {/* KPI CARDS */}

        <div className="row g-4 mb-4">


        {
            statCards.map((card,index)=>(

                <div 
                className="col-md-3"
                key={index}
                >

                    <KPICard 
                    block={card}
                    />

                </div>

            ))
        }


        </div>




        {/* CHARTS */}

        <div className="row g-4">


        {
            charts.map((chart,index)=>(

                <div 
                className="col-lg-6"
                key={index}
                >

                    <Charts 
                    block={chart}
                    />

                </div>

            ))
        }


        </div>




        {/* TABLE */}

        {
        table &&

        <div className="data-table-card">


            <h3>
                <i className="bi bi-table"></i>
                {" "}
                {table.title}
            </h3>



            <div className="table-responsive">


            <table className="table table-hover">


                <thead>

                <tr>

                {
                    table.columns.map(
                        (col,index)=>(

                        <th key={index}>
                            {col}
                        </th>

                    ))
                }

                </tr>

                </thead>



                <tbody>


                {
                    table.rows.map(
                        (row,index)=>(

                        <tr key={index}>


                        {
                            row.map(
                                (cell,i)=>(

                                <td key={i}>
                                    {cell}
                                </td>

                            ))
                        }


                        </tr>

                    ))
                }


                </tbody>


            </table>npm statCards


            </div>


        </div>


        }



        {/* AI INSIGHTS */}

        {
            dashboardData.insights &&

            <Insights 
            list={dashboardData.insights}
            />

        }




        {/* AI RECOMMENDATIONS */}


        {
            dashboardData.recommendations &&

            <Recommendations

            list={dashboardData.recommendations}

            />

        }




    </div>

    );

}


export default Dashboard;