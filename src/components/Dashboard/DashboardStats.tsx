"use client";

import { Train } from "@/types/trains";
import {
  getTotalTrains,
  getMostPopularDeparture,
  getAverageDuration,
  getAveragePrice,
} from "@/utils/trainStats";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  trains: Train[];
}

export const DashboardStats = ({ trains }: Props) => {
  const cards = [
    { title: "Total Trains", value: getTotalTrains(trains) },
    { title: "Most Departures From", value: getMostPopularDeparture(trains) },
    { title: "Average Duration", value: getAverageDuration(trains) },
    { title: "Average Price", value: getAveragePrice(trains) },
  ];

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={3}
      justifyContent="space-between"
      mt={4}
    >
      {cards.map((card) => (
        <Box
          key={card.title}
          sx={{
            flex: "1 1 220px",
            maxWidth: 260,
            backgroundColor: "#1c1c1c",
            color: "#fff",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Card sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};
