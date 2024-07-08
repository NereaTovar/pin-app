interface PinDepartmentProps {
  department: string;
}

const departmentColors: { [key: string]: string } = {
  "IT Ströer": "#808080",
  "IT Douglas": "#99FFFF",
  "IT Auxmoney": "#3357FF",
  "IT Sonnen": "#685961",
  "IT C&A": "#CC0000",
  "IT OBI": "#FF6633",
  "IT Stibo DX": "#66CCCC",
  "People and Culture": "#4dd699",
  Management: "#4dd699",
  "IT Loyalty Partner Solutions": "#FFCC00",
  "IT Smurfit Kappa": "#66ccFF",
};

const departmentTexts: { [key: string]: string } = {
  "IT Ströer": "Ströer",
  "IT Douglas": "Douglas",
  "IT Auxmoney": "Auxmoney",
  "IT Sonnen": "Sonnen",
  "IT C&A": "C&A",
  "IT OBI": "OBI",
  "IT Stibo DX": "Stibo DX",
  "People and Culture": "Rindus",
  Management: "Rindus",
  "IT Loyalty Partner Solutions": "Loyalty Partner Solutions",
  "IT Smurfit Kappa": "Smurfit Kappa",
};

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
