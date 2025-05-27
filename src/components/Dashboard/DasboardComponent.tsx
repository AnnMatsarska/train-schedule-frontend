"use client";
import { getAllTrains } from "@/services/train.service";
import { Train, TrainSortField, TrainSortOrder } from "@/types/trains";
import React, { useEffect, useState } from "react";
import { TrainTable } from "../Trains/TrainsTable";
import { Typography, useMediaQuery } from "@mui/material";

import styles from "./Dashboard.module.scss";
import { Spinner } from "../Spinner/Spinner";
import { DashboardStats } from "./DashboardStats";
import { MobileTrainCards } from "../Trains/MobileTrainCards";

const DasboardComponent = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const isMobile = useMediaQuery("(max-width: 900px)");

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
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <DashboardStats trains={trains} />
      </div>

      {loading ? (
        <Spinner />
      ) : trains.length > 0 ? (
        isMobile ? (
          <MobileTrainCards trains={trains} />
        ) : (
          <TrainTable trains={trains} />
        )
      ) : (
        <Typography sx={{ mt: 4 }} variant="body1" textAlign="center">
          No trains found.
        </Typography>
      )}
    </>
  );
};

export default DasboardComponent;
