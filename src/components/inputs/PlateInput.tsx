import {
  type Control,
  type FieldValues,
  type Path,
  type UseFormRegister,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { FormInput } from "./FormInput";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
};

const LETTERS =
  "الف ب پ ت ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی".split(" ");

export default function PlateInput<T extends FieldValues>({
  register,
  control,
  setValue,
}: Props<T>) {
  const [plateFirst, plateLetter, plateNumber, plateCity] = useWatch({
    control,
    name: [
      "plateFirst",
      "plateLetter",
      "plateNumber",
      "plateCity",
    ] as Path<T>[],
  });

  const updatePlate = (values?: {
    first?: string;
    letter?: string;
    number?: string;
    city?: string;
  }) => {
    const first = values?.first ?? plateFirst ?? "";
    const letter = values?.letter ?? plateLetter ?? "";
    const number = values?.number ?? plateNumber ?? "";
    const city = values?.city ?? plateCity ?? "";

    setValue(
      "plate" as Path<T>,
      `${first}${letter}${number}ایران${city}` as T[Path<T>],
    );
  };

  const plateFirstField = register("plateFirst" as Path<T>);
  const plateLetterField = register("plateLetter" as Path<T>);
  const plateNumberField = register("plateNumber" as Path<T>);
  const plateCityField = register("plateCity" as Path<T>);
  const plateField = register("plate" as Path<T>);

  return (
    <div className="space-y-4 sm:col-span-2">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <FormInput
          label="دو رقم اول"
          placeholder="58"
          maxLength={2}
          {...plateFirstField}
          onChange={(e) => {
            plateFirstField.onChange(e);

            updatePlate({
              first: e.target.value,
            });
          }}
        />

        <FormInput
          label="حرف پلاک"
          placeholder="الف"
          maxLength={1}
          list="plate-letters"
          {...plateLetterField}
          onChange={(e) => {
            plateLetterField.onChange(e);

            updatePlate({
              letter: e.target.value,
            });
          }}
        />

        <datalist id="plate-letters">
          {LETTERS.map((letter) => (
            <option key={letter} value={letter} />
          ))}
        </datalist>

        <FormInput
          label="سه رقم"
          placeholder="548"
          maxLength={3}
          {...plateNumberField}
          onChange={(e) => {
            plateNumberField.onChange(e);

            updatePlate({
              number: e.target.value,
            });
          }}
        />

        <div className="relative flex items-end gap-2">
          <div className="flex-1">
            <FormInput
              label="کد شهر"
              placeholder="35"
              maxLength={2}
              {...plateCityField}
              onChange={(e) => {
                plateCityField.onChange(e);

                updatePlate({
                  city: e.target.value,
                });
              }}
            />
          </div>

          <div
            className="
              absolute left-0 mb-px
              flex h-12 items-center
              border-r border-border
              bg-bg px-4
              text-sm font-bold text-primary
            "
          >
            ایران
          </div>
        </div>
      </div>

      <input type="hidden" {...plateField} />

      <p className="text-xs text-text-2">
        برای خودروهای دارای پلاک ملی ایران استفاده می‌شود. مثال: 58 الف 548
        ایران 35
      </p>
    </div>
  );
}
