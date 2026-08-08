import React from "react";

function Insights({ list }) {

    return (

        <div className="insights-card">

            <h3>
                💡 AI Insights
            </h3>

            <ul>

            {
                list.map((item,index)=>

                    <li key={index}>
                        {item}
                    </li>

                )
            }

            </ul>

        </div>

    );

}

export default Insights;