"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { Edit, Delete } from "@mui/icons-material";
import { Train } from "@/types/trains";

import { styled } from "@mui/material/styles";

interface Props {
  trains: Train[];
  showActions?: boolean;
  onEdit?: (train: Train) => void;
  onDelete?: (train: Train) => void;
  onInlineEditClick?: (
    train: Train,
    field: keyof Pick<Train, "trainNumber" | "price">,
    label: string
  ) => void;
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
  onInlineEditClick,
}: Props) => {
  return (
    <Box>
      <Table size="small">
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
                  showActions &&
                  onInlineEditClick?.(train, "trainNumber", "Train Number")
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
                <small>{`${train.departure.date} ${train.departure.time}`}</small>
              </TableCell>
              <TableCell>
                <strong>{train.arrival.station}</strong>
                <br />
                <small>{`${train.arrival.date} ${train.arrival.time}`}</small>
              </TableCell>
              <TableCell
                sx={{ cursor: showActions ? "pointer" : "default" }}
                onClick={() =>
                  showActions && onInlineEditClick?.(train, "price", "Price")
                }
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
    </Box>
  );
};
