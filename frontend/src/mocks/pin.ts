import SummerEvent24 from '../assets/pins/Summer_event24.svg';
import SuperReferral from "../assets/pins/Super_referral.svg";
import TopPicker from "../assets/pins/Top_picker.svg";
import Halloween24 from "../assets/pins/Halloween_event24.svg";
import ChristmasEvent24 from "../assets/pins/Christmas_event24.svg";

export interface DetailedPin {
  id: string;
  imagePin: string;
  pinTitle: string;
  pinDescription: string;
}

export const pinMock: DetailedPin[] = [
  {
    id: "summer_event_2024",
    imagePin: SummerEvent24,
    pinTitle: "Summer Event 2024",
    pinDescription:
      "The 'Event Summer 2024' pin is awarded for attending the Event organized by Rindus in September 2024. Congratulations!",
  },
  {
    id: "super_referral",
    imagePin: SuperReferral,
    pinTitle: "Super Referral",
    pinDescription:
      "It is a special recognition awarded to those employees who have demonstrated exceptional commitment to Company' growth and development by consistently referring high quality candidates. This pin symbolizes their dedication, insight in identifying talent and their crucial role in building a strong and dynamic team. You get this pin with 3 excellent referrals.",
  },
  {
    id: "top_picker",
    imagePin: TopPicker,
    pinTitle: "Top Picker",
    pinDescription:
      "It is a special recognition given to those employees who have participated in a Picker session. Thank you for sharing with the entire Rindus family.",
  },
  {
    id: "halloween_2024",
    imagePin: Halloween24,
    pinTitle: "Halloween Event 2024",
    pinDescription:
      "The 'Event Halloween 2024' pin is awarded for attending the Event organized by Rindus in October 2024. Congratulations!",
  },
  {
    id: "christams_event_2024",
    imagePin: ChristmasEvent24,
    pinTitle: "Chrismast Event 2024 ",
    pinDescription:
      "The 'Event Christmas 2024' pin is awarded for attending the Event organized by Rindus in November 2024. Congratulations!",
  },
];
