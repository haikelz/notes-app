import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "~/components/molecules/FormInput";
import { useTitle } from "~/hooks/useTitle";
import { useUser } from "~/hooks/useUser";
import { showFormattedDate } from "~/lib/utils/data";
import supabase from "~/lib/utils/supabase";

const previousNoteAtom = atom([{ id: "", judul: "", keterangan: "", createdAt: "" }]);
const formDataAtom = atom({ judul: "", keterangan: "" });
const limitCharAtom = atom(`Sisa Karakter: ${50}`);

const UpdateNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [, setPreviousNote] = useAtom(previousNoteAtom);
  const [formData, setFormData] = useAtom(formDataAtom);
  const [limitChar, setLimitChar] = useAtom(limitCharAtom);
  const [isAuthenticated] = useUser();

  const handleChange = (event) => {
    const data = { ...formData };
    data[event.target.name] = event.target.value;

    setFormData(data);
  };

  const handleChangeJudul = (event) => {
    const data = { ...formData };
    data[event.target.name] = event.target.value.slice(0, 50);

    if (event.target.value.length >= 0 && event.target.value.length <= 50) {
      setLimitChar(`Sisa Karakter: ${50 - event.target.value.length}`);
    } else setLimitChar("Karakter melebihi batas!");

    setFormData(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = await supabase
        .from("dicoding-notes")
        .update({
          id: id,
          judul: formData.judul,
          keterangan: formData.keterangan,
          createdAt: showFormattedDate(),
        })
        .eq("id", id);

      if (error) throw error;

      setFormData({ judul: "", keterangan: "" });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useTitle("Update Note");

  useEffect(() => {
    const getPreviousNoteFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("dicoding-notes")
          .select()
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) setFormData({ judul: data.judul, keterangan: data.keterangan });
      } catch (err) {
        console.error(err);
      }
    };

    getPreviousNoteFromSupabase();
  }, [setPreviousNote, id]);

  return (
    <>
      {isAuthenticated ? (
        <section className="mt-5 flex w-full flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-semibold">Update Note</h1>
          <FormInput
            handleSubmit={handleSubmit}
            limitChar={limitChar}
            formData={formData}
            handleChangeJudul={handleChangeJudul}
            handleChange={handleChange}
            desc="Update Note"
          />
        </section>
      ) : null}
    </>
  );
};

export default UpdateNote;
