import clsx from "clsx";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { InputEmail, InputPassword } from "~/components/atoms";
import { useForm } from "~/hooks/useForm";
import { useSession } from "~/hooks/useSession";
import { useTitle } from "~/hooks/useTitle";
import supabase from "~/lib/utils/supabase";

const SignIn = () => {
  const navigate = useNavigate();

  const [isAuthenticated] = useSession();

  const { handleChange, values, errors } = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (values.email && values.password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) throw error;
        navigate("/", { replace: true });
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

  useTitle("Sign In");

  return (
    <>
      {!isAuthenticated ? (
        <section className="flex w-full flex-col items-center justify-center p-4">
          <div className="flex w-full max-w-xl flex-col items-center justify-center">
            <span className="text-2xl font-semibold">Sign In to Notes App</span>
            <form className="my-4 flex w-full flex-col space-y-3" onSubmit={handleSubmit}>
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
            <span className="font-medium">Or you can using</span>
            <div className="my-3 flex space-x-3">
              <button
                type="button"
                aria-label="github"
                className={clsx(
                  "rounded-md bg-gray-700",
                  "flex items-center justify-center space-x-3 px-4 py-2",
                  "font-semibold text-white",
                  "transition-all ease-in-out",
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
                  "transition-all ease-in-out",
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
              <span className="text-center text-base">
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
