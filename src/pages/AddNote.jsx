import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import FormInput from "~/components/molecules/formInput";
import { generateRandomId } from "~/lib/helpers/generateRandomId";
import { showFormattedDate } from "~/lib/utils/data";
import supabase from "~/lib/utils/supabase";

const limitCharAtom = atom(`Sisa Karakter: ${50}`);
const formDataAtom = atom({ judul: "", keterangan: "" });

const AddNote = () => {
  const navigate = useNavigate();

  const [limitChar, setLimitChar] = useAtom(limitCharAtom);
  const [formData, setFormData] = useAtom(formDataAtom);

  const handleChange = (event) => {
    const data = { ...formData };
    data[event.target.name] = event.target.value;

    setFormData(data);
  };

  const handleChangeJudul = (event) => {
    const data = { ...formData };
    data[event.target.name] = event.target.value.slice(0, 50);

    if (event.target.value.length >= 0 && event.target.value.length <= 50)
      setLimitChar(`Sisa Karakter: ${50 - event.target.value.length}`);
    else setLimitChar("Karakter melebihi batas!");

    setFormData(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = await supabase.from("dicoding-notes").insert([
        {
          id: generateRandomId,
          judul: formData.judul,
          keterangan: formData.keterangan,
          createdAt: showFormattedDate(),
        },
      ]);

      if (error) throw error;

      // jika datanya muncul, maka navigate user ke halaman /home
      setFormData({ judul: "", keterangan: "" });
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="mt-5 flex w-full flex-col items-center justify-center">
      <h1 className="text-center text-3xl font-semibold">Add Note</h1>
      <FormInput
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        limitChar={limitChar}
        handleChangeJudul={handleChangeJudul}
        desc="Add Note"
      />
    </section>
  );
};

export default AddNote;
