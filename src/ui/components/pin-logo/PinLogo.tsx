interface PinLogoProps {
  imagePin: string;
}

const PinLogo = ({ imagePin }: PinLogoProps) => (
  <img src={imagePin} alt="Pin" style={{ width: '100%', height: '100%' }} />
);

export default PinLogo;


