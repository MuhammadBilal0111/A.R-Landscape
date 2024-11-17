import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // For consistent styling

// Create a custom theme with green as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#008000", // Hex color code for green
    },
  },
});

function ProvideTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ProvideTheme;
