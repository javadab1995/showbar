import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GoToLoads() {
    return (
      <Link
        to="/loads"
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
          className="group-hover:-translate-x-0.5 transition-all  duration-200
            ease-in-out"
          size={18}
        />
        برگشت به بار ها
      </Link>
    );
}
