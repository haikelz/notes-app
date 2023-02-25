import { InputJudul, SubmitButton, TextAreaKet } from "~/components/atoms";

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
      <SubmitButton desc={desc} />
    </form>
  );
};

export default FormInput;
