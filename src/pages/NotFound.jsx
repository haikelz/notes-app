import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTitle } from "~/hooks/useTitle";

const NotFound = () => {
  useTitle("Not Found!");

  return (
    <section className="flex w-full flex-col items-center justify-center text-center">
      <img className="h-80 w-80" src="/img/not-found.svg" alt="not found" loading="lazy" />
      <div className="flex flex-col items-center justify-center space-y-2">
        <span className="mt-6 text-center text-xl font-semibold">
          The page that you want to visit is not found!
        </span>
        <Link to="/">
          <button
            className={clsx(
              "rounded-md bg-blue-500",
              "px-4 py-2",
              "font-semibold text-white",
              "hover:bg-blue-600"
            )}
            type="button"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
