import * as yup from "yup";

export const trainSchema = yup.object({
  trainNumber: yup.string().required("Train number is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be at least 0"),
  departure: yup.object({
    station: yup.string().required("Departure station is required"),
    date: yup.string().required("Departure date is required"),
    time: yup.string().required("Departure time is required"),
  }),
  arrival: yup.object({
    station: yup.string().required("Arrival station is required"),
    date: yup.string().required("Arrival date is required"),
    time: yup.string().required("Arrival time is required"),
  }),
});
