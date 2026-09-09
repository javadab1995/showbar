
import { Outlet } from "react-router-dom";
import PublicHeader from "../components/headers/PublicHeader";
import { BasketProvider } from "../contexts/BasketContext";
import MobileNav from "../components/ui/MobileNav";
import CurrencyRates from "../components/currency/CurrencyRates";
import SupportButton from "../components/buttons/SupportButton";



export default function PublicLayout() {
    return (
      <BasketProvider>
        <div className="min-h-screen bg-background text-text relative">
          <PublicHeader />
          <MobileNav />

          <main className="">
            <Outlet />
          </main>
          <aside className="block">
            <div className="fixed left-6 top-24 w-48">
              <CurrencyRates />
            </div>
          </aside>
          <SupportButton phone="09123456789" whatsapp="989123456789" />
        </div>
      </BasketProvider>
    );
}
