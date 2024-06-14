import summerEvent from '@/assets/pins/Summer_event.svg';


export default function PinLogo() {
  return (
    <button className="pinlogo__button" type="button">
      <img alt="SVG pinLogo" src={summerEvent} />
    </button>
  );
}