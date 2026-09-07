
import { Outlet } from "react-router-dom";
import PublicHeader from "../components/headers/PublicHeader";
import { BasketProvider } from "../contexts/BasketContext";
import MobileNav from "../components/ui/MobileNav";



export default function PublicLayout() {
    return (
      <BasketProvider>
        <div className="min-h-screen bg-background text-text">
          <PublicHeader />
          <MobileNav />

          <main className="">
            <Outlet  />
          </main>
        </div>
      </BasketProvider>
    );
}
