import clsx from "clsx";
import { memo } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const DarkModeButton = ({ changeMode, darkMode }) => {
  return (
    <div className="mr-3 flex">
      <button
        className={clsx("rounded-full bg-gray-200 p-2.5", "dark:bg-gray-800")}
        onClick={changeMode}
      >
        {darkMode === "dark" ? <MdLightMode size="22" /> : <MdDarkMode size="22" />}
      </button>
    </div>
  );
};

memo(DarkModeButton);
