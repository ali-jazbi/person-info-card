import { useState } from 'react';
import {
	ThemeProvider,
	createTheme,
	CssBaseline,
	Container,
	Typography,
	Grid,
	Skeleton,
} from '@mui/material';
import '/src/assets/js/solid.js';
import '/src/assets/js/light.js';
import '/src/assets/js/regular.js';
import '/src/assets/js/fontawesome.js';
import '/src/assets/js/duotone.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpotlightCard from '../components/SpotlightCard';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Home = () => {
	return (
		<div>
			<Container
				sx={{ minHeight: 'calc(100vh - 64px)', paddingTop: 4, paddingBottom: 5 }}>
				{/* <FontAwesomeIcon icon="fa-duotone fa-solid fa-spinner-third" spin /> */}

				<Typography
					variant='h4'
					component='h1'
					sx={{
						marginBottom: 3,
						fontSize: {
							xs: '1.5rem',
							sm: '1.75rem',
							md: '2.125rem',
						},
					}}>
					Person Management
				</Typography>
				<SpotlightCard />
			</Container>
		</div>
	);
};

export default Home;
