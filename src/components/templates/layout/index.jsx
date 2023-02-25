import clsx from "clsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main
      className={clsx(
        "flex min-h-screen w-full max-w-full flex-col items-center justify-center",
        "pt-3 pb-8",
        "dark:bg-gray-900 dark:text-white"
      )}
    >
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
