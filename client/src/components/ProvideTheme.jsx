import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // For consistent styling

// Create a custom theme with green as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#14532D", // Hex color code for green
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#064E3B", // Outline color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#14532D", // Outline color when focused
          },
        },
      },
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
