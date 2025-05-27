"use client";

import React, { useEffect } from "react";
import { TrainTable } from "../Trains/TrainsTable";
import { Typography, useMediaQuery } from "@mui/material";

import styles from "./Dashboard.module.scss";
import { Spinner } from "../Spinner/Spinner";
import { DashboardStats } from "./DashboardStats";
import { MobileTrainCards } from "../Trains/MobileTrainCards";
import { useTrainStore } from "@/stores/useTrainStore";

const DasboardComponent = () => {
  const { trains, loading, fetchSortedTrains } = useTrainStore();
  const isMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    if (!trains.length) {
      fetchSortedTrains();
    }
  }, [trains.length, fetchSortedTrains]);
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
