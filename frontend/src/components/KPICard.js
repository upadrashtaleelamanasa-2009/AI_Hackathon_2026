import React from "react";

function KPICard({ block }) {

    return (

        <div className="kpi-card">

            <div className="kpi-title">

                {block.label}

            </div>

            <div className="kpi-value">

                {block.value}

            </div>

            <div className="kpi-sub">

                {block.sublabel}

            </div>

        </div>

    );

}

export default KPICard;