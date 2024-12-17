import React from "react";
import { InlineWidget } from "react-calendly";

const Appointment = () => {
  return (
    <div className="min-h-screen">
      <h2 className="font-bold text-6xl text-center text-gray-500  mt-3">
        Book Your Appointments
      </h2>
      <InlineWidget
        url="https://calendly.com/m-bilal0111/a-r-landscape" // Replace with your Calendly link
        rootElement={document.getElementById("root")}
        text="Schedule Appointment"
        textColor="#ffffff"
        color="#00a2ff"
      />
    </div>
  );
};

export default Appointment;
