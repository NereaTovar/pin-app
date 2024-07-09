export const departmentColors: { [key: string]: string } = {
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
  