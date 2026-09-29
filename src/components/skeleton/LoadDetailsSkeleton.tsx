export function LoadDetailsSkeleton() {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-7xl
        animate-pulse
        space-y-5
        px-6
        py-6
      "
    >
      <div
        className="
          h-5
          w-24
          rounded
          bg-surface-2
        "
      />

      <div
        className="
          h-10
          w-72
          rounded-lg
          bg-surface-2
        "
      />

      <div
        className="
          grid
          gap-5
          lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]
        "
      >
        <div className="space-y-5">
          <div
            className="
              h-72
              rounded-xl
              border
              border-border
              bg-surface-2
            "
          />

          <div
            className="
              h-40
              rounded-xl
              border
              border-border
              bg-surface-2
            "
          />
        </div>

        <div
          className="
            h-96
            rounded-xl
            border
            border-border
            bg-surface-2
          "
        />
      </div>
    </div>
  );
}
