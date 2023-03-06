import clsx from "clsx";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { TidakAda } from "~/components/atoms";
import { CustomButton } from "../atoms/CustomButton";

const ListNotes = ({ filteredNotes, handleDeleteNotes, handleArchive, filterSearch }) => {
  return (
    <>
      {filteredNotes.length ? (
        <div
          className={clsx(
            "mt-6 grid w-fit",
            "grid-cols-1 grid-rows-1 gap-6",
            "md:w-full md:grid-cols-2",
            "lg:grid-cols-3"
          )}
        >
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={clsx(
                "flex w-full cursor-pointer flex-col items-start justify-start",
                "rounded-md bg-gray-50",
                "p-4 shadow-md transition duration-200",
                "hover:scale-105",
                "dark:bg-gray-800"
              )}
            >
              <div className="h-full w-full">
                <p className="mb-1 font-semibold">
                  ID: <span className="font-normal">{note.id}</span>
                </p>
                <p className="mb-1 font-semibold">
                  Judul:{" "}
                  <span className="font-normal">
                    {filterSearch
                      ? reactStringReplace(note.judul, filterSearch, (match, index) => (
                          <span key={index + 1} className="text-yellow-500">
                            {match}
                          </span>
                        ))
                      : note.judul}
                  </span>
                </p>
                <p className="mb-1 font-semibold">
                  Tanggal: <span className="font-normal">{note.createdAt}</span>
                </p>
                <p className="mb-1 font-semibold">
                  Keterangan: <span className="font-normal">{note.keterangan}</span>
                </p>
              </div>
              <div className="mt-2 flex w-full items-end justify-end space-x-4">
                <CustomButton
                  onClick={() => handleDeleteNotes(note.id)}
                  className={clsx("bg-rose-400", "hover:bg-rose-500")}
                >
                  Delete
                </CustomButton>
                <Link to={`/update-note/${note.id}`}>
                  <CustomButton className={clsx("bg-slate-500", "hover:bg-slate-600")}>
                    Update
                  </CustomButton>
                </Link>
                <CustomButton
                  onClick={() =>
                    handleArchive(note.id, note.judul, note.keterangan, note.createdAt)
                  }
                  className={clsx("bg-blue-500", "hover:bg-blue-600")}
                >
                  Archive
                </CustomButton>
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
