type TrackTab = "form" | "history";

type Props = {
  activeTab: TrackTab;
  onChange: (tab: TrackTab) => void;
};

export default function TrackTabs({ activeTab, onChange }: Props) {
  return (
    <div className="mb-7 grid grid-cols-2 rounded-2xl bg-bg p-1">
      <button
        type="button"
        onClick={() => onChange("form")}
        className={`
          rounded-xl px-4 py-3
          text-sm font-medium
          transition
          ${
            activeTab === "form"
              ? "bg-surface text-text shadow-sm"
              : "text-text/50 hover:text-text"
          }
        `}
      >
        پیگیری درخواست
      </button>

      <button
        type="button"
        onClick={() => onChange("history")}
        className={`
          rounded-xl px-4 py-3
          text-sm font-medium
          transition
          ${
            activeTab === "history"
              ? "bg-surface text-text shadow-sm"
              : "text-text/50 hover:text-text"
          }
        `}
      >
        سوابق من
      </button>
    </div>
  );
}
