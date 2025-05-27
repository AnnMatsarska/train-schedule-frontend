import { create } from "zustand";
import { getAllTrains } from "@/services/train.service";
import { Train, TrainSortField, TrainSortOrder } from "@/types/trains";

interface TrainState {
  trains: Train[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  sortField: TrainSortField;
  sortOrder: TrainSortOrder;
  allTrains: Train[];
  fetchSortedTrains: (
    field?: TrainSortField,
    order?: TrainSortOrder,
    page?: number
  ) => Promise<void>;
  setPage: (page: number) => void;
  invalidateTrains: () => void;
  fetchAllTrains: () => Promise<void>;
}

export const useTrainStore = create<TrainState>((set, get) => ({
  trains: [],
  total: 0,
  page: 1,
  limit: 5,
  loading: false,
  sortField: TrainSortField.PRICE,
  sortOrder: "asc",
  allTrains: [],
  fetchSortedTrains: async (
    field = get().sortField,
    order = get().sortOrder,
    page = get().page
  ) => {
    set({ loading: true, sortField: field, sortOrder: order, page });
    try {
      const data = await getAllTrains(field, order, page, get().limit);
      set({ trains: data.trains, total: data.total });
    } catch (error) {
      console.error("Failed to fetch trains:", error);
    } finally {
      set({ loading: false });
    }
  },
  setPage: async (page) => {
    set({ page });
    const { sortField, sortOrder, fetchSortedTrains } = get();
    await fetchSortedTrains(sortField, sortOrder, page);
  },
  invalidateTrains: () => set({ trains: [], total: 0 }),
  fetchAllTrains: async () => {
    try {
      const res = await getAllTrains("price", "asc", 1, 10, true);
      set({ allTrains: res.trains });
    } catch (e) {
      console.error("Failed to fetch all trains for stats", e);
    }
  },
}));
