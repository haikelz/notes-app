import clsx from "clsx";
import { DarkModeButton, SearchNote } from "~/components/atoms";
import { useDarkMode } from "~/hooks/useDarkMode";

const Navbar = ({ filterSearch, setFilterSearch }) => {
  const [darkMode, setDarkMode] = useDarkMode();
  const changeMode = () => setDarkMode(darkMode === "dark" ? "light" : "dark");

  return (
    <header
      className={clsx(
        "sticky top-0 z-10 flex w-full flex-col items-center justify-center",
        "bg-white/70",
        "py-4 px-4",
        "backdrop-blur-md",
        "dark:bg-gray-900/70",
        "md:flex-row md:justify-between"
      )}
    >
      <div className="flex items-center justify-center">
        <h1 className="mr-4 text-center text-3xl font-bold">notes.app</h1>
        <DarkModeButton darkMode={darkMode} changeMode={changeMode} />
      </div>
      <div className="mt-4">
        <SearchNote filterSearch={filterSearch} setFilterSearch={setFilterSearch} />
      </div>
    </header>
  );
};

export default Navbar;
