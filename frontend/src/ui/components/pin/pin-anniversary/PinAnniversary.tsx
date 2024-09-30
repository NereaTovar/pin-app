import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface PinAnniversaryProps {
  number: number;
  color: string;
  type: string; 
}

const PinAnniversary = ({ number, color, type }: PinAnniversaryProps) => {
  return (
    <Tippy content={type} placement="top">
      <svg
        width="57.5"
        height="57.5"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: 'pointer' }} 
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
          fontSize="21"
          fill="#ffffff"
          fontFamily="Arial"
          fontWeight="bold"
          className="pin-anniversary-text"
        >
          {number}
        </text>
      </svg>
    </Tippy>
  );
};

export default PinAnniversary;
