"use client";

import { trainSchema } from "@/validation/train.schema";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@mui/material";

import { useFormik } from "formik";
import { useEffect } from "react";

export interface TrainFormValues {
  trainNumber: string;
  price: number;
  departure: {
    station: string;
    date: string;
    time: string;
  };
  arrival: {
    station: string;
    date: string;
    time: string;
  };
}

interface TrainModalProps {
  open: boolean;
  onClose: () => void;
  initialValues?: TrainFormValues;
  onSubmit: (values: TrainFormValues) => void;
}

export const TrainModal = ({
  open,
  onClose,
  initialValues,
  onSubmit,
}: TrainModalProps) => {
  const isEdit = !!initialValues;
  const isMobile = useMediaQuery("(max-width: 600px)");

  const defaultValues: TrainFormValues = {
    trainNumber: "",
    price: 0,
    departure: {
      station: "",
      date: "",
      time: "",
    },
    arrival: {
      station: "",
      date: "",
      time: "",
    },
  };

  const formik = useFormik<TrainFormValues>({
    initialValues: initialValues || defaultValues,
    validationSchema: trainSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
      onClose();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (open && !isEdit) {
      formik.resetForm({ values: defaultValues });
    }
  }, [open, isEdit]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{isEdit ? "Edit Train" : "Add Train"}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              fullWidth
              label="Train Number"
              name="trainNumber"
              value={formik.values.trainNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.trainNumber && Boolean(formik.errors.trainNumber)
              }
              helperText={
                formik.touched.trainNumber && formik.errors.trainNumber
              }
            />

            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />

            <Box
              display="flex"
              gap={2}
              flexDirection={isMobile ? "column" : "row"}
            >
              <TextField
                fullWidth
                label="Departure Station"
                name="departure.station"
                value={formik.values.departure.station}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.departure?.station &&
                  Boolean(formik.errors.departure?.station)
                }
                helperText={
                  formik.touched.departure?.station &&
                  formik.errors.departure?.station
                }
              />
              <TextField
                fullWidth
                label="Departure Date"
                name="departure.date"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                value={formik.values.departure.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.departure?.date &&
                  Boolean(formik.errors.departure?.date)
                }
                helperText={
                  formik.touched.departure?.date &&
                  formik.errors.departure?.date
                }
              />
              <TextField
                fullWidth
                label="Departure Time"
                name="departure.time"
                type="time"
                slotProps={{ inputLabel: { shrink: true } }}
                value={formik.values.departure.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.departure?.time &&
                  Boolean(formik.errors.departure?.time)
                }
                helperText={
                  formik.touched.departure?.time &&
                  formik.errors.departure?.time
                }
              />
            </Box>

            <Box
              display="flex"
              gap={2}
              flexDirection={isMobile ? "column" : "row"}
            >
              <TextField
                fullWidth
                label="Arrival Station"
                name="arrival.station"
                value={formik.values.arrival.station}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.arrival?.station &&
                  Boolean(formik.errors.arrival?.station)
                }
                helperText={
                  formik.touched.arrival?.station &&
                  formik.errors.arrival?.station
                }
              />
              <TextField
                fullWidth
                label="Arrival Date"
                name="arrival.date"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                value={formik.values.arrival.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.arrival?.date &&
                  Boolean(formik.errors.arrival?.date)
                }
                helperText={
                  formik.touched.arrival?.date && formik.errors.arrival?.date
                }
              />
              <TextField
                fullWidth
                label="Arrival Time"
                name="arrival.time"
                type="time"
                slotProps={{ inputLabel: { shrink: true } }}
                value={formik.values.arrival.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.arrival?.time &&
                  Boolean(formik.errors.arrival?.time)
                }
                helperText={
                  formik.touched.arrival?.time && formik.errors.arrival?.time
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
