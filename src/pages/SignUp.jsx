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

const SignUp = () => {
  const [isSent, setIsSent] = useAtom(isSentAtom);
  const [identities, setIdentities] = useAtom(identitiesAtom);
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
        if (data) {
          setIsSent(true);
          setIdentities(data.user.identities);
        }
        console.log(data);
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
            <Modal isOpen={isSent} setIsOpen={setIsSent}>
              <div className="mt-3 flex flex-col items-center justify-center text-center">
                {identities.length ? (
                  <p>Berhasil! Silahkan cek Email mu ya</p>
                ) : (
                  <p>
                    Alamat Email yang kamu masukkan sudah terdaftar! Pastikan Email kamu belum
                    pernah didaftarkan kesini!
                  </p>
                )}
              </div>
            </Modal>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default SignUp;
