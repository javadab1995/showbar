import { useState } from "react";
import { Link } from "react-router-dom";
import { Archive, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {
  useArchivePost,
  useDeletePost,
} from "../../../hooks/admin/usePostActions";
import { useTheme } from "../../../hooks/other/useTheme";
import { Modal } from "../../ui/Modal";

interface PostActionsProps {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
}

type ActionType = "archive" | "delete" | null;

export default function PostActions({ id, title, status }: PostActionsProps) {
  const [open, setOpen] = useState(false);
    const [pendingAction, setPendingAction] =
    useState<ActionType>(null);
    const { themeRoot } = useTheme();

  const archiveMutation = useArchivePost();
  const deleteMutation = useDeletePost();

  const isPending = archiveMutation.isPending || deleteMutation.isPending;

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);

  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
  });

  const role = useRole(context, {
    role: "menu",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  function handleConfirm() {
    if (pendingAction === "archive") {
      archiveMutation.mutate(id, {
        onSettled: () => setPendingAction(null),
      });
      return;
    }

    if (pendingAction === "delete") {
      deleteMutation.mutate(id, {
        onSettled: () => setPendingAction(null),
      });
    }
  }

  function handleCloseModal() {
    if (isPending) return;
    setPendingAction(null);
  }

  const modalContent = {
    archive: {
      title: "انتقال مطلب به آرشیو",
      description: `مطلب «${title}» به آرشیو منتقل شود؟`,
      confirmLabel: "انتقال به آرشیو",
      confirmClass: "bg-warning text-white hover:bg-warning/90",
      Icon: Archive,
    },
    delete: {
      title: "حذف دائمی مطلب",
      description: `مطلب «${title}» برای همیشه حذف شود؟ این عملیات قابل بازگشت نیست.`,
      confirmLabel: "حذف دائمی",
      confirmClass: "bg-danger text-white hover:opacity-90",
      Icon: Trash2,
    },
  };

  const currentModal = pendingAction ? modalContent[pendingAction] : null;

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        aria-label={`عملیات مطلب ${title}`}
        disabled={isPending}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-2 transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...getReferenceProps()}
      >
        <MoreHorizontal size={20} />
      </button>

      {open && (
        <FloatingPortal root={themeRoot}>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              dir="rtl"
              className="z-9999 min-w-44 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-lg"
              {...getFloatingProps()}
            >
              <Link
                to={`/admin/posts/${id}/edit`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-2
                    transition hover:bg-text/5"
              >
                <Pencil size={16} />
                ویرایش مطلب
              </Link>

              {status !== "archived" && (
                <button
                  type="button"
                  role="menuitem"
                  disabled={isPending}
                  onClick={() => {
                    setOpen(false);
                    setPendingAction("archive");
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-right text-sm text-text-2
                    transition hover:bg-text/5"
                >
                  <Archive size={16} />
                  انتقال به آرشیو
                </button>
              )}

              <button
                type="button"
                role="menuitem"
                disabled={isPending}
                onClick={() => {
                  setOpen(false);
                  setPendingAction("delete");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-right text-sm text-danger transition hover:bg-danger/20 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950/30"
              >
                <Trash2 size={16} />
                حذف دائمی
              </button>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}

      <Modal
        open={pendingAction !== null}
        title={currentModal?.title ?? ""}
        onClose={handleCloseModal}
      >
        {currentModal && (
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div
                className={`
                  flex size-11 shrink-0 items-center
                  justify-center rounded-xl
                  ${
                    pendingAction === "delete"
                      ? "bg-red-100 text-danger dark:bg-red-950/40"
                      : "bg-warning/10 text-warning"
                  }
                `}
              >
                <currentModal.Icon size={22} />
              </div>

              <div className="space-y-1">
                <p className="text-sm leading-7 text-text">
                  {currentModal.description}
                </p>

                {pendingAction === "delete" && (
                  <p className="text-xs leading-6 text-danger">
                    این عملیات قابل بازگشت نیست.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                disabled={isPending}
                onClick={handleCloseModal}
                className="
                  rounded-lg border border-border
                  px-4 py-2 text-sm text-text-2
                  transition hover:bg-surface-2
                  disabled:opacity-50
                "
              >
                انصراف
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={handleConfirm}
                className={`
                  rounded-lg px-4 py-2
                  text-sm font-medium transition
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  ${currentModal.confirmClass}
                `}
              >
                {isPending ? "در حال انجام..." : currentModal.confirmLabel}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
