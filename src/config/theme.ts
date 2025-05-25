import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#F9F9F9" },
    secondary: { main: "#8f4763" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default darkTheme;
