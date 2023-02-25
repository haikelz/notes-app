import clsx from "clsx";
import { Link } from "react-router-dom";
import { TidakAda } from "~/components/atoms";

const ListNotes = ({ filteredNotes, handleDelete, handleArchive }) => {
  return (
    <>
      {filteredNotes.length ? (
        <div
          className={clsx(
            "mt-6 grid w-fit grid-cols-1 grid-rows-1 gap-6",
            "md:w-full md:grid-cols-2",
            "lg:grid-cols-3"
          )}
        >
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={clsx(
                "flex cursor-pointer flex-col items-start justify-start",
                "rounded-md bg-gray-50",
                "p-4 shadow-md transition duration-200",
                "hover:scale-105",
                "dark:bg-gray-800"
              )}
            >
              <div className="w-full">
                <p className="mb-1 font-bold">
                  ID: <span className="font-medium">{note.id}</span>
                </p>
                <p className="mb-1 font-bold">
                  Judul: <span className="font-medium">{note.judul}</span>
                </p>
                <p className="mb-1 font-bold">
                  Tanggal: <span className="font-medium">{note.createdAt}</span>
                </p>
                <p className="mb-1 font-bold">
                  Keterangan: <span className="font-medium">{note.keterangan}</span>
                </p>
              </div>
              <div className="mt-2 flex w-full items-end justify-end space-x-4">
                <button
                  onClick={() => handleDelete(note.id)}
                  className={clsx(
                    "rounded-md bg-rose-400",
                    "px-4 py-2",
                    "font-bold text-white",
                    "transition-all ease-in-out",
                    "hover:bg-rose-500"
                  )}
                >
                  Delete
                </button>
                <Link to={`/update-note/${note.id}`}>
                  <button
                    className={clsx(
                      "rounded-md bg-slate-500",
                      "px-4 py-2",
                      "font-bold text-white",
                      "transition-all ease-in-out",
                      "hover:bg-slate-600"
                    )}
                  >
                    Update
                  </button>
                </Link>
                <button
                  className={clsx(
                    "rounded-md bg-blue-500",
                    "px-4 py-2",
                    "font-bold text-white",
                    "transition-all ease-in-out",
                    "hover:bg-blue-600"
                  )}
                  onClick={() =>
                    handleArchive(note.id, note.judul, note.keterangan, note.createdAt)
                  }
                >
                  Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TidakAda desc="Belum ada catatan!" />
      )}
    </>
  );
};

export default ListNotes;
