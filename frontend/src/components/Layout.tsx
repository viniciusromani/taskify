import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex flex-1 container mx-auto px-4">
      <Outlet />
    </div>
  );
}

export default Layout;
