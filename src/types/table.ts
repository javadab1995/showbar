import type { ReactNode } from "react";

export type TableColumn<T> = {
  key: keyof T | string;
  title: string;
  render?: (row: T) => ReactNode;
};

export type TableExtraColumn<T> = {
  header: string;
  render: (row: T) => ReactNode;
};
