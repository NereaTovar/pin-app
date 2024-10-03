import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  departmentColors,
  departmentTexts,
} from "../../../../utils/departmentUtils";

interface PinDepartmentProps {
  department: string;
  type: string;
}

const PinDepartment = ({ department }: PinDepartmentProps) => {
  const color = departmentColors[department] || "#000000";
  const text = departmentTexts[department] || department;

  const words = text.split(" ");
  const maxLineLength = 8;
  const lines = [""];

  words.forEach((word) => {
    if (lines[lines.length - 1].length + word.length + 1 <= maxLineLength) {
      lines[lines.length - 1] += (lines[lines.length - 1] ? " " : "") + word;
    } else {
      lines.push(word);
    }
  });

  return (
    <Tippy content={`Department: ${text}`} placement="top">
      <svg
        width="57.5"
        height="57.5"
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
        {lines.map((line, index) => (
          <text
            key={index}
            x="50%"
            y={`${50 + (index - (lines.length - 1) / 2) * 14}%`}
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="14"
            fill="#ffffff"
            fontFamily="Arial"
            fontWeight="bold"
          >
            {line}
          </text>
        ))}
      </svg>
    </Tippy>
  );
};

export default PinDepartment;
