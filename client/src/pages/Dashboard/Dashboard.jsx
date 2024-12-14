import React, { useEffect, useState } from "react";
import { NAVIGATION } from "../../utils/constant";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";

import Dash from "./components/Dash";
import Order from "./components/Order";
import { Link } from "react-router-dom";
import AddItem from "./components/AddItem";
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
      <DashboardLayout slots={{ toolbarActions: CustomThemeSwitcher }}>
        {pathname === "/dashboard" && <Dash />}
        {pathname === "/orders" && <Order />}
        {pathname === "/addItem" && <AddItem />}
      </DashboardLayout>
    </AppProvider>
  );
}
