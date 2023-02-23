import clsx from "clsx";
import { TidakAda } from "~/components/atoms";

const Listarchive = ({ archive, handleDeleteArchive, handleUndoArchive }) => {
  return (
    <>
      {archive.length ? (
        <div className="mt-6 grid w-full grid-cols-1 grid-rows-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {archive.map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer flex-col items-start justify-start rounded-md bg-gray-50 p-4 shadow-md transition duration-200 hover:scale-105 dark:bg-gray-800"
            >
              <p className="mb-1 font-bold">Id: {item.id}</p>
              <p className="mb-1 font-bold">Judul: {item.judul}</p>
              <p className="mb-1 font-bold">Tanggal: {item.createdAt}</p>
              <p className="mb-1 font-bold">
                Keterangan: <span className="font-medium">{item.keterangan}</span>
              </p>
              <div className="mt-2 flex gap-4">
                <button
                  onClick={() =>
                    handleDeleteArchive(item.id, item.judul, item.keterangan, item.createdAt)
                  }
                  className="rounded-md bg-rose-400 px-4 py-2 font-bold text-white transition-all ease-in-out hover:bg-rose-500"
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

export default Listarchive;
