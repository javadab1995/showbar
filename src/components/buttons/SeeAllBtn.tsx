
import {  ArrowRight } from "lucide-react";
import { Link, To } from "react-router-dom";

type SeeAllBtnProps = {
  to: To;
  label?: string; 
};

export default function SeeAllBtn({ to, label = "مشاهده همه" }: SeeAllBtnProps) {
  return (
    <Link
      to={to}
      className="text-sm text-primary hover:underline flex items-center gap-1 group"
    >
      {label}

      <ArrowRight
        size={16}
        className="rtl:rotate-180 transition-transform group-hover:-translate-x-1"
      />
    </Link>
  );
}
