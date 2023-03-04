import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { MdClose } from "react-icons/md";
import InputEmail from "~/components/atoms/InputEmail";
import InputPassword from "~/components/atoms/InputPassword";
import { useForm } from "~/hooks/useForm";
import { useSession } from "~/hooks/useSession";
import { useTitle } from "~/hooks/useTitle";
import supabase from "~/lib/utils/supabase";

const isSentAtom = atom(false);
const isOpenAtom = atom(false);

const SignUp = () => {
  const [isSent, setIsSent] = useAtom(isSentAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [isAuthenticated] = useSession();

  const { handleChange, values, errors } = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (values.email && values.password) {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) throw error;
        if (data) setIsSent(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useTitle("Sign Up");

  return (
    <>
      {!isAuthenticated ? (
        <>
          <section className="flex w-full flex-col items-center justify-center p-4">
            <div
              className={clsx(
                "flex w-full max-w-xl flex-col items-center justify-center",
                "rounded-sm border-[3px] border-blue-500",
                "p-4"
              )}
            >
              <span className="text-center text-2xl font-semibold">Sign Up to Notes App</span>
              <form className="mt-4 flex w-full flex-col space-y-3" onSubmit={handleSubmit}>
                <InputEmail values={values} handleChange={handleChange} errors={errors} />
                <InputPassword values={values} handleChange={handleChange} errors={errors} />
                <button
                  className={clsx(
                    "rounded-sm bg-blue-500",
                    "px-3 py-2",
                    "font-semibold text-white",
                    "transition-all ease-in-out",
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
          {isSent ? (
            <div
              className={clsx(
                "fixed inset-0 z-20 flex h-full w-full",
                "items-center justify-center",
                "bg-white/20 backdrop-blur-md dark:bg-black/20"
              )}
            >
              <div
                className={clsx(
                  "rounded-md bg-white p-3 shadow-lg",
                  "dark:bg-gray-800 dark:text-white"
                )}
              >
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
                <div className="flex flex-col items-center justify-center">
                  <p>Berhasil!</p>
                  <p>Silahkan cek email ya</p>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default SignUp;
