import { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Box,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PersonCard = ({ person }) => {

	const handleDelete = useCallback((id) => {
	// api call
	}, []);

	return (
		<Card
			elevation={3}
			sx={{
				'&:hover': { boxShadow: 6 },
				maxWidth: 345,
				height: '100%',
			}}>
			<CardMedia
				sx={{ height: 150, objectFit: 'cover' }}
				image={`https://picsum.photos/id/${person.id + 10}/200/300`}
				title={person.name}
			/>
			<CardContent>
				<Typography
					gutterBottom
					variant='h6'
					sx={{ whiteSpace: 'nowrap' }}
					component='div'>
					{person.name}
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'>
					{person.email}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
					{person.gender === 'male' ? (
						<MaleIcon color='primary' />
					) : (
						<FemaleIcon color='error' />
					)}{' '}
					<Typography
						variant='body2'
						sx={{ ml: 1 }}>
						Age: {person.age}
					</Typography>
				</Box>
			</CardContent>
			<CardActions sx={{ m: 1 }}>
				<Button
					component={RouterLink}
					to={`/user/${person.id}`}
					variant='contained'
					size='small'
					color='info'
					sx={{
						'&:hover': {
							bgcolor: 'info.dark',
							color: 'white',
						},
					}}>
					More Info
				</Button>
				<Button
					variant='outlined'
					size='small'
					color='error'
					onClick={() => handleDelete(person.id)}
					sx={{
						'&:hover': {
							bgcolor: 'error.dark',
							color: 'white',
						},
					}}>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default PersonCard;
