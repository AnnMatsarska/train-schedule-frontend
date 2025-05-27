"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Train } from "@/types/trains";

interface Props {
  trains: Train[];
  onEdit?: (train: Train) => void;
  onDelete?: (train: Train) => void;
  onInlineEditClick?: (
    train: Train,
    field: keyof Pick<Train, "trainNumber" | "price">,
    label: string
  ) => void;
  showActions?: boolean;
}

export const MobileTrainCards = ({
  trains,
  onEdit,
  onDelete,
  onInlineEditClick,
  showActions = false,
}: Props) => {
  return (
    <Box>
      {trains.map((train) => (
        <Card
          key={train.id}
          sx={{
            mb: 2,
            p: 1,
            backgroundColor: "#222",
            color: "white",
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="start"
            >
              <Box>
                <Box display="flex" alignItems="center" mb="8px">
                  <Typography variant="h6" fontWeight="bold">
                    {train.trainNumber}
                  </Typography>
                  {showActions && (
                    <IconButton
                      size="small"
                      onClick={() =>
                        onInlineEditClick?.(
                          train,
                          "trainNumber",
                          "Train Number"
                        )
                      }
                      sx={{ ml: 1 }}
                    >
                      <Edit
                        sx={{ color: "white", width: "14px", height: "14px" }}
                      />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="subtitle2" color="gray">
                  Departure
                </Typography>
                <Typography fontWeight="bold">
                  {train.departure.station}
                </Typography>
                <Typography variant="body2" mb={1}>
                  {train.departure.date} {train.departure.time}
                </Typography>
              </Box>

              <Box textAlign="right">
                {showActions && (
                  <>
                    <IconButton onClick={() => onEdit?.(train)} size="small">
                      <Edit sx={{ color: "white" }} fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => onDelete?.(train)} size="small">
                      <Delete sx={{ color: "white" }} fontSize="small" />
                    </IconButton>
                  </>
                )}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="end"
                  mt={1}
                >
                  {showActions && (
                    <IconButton
                      size="small"
                      onClick={() =>
                        onInlineEditClick?.(train, "price", "Price")
                      }
                      sx={{ ml: 1 }}
                    >
                      <Edit
                        sx={{ color: "white", width: "14px", height: "14px" }}
                      />
                    </IconButton>
                  )}
                  <Typography fontSize="18px" fontWeight="bold">
                    $ {train.price}
                  </Typography>
                </Box>
                <Typography fontSize="16px" color="gray">
                  {train.durationFormatted}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }} />

            <Box>
              <Typography variant="subtitle2" color="gray">
                Arrival
              </Typography>
              <Typography fontWeight="bold">{train.arrival.station}</Typography>
              <Typography variant="body2">
                {train.arrival.date} {train.arrival.time}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
