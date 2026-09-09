import { ButtonHTMLAttributes, ReactNode } from "react";
export function Button({
  children,
  disabled,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  children: ReactNode;
}) {
  return (
    <button
      disabled={disabled}
      className={` ${variant} ${className ? className : "bg-primary-radial text-sm  w-full  flex justify-center items-center gap-1.5 cursor-pointer rounded-md font-medium hover:opacity-90 transition-opacity   text-surface p-1.5 "}`}
      {...props}
    >
      {children}
    </button>
  );
}
