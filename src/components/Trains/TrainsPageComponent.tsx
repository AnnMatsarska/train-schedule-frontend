"use client";

import {
  createTrain,
  deleteTrain,
  partialUpdateTrain,
  updateTrain,
} from "@/services/train.service";
import { Train, TrainSortField, TrainSortOrder } from "@/types/trains";
import { useEffect, useState } from "react";
import { TrainTable } from "./TrainsTable";
import styles from "./Trains.module.scss";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { TrainFormValues, TrainModal } from "./TrainModal";
import { Spinner } from "../Spinner/Spinner";
import { MobileTrainCards } from "./MobileTrainCards";
import { FieldEditModal } from "./FieldEditModal";
import { useTrainStore } from "@/stores/useTrainStore";

export const TrainsPageComponent = () => {
  const {
    trains,
    loading,
    sortField,
    sortOrder,
    fetchSortedTrains,
    invalidateTrains,
  } = useTrainStore();

  const [sortValue, setSortValue] = useState(`${sortField}_${sortOrder}`);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState<{
    train: Train;
    field: keyof Pick<Train, "trainNumber" | "price">;
    label: string;
  } | null>(null);

  const isMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    if (!trains.length) {
      fetchSortedTrains();
    }
  }, [trains.length, fetchSortedTrains]);

  const handleSortChange = (event: SelectChangeEvent) => {
    const [field, order] = event.target.value.split("_");
    setSortValue(event.target.value);
    fetchSortedTrains(field as TrainSortField, order as TrainSortOrder);
  };

  const handleInlineEditClick = (
    train: Train,
    field: keyof Pick<Train, "trainNumber" | "price">,
    label: string
  ) => {
    setFieldToEdit({ train, field, label });
    setFieldModalOpen(true);
  };

  const handlePatchSave = async (newValue: string | number) => {
    if (!fieldToEdit) return;
    const { train, field } = fieldToEdit;
    try {
      await partialUpdateTrain(train.id, {
        [field]: field === "price" ? Number(newValue) : newValue,
      });
      await fetchSortedTrains();
    } catch (err) {
      console.error("Patch failed", err);
    }
  };

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
      invalidateTrains();
      await fetchSortedTrains();
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
      invalidateTrains();
      await fetchSortedTrains();
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
      <Box display="flex" justifyContent="flex-start" mb={3}>
        <FormControl size="small" sx={{ minWidth: 250 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortValue} label="Sort By" onChange={handleSortChange}>
            <MenuItem value="price_asc">Price (low-high)</MenuItem>
            <MenuItem value="price_desc">Price (high-low)</MenuItem>
            <MenuItem value="duration_asc">Duration (low-high)</MenuItem>
            <MenuItem value="duration_desc">Duration (high-low)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        <Spinner />
      ) : trains.length > 0 ? (
        isMobile ? (
          <MobileTrainCards
            trains={trains}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onInlineEditClick={handleInlineEditClick}
            showActions
          />
        ) : (
          <TrainTable
            trains={trains}
            showActions
            onEdit={handleEdit}
            onDelete={handleDelete}
            onInlineEditClick={handleInlineEditClick}
          />
        )
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
      {fieldToEdit && (
        <FieldEditModal
          open={fieldModalOpen}
          value={fieldToEdit.train[fieldToEdit.field]}
          label={fieldToEdit.label}
          onClose={() => setFieldModalOpen(false)}
          onSave={handlePatchSave}
        />
      )}
    </>
  );
};
