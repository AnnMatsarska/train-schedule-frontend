"use client";

import {
  createTrain,
  deleteTrain,
  getAllTrains,
  updateTrain,
} from "@/services/train.service";
import { Train, TrainSortField, TrainSortOrder } from "@/types/trains";
import { useEffect, useState } from "react";
import { TrainTable } from "./TrainsTable";
import styles from "./Trains.module.scss";
import { Button, Typography } from "@mui/material";
import { TrainFormValues, TrainModal } from "./TrainModal";
import { Spinner } from "../Spinner/Spinner";

export const TrainsPageComponent = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  const fetchSortedTrains = async (
    field: TrainSortField,
    order: TrainSortOrder
  ) => {
    setLoading(true);
    try {
      const data = await getAllTrains(field, order);
      setTrains(data);
    } catch (error) {
      console.error("Error fetching trains:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSortedTrains(TrainSortField.PRICE, "asc");
  }, []);

  const handleEdit = (train: Train) => {
    setSelectedTrain(train);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedTrain(null);
    setModalOpen(true);
  };

  const handleDelete = async (train: Train) => {
    try {
      await deleteTrain(train.id);
      await fetchSortedTrains(TrainSortField.PRICE, "asc");
    } catch (e) {
      console.error("Failed to delete train:", e);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTrain(null);
  };

  const handleSubmit = async (formData: TrainFormValues) => {
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      if (selectedTrain) {
        await updateTrain(selectedTrain.id, payload);
      } else {
        await createTrain(payload);
      }
      await fetchSortedTrains(TrainSortField.PRICE, "asc");
    } catch (e) {
      console.error("Submission error:", e);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Trains</h1>
        <Button variant="contained" onClick={handleAdd}>
          Add Train
        </Button>
      </div>
      {loading ? (
        <Spinner />
      ) : trains.length > 0 ? (
        <TrainTable
          trains={trains}
          showActions
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSortChange={fetchSortedTrains}
        />
      ) : (
        <Typography sx={{ mt: 4 }} variant="body1" textAlign="center">
          No trains found.
        </Typography>
      )}

      <TrainModal
        open={modalOpen}
        onClose={handleCloseModal}
        initialValues={
          selectedTrain
            ? {
                trainNumber: selectedTrain.trainNumber,
                price: selectedTrain.price,
                departure: selectedTrain.departure,
                arrival: selectedTrain.arrival,
              }
            : undefined
        }
        onSubmit={handleSubmit}
      />
    </>
  );
};
