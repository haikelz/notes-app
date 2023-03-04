import clsx from "clsx";
import { useEffect } from "react";
import { InputEmail } from "~/components/atoms";
import { useForm } from "~/hooks/useForm";
import { useTitle } from "~/hooks/useTitle";
import supabase from "~/lib/utils/supabase";

const SendEmailConfirmation = () => {
  const { handleChange, values, errors } = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (values.email) {
        const { error } = await supabase.auth.resetPasswordForEmail("xxz473673@gmail.com");
        if (error) throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event);
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?");
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });
        console.log(data);
        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);

  useTitle("Send Email Confirmation");

  return (
    <>
      <section className="flex w-full flex-col items-center justify-center p-4">
        <div
          className={clsx(
            "flex w-full max-w-xl flex-col items-center justify-center",
            "rounded-sm border-[3px] border-blue-500",
            "p-4"
          )}
        >
          <span className="text-center text-xl font-semibold">Reset Your Password</span>
          <p className="mt-1">Enter your email name</p>
          <form className="mt-4 flex w-full flex-col space-y-3" onSubmit={handleSubmit}>
            <InputEmail values={values} handleChange={handleChange} errors={errors} />
            <button
              className={clsx(
                "rounded-sm bg-blue-500",
                "px-3 py-2",
                "font-semibold text-white",
                "hover:bg-blue-600"
              )}
              type="submit"
              aria-label="submit data"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SendEmailConfirmation;
