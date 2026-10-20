const MAX_INPUT_SIZE = 10 * 1024 * 1024;
const MAX_OUTPUT_SIZE = 5 * 1024 * 1024;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 800;
const WEBP_QUALITY = 0.8;

export async function optimizeImage(file: File): Promise<File> {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("فرمت تصویر باید JPG، PNG یا WebP باشد.");
  }

  if (file.size > MAX_INPUT_SIZE) {
    throw new Error("حجم تصویر اصلی نباید بیشتر از ۱۰ مگابایت باشد.");
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.src = objectUrl;

    await image.decode();

    const { naturalWidth, naturalHeight } = image;

    if (!naturalWidth || !naturalHeight) {
      throw new Error("ابعاد تصویر قابل تشخیص نیست.");
    }

    const scale = Math.min(
      1,
      MAX_WIDTH / naturalWidth,
      MAX_HEIGHT / naturalHeight,
    );

    const width = Math.max(1, Math.round(naturalWidth * scale));
    const height = Math.max(1, Math.round(naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("مرورگر امکان پردازش تصویر را فراهم نکرد.");
    }

    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error("تبدیل تصویر به WebP ناموفق بود."));
          }
        },
        "image/webp",
        WEBP_QUALITY,
      );
    });

    // بعضی مرورگرها ممکن است خروجی درخواستی را پشتیبانی نکنند.
    if (blob.type !== "image/webp") {
      throw new Error("مرورگر نتوانست تصویر را به WebP تبدیل کند.");
    }

    if (blob.size > MAX_OUTPUT_SIZE) {
      throw new Error(
        "حجم تصویر پس از بهینه‌سازی هنوز بیشتر از ۵ مگابایت است.",
      );
    }

    const originalName = file.name.replace(/\.[^.]+$/, "");

    return new File([blob], `${originalName || "cover"}.webp`, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("پردازش تصویر ناموفق بود.");
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
