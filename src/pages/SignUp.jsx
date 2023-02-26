import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "~/hooks/useForm";
import supabase from "~/lib/utils/supabase";
import { isShowedPasswordAtom } from "~/store";

const isSignUpAtom = atom(false);

const SignUp = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useAtom(isSignUpAtom);
  const [isShowedPassword, setIsShowedPassword] = useAtom(isShowedPasswordAtom);

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

  useEffect(() => {
    const getUser = async () => {
      try {
        const { error } = await supabase.auth.getUser();

        if (error) {
          setIsSignUp(false);
          throw error;
        }

        setIsSignUp(true);
        navigate("/", { replace: true });
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, [setIsSignUp]);

  return (
    <>
      {!isSignUp ? (
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
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  className={clsx(
                    "my-2 rounded-sm border-2 border-blue-500",
                    "py-1 px-2",
                    "transition-all ease-in-out",
                    "focus:ring-2 focus:ring-blue-500"
                  )}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
                <span className="text-red-600">{errors.email}</span>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="password">
                  Password
                </label>
                <div className="relative flex flex-col">
                  <input
                    className={clsx(
                      "my-2 rounded-sm border-2 border-blue-500",
                      "py-1 px-2",
                      "transition-all ease-in-out",
                      "block focus:ring-2 focus:ring-blue-500"
                    )}
                    type={isShowedPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <button
                    type="button"
                    aria-label="show password"
                    className="absolute inset-y-0 right-0 mr-3 flex items-center"
                    onClick={() => setIsShowedPassword(!isShowedPassword)}
                  >
                    {isShowedPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
                <span className="text-red-600">{errors.password}</span>
              </div>
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
