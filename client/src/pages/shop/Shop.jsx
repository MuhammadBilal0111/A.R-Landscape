import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPlantsDetails } from "../../services/GlobalApi";
import ShopCard from "./components/ShopCard";
import { CircularProgress } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const categories = ["plants", "pots", "fertilizers"];

  const [value, setValue] = useState(() => {
    const localStorageSelectedTabIndex = localStorage.getItem("selectedTab");
    return localStorageSelectedTabIndex !== null
      ? parseInt(localStorageSelectedTabIndex, 10)
      : 0;
  });
  const [ItemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPlantsDetails(
          `?category=${categories[value]}`
        );
        setItemData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [value]);

  // code to handle gsap animation
  useEffect(() => {
    if (!ItemData.length) return; // Only animate if there are items to display

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".card-row");

      rows.forEach((row) => {
        if (!row.dataset.animated) {
          row.dataset.animated = true; // Mark as animated

          gsap.fromTo(
            row.children,
            { opacity: 0, y: 200 }, // Start below the viewport
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.2, // Cards animate one after another
              scrollTrigger: {
                trigger: row, // Trigger animation for the specific row
                start: "top 80%", // Start animation when the row enters the viewport
                toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
              },
            }
          );
        }
      });
    }, document.querySelector(".cards-container"));

    // Cleanup function
    return () => {
      ctx.revert(); // Revert the gsap context
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Kill all active ScrollTriggers
    };
  }, [ItemData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        padding: "0 0",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {categories.map((category, index) => (
            <Tab
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {categories.map((_, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          <div className="min-h-screen bg-gray-100 flex flex-col items-center px-5 py-10 w-full">
            <div className="cards-container space-y-10 w-full overflow-hidden">
              {!loading ? (
                <div className="card-row flex flex-wrap justify-center gap-8 py-4">
                  {ItemData.length > 0 ? (
                    ItemData.map((item, index) => (
                      <ShopCard key={index} item={item} />
                    ))
                  ) : (
                    <p>No items found.</p>
                  )}
                </div>
              ) : (
                <div className="flex justify-center w-full h-60">
                  <CircularProgress size={"70px"} />
                </div>
              )}
            </div>
          </div>
        </CustomTabPanel>
      ))}
    </Box>
  );
}
