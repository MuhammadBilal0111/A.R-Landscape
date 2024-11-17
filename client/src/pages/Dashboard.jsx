import * as React from "react";
import { NAVIGATION } from "../utils/constant";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { extendTheme } from "@mui/material/styles";

const demoTheme = extendTheme({
  colorSchemes: { light: true },
  colorSchemeSelector: "class",
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
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}
const CustomThemeSwitcher = () => {
  return <></>;
};
export default function DashboardLayoutBasic() {
  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="/logo.jpg" />,
        title: <span style={{ color: "#4caf50" }}>A. R Landscape</span>,
      }}
      theme={demoTheme}
    >
      <DashboardLayout slots={{ toolbarActions: CustomThemeSwitcher }}>
        <PageContainer></PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
