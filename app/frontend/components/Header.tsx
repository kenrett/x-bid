import logo from '../images/xbid_logo.png';

export default function Header() {

	return (
		<header>
			<a href="/">
				<img src={logo} alt="X-Bid Logo" style={{ height: '150px' }} />
			</a>
		</header>
	);
}
