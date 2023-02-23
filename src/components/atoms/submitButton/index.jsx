import clsx from "clsx";
import { Link } from "react-router-dom";

export const SubmitButton = () => {
  return (
    <button
      type="submit"
      className={clsx(
        "rounded-lg bg-blue-500",
        "py-2 px-4",
        "font-semibold text-white",
        "drop-shadow-md transition duration-300",
        "hover:bg-blue-600"
      )}
    >
      Add Note
    </button>
  );
};
