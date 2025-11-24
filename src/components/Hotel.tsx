import React from "react";
import MapButton from "./MapButton";

const Hotel: React.FC = () => {
  return (
    <section id="hotel" className="py-16 px-6">
      <h2 className="text-4xl font-bold mb-4">Our Hotel Location</h2>
      <p className="text-gray-300 mb-6">
        Click the map icon below to view our hotel location.
      </p>

      <MapButton url="https://www.google.com/maps/place/Sapna+Book+House/data=!4m2!3m1!1s0x0:0x9e85b191a60cf5a1?sa=X&ved=1t:2428&ictx=111" />
    </section>
  );
};

export default Hotel;

