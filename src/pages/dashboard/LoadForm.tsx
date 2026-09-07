import { useNavigate, useParams } from "react-router-dom";
import { loads } from "../../data/mock";
import { Button } from "../../components/buttons/Button";

import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "../../components/inputs/FormInput";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { SelectField } from "../../components/selects/SelectField";
import { cargoOptions, fleetOptions, STATUS_OPTIONS, VEHICLE_OPTIONS } from "../../data/options";

interface LoadFormData {
  origin: string;
  destination: string;
  weight: string;
  price: string;
  date: string;
  location: string;
  cargo: string;
  vehicle: string;
  status: string;
  description: string;
  fleet: string;
}
export function LoadForm() {

  const { id } = useParams();
  const nav = useNavigate();
  const existing = loads.find((x) => x.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoadFormData>();

  const onSubmit: SubmitHandler<LoadFormData> = (data) => console.log(data);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text">
          {existing ? "ویرایش بار" : "افزودن بار"}
        </h2>
      </div>

      <form
        className="bg-surface border border-border p-6 md:p-8 rounded-xl shadow-sm"
        onSubmit={handleSubmit(onSubmit)} 
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
          {[
            { label: "مبدأ", name: "origin" as const },
            { label: "مقصد", name: "destination" as const },
            { label: "وزن (تن)", name: "weight" as const },
            { label: "کرایه (تومان)", name: "price" as const },
            { label: "تاریخ بارگیری", name: "date" as const },
            { label: "آدرس", name: "location" as const },
          ].map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              type={field.name === "date" ? "date" : "text"}
              {...register(field.name, { required: "این فیلد الزامی است" })}
              error={errors[field.name]?.message}
            />
          ))}
          

          <SelectField
            label="نوع بار"
            options={cargoOptions}
            {...register("cargo")}
          />

          <SelectField
            label="نوع خودرو"
            options={VEHICLE_OPTIONS}
            {...register("vehicle")}
          />
          <SelectField
            label="ناوگان"
            options={fleetOptions}
            {...register("fleet")}
          />

          <div className="">
            <SelectField
              label="وضعیت"
              options={STATUS_OPTIONS}
              {...register("status")}
            />
          </div>

          <div className="md:col-span-2">
            <TextAreaField
              label="توضیحات"
              rows={4}
              {...register("description")}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-8 mt-8 border-t border-border ">
          <Button
            type="button"
            onClick={() => nav("/admin/loads")}
            className="bg-surface-radial text-surface p-2.5 rounded-md text-center "
          >
            انصراف
          </Button>
          <Button
            className="bg-primary-radial   flex justify-center items-center gap-1.5 cursor-pointer rounded-md font-medium hover:opacity-90 transition-opacity   text-surface p-2.5"
            type="submit"
          >
            ذخیره بار
          </Button>
        </div>
      </form>
    </div>
  );
}
