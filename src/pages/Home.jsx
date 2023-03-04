import { atom, useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import ListArchive from "~/components/organisms/ListArchive";
import ListNotes from "~/components/organisms/ListNotes";
import Modal from "~/components/organisms/Modal";
import Navbar from "~/components/organisms/Navbar";
import { useTitle } from "~/hooks/useTitle";
import { useUser } from "~/hooks/useUser";
import { deleteData } from "~/lib/helpers/deleteData";
import { insertData } from "~/lib/helpers/insertData";
import { initialDataNotes } from "~/lib/utils/data";
import supabase from "~/lib/utils/supabase";

const filterSearchAtom = atom("");
const notesAtom = atom(initialDataNotes);
const archiveAtom = atom([{ id: "", judul: "", keterangan: "", createdAt: "" }]);
const isOpenAtom = atom(false);
const isLoadingAtom = atom(false);

const Home = () => {
  const [notes, setNotes] = useAtom(notesAtom);
  const [filterSearch, setFilterSearch] = useAtom(filterSearchAtom);
  const [archive, setArchive] = useAtom(archiveAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [isAuthenticated] = useUser();
  const [, setIsLoading] = useAtom(isLoadingAtom);

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

  const filteredNotes = useMemo(
    () =>
      notes.filter((note) => {
        if (filterSearch === "") return note;
        else if (note.judul.toLowerCase().includes(filterSearch.toLowerCase())) return note;
      }),
    [filterSearch, notes]
  );

  useTitle("Home");

  useEffect(() => {
    const getNotesFromSupabase = async () => {
      try {
        const { data, error } = await supabase.from("dicoding-notes").select();

        if (error) throw error;
        if (data) setNotes(data);
        setIsLoading(false);
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
  }, [setNotes, setIsLoading, setArchive]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar
            filterSearch={filterSearch}
            setFilterSearch={setFilterSearch}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <section className="mt-10 flex w-full flex-col items-center justify-center px-4">
            <div className="flex w-full flex-col items-center justify-center">
              <h2 className="text-center text-3xl font-bold">Notes</h2>
              <ListNotes
                filteredNotes={filteredNotes}
                handleDeleteNotes={handleDeleteNotes}
                handleArchive={handleArchive}
                filterSearch={filterSearch}
              />
            </div>
            <div className="mt-10 flex w-full flex-col items-center justify-center">
              <h2 className="text-center text-3xl font-bold">Archive</h2>
              <ListArchive
                archive={archive}
                handleDeleteArchive={handleDeleteArchive}
                handleUndoArchive={handleUndoArchive}
              />
            </div>
          </section>
          {isOpen ? <Modal setIsOpen={setIsOpen} isOpen={isOpen} /> : null}
        </>
      ) : null}
    </>
  );
};

export default Home;
