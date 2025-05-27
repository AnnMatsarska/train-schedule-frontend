"use client";

import React, { useEffect } from "react";
import { TrainTable } from "../Trains/TrainsTable";
import { Box, Pagination, Typography, useMediaQuery } from "@mui/material";

import styles from "./Dashboard.module.scss";
import { Spinner } from "../Spinner/Spinner";
import { DashboardStats } from "./DashboardStats";
import { MobileTrainCards } from "../Trains/MobileTrainCards";
import { useTrainStore } from "@/stores/useTrainStore";

const DasboardComponent = () => {
  const {
    trains,
    loading,
    total,
    page,
    limit,
    setPage,
    fetchSortedTrains,
    allTrains,
    fetchAllTrains,
  } = useTrainStore();

  const isMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    if (!trains.length) fetchSortedTrains();
    if (!allTrains.length) fetchAllTrains();
  }, [trains.length, allTrains.length, fetchSortedTrains, fetchAllTrains]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <DashboardStats trains={allTrains} />
      </div>

      {loading ? (
        <Spinner />
      ) : trains.length > 0 ? (
        isMobile ? (
          <>
            <MobileTrainCards trains={trains} />
            {total > limit && (
              <Box display="flex" justifyContent="center" mt={4} mb={4}>
                <Pagination
                  count={Math.ceil(total / limit)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        ) : (
          <>
            <TrainTable trains={trains} />
            {total > limit && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil(total / limit)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
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
