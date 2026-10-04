import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type To = {
  to: string;
}
export default function GoToLoads({to}:To) {
    return (
      <Link
        to={to}
        className="
            my-10
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
        برگشت به بار ها
      </Link>
    );
}
