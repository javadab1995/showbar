type LoadDescriptionProps = {
  description: string | null;
};

export function LoadDescription({ description }: LoadDescriptionProps) {
  return (
    <section
      className="
        rounded-xl
        border
        border-border
        bg-surface
      "
    >
      <div
        className="
          border-b
          border-border
          px-5
          py-4
        "
      >
        <h2
          className="
            text-sm
            font-semibold
            text-text
          "
        >
          توضیحات
        </h2>
      </div>

      <div className="p-5">
        {description ? (
          <p
            className="
              text-sm
              leading-7
              text-text-2
            "
          >
            {description}
          </p>
        ) : (
          <p
            className="
              text-sm
              text-text-2
            "
          >
            توضیح خاصی برای این بار ثبت نشده است.
          </p>
        )}
      </div>
    </section>
  );
}
