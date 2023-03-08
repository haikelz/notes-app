import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { InputEmail, InputPassword } from "~/components/atoms";
import Modal from "~/components/organisms/Modal";
import { useForm } from "~/hooks/useForm";
import { useSession } from "~/hooks/useSession";
import { useTitle } from "~/hooks/useTitle";
import supabase from "~/lib/utils/supabase";

const isSentAtom = atom(false);
const identitiesAtom = atom([]);
const errMsgAtom = atom("");

const SignUp = () => {
  const [isAuthenticated] = useSession();
  const { handleChange, values, errors } = useForm();

  const [isSent, setIsSent] = useAtom(isSentAtom);
  const [identities, setIdentities] = useAtom(identitiesAtom);
  const [, setErrMsg] = useAtom(errMsgAtom);

  /**
   * Logic for submitting new data(user/account) from input user to supabase
   * @param event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (values.email && values.password) {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) {
          setErrMsg(error.message);
          throw error;
        }
        if (data) {
          setIsSent(true);
          setIdentities(data.user.identities);
          console.log(data.user.identities);
        }
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
              <span className="text-center text-3xl font-semibold">Sign Up to Notes App</span>
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
            <Modal isOpen={isSent} setIsOpen={setIsSent}>
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {identities.length ? "Success!" : "Error!"}
                  </span>
                  <p className="mt-2">
                    {identities.length
                      ? "Please check your email to confirm your Sign Up"
                      : "This Email has been registered. Please use other Email to Sign Up!"}
                  </p>
                </div>
              </div>
            </Modal>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default SignUp;
