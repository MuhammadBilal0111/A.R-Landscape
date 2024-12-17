import React from "react";
import { InlineWidget } from "react-calendly";

const Appointment = () => {
  return (
    <div className="min-h-screen">
      <h2 className="font-bold text-6xl text-center text-gray-500  py-6">Book Your Appointment</h2>
      <InlineWidget
        url="https://calendly.com/m-bilal0111/project" // Replace with your Calendly link
        rootElement={document.getElementById("root")}
        text="Schedule Appointment"
        textColor="#ffffff"
        color="#00a2ff"
      />
    </div>
  );
};

export default Appointment;
