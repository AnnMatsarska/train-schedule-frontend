"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { Edit, Delete } from "@mui/icons-material";
import { Train, TrainSortField, TrainSortOrder } from "@/types/trains";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { partialUpdateTrain } from "@/services/train.service";
import { FieldEditModal } from "./FieldEditModal";

interface Props {
  trains: Train[];
  showActions?: boolean;
  onEdit?: (train: Train) => void;
  onDelete?: (train: Train) => void;
  onSortChange?: (field: TrainSortField, order: TrainSortOrder) => void;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    fontSize: 20,
  },
}));

export const TrainTable = ({
  trains,
  showActions = false,
  onEdit,
  onDelete,
  onSortChange,
}: Props) => {
  const [sortValue, setSortValue] = useState("price_asc");
  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState<{
    train: Train;
    field: keyof Pick<Train, "trainNumber" | "price">;
    label: string;
  } | null>(null);

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSortValue(value);
    const [field, order] = value.split("_");
    onSortChange?.(field as TrainSortField, order as TrainSortOrder);
  };

  const formatDateTime = (date: string, time: string) => `${date} ${time}`;

  const handleFieldClick = (
    train: Train,
    field: keyof Pick<Train, "trainNumber" | "price">,
    label: string
  ) => {
    if (!showActions) return;
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
      onSortChange?.(TrainSortField.PRICE, "asc");
    } catch (err) {
      console.error("Patch failed", err);
    }
  };

  return (
    <Box>
      {showActions ? (
        <Box display="flex" justifyContent="flex-start" mb={3}>
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortValue}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="price_asc">Price (low-high)</MenuItem>
              <MenuItem value="price_desc">Price (high-low)</MenuItem>
              <MenuItem value="duration_asc">Duration (low-high)</MenuItem>
              <MenuItem value="duration_desc">Duration (high-low)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : null}

      <Table sx={{ minWidth: 900 }} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Train Number</StyledTableCell>
            <StyledTableCell>Departure</StyledTableCell>
            <StyledTableCell>Arrival</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Duration</StyledTableCell>
            {showActions && <StyledTableCell>Actions</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {trains.map((train) => (
            <TableRow key={train.id}>
              <TableCell
                sx={{ cursor: showActions ? "pointer" : "default" }}
                onClick={() =>
                  handleFieldClick(train, "trainNumber", "Train Number")
                }
              >
                {train.trainNumber}
                {showActions && (
                  <Edit
                    fontSize="small"
                    className="edit-icon"
                    style={{ marginLeft: 8, width: "12px" }}
                  />
                )}
              </TableCell>
              <TableCell>
                <strong>{train.departure.station}</strong>
                <br />
                <small>
                  {formatDateTime(train.departure.date, train.departure.time)}
                </small>
              </TableCell>
              <TableCell>
                <strong>{train.arrival.station}</strong>
                <br />
                <small>
                  {formatDateTime(train.arrival.date, train.arrival.time)}
                </small>
              </TableCell>
              <TableCell
                sx={{ cursor: showActions ? "pointer" : "default" }}
                onClick={() => handleFieldClick(train, "price", "Price")}
              >
                $ {train.price}
                {showActions && (
                  <Edit
                    fontSize="small"
                    className="edit-icon"
                    style={{ marginLeft: 8, width: "12px" }}
                  />
                )}
              </TableCell>
              <TableCell>{train.durationFormatted}</TableCell>
              {showActions && (
                <TableCell>
                  <IconButton onClick={() => onEdit?.(train)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete?.(train)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {fieldToEdit && (
        <FieldEditModal
          open={fieldModalOpen}
          value={fieldToEdit.train[fieldToEdit.field]}
          label={fieldToEdit.label}
          onClose={() => setFieldModalOpen(false)}
          onSave={handlePatchSave}
        />
      )}
    </Box>
  );
};
