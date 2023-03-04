import clsx from "clsx";
import { memo } from "react";

export const SubmitButton = ({ desc }) => {
  return (
    <button
      type="submit"
      className={clsx(
        "rounded-md bg-blue-500",
        "py-2 px-4",
        "font-semibold text-white",
        "drop-shadow-md",
        "transition-all ease-in-out",
        "hover:bg-blue-600"
      )}
    >
      {desc}
    </button>
  );
};

memo(SubmitButton);
