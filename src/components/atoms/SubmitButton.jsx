import clsx from "clsx";

export const SubmitButton = ({ desc }) => {
  return (
    <button
      type="submit"
      className={clsx(
        "rounded-md bg-blue-500",
        "py-2 px-4",
        "font-semibold text-white",
        "drop-shadow-md",
        "hover:bg-blue-600"
      )}
    >
      {desc}
    </button>
  );
};
