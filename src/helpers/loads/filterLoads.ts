import type { Load, LoadFilters } from "../../types/load";

export function filterLoads(
  loads: Load[],
  query: string,
  filters: LoadFilters,
): Load[] {
  const search = query.trim().toLowerCase();

  return loads.filter((load) => {
    // =========================
    // Search
    // =========================

    const matchesSearch =
      !search ||
      [
        load.origin,
        load.destination,
        load.cargo,
        load.cargo_type,
        load.vehicle_type,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search);

    // =========================
    // Trade Type
    // =========================

    const matchesTradeType =
      !filters.tradeType || load.trade_type === filters.tradeType;

    // =========================
    // Cargo
    // =========================

    const matchesCargo = !filters.cargo || load.cargo_type === filters.cargo;

    // =========================
    // Fleet
    // =========================

    const matchesFleet =
      !filters.fleetType || load.vehicle_type === filters.fleetType;

    // =========================
    // Origin
    // =========================

    const matchesOrigin = !filters.origin || load.origin === filters.origin;

    // =========================
    // Destination
    // =========================

    const matchesDestination =
      !filters.destination || load.destination === filters.destination;

    // =========================
    // Border
    // =========================

    const matchesBorder =
      filters.borders.length === 0 ||
      (load.exit_border !== null && filters.borders.includes(load.exit_border));

    // =========================
    // Weight
    // =========================

    const weight = load.weight;

    let matchesTonnage = true;

    switch (filters.tonnage) {
      case "under-10":
        matchesTonnage = weight < 10;
        break;

      case "10-15":
        matchesTonnage = weight >= 10 && weight < 15;
        break;

      case "15-20":
        matchesTonnage = weight >= 15 && weight < 20;
        break;

      case "20-23":
        matchesTonnage = weight >= 20 && weight <= 23;
        break;

      case "24-25":
        matchesTonnage = weight >= 24 && weight <= 25;
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
