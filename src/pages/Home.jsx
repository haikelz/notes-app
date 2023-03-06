import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { profileAtom } from "~/store";

const filterSearchAtom = atom("");
const notesAtom = atom(initialDataNotes);
const archiveAtom = atom([{ id: "", judul: "", keterangan: "", createdAt: "" }]);
const isOpenAtom = atom(false);
const isLoadingAtom = atom(false);
const isSignOutAtom = atom(false);

const Home = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useAtom(notesAtom);
  const [filterSearch, setFilterSearch] = useAtom(filterSearchAtom);
  const [archive, setArchive] = useAtom(archiveAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [isSignOut, setIsSignOut] = useAtom(isSignOutAtom);
  const [profile] = useAtom(profileAtom);

  const { isAuthenticated, userData } = useUser();

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
    const localNotes = [...notes];
    const filteredLocalArchive = localArchive.filter((arc) => arc.id === id);

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

  const handleDeleteUser = async () => {
    const { error } = await supabase.auth.admin.deleteUser(userData.user.id);

    if (error) throw error;
    navigate("/signin", { replace: true });
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
        if (data) {
          setNotes(data);
          setIsLoading(false);
        }
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

    if (isSignOut) {
      const signOut = async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;

          window.location.reload(true);
          navigate("/signin", { replace: true });
        } catch (err) {
          console.error(err);
        }
      };
      signOut();
    }

    getNotesFromSupabase();
    getArchiveFromSupabase();
  }, [setNotes, setIsLoading, setArchive, isSignOut]);

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
          {isOpen ? (
            <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
              <div className="flex flex-col items-center justify-center">
                <img
                  className={clsx("h-56 w-56 rounded-full bg-red-300 p-1", "dark:bg-yellow-300")}
                  src={profile.avatar ? profile.avatar : "/img/default-user-image.png"}
                  alt="user avatar"
                  loading="lazy"
                />
                <div className="flex flex-col items-center justify-center p-3">
                  <div className="text-center">
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {profile.fullname ? profile.fullname : "Anonymous"}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {profile.email}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className={clsx(
                        "mt-4 w-fit rounded-md bg-slate-500",
                        "py-2 px-3.5 font-semibold text-white",
                        "transition-all ease-in-out",
                        "hover:bg-slate-600"
                      )}
                      type="button"
                      aria-label="logout"
                      onClick={() => setIsSignOut(true)}
                    >
                      Logout
                    </button>
                    <button
                      className={clsx(
                        "mt-4 w-fit rounded-md bg-blue-500",
                        "py-2 px-3.5 font-semibold text-white",
                        "transition-all ease-in-out",
                        "hover:bg-blue-600"
                      )}
                      type="button"
                      aria-label="delete account"
                      onClick={handleDeleteUser}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Home;
