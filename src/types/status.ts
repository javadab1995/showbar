// Load
export type LoadStatus =
  | "active"
  | "reserved"
  | "completed"
  | "cancelled"
  | "expired";

// Driver request
export type DriverRequestStatus = "pending" | "confirmed" | "rejected";

// Driver request ↔ load
export type DriverRequestLoadStatus = "pending" | "approved" | "rejected";

// Driver
export type DriverStatus = "active" | "inactive";

// Vehicle
export type VehicleStatus = "active" | "inactive";

// Load availability alert
export type LoadAvailabilityAlertStatus = "pending" | "notified" | "cancelled";

// Load notification
export type LoadNotificationStatus = "active" | "notified" | "cancelled";

// Vehicle ↔ driver
export type VehicleDriverStatus = "active" | "inactive";
