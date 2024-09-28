import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface SuperReferralPinProps {
  type: string; 
}

const SuperReferralPin = ({ type }: SuperReferralPinProps) => {
  return (
    <Tippy content={type} placement="top">
      <svg
        width="57.5"
        height="57.5"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: 'pointer' }} 
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" style={{ stopColor: "#7578EA", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#7578EA", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#grad1)" stroke="#ffffff" strokeWidth="24" />
        <g transform="translate(25, 15) scale(0.5)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 13C19.3137 13 22 14.6863 22 17V20H10V17C10 14.6863 12.6863 13 16 13ZM6 12C8.20914 12 10 10.2091 10 8C10 5.79086 8.20914 4 6 4C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 14C8.93913 14 12 15.3431 12 17V20H0V17C0 15.3431 3.06087 14 6 14Z"
            fill="#6e768d"
          />
        </g>
        <text
          x="50%"
          y="48%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="16"
          fill="#ffffff"
          fontFamily="Arial"
          fontWeight="bold"
        >
          Super
        </text>
        <text
          x="50%"
          y="66%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="16"
          fill="#ffffff"
          fontFamily="Arial"
          fontWeight="bold"
        >
          Referral
        </text>
      </svg>
    </Tippy>
  );
};

export default SuperReferralPin;
