import React from "react";
import { PopupWidget } from "react-calendly";

const Appointment = () => {
  return (
    <div className="min-h-screen">
      <h2>Book Your Appointment</h2>
      <PopupWidget
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
