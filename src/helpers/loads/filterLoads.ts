import { Load } from "../../types";
import { LoadFilters } from "../../types/load";

export function filterLoads(
  loads: Load[],
  query: string,
  filters: LoadFilters,
): Load[] {
  const search = query.trim().toLowerCase();

  return loads.filter((load) => {
    const matchesSearch =
      !search ||
      `${load.origin} ${load.destination} ${load.cargo} ${load.vehicle}`
        .toLowerCase()
        .includes(search);

    const matchesTradeType =
      !filters.tradeType || load.tradeType === filters.tradeType;

    const matchesCargo =
      !filters.cargo || load.cargoType === filters.cargo;

    const matchesFleet =
      !filters.fleetType || load.vehicleType === filters.fleetType;

    const matchesOrigin =
      !filters.origin || load.origin === filters.origin;

    const matchesDestination =
      !filters.destination ||
      load.destination === filters.destination;

    const matchesBorder =
      filters.borders.length === 0 ||
      filters.borders.includes(load.exitBorder);

    const weight = load.weight;

    let matchesTonnage = true;

    switch (filters.tonnage) {
      case "24-25":
        matchesTonnage = weight >= 24 && weight <= 25;
        break;

      case "20-23":
        matchesTonnage = weight >= 20 && weight <= 23;
        break;

      case "under-20":
        matchesTonnage = weight < 20;
        break;

      case "under-15":
        matchesTonnage = weight < 15;
        break;

      case "under-10":
        matchesTonnage = weight < 10;
        break;
    }

    return (
      matchesSearch &&
      matchesTradeType &&
      matchesCargo &&
      matchesFleet &&
      matchesOrigin &&
      matchesDestination &&
      matchesBorder &&
      matchesTonnage
    );
  });
}