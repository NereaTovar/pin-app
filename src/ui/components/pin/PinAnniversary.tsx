import React from "react";

interface PinAnniversaryProps {
  number: number;
  color: string;
}

const PinAnniversary = ({ number, color }: PinAnniversaryProps) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="45"
      fill={color}
      stroke="#303140"
      strokeWidth="5"
    />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="36"
      fill="#ffffff"
      fontFamily="Arial"
      fontWeight="bold"
    >
      {number}
    </text>
  </svg>
);

export default PinAnniversary;
