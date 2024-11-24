import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="flex">
      <Sidebar className="w-[38rem] h-dvh" />
      <div className="flex h-dvh max-h-dvh flex-col w-full">
        <Header />
        <main className="flex-1 max-h-full flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default AppLayout;
