import api from "@/config/axios";
import { API_ROUTES } from "@/config/routes";
import {
  CreateUpdateTrainInput,
  PartialTrainInput,
  Train,
} from "@/types/trains";

export const getAllTrains = async (
  sortField: string,
  sortOrder: string,
  page: number,
  limit: number,
  all: boolean = false
) => {
  const { data } = await api.get(API_ROUTES.TRAINS, {
    params: { sortBy: sortField, order: sortOrder, page, limit, all },
  });
  return data;
};
export const getTrainById = async (id: string): Promise<Train> => {
  const { data } = await api.get(`${API_ROUTES.TRAINS}/${id}`);
  return data;
};

export const createTrain = async (
  train: CreateUpdateTrainInput
): Promise<Train> => {
  const { data } = await api.post(API_ROUTES.TRAINS, train);
  return data;
};

export const updateTrain = async (
  id: string,
  updated: CreateUpdateTrainInput
): Promise<Train> => {
  const { data } = await api.put(`${API_ROUTES.TRAINS}/${id}`, updated);
  return data;
};

export const partialUpdateTrain = async (
  id: string,
  partial: PartialTrainInput
): Promise<Train> => {
  const { data } = await api.patch(`${API_ROUTES.TRAINS}/${id}`, partial);
  return data;
};

export const deleteTrain = async (id: string): Promise<void> => {
  await api.delete(`${API_ROUTES.TRAINS}/${id}`);
};
