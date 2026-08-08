import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

function DashboardPage() {

  const location = useLocation();

  const dashboardData = location.state;

  if (!dashboardData) {

    return (

      <>
        <Navbar />

        <h2 className="text-center mt-5">

          No Dashboard Found

        </h2>

      </>

    );

  }

  return (

    <>

      <Navbar />

      <Dashboard dashboardData={dashboardData} />

    </>

  );

}

export default DashboardPage;