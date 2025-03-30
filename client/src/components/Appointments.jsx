import React from "react";
import { InlineWidget } from "react-calendly";

function Appointments() {
  return (
    <div className="my-7 min-h-screen max-h-auto">
      <InlineWidget
        url="https://calendly.com/info-plant-nursry/a-r-landscape-1" // Replace with your Calendly link
        rootElement={document.getElementById("root")}
        text="Schedule Appointment"
        textColor="#ffffff"
        color="#00a2ff"
      />
    </div>
  );
}

export default Appointments;
