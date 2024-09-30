export const departmentColors: { [key: string]: string } = {
  "IT Ströer": "#1C2A4A",
  "IT Douglas": "#C2E4E2",
  "IT Auxmoney": "#0E79A0",
  "IT Sonnen": "#0A1621",
  "IT C&A": "#C60C30",
  "IT OBI": "#FF6225",
  "IT Stibo DX": "#171A40",
  "People and Culture": "#4dd699",
  Management: "#4dd699",
  "IT Loyalty Partner Solutions": "#808080",
  "IT Smurfit Kappa": "#2D9CDB",
};

export const departmentTexts: { [key: string]: string } = {
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

export const createDepartmentPin = (department: string) => {
  return {
    type: "Department",
    department,
    color: departmentColors[department] || "#000000",
  };
};
