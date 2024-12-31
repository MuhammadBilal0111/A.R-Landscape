import React from "react";
import { InlineWidget } from "react-calendly";

function Appointments() {
  return (
    <div className="h-auto min-h-screen my-auto py-12">
      <InlineWidget
        url="https://calendly.com/m-bilal0111/a-r-landscape" // Replace with your Calendly link
        rootElement={document.getElementById("root")}
        text="Schedule Appointment"
        textColor="#ffffff"
        color="#00a2ff"
      />
    </div>
  );
}

export default Appointments;
