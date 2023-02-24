import clsx from "clsx";
import { Link } from "react-router-dom";
import { TidakAda } from "~/components/atoms";

const ListArchive = ({ archive, handleDeleteArchive, handleUndoArchive }) => {
  return (
    <>
      {archive.length ? (
        <div
          className={clsx(
            "mt-6 grid w-fit",
            "grid-cols-1 grid-rows-1 gap-6",
            "md:w-full md:grid-cols-2",
            "lg:grid-cols-3"
          )}
        >
          {archive.map((item) => (
            <div
              key={item.id}
              className={clsx(
                "flex cursor-pointer flex-col items-start justify-start",
                "rounded-md bg-gray-50 p-4",
                "shadow-md transition duration-200",
                "hover:scale-105",
                "dark:bg-gray-800"
              )}
            >
              <div className="w-full">
                <p className="mb-1 font-bold">
                  ID: <span className="font-medium">{item.id}</span>
                </p>
                <p className="mb-1 font-bold">
                  Judul: <span className="font-medium">{item.judul}</span>
                </p>
                <p className="mb-1 font-bold">
                  Tanggal: <span className="font-medium">{item.createdAt}</span>
                </p>
                <p className="mb-1 font-bold">
                  Keterangan: <span className="font-medium">{item.keterangan}</span>
                </p>
              </div>
              <div className="mt-2 flex w-full items-end justify-end space-x-4">
                <button
                  onClick={() =>
                    handleDeleteArchive(item.id, item.judul, item.keterangan, item.createdAt)
                  }
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
                <button
                  className={clsx(
                    "rounded-md bg-blue-500",
                    "px-4 py-2",
                    "font-bold text-white",
                    "transition-all ease-in-out",
                    "hover:bg-blue-600"
                  )}
                  onClick={() =>
                    handleUndoArchive(item.id, item.judul, item.keterangan, item.createdAt)
                  }
                >
                  Undo
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TidakAda desc="Belum ada arsip!" />
      )}
    </>
  );
};

export default ListArchive;
