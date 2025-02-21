import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = ({ darkMode, toggleDarkMode }) => {
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
					Person Management
				</Typography>
				<IconButton onClick={toggleDarkMode}>
					{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
