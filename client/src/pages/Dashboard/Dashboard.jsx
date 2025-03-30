import React, { useState } from "react";
import { NAVIGATION } from "../../utils/constant";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Order from "./components/Order/Order";
import { Link } from "react-router-dom";
import AddItem from "./components/AddItem/AddItems";
import EditItems from "./components/EditItems/EditItems";
import OrderHistory from "./components/OrderHistory";
import Logout from "./components/Logout";
import EditProvince from "./components/EditItems/EditProvince";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AppProvider
        router={router}
        navigation={NAVIGATION}
        branding={{
          logo: (
            <Link to={"/"}>
              <img
                src="/plant_logo.png"
                alt="Image Not Found"
                loading="lazy"
                className="w-12 h-16"
              />
            </Link>
          ),
          title: (
            <span className="text-[rgb(45,136,48)] truncate">Admin Panel</span>
          ),
        }}
        theme={demoTheme}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh", // Full viewport height
            weight: "100%",
          }}
        >
          <DashboardLayout slots={{ toolbarActions: CustomThemeSwitcher }}>
            {pathname === "/add-item" && <AddItem />}
            {pathname === "/orders" && <Order />}

            {pathname === "/edit/plants" && <EditItems category={"plants"} />}
            {pathname === "/edit/pots" && <EditItems category={"pots"} />}
            {pathname === "/edit/fertilizers" && (
              <EditItems category={"fertilizers"} />
            )}
            {pathname === "/edit/province" && <EditProvince />}
            {pathname === "/ordersHistory" && <OrderHistory />}
            {pathname === "/logout" && <Logout />}
          </DashboardLayout>
        </Box>
      </AppProvider>
    </>
  );
}
