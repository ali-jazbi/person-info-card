import { useState, createContext } from 'react';
import {
	CssBaseline,
	ThemeProvider,
	createTheme,
	alpha,
	lighten,
} from '@mui/material';
import Home from './pages/Home.jsx';
import PersonPage from './pages/Users/PersonPage.jsx';
import Layout from './layout/Layout';
import { Routes, Route } from 'react-router-dom';
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
				main: '#3f51b5',
				light: '#757de8',
				dark: '#002984',
				contrastText: '#fff',
			},
			secondary: {
				main: '#80CBC4',
				light: '#B2FEF7',
				dark: '#4F9A94',
				contrastText: '#fff',
			},
			error: {
				main: '#f44336',
			},
			warning: {
				main: '#ff9800',
			},
			info: {
				main: '#2196f3',
			},
			success: {
				main: '#4caf50',
				contrastText: '#fff',
			},
			background: {
				default: darkMode ? '#303030' : '#fafafa',
				paper: darkMode ? '#424242' : '#fff',
			},
		},
		typography: {
			fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
			h1: {
				fontSize: '2.5rem',
				fontWeight: 500,
			},
			h2: {
				fontSize: '2rem',
				fontWeight: 500,
			},
			body1: {
				fontSize: '1rem',
				lineHeight: 1.5,
			},
		},
		shape: {
			borderRadius: 8,
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: 'none',
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
					},
				},
			},
		},
	});
	const backgroundColor = alpha(
		darkMode ? theme.palette.common.white : theme.palette.common.black,
		0.15
	);
	const hoverBackgroundColor = lighten(backgroundColor, 0.3);

	theme.palette.background.custom = backgroundColor;
	theme.palette.background.customHover = hoverBackgroundColor;

	return (
		<ThemeContext.Provider value={{ darkMode, btnDarkMode }}>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<CssBaseline />
					<Routes>
						<Route element={<Layout />}>
							<Route
								path='/'
								element={<Home />}
							/>
							<Route
								path='user/:id'
								element={<PersonPage />}
							/>
						</Route>
					</Routes>
				</QueryClientProvider>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default App;
