import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { memo } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const isShowedPasswordAtom = atom(false);

export const InputPassword = ({ values, handleChange, errors }) => {
  const [isShowedPassword, setIsShowedPassword] = useAtom(isShowedPasswordAtom);

  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor="password">
        Password
      </label>
      <div className="relative flex flex-col">
        <input
          className={clsx(
            "my-2 block",
            "rounded-sm border-2 border-blue-500",
            "py-1 px-2",
            "transition-all ease-in-out",
            "focus:ring-2 focus:ring-blue-500",
            "dark:bg-gray-800"
          )}
          type={isShowedPassword ? "text" : "password"}
          name="password"
          onChange={handleChange}
          value={values.password}
          required
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
      <span className="text-red-600 dark:text-red-300">{errors.password}</span>
    </div>
  );
};

memo(InputPassword);
