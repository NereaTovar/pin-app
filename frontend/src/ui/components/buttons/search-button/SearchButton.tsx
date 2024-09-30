import searchIcon from "../../../../assets/icons/Search_24.svg";
import './SearchButton.scss';

interface Props {
  onClick?: () => void;
}

export default function SearchButton({ onClick }: Props) {
  return (
    <button
      className="search__button"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img alt="SVG search button" src={searchIcon} />
    </button>
  );
}
