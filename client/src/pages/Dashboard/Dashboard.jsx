import React, { useState } from "react";
import { NAVIGATION } from "../../utils/constant";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Order from "./components/Order";
import { Link } from "react-router-dom";
import AddItem from "./components/AddItem/AddItems";
const demoTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Green color for primary actions
    },
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#4caf50", // Green color for all icons
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
// to remove the light icon
const CustomThemeSwitcher = () => {
  return <></>;
};
export default function DashboardLayoutBasic() {
  const [pathname, setPathname] = useState("/dashboard");
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider
      router={router}
      navigation={NAVIGATION}
      branding={{
        logo: (
          <Link to={"/"}>
            <img src="/plant_logo.png" />
          </Link>
        ),
        title: (
          <Link to={"/"}>
            <span className="text-[rgb(45,136,48)] truncate">
              A. R Landscape
            </span>
          </Link>
        ),
      }}
      theme={demoTheme}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh", // Full viewport height
        }}
      >
        <DashboardLayout slots={{ toolbarActions: CustomThemeSwitcher }}>
          {pathname === "/orders" && <Order />}
          {/* dashboard link for adding the items in database */}
          {pathname === "/dashboard" && <AddItem />}
        </DashboardLayout>
      </Box>
    </AppProvider>
  );
}
