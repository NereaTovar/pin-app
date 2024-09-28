// export interface Pin {
//   type: string;
//   date_hire?: string;
//   color?: string;
//   imagePin?: string;
//   number?: number;
//   color_hire?: string;
//   department?: string;
// }

export interface Pin {
  type: string; // Asegúrate de que esta propiedad esté definida
  pinTitle?: string;
  pinDescription?: string;
  imagePin?: string;
  eventDate?: string;
  color?: string;
  department?: string;
  date_hire?: string;
}