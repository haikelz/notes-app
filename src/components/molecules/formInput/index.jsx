import { InputJudul, TextAreaKet, SubmitButton } from "~/components/atoms";

const FormInput = ({ handleSubmit, limitChar, formData, handleChangeJudul, handleChange }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col items-center justify-center p-4 md:w-1/2"
    >
      <InputJudul handleChangeJudul={handleChangeJudul} formData={formData} limitChar={limitChar} />
      <TextAreaKet handleChange={handleChange} formData={formData} />
      <SubmitButton />
    </form>
  );
};

export default FormInput;
