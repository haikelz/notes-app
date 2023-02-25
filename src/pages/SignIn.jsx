import clsx from "clsx";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import supabase from "~/lib/utils/supabase";

const SignIn = () => {
  const signIn = async (providerName) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: providerName });
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex w-full flex-col items-center justify-center text-center">
      <img className="h-96 w-96" src="/img/sign-in.svg" alt="sign in" loading="lazy" />
      <span className="text-xl font-semibold">Sign In to Notes App</span>
      <div className="flex space-x-3">
        <button
          type="button"
          aria-label="github"
          className={clsx(
            "mt-3 rounded-md bg-gray-700",
            "flex items-center justify-center space-x-3 px-4 py-2",
            "font-semibold text-white",
            "hover:bg-gray-800"
          )}
          onClick={() => signIn("github")}
        >
          <FaGithub />
          <span>Github</span>
        </button>
        <button
          className={clsx(
            "mt-3 rounded-md border-2 border-blue-500",
            "flex items-center justify-center space-x-3 px-4 py-2",
            "font-semibold text-black dark:text-white",
            "hover:bg-gray-50"
          )}
          type="button"
          aria-label="google"
          onClick={() => signIn("google")}
        >
          <FcGoogle />
          <span>Google</span>
        </button>
      </div>
    </section>
  );
};

export default SignIn;
