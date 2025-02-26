import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { Link } from 'react-router-dom';

const Header = () => {
	const { darkMode, btnDarkMode } = useContext(ThemeContext);
	return (
		<AppBar
			position='static'
			sx={{
				width: '100%',
				bgcolor: 'info',
				color: 'white',
				boxShadow: 'none',
			}}>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0 16px',
				}}>
				<Typography
					variant='h6'
					sx={{
						fontWeight: 'bold',
					}}>
					<Link
						style={{ color: 'white', textDecoration: 'none' }}
						to={`/`}>
						Person Management
					</Link>
					<Link
						style={{ color: 'white', textDecoration: 'none', marginInline: '50px' }}
						to={`/Login`}>
						Login
					</Link>
				</Typography>
				<IconButton onClick={btnDarkMode}>
					{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
