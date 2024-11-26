import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { getPlantsDetails } from "../services/GlobalApi";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

  // setting the selected tab index from localStorage of browser
  const [value, setValue] = useState(() => {
    const localStorageSelectedTabIndex = localStorage.getItem("selectedTab");
    return localStorageSelectedTabIndex !== null
      ? localStorageSelectedTabIndex * 1
      : 0;
  });
  const [activeTab, setActiveTab] = useState("plants");

  const tabs = [
    { id: "plants", label: "Plants" },
    { id: "pots", label: "Pots" },
    { id: "fertilizers", label: "Fertilizers" },
  ];

  useEffect(() => {
    const rows = gsap.utils.toArray(".card-row"); // Select all rows

    rows.forEach((row) => {
      // Animate each row independently
      gsap.fromTo(
        row.children,
        { opacity: 0, y: 200 }, // Start below viewport
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2, // Cards animate one after another
          scrollTrigger: {
            trigger: row, // Trigger animation for the specific row
            start: "top 80%", // Start animation when row enters the viewport
            toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    getPlantsDetails(`?category=${categories[value]}`);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue);
    console.log(categories[newValue]);
    getPlantsDetails(`?category=${categories[newValue]}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        padding: "0 2.5rem",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", padding: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Plants" {...a11yProps(0)} />
          <Tab label="Pots" {...a11yProps(1)} />
          <Tab label="Fertilizers" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} sx={{ padding: 0 }}>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center px-5 py-10 w-full">
          {/* Tabs Container */}

          <div className="cards-container space-y-10 w-full overflow-hidden">
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="card-row flex flex-wrap justify-center gap-8"
              >
                {Array.from({ length: 3 }).map((_, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="ecommerce-card bg-white shadow-lg rounded-lg p-5 flex flex-col items-center w-full sm:w-[48%] lg:w-[30%]"
                  >
                    <img
                      src="plant_1.jpg"
                      alt={`Card ${rowIndex * 3 + cardIndex + 1}`}
                      className="w-40 h-40 object-cover mb-4 bg-black"
                    />
                    <h2 className="text-2xl font-semibold mb-2">
                      Card {rowIndex * 3 + cardIndex + 1}
                    </h2>
                    <p className="text-gray-600 text-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex w-full items-center justify-center gap-3 mt-2">
                      <button
                        type="button"
                        className="text-black hover:text-green-900 text-md py-2 px-1 rounded-md transition-all duration-150 w-full border hover:bg-gray-100 shadow-md"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="bg-green-900 hover:bg-green-950 text-white py-2 px-3 rounded-md transition-all duration-150 w-full font-medium focus:border-green-700 focus:outline-2"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Pots
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Fertilizers
      </CustomTabPanel>
    </Box>
  );
}
