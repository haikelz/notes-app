import clsx from "clsx";
import { useAtom } from "jotai";
import { memo } from "react";
import { Link } from "react-router-dom";
import { DarkModeButton, SearchNote } from "~/components/atoms";
import { useDarkMode } from "~/hooks/useDarkMode";
import { profileAtom } from "~/store";

const Navbar = ({ filterSearch, setFilterSearch, isOpen, setIsOpen }) => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [profile] = useAtom(profileAtom);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-10",
        "flex w-full flex-col items-center justify-center",
        "bg-white/70",
        "py-4 px-4",
        "backdrop-blur-md",
        "dark:bg-gray-900/70",
        "md:flex-row md:justify-between"
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center justify-center",
          "md:items-start md:justify-start"
        )}
      >
        <div className="mb-4 flex items-center justify-center">
          <h1 className="mr-4 text-center text-3xl font-bold">notes.app</h1>
          <DarkModeButton
            darkMode={darkMode}
            changeMode={() => setDarkMode(darkMode === "dark" ? "light" : "dark")}
          />
        </div>
        <SearchNote filterSearch={filterSearch} setFilterSearch={setFilterSearch} />
      </div>
      <div className={clsx("mt-4 text-center", "md:mt-0 md:text-end")}>
        <div className="flex items-center justify-center space-x-3">
          <Link role="button" to="/add-note" className="cursor-pointer font-medium underline">
            + Add your note
          </Link>
          <div className="rounded-full bg-red-300 p-1 dark:bg-yellow-300">
            <img
              className="h-12 w-12 cursor-pointer rounded-full"
              src={profile.avatar}
              alt="user avatar"
              onClick={() => setIsOpen(!isOpen)}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
