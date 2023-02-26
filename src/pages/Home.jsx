import { atom, useAtom } from "jotai";
import { Suspense, lazy, useEffect } from "react";
import ListArchive from "~/components/organisms/ListArchive";
import ListNotes from "~/components/organisms/ListNotes";
import Navbar from "~/components/organisms/Navbar";
import { deleteData } from "~/lib/helpers/deleteData";
import { insertData } from "~/lib/helpers/insertData";
import { useTitle } from "~/hooks/useTitle";
import { useUser } from "~/hooks/useUser";
import { initialDataNotes } from "~/lib/utils/data";
import supabase from "~/lib/utils/supabase";

const Loading = lazy(() => import("~/components/organisms/Loading"));

const filterSearchAtom = atom("");
const notesAtom = atom(initialDataNotes);
const archiveAtom = atom([{ id: "", judul: "", keterangan: "", createdAt: "" }]);

const Home = () => {
  const [notes, setNotes] = useAtom(notesAtom);
  const [filterSearch, setFilterSearch] = useAtom(filterSearchAtom);
  const [archive, setArchive] = useAtom(archiveAtom);
  const [isAuthenticated] = useUser();

  const handleDeleteNotes = (id) => {
    const localNotes = [...notes];
    const filteredLocalNotes = localNotes.filter((note) => note.id !== id);

    setNotes(filteredLocalNotes);
    deleteData("dicoding-notes", id);
  };

  const handleDeleteArchive = (id) => {
    const localArchive = [...archive];
    const filteredLocalArchive = localArchive.filter((archive) => archive.id !== id);

    setArchive(filteredLocalArchive);
    deleteData("dicoding-archive", id);
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
    insertData("dicoding-archive", filteredLocalNotes);
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
    insertData("dicoding-notes", filteredLocalArchive);
  };

  const filteredNotes = notes.filter((note) => {
    if (filterSearch === "") return note;
    else if (note.judul.toLowerCase().includes(filterSearch.toLowerCase())) return note;
  });

  useTitle("Home");

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
    <Suspense fallback={<Loading />}>
      {isAuthenticated ? (
        <>
          <Navbar filterSearch={filterSearch} setFilterSearch={setFilterSearch} />
          <section className="mt-5 flex w-full flex-col items-center justify-center px-4">
            <div className="w-full">
              <h2 className="text-center text-3xl font-bold">Notes</h2>
              <ListNotes
                filteredNotes={filteredNotes}
                handleDelete={handleDeleteNotes}
                handleArchive={handleArchive}
              />
            </div>
            <div className="mt-10 w-full">
              <h2 className="text-center text-3xl font-bold">Archive</h2>
              <ListArchive
                archive={archive}
                handleDeleteArchive={handleDeleteArchive}
                handleUndoArchive={handleUndoArchive}
              />
            </div>
          </section>
        </>
      ) : null}
    </Suspense>
  );
};

export default Home;
