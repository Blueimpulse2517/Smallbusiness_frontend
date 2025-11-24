import React from "react";

interface MapButtonProps {
  url: string;
}

const MapButton: React.FC<MapButtonProps> = ({ url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img
        src="/assets/map-icon.png"   // <-- use this path
        alt="Map Icon"
        style={{ width: "35px", cursor: "pointer" }}
      />
    </a>
  );
};

export default MapButton;
