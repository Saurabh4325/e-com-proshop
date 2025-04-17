import "../../css/admin/dashboard.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin_component/sidebar";

const DashboardScreen = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard__container">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardScreen;
