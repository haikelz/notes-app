import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { memo, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import supabase from "~/lib/utils/supabase";
import { profileAtom } from "~/store";

const isSignOutAtom = atom(false);

const Modal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const [isSignOut, setIsSignOut] = useAtom(isSignOutAtom);
  const [profile] = useAtom(profileAtom);

  useEffect(() => {
    if (isSignOut) {
      const signOut = async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;

          navigate("/signin");
        } catch (err) {
          console.error(err);
        }
      };

      signOut();
    }
  }, [isSignOut]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-20 flex h-full w-full",
        "items-center justify-center",
        "bg-white/20 backdrop-blur-md dark:bg-black/20"
      )}
    >
      <div
        className={clsx("rounded-md bg-white p-3 shadow-lg", "dark:bg-gray-800 dark:text-white")}
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
          <img
            className={clsx("h-56 w-56 rounded-full bg-red-300 p-1", "dark:bg-yellow-300")}
            src={profile.avatar}
            alt="user avatar"
            loading="lazy"
          />
          <div className="flex flex-col items-center justify-center p-3">
            <div className="text-center">
              <p>
                <span className="font-semibold">Name:</span> {profile.fullname}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {profile.email}
              </p>
            </div>
            <button
              className={clsx(
                "mt-4 w-fit rounded-md bg-slate-500",
                "py-2 px-3.5 font-semibold text-white",
                "transition-all ease-in-out",
                "hover:bg-slate-600"
              )}
              type="button"
              aria-label="logout"
              onClick={() => setIsSignOut(!isSignOut)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Modal);
