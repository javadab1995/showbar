import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/buttons/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { useBasket } from "../../contexts/BasketContext";
import GoToLoads from "../../components/buttons/GoToLoads";
import { useQuery } from "@tanstack/react-query";
import { getLoadsByIds } from "../../services/apiLoads";

import BasketList from "../../components/lists/BasketList";
import { toPersianDigits } from "../../helpers/number";
import Spinner from "../../components/widgets/Spinner";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";

export default function Basket() {
  const { basket } = useBasket();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();


  const {
    data: items = [],
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["basket-loads", basket],
    queryFn: () => getLoadsByIds(basket),
    enabled: basket.length > 0,
    retry: 0
  });



  if (!basket.length) {
    return (
      <section className="min-h-[calc(100vh-4rem)] bg-bg p-6">
        <div className="mx-auto">
          {/* Page header */}
          <header className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              سبد بار
            </h1>

            <p className="mt-2 text-sm leading-6 text-text-2">
              بارهای موردنظر خود را برای ثبت درخواست انتخاب کنید.
            </p>
          </header>

          {/* Empty state */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow)">
            <EmptyState
              title="هنوز باری انتخاب نکرده‌اید."
              text="بارهای موردنظر را بررسی کنید و گزینه‌های مناسب را به سبد اضافه کنید."
              action={
                <Link
                  to="/loads"
                  className="
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-primary
                    px-5
                    text-sm
                    font-semibold
                    text-surface
                    transition-all
                    duration-150
                    hover:bg-primary-dark
                    active:scale-[0.98]
                  "
                >
                  مشاهده بارها
                </Link>
              }
            />
          </div>
        </div>
      </section>
    );
  }


  if (isPending) {
    return (
      <div className="flex flex-col justify-center h-screen items-center gap-">
        {" "}
        <Spinner /> <span>در حال بارگیری درخواست ها</span>
      </div>
    );
  }
 if (isError) {
   return (
     <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
       <div className="max-w-md">
         <h3 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
           {isOnline
             ? "دریافت اطلاعات بارها با خطا مواجه شد."
             : "اتصال به اینترنت برقرار نیست."}
         </h3>

         <p className="mt-3 text-sm text-text-2">
           {isOnline
             ? "لطفاً کمی بعد دوباره تلاش کنید."
             : "برای مشاهده اطلاعات بارهای سبد، اتصال اینترنت خود را بررسی کنید."}
         </p>

         <div className="mt-6 flex justify-center gap-3">
           <Button type="button" onClick={() => window.location.reload()}>
             تلاش مجدد
           </Button>

           <Button
             type="button"
             variant="secondary"
             onClick={() => navigate("/loads")}
           >
             مشاهده بارها
           </Button>
         </div>
       </div>
     </div>
   );
 }
  
  return (
    <section
      dir="rtl"
      className="
        min-h-[calc(100vh-4rem)]
        bg-bg
        
        px-6
        
        py-20
      "
    >
      <div className="mx-auto ">
        {/* Header */}
        <header className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="sm:block hidden my-4">
              <GoToLoads to="/loads" />
            </div>
            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                text-text
                sm:text-3xl
              "
            >
              سبد بار
            </h1>

            <p className="mt-2 text-sm text-text-2">
              {toPersianDigits(+items.length)} بار برای ثبت درخواست انتخاب شده
              است.
            </p>
          </div>
        </header>

        {/* Basket items */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-border
            bg-surface
            shadow-(--shadow)
          "
        >
          {items.map((load) => (
            <BasketList key={load.id} load={load} />
          ))}
        </div>

        {/* CTA */}
        <div
          className="
            mt-5
            overflow-hidden
            rounded-2xl
            border
            border-border
            bg-surface
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-6
              lg:p-7
            "
          >
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-text">
                آماده ثبت درخواست هستید؟
              </h2>

              <p className="mt-1.5 max-w-xl text-sm leading-6 text-text-2">
                ادمین پس از بررسی، یکی از بارهای موجود را برای شما اختصاص
                می‌دهد.
              </p>
            </div>

            <Button
              className="text-sm  max-w-48  flex justify-center items-center gap-1.5 cursor-pointer rounded-md font-medium hover:opacity-90 transition-opacity   text-surface p-2.5 bg-primary-radial "
              onClick={() => navigate("/request")}
            >
              درخواست یکی از این بارها
            </Button>
          </div>
        </div>

        {/* Mobile back link */}
        <div className="block sm:hidden">
          <GoToLoads to="/loads" />
        </div>
      </div>
    </section>
  );
}
