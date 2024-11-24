import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DownToUpRows = () => {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-5 py-10">
      <h1 className="text-4xl font-bold mb-12">E-commerce Cards</h1>
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
                  src={`https://via.placeholder.com/200?text=Card+${
                    rowIndex * 3 + cardIndex + 1
                  }`}
                  alt={`Card ${rowIndex * 3 + cardIndex + 1}`}
                  className="w-40 h-40 object-cover mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">
                  Card {rowIndex * 3 + cardIndex + 1}
                </h2>
                <p className="text-gray-600 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownToUpRows;
