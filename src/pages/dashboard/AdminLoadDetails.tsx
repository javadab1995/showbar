import { useParams } from "react-router-dom";

import { useLoad } from "../../hooks/other/useLoad";
import { LoadDetailsSkeleton } from "../../components/skeleton/LoadDetailsSkeleton";
import { LoadDetailsHeader } from "../../components/headers/LoadDetailsHeader";
import { LoadInformation } from "../../components/ui/LoadInformation";
import { LoadDescription } from "../../components/ui/LoadDescription";
import { LoadRequests } from "../../components/features/loads/LoadRequests";


export function AdminLoadDetails() {
  const { id } = useParams();

  const { data: load, isLoading, isError, error } = useLoad(id);

  if (isLoading) {
    return <LoadDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div
        className="
          flex
          min-h-100
          items-center
          justify-center
          text-sm
          text-danger
        "
      >
        {error instanceof Error ? error.message : "خطا در دریافت اطلاعات بار"}
      </div>
    );
  }

  if (!load) {
    return (
      <div
        className="
          flex
          min-h-100
          items-center
          justify-center
          text-sm
          text-text-2
        "
      >
        بار موردنظر پیدا نشد.
      </div>
    );
  }

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-7xl
        px-6
        py-6
      "
    >
      <LoadDetailsHeader load={load} />

      <div
        className="
          grid
          gap-5
          lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]
        "
      >
        <div className="space-y-5">
          <LoadInformation load={load} />

          <LoadDescription description={load.description} />
        </div>

        <LoadRequests loadId={load.id} />
      </div>
    </div>
  );
}
