import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
type LinkProps = {
  to: string;
  title?: string;
}

export default function BackButton({to, title}:LinkProps) {
  return (

      <Link
        to={to}
        className="
            my-5
            inline-flex
            items-center
            font-medium
            transition-all
            text-primary
            hover:opacity-80
            group
            duration-200
            ease-in-out

           
          "
      >
        <ChevronRight
          className="group-hover:translate-x-0.5 transition-all  duration-200
            ease-in-out"
          size={18}
        />
       {title}
      </Link>
    );
  
}
