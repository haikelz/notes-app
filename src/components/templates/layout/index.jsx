import clsx from "clsx";

const Layout = ({ children }) => {
  return (
    <main
      className={clsx(
        "flex min-h-screen w-full max-w-full flex-col items-center justify-center",
        "pt-3 pb-8",
        "dark:bg-gray-900 dark:text-white"
      )}
    >
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">{children}</div>
    </main>
  );
};

export default Layout;
