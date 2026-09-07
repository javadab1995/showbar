import { PackageOpen } from "lucide-react";
import { ReactNode } from "react";

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-surface-2 text-primary">
        <PackageOpen size={32}  />
      </div>


      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        {text && <p className="mx-auto max-w-sm text-sm text-text-2">{text}</p>}
      </div>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
