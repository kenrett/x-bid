import logo from "../images/xbid_logo.png";

interface HeaderProps {
  isAdmin: boolean;
}

export function Header({ isAdmin }: HeaderProps) {
  return (
    <header className={`w-full border-2 border-black ${isAdmin ? 'bg-red-500' : ''}`}>
      <a href="/">
        <img src={logo} alt="X-Bid Logo" className="h-36" />
      </a>
    </header>
  );
}
