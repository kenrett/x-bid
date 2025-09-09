import logo from "../images/xbid_logo.png";

interface User {
  email_address: string;
  role: string;
}

interface HeaderProps {
  user: User | null;
  onSignInClick: () => void;
}

export function Header({ user, onSignInClick }: HeaderProps) {
  const isAdmin = user?.role === "admin";

  return (
    <header className={`w-full border-2 border-black flex items-center justify-between ${isAdmin ? 'bg-red-500' : ''}`}>
      <div>
        <a href="/">
          <img src={logo} alt="X-Bid Logo" className="h-36" />
        </a>
      </div>
      <div className="flex items-center space-x-4 pr-4">
        {user ? (
          <>
            <span className="text-white">Hello, {user.email_address}!</span>
            <a href="/session" data-turbo-method="delete" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log Out</a>
          </>
        ) : (
          <button onClick={onSignInClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
        )}
      </div>
    </header>
  );
}
