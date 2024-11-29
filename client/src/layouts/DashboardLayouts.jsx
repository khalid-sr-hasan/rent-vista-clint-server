import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayouts = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* sidebar */}
      <Sidebar></Sidebar>
      {/* outlet ---> dynamic content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayouts;
