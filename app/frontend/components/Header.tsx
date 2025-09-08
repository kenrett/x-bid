import logo from "../images/xbid_logo.png";

export function Header() {
  return (
    <header className="w-full border-2 border-black">
      <a href="/">
        <img src={logo} alt="X-Bid Logo" className="h-36" />
      </a>
    </header>
  );
}
