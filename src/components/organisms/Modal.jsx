import clsx from "clsx";
import { memo } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ children, isOpen, setIsOpen }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-20 flex h-full w-full",
        "items-center justify-center",
        "bg-white/20 p-4 backdrop-blur-md dark:bg-black/20"
      )}
    >
      <div
        className={clsx(
          "max-w-lg rounded-md bg-white p-4 shadow-lg",
          "dark:bg-gray-800 dark:text-white"
        )}
      >
        <div className="flex w-full items-end justify-end">
          <button
            className={clsx(
              "rounded-lg p-1 text-black",
              "transition-all ease-in-out",
              "hover:bg-slate-500 hover:text-white",
              "dark:text-white dark:hover:bg-white dark:hover:text-gray-900"
            )}
            type="button"
            aria-label="close"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default memo(Modal);
