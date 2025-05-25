import { CircularProgress, Box } from "@mui/material";

export const Spinner = ({ fullPage = false }: { fullPage?: boolean }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={fullPage ? "100vh" : "100%"}
      width="100%"
      mt="auto"
      mb="auto"
    >
      <CircularProgress color="primary" />
    </Box>
  );
};
