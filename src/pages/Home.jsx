import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import Listarchive from "~/components/organisms/listArchive";
import ListNotes from "~/components/organisms/listNotes";
import Header from "~/components/organisms/navbar";
import Layout from "~/components/templates/layout";
import { useDeleteData } from "~/hooks/useDeleteData";
import { useInsertData } from "~/hooks/useInsertData";
import { initialDataNotes } from "~/utils/data";
import supabase from "~/utils/supabase";

const filterSearchAtom = atom("");
const notesAtom = atom(initialDataNotes);
const archiveAtom = atom([{ id: "", judul: "", keterangan: "", createdAt: "" }]);

const Home = () => {
  const [notes, setNotes] = useAtom(notesAtom);
  const [filterSearch, setFilterSearch] = useAtom(filterSearchAtom);
  const [archive, setArchive] = useAtom(archiveAtom);

  const handleDeleteNotes = (id) => {
    const localNotes = [...notes];
    const filteredLocalNotes = localNotes.filter((note) => note.id !== id);

    setNotes(filteredLocalNotes);
    useDeleteData("dicoding-notes", id);
  };

  const handleDeleteArchive = (id) => {
    const localArchive = [...archive];
    const filteredLocalArchive = localArchive.filter((archive) => archive.id !== id);

    setArchive(filteredLocalArchive);
    useDeleteData("dicoding-archive", id);
  };

  const handleArchive = (id, judul, keterangan, createdAt) => {
    const localNotes = [...notes];

    // dapetin element yang dihapus dari notes
    const filteredLocalNotes = localNotes.filter((note) => note.id === id);

    const localArchive = [...archive];
    localArchive.push({ id: id, judul: judul, keterangan: keterangan, createdAt: createdAt });

    handleDeleteNotes(id);
    setArchive(localArchive);

    // kemudian, tambahin elemen yang dihapus dari note tadi ke table dicoding-archive
    useInsertData("dicoding-archive", filteredLocalNotes);
  };

  const handleUndoArchive = (id, judul, keterangan, createdAt) => {
    const localArchive = [...archive];
    const filteredLocalArchive = localArchive.filter((arc) => arc.id === id);

    const localNotes = [...notes];
    localNotes.push({
      id: id,
      judul: judul,
      keterangan: keterangan,
      createdAt: createdAt,
    });

    handleDeleteArchive(id);
    setNotes(localNotes);
    useInsertData("dicoding-notes", filteredLocalArchive);
  };

  const filteredNotes = notes.filter((note) => {
    if (filterSearch === "") return note;
    else if (note.judul.toLowerCase().includes(filterSearch.toLowerCase())) return note;
  });

  useEffect(() => {
    const getNotesFromSupabase = async () => {
      try {
        const { data, error } = await supabase.from("dicoding-notes").select();

        if (error) throw error;
        if (data) setNotes(data);
      } catch (err) {
        console.error(err);
      }
    };

    const getArchiveFromSupabase = async () => {
      try {
        const { data, error } = await supabase.from("dicoding-archive").select();

        if (error) throw error;
        if (data) setArchive(data);
      } catch (err) {
        console.error(err);
      }
    };

    getNotesFromSupabase();
    getArchiveFromSupabase();
  }, [setNotes, setArchive]);

  return (
    <Layout>
      <Header filterSearch={filterSearch} setFilterSearch={setFilterSearch} />
      <div className="mt-5 flex w-full flex-col items-center justify-center px-4">
        <div className="w-full">
          <h2 className="text-center text-3xl font-bold">Notes</h2>
          <ListNotes
            filteredNotes={filteredNotes}
            handleDelete={handleDeleteNotes}
            handleArchive={handleArchive}
          />
        </div>
        <div className="mt-10 flex w-full flex-col items-center justify-center">
          <h2 className="text-center text-3xl font-bold">Archive</h2>
          <Listarchive
            archive={archive}
            handleDeleteArchive={handleDeleteArchive}
            handleUndoArchive={handleUndoArchive}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;