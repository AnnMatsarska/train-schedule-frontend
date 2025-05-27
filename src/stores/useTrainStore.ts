import { create } from "zustand";
import { getAllTrains } from "@/services/train.service";
import { Train, TrainSortField, TrainSortOrder } from "@/types/trains";

interface TrainState {
  trains: Train[];
  loading: boolean;
  sortField: TrainSortField;
  sortOrder: TrainSortOrder;
  fetchSortedTrains: (
    field?: TrainSortField,
    order?: TrainSortOrder
  ) => Promise<void>;
  invalidateTrains: () => void;
}

export const useTrainStore = create<TrainState>((set, get) => ({
  trains: [],
  loading: false,
  sortField: TrainSortField.PRICE,
  sortOrder: "asc",

  fetchSortedTrains: async (
    field = get().sortField,
    order = get().sortOrder
  ) => {
    set({ loading: true, sortField: field, sortOrder: order });
    try {
      const data = await getAllTrains(field, order);
      set({ trains: data });
    } catch (error) {
      console.error("Failed to fetch trains:", error);
    } finally {
      set({ loading: false });
    }
  },

  invalidateTrains: () => set({ trains: [] }),
}));
