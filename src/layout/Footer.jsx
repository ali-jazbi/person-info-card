import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
	return (
		<Box
			component='footer'
			sx={{
				bgcolor: 'black',
				color: 'white',
				py: 2,
				bottom: 0,
				width: '100%',
			}}>
			<Container maxWidth='lg'>
				<Typography
					variant='body2'
					align='center'>
					Created by Ali Jazbi
				</Typography>
			</Container>
		</Box>
	);
};

export default Footer;
