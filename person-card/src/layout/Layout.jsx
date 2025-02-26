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
			<main
				style={{
					minHeight: 'calc(100vh - 116px)',
					paddingTop: 4,
					paddingBottom: 5,
				}}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
