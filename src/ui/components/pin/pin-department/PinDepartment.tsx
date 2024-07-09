import { departmentColors, departmentTexts } from "@/utils/departmentUtils";

interface PinDepartmentProps {
  department: string;
}

const PinDepartment = ({ department }: PinDepartmentProps) => {
  const color = departmentColors[department] || "#000000";
  const text = departmentTexts[department] || department;

  // Split the text into two lines if it exceeds a certain length
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
          y={`${50 + (index - (lines.length - 1) / 2) * 14}%`} // Adjusted for separation
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
  );
};

export default PinDepartment;
