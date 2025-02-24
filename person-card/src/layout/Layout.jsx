import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<div>
			<Header
				// darkMode={darkMode}
				// toggleDarkMode={btnDarkMode}
			/>
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
