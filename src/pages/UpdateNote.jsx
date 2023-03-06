import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "~/components/molecules/FormInput";
import { useTitle } from "~/hooks/useTitle";
import { useUser } from "~/hooks/useUser";
import { showFormattedDate } from "~/lib/utils/data";
import supabase from "~/lib/utils/supabase";

const formDataAtom = atom({ judul: "", keterangan: "" });
const limitCharAtom = atom(`Sisa Karakter: ${50}`);

const UpdateNote = () => {
  const { id } = useParams();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useAtom(formDataAtom);
  const [limitChar, setLimitChar] = useAtom(limitCharAtom);

  const handleChange = (event) => {
    const data = { ...formData };
    data[event.target.name] = event.target.value;

    setFormData(data);
  };

  /**
   * set limit character for user input. Max character: 50
   * @param event
   */
  const handleChangeJudul = (event) => {
    const data = { ...formData };
    data[event.target.name] = event.target.value.slice(0, 50);

    if (event.target.value.length >= 0 && event.target.value.length <= 50) {
      setLimitChar(`Sisa Karakter: ${50 - event.target.value.length}`);
    } else setLimitChar("Karakter melebihi batas!");

    setFormData(data);
  };

  /**
   * Logic for submitting updated note to supabase
   * @param event
   */
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

  // for dynamic title
  useTitle("Update Note");

  useEffect(() => {
    /**
     * Get note that want to be updated by user
     */
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
  }, [setFormData, id]);

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
