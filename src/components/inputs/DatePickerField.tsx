import { useState } from "react";

import { DayPicker } from "@daypicker/persian";


import { format as formatGregorian, parseISO } from "date-fns";
import { faIR } from "date-fns-jalali/locale";

import "react-day-picker/style.css";
import { toPersianDate } from "../../helpers/date";

interface DatePickerFieldProps {
  label: string;
  value?: string;
  onChange: (date: string | undefined) => void;
  error?: string;
}

export const DatePickerField = ({
  label,
  value,
  onChange,
  error,
}: DatePickerFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();

  // مقدار دیتابیس میلادی است
  const selectedDate = value ? parseISO(value) : undefined;

  // فقط برای نمایش به کاربر جلالی
  const displayValue = toPersianDate(selectedDate)

  return (
    <div className="relative flex flex-col gap-1.5">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>

      <input
        type="text"
        readOnly
        value={displayValue}
        onClick={() => setIsOpen((prev) => !prev)}
        placeholder="انتخاب تاریخ"
        className={`h-12 w-full rounded-xl border px-4 text-sm text-text outline-none transition
          placeholder:text-text/40
          ${
            error
              ? "border-danger ring-4 ring-danger/10"
              : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
          }`}
      />

      {isOpen && (
        <div className="absolute top-20 z-50 rounded-xl border border-border bg-surface p-4 shadow-xl">
          <DayPicker
            mode="single"
            selected={selectedDate}
            disabled={{ before: today }}
            onSelect={(date) => {
              if (!date) {
                onChange(undefined);
                return;
              }

              // تبدیل تاریخ انتخاب‌شده به میلادی برای دیتابیس
              const gregorianDate = formatGregorian(date, "yyyy-MM-dd");

              onChange(gregorianDate);
              setIsOpen(false);
            }}
            locale={faIR}
          />
        </div>
      )}

      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
};
