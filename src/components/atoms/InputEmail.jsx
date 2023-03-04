import clsx from "clsx";

const InputEmail = ({ values, handleChange, errors }) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor="email">
        Email
      </label>
      <input
        className={clsx(
          "my-2",
          "rounded-sm border-2 border-blue-500",
          "py-1 px-2",
          "transition-all ease-in-out",
          "focus:ring-2 focus:ring-blue-500",
          "dark:bg-gray-800"
        )}
        type="email"
        name="email"
        onChange={handleChange}
        value={values.email}
        required
      />
      <span className="text-red-600 dark:text-red-300">{errors.email}</span>
    </div>
  );
};

export default InputEmail;
