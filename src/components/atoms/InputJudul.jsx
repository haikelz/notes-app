import clsx from "clsx";

export const InputJudul = ({ formData, limitChar, handleChangeJudul }) => {
  return (
    <div className="group relative mb-6 w-full">
      <input
        type="text"
        name="judul"
        value={formData.judul}
        onChange={handleChangeJudul}
        className={clsx(
          "peer block w-full appearance-none",
          "border-0 border-b-2 border-gray-300 bg-transparent",
          "py-2.5 px-0 text-lg",
          "text-gray-900",
          "focus:border-blue-600 focus:outline-none focus:ring-0",
          "dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
        )}
        required
      />
      <div className="mt-2 flex justify-between font-medium">
        <label htmlFor="name">Judul</label>
        <p>{limitChar}</p>
      </div>
    </div>
  );
};
