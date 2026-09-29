import { useEffect } from "react";

import { Bell, X } from "lucide-react";

import { toast } from "react-hot-toast";

import supabase from "../../services/supabase";

type NotificationPayload = {
  id: string;
  request_id: string;
  load_id: string;
  name: string;
  phone: string;
  status: string;
};

export default function RealtimeNotificationToast() {
  useEffect(() => {
   

    const channel = supabase
      .channel("admin-load-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "load_notifications",
        },
        async (payload) => {
     

          const notification = payload.new as NotificationPayload;

       
          const toastId = toast.custom(
            (t) => (
              <div
                className={`
                  w-90
                  max-w-[calc(100vw-32px)]
                  rounded-2xl
                  p-4
                  shadow-xl
                  transition-all
                  duration-200
                  ${
                    t.visible
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-2 opacity-0"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      size-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary-soft
                      text-primary
                    "
                  >
                    <Bell size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-text">
                        درخواست بار جدید
                      </p>

                      <button
                        type="button"
                        onClick={() => toast.dismiss(t.id)}
                        className="
                          text-muted
                          transition
                          hover:text-text
                        "
                      >
                        <X size={17} />
                      </button>
                    </div>

                    <p className="mt-1 text-sm text-text-2">
                      {notification.name} برای یک بار درخواست ثبت کرده است.
                    </p>

                    <p className="mt-2 text-xs text-muted">
                      در حال دریافت اطلاعات بار...
                    </p>
                  </div>
                </div>
              </div>
            ),
            {
              duration: Infinity,
              position: "top-right",
            },
          );

       


          const { data: load, error } = await supabase
            .from("loads")
            .select("origin, destination")
            .eq("id", notification.load_id)
            .single();

          console.log("Load query result:", {
            load,
            error,
          });

          if (load) {
            toast.custom(
              (t) => (
                <div
                  className="
                    w-90
                    max-w-[calc(100vw-32px)]
                    rounded-2xl
                   
                    bg-surface
                    p-4
                    shadow-xl
                  "
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        flex
                        size-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-primary-soft
                        text-primary
                      "
                    >
                      <Bell size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-text">
                          درخواست بار جدید
                        </p>

                        <button
                          type="button"
                          onClick={() => toast.dismiss(t.id)}
                          className="
                            text-muted
                            transition
                            hover:text-text
                          "
                        >
                          <X size={17} />
                        </button>
                      </div>

                      <p className="mt-1 text-sm text-text-2">
                        {notification.name} برای یک بار درخواست ثبت کرده است.
                      </p>

                      <p className="mt-2 text-xs text-muted">
                        {load.origin}

                        <span className="mx-1">←</span>

                        {load.destination}
                      </p>
                    </div>
                  </div>
                </div>
              ),
              {
                id: toastId,
                duration: Infinity,
                position: "top-right",
              },
            );
          }

          const audio = new Audio("../../public/sounds/notification.wav");

          audio.volume = 0.5;

          audio.play().catch((error) => {
            console.warn("امکان پخش صدای اعلان وجود ندارد:", error);
          });
        },
      )
      .subscribe((status, error) => {
       

        if (error) {
          console.error("Realtime error:", error);
        }
      });

    return () => {
      console.log("RealtimeNotificationToast cleanup");

      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
