import clsx from "clsx";
import { memo } from "react";

export const CustomButton = ({ children, onClick, className }) => {
  return (
    <button
      type="button"
      aria-label="button"
      className={clsx(
        "rounded-md",
        "px-4 py-2",
        "font-bold text-white",
        "transition-all ease-in-out",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

memo(CustomButton);
