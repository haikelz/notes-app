import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeButton, SearchNote } from "~/components/atoms";
import { useDarkMode } from "~/hooks/useDarkMode";
import supabase from "~/lib/utils/supabase";

const isSignOutAtom = atom(false);

const Navbar = ({ filterSearch, setFilterSearch }) => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useDarkMode();
  const [isSignOut, setIsSignOut] = useAtom(isSignOutAtom);

  useEffect(() => {
    if (isSignOut) {
      const signOut = async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;

          navigate("/signin");
        } catch (err) {
          console.error(err);
        }
      };

      signOut();
    }
  }, [isSignOut]);

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
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center justify-center">
          <h1 className="mr-4 text-center text-3xl font-bold">notes.app</h1>
          <DarkModeButton
            darkMode={darkMode}
            changeMode={() => setDarkMode(darkMode === "dark" ? "light" : "dark")}
          />
        </div>
      </div>
      <div className="mt-4 text-center md:mt-0 md:text-end">
        <SearchNote filterSearch={filterSearch} setFilterSearch={setFilterSearch} />
        <div className="mt-3 space-x-3">
          <Link role="button" to="/add-note" className="cursor-pointer font-medium underline">
            + Add your note
          </Link>
          <button
            className="cursor-pointer font-medium underline"
            onClick={() => setIsSignOut(true)}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
