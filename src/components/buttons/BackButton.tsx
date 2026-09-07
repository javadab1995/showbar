import { ChevronRight } from 'lucide-react';


export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="
      group
       my-6
            flex items-center 
            text-xl
            text-primary
            hover:text-bg-primary-radial
             cursor-pointer font-medium hover:opacity-80 transition-opacity 
          "
    >
      <ChevronRight className='group-hover:translate-x-1 transition-transform ease-in-out duration-200' size={24} />
      بازگشت
    </button>
  );
}
