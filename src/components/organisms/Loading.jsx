import { memo } from "react";
import { ProgressStatus } from "../atoms/ProgressStatus";

const Loading = () => {
  return (
    <section className="flex min-h-screen items-center justify-center space-x-1">
      <div role="status">
        <ProgressStatus />
      </div>
      <p className="text-xl font-semibold">Loading....</p>
    </section>
  );
};

export default memo(Loading);
