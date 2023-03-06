import clsx from "clsx";
import { InputJudul, TextAreaKet } from "~/components/atoms";

const FormInput = ({
  handleSubmit,
  limitChar,
  formData,
  handleChangeJudul,
  handleChange,
  desc,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex w-full flex-col items-center justify-center p-4 md:w-4/6 xl:w-1/2"
    >
      <InputJudul handleChangeJudul={handleChangeJudul} formData={formData} limitChar={limitChar} />
      <TextAreaKet handleChange={handleChange} formData={formData} />
      <button
        type="submit"
        aria-label="submit data"
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
    </form>
  );
};

export default FormInput;
