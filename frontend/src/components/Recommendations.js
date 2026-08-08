import React from "react";

function Recommendations({ list }) {

    return (

        <div className="recommend-card">

            <h3>
                🎯 Recommendations
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

export default Recommendations;