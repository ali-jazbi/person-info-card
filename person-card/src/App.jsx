import { useState, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home.jsx';
import Layout from './layout/Layout';
import { Routes, Route } from 'react-router-dom';

export const ThemeContext = createContext();

function App() {
	const [darkMode, setDarkMode] = useState(false);

	const btnDarkMode = () => {
		setDarkMode(!darkMode);
	};

	const theme = createTheme({
		palette: {
			mode: darkMode ? 'dark' : 'light',
			primary: {
				main: '#1976d2',
			},
			danger: {
				main: '#f54336',
				contrastText: '#fff',
			},
		},
	});

	return (
		<ThemeContext.Provider value={{ darkMode, btnDarkMode }}>
			<ThemeProvider theme={theme}>
				<Routes>
					<Route
						path='/'
						element={<Layout />}>
						<Route
							index
							element={<Home />}
						/>
					</Route>
				</Routes>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default App;
