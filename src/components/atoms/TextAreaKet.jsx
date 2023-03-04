import clsx from "clsx";
import { memo } from "react";

export const TextAreaKet = ({ formData, handleChange }) => {
  return (
    <div className="group relative my-6 w-full">
      <textarea
        type="text"
        name="keterangan"
        value={formData.keterangan}
        onChange={handleChange}
        className={clsx(
          "peer block h-24 w-full appearance-none",
          "border-0 border-b-2 border-gray-300 bg-transparent",
          "py-2.5 px-0",
          "text-lg text-gray-900",
          "focus:border-blue-600 focus:outline-none focus:ring-0",
          "dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
        )}
        required
      />
      <div className="mt-2 font-medium">
        <label htmlFor="keterangan">Keterangan</label>
      </div>
    </div>
  );
};

memo(TextAreaKet);
