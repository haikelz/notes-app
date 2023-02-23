export const showFormattedDate = () => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date().toLocaleDateString("id-ID", options);
};

export const initialDataNotes = [
  {
    id: "",
    judul: "",
    keterangan: "",
    createdAt: "",
  },
];
