import { useEffect, useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

interface PostCoverFieldProps {
  currentImageUrl?: string | null;
  file: File | null;
  onFileChange: (file: File | null) => void;
  removeCurrent: boolean;
  onRemoveCurrentChange: (remove: boolean) => void;
  error?: string;
  disabled?: boolean;
  onError: (message: string) => void;
}

export default function PostCoverField({
  currentImageUrl,
  file,
  onFileChange,
  removeCurrent,
  onRemoveCurrentChange,
  error,
    disabled = false,
  onError
}: PostCoverFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

function handleFileChange(selectedFile?: File) {
  if (!selectedFile) return;

  if (!["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type)) {
    onError("فرمت تصویر باید JPG، PNG یا WebP باشد.");
    return;
  }

  if (selectedFile.size > 10 * 1024 * 1024) {
    onError("حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد.");
    return;
  }

  onError("");
  onFileChange(selectedFile);
  onRemoveCurrentChange(false);
}
  function cancelNewImage() {
    onFileChange(null);
  }

  function removeExistingImage() {
    onRemoveCurrentChange(true);
    onFileChange(null);
  }

  const displayedImage =
    previewUrl || (!removeCurrent ? currentImageUrl : null);

  return (
    <section className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <ImagePlus size={19} className="text-primary" />
        <h2 className="font-semibold">تصویر کاور</h2>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          handleFileChange(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {displayedImage ? (
        <div className="relative">
          <img
            src={displayedImage}
            alt="پیش‌نمایش تصویر کاور"
            className="aspect-video w-full rounded-lg border border-border object-cover"
          />

          <button
            type="button"
            disabled={disabled}
            onClick={file ? cancelNewImage : removeExistingImage}
            aria-label={file ? "لغو تصویر جدید" : "حذف تصویر فعلی"}
            className="absolute left-2 top-2 flex h-9 w-9 items-center justify-center rounded-lg bg-black/70 text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-surface-2 text-text-2 transition hover:border-primary hover:text-primary disabled:opacity-50"
        >
          <Upload size={26} />
          <span className="text-sm font-medium">انتخاب تصویر</span>
          <span className="text-xs text-muted">
            JPG، PNG یا WebP، حداکثر ۱۰ مگابایت
          </span>
        </button>
      )}

      {displayedImage && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text-2 hover:bg-surface-2 disabled:opacity-50"
        >
          تغییر تصویر
        </button>
      )}

      {error && (
        <p role="alert" className="text-sm leading-6 text-danger">
          {error}
        </p>
      )}
    </section>
  );
}
