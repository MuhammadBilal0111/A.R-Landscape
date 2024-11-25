import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DownToUpRows = () => {
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

  return (
    <>
      <div className="flex items-center ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-3 text-lg font-semibold transition-all duration-300 rounded-md
          ${
            activeTab === tab.id
              ? " text-green-950   after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-green-950"
              : "bg-transparent text-gray-700 hover:bg-green-100 hover:text-green-800"
          }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center px-5 py-10">
        {/* Tabs Container */}

        <div className="cards-container space-y-10 max-w-7xl overflow-hidden">
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
    </>
  );
};

export default DownToUpRows;
