import clsx from "clsx";

export const SearchNote = ({ filterSearch, setFilterSearch }) => {
  return (
    <input
      type="text"
      placeholder="Cari berdasarkan judul...."
      value={filterSearch}
      onChange={(event) => setFilterSearch(event.target.value)}
      className={clsx(
        "peer block appearance-none",
        "border-2 border-blue-500 bg-transparent",
        "p-3 py-2.5",
        "font-semibold text-gray-900",
        "focus:outline-none focus:ring-2 focus:ring-blue-600",
        "dark:text-white dark:focus:ring-blue-500"
      )}
    />
  );
};
