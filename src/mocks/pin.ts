import SummerEvent from "@/assets/pins/Summer_event.svg";
import SuperReferral from "@/assets/pins/Super_referral.svg";
import TopPicker from "@/assets/pins/Top_picker.svg";

export interface DetailedPin {
  id: string;
  imagePin: string;
  pinTitle: string;
  pinDescription: string;
}

export const pinMock: DetailedPin[] = [
  {
    id: "1",
    imagePin: SummerEvent,
    pinTitle: "Summer Event 2024",
    pinDescription:
      "The 'Event Summer 2024' pin is awarded for attending the Event organized by Company in September 2024. Congratulations!",
  },
  {
    id: "2",
    imagePin: SuperReferral,
    pinTitle: "Super Referral",
    pinDescription:
      "It is a special recognition awarded to those employees who have demonstrated exceptional commitment to Company' growth and development by consistently referring high quality candidates. This pin symbolizes their dedication, insight in identifying talent and their crucial role in building a strong and dynamic team. You get this pin with 3 excellent referrals.",
  },
  {
    id: "3",
    imagePin: TopPicker,
    pinTitle: "Top Picker",
    pinDescription:
      "It is a special recognition given to those employees who have participated in a Picker session. Thank you for sharing with the entire Company family.",
  },
];
