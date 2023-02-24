import supabase from "../lib/utils/supabase";

const SignIn = () => {
  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center border-2 px-4">
      <div className="flex w-full flex-col items-center justify-center text-center">
        <img className="h-96 w-96" src="/img/sign-in.svg" alt="sign in" />
        <span className="text-xl font-semibold">Sign In with your Github Account</span>
        <button
          className="mt-3 rounded-md bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-800"
          type="button"
          aria-label="github"
          onClick={signInWithGithub}
        >
          Sign In
        </button>
      </div>
    </section>
  );
};

export default SignIn;
