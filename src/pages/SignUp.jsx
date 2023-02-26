import clsx from "clsx";
import { useAtom } from "jotai";
import InputEmail from "~/components/atoms/InputEmail";
import InputPassword from "~/components/atoms/InputPassword";
import { useForm } from "~/hooks/useForm";
import { useSession } from "~/hooks/useSession";
import { useTitle } from "~/hooks/useTitle";
import supabase from "~/lib/utils/supabase";
import { isShowedPasswordAtom } from "~/store";

const SignUp = () => {
  const [isAuthenticated] = useSession();

  const { handleChange, values, errors } = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (values.email && values.password) {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useTitle("Sign Up");

  return (
    <>
      {!isAuthenticated ? (
        <section className="flex w-full flex-col items-center justify-center p-4">
          <div
            className={clsx(
              "flex w-full max-w-xl flex-col items-center justify-center",
              "rounded-sm border-[3px] border-blue-500",
              "p-4"
            )}
          >
            <span className="text-center text-xl font-semibold">Sign Up to Notes App</span>
            <form className="mt-4 flex w-full flex-col space-y-3" onSubmit={handleSubmit}>
              <InputEmail values={values} handleChange={handleChange} errors={errors} />
              <InputPassword values={values} handleChange={handleChange} errors={errors} />
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
      ) : null}
    </>
  );
};

export default SignUp;
