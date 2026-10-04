
import { Link } from "react-router-dom";

type LogoProps = {
  href?: string;
  showText?: boolean;
  className?: string;
};

export default function Logo({
  href = "/",
  className = "",
}: LogoProps) {
  const content = (
    <div
      className={`flex items-center  bg-logo rounded-md my-2  gap-3 ${className}`}
      dir="ltr"
    >
      <img
        src="/images/logo.png"
        alt="ShowBar"
        className="h-10 w-auto shrink-0"
      />
      
    </div>
  );

  return <Link to={href}>{content}</Link>;
}

