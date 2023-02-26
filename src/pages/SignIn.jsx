import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { FaGithub, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "~/hooks/useForm";
import supabase from "~/lib/utils/supabase";
import { isShowedPasswordAtom } from "~/store";

const isSignInAtom = atom(false);

const SignIn = () => {
  const navigate = useNavigate();

  const [isShowedPassword, setIsShowedPassword] = useAtom(isShowedPasswordAtom);
  const [isSignIn, setIsSignIn] = useAtom(isSignInAtom);

  const { handleChange, values, errors } = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (values.email && values.password) {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithOAuth = async (providerName) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: providerName });
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { error } = await supabase.auth.getUser();

        if (error) {
          setIsSignIn(false);
          throw error;
        }

        setIsSignIn(true);
        navigate("/", { replace: true });
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);

  return (
    <>
      {!isSignIn ? (
        <section className="flex w-full flex-col items-center justify-center p-4">
          <div className="flex w-full max-w-xl flex-col items-center justify-center">
            <span className="text-xl font-semibold">Sign In to Notes App</span>
            <form className="my-4 flex w-full flex-col space-y-3" onSubmit={handleSubmit}>
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
            <span className="font-medium">Or you can using</span>
            <div className="my-3 flex space-x-3">
              <button
                type="button"
                aria-label="github"
                className={clsx(
                  "rounded-md bg-gray-700",
                  "flex items-center justify-center space-x-3 px-4 py-2",
                  "font-semibold text-white",
                  "hover:bg-gray-800"
                )}
                onClick={() => signInWithOAuth("github")}
              >
                <FaGithub />
                <span>Github</span>
              </button>
              <button
                className={clsx(
                  "rounded-md border-2 border-blue-500",
                  "flex items-center justify-center space-x-3 px-4 py-2",
                  "font-semibold text-black",
                  "dark:text-white dark:hover:text-black",
                  "hover:bg-gray-50"
                )}
                type="button"
                aria-label="google"
                onClick={() => signInWithOAuth("google")}
              >
                <FcGoogle />
                <span>Google</span>
              </button>
            </div>
            <div>
              <span className="text-base">
                Want to create an account?{" "}
                <Link className="font-semibold underline" to="/signup">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default SignIn;
