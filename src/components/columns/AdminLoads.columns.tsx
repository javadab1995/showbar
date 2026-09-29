import {  Archive, ArrowLeft, Ban, Copy, Eye, Pencil, RefreshCw, Trash2 } from "lucide-react";



import type { TableColumn } from "../../types/table";
import type { Load } from "../../types/load";
import { StatusBadge } from "../ui/StatusBadge";
import DropdownMenu from "../dropdown/DropdownMenu";
import { toPersianDigits } from "../../helpers/number";
import { toPersianDate } from "../../helpers/date";

import VehicleLabel from "../labels/VehicleLabel";
import { formatMoney } from "../../helpers/formater";
import { LoadStatus } from "../../types/status";

type LoadColumnActions = {
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onUpdateStatus: (id: string, status:LoadStatus) => void;
  onArchived: (id: string) => void;
};

export function createLoadColumns({
  onView,
  onEdit,
  onDuplicate,
  onArchived, onUpdateStatus
}: LoadColumnActions): TableColumn<Load>[] {
  return [
    {
      key: "route",
      title: "مسیر",
      render: (load) => (
        <div className="flex gap-1 items-center text-primary/75">
          <span>{load.origin}</span>
          <ArrowLeft size={14} className="text-primary-dark font-black" />
          <span className="text-primary/75">{load.destination}</span>
        </div>
      ),
    },

    {
      key: "cargo",
      title: "بار",
      render: (load) => load.cargo ?? "_",
    },

    {
      key: "weight",
      title: "وزن",
      render: (load) => `${toPersianDigits(load.weight)} تن`,
    },

    {
      key: "vehicle_type",
      title: "نوع ناوگان",
      render: (load) => {
        return <VehicleLabel value={load.vehicle_type} />
      }
    },

    {
      key: "loading_date",
      title: "تاریخ بارگیری",
      render: (load) => toPersianDate(load.loading_date),
    },

    {
      key: "price",
      title: "کرایه",
      render: (load) => formatMoney(load.price, load.currency),
    },

    {
      key: "status",
      title: "وضعیت",
      render: (load) => {
      

        return <StatusBadge status={load.status} />;
      },
    },
    {
      key: "actions",
      title: "عملیات",
      render: (load) => (
        <DropdownMenu
          items={[
            {
              id: "view",
              label: "مشاهده",
              icon: Eye,
              onClick: () => onView(load.id),
            },
            {
              id: "edit",
              label: "ویرایش",
              icon: Pencil,
              onClick: () => onEdit(load.id),
            },
            {
              id: "duplicate",
              label: "ایجاد کپی",
              icon: Copy,
              onClick: () => onDuplicate(load.id),
            },
           {
  id: "status",
  label: "تغییر وضعیت",
  icon: RefreshCw,
  children: [
    {
      id: "active",
      label: "فعال",
      onClick: () => onUpdateStatus(load.id, "active"),
    },
    {
      id: "reserved",
      label: "رزرو شده",
      onClick: () => onUpdateStatus(load.id, "reserved"),
    },
    {
      id: "completed",
      label: "تکمیل شده",
      onClick: () => onUpdateStatus(load.id, "completed"),
    },
    {
      id: "cancelled",
      label: "لغو شده",
      danger: true,
      onClick: () => onUpdateStatus(load.id, "cancelled"),
    },
  ],
},
            {
              id: "archive",
              label: "انتقال به آرشیو",
              icon: Archive,
              warning: true,
              onClick: () => onArchived(load.id),
            },
          ]}
        />
      ),
    },
  ];
}
