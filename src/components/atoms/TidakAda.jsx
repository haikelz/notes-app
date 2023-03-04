import { memo } from "react";

export const TidakAda = ({ desc }) => {
  return (
    <div className="mt-6 flex flex-col items-center justify-center text-center">
      <img src="/img/tidak-ada.svg" alt="Tidak ada catatan" width="250px" height="250px" />
      <p className="text-xl font-semibold">{desc}</p>
    </div>
  );
};

memo(TidakAda);
