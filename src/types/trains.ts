export interface Train {
  id: string;
  trainNumber: string;
  departure: {
    station: string;
    time: string;
    date: string;
  };
  arrival: {
    station: string;
    time: string;
    date: string;
  };
  price: number;
  duration: number;
  durationFormatted: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUpdateTrainInput {
  trainNumber: string;
  departure: Train["departure"];
  arrival: Train["arrival"];
  price: number;
}

export interface PartialTrainInput {
  trainNumber?: string;
  price?: number;
  departure?: Partial<Train["departure"]>;
  arrival?: Partial<Train["arrival"]>;
}

export enum TrainSortField {
  PRICE = "price",
  DURATION = "duration",
}

export type TrainSortOrder = "asc" | "desc";

export interface TrainSortOption {
  label: string;
  field: TrainSortField;
  order: TrainSortOrder;
}

export const trainSortOptions: TrainSortOption[] = [
  { label: "Price (low-high)", field: TrainSortField.PRICE, order: "asc" },
  { label: "Price (high-low)", field: TrainSortField.PRICE, order: "desc" },
  {
    label: "Duration (low-high)",
    field: TrainSortField.DURATION,
    order: "asc",
  },
  {
    label: "Duration (high-low)",
    field: TrainSortField.DURATION,
    order: "desc",
  },
];
