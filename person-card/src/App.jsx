import { useState, createContext } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home.jsx';
import Layout from './layout/Layout';
import { Routes, Route } from 'react-router-dom';
import PersonPage from './pages/Users/PersonPage.jsx';
export const ThemeContext = createContext();
import '/src/assets/js/solid.js';
import '/src/assets/js/light.js';
import '/src/assets/js/regular.js';
import '/src/assets/js/fontawesome.js';
import '/src/assets/js/duotone.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function App() {
	const [darkMode, setDarkMode] = useState(false);
	const queryClient = new QueryClient();
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
		<QueryClientProvider client={queryClient}>
			<CssBaseline />
			<ThemeContext.Provider value={{ darkMode, btnDarkMode }}>
				<ThemeProvider theme={theme}>
					<Routes>
						<Route element={<Layout />}>
							<Route
								path='/'
								element={<Home />}
							/>{' '}
							<Route
								path='user/:id'
								element={<PersonPage />}
							/>
						</Route>
					</Routes>
				</ThemeProvider>
			</ThemeContext.Provider>
		</QueryClientProvider>
	);
}

export default App;
