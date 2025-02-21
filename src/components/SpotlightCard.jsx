import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
} from '@mui/material';

const SpotlightCard = () => {
	const [people, setPeople] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/users'
			);
			const users = response.data.slice(4);

			const peopleWithImages = users.map((person) => ({
				...person,
				imageUrl: `https://picsum.photos/id/${person.id + 10}/200/300`,
			}));
			setPeople(peopleWithImages);
		} catch (error) {
			console.error('خطا در دریافت اطلاعات:', error);
		}
	};
	const handleDelete = (id) => {
		setPeople(people.filter((person) => person.id !== id));
	};
	return (
		<Grid
			container
			spacing={3}>
			{people.map((person) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					key={person.id}>
					<Card
						elevation={3}
						sx={{
							'&:hover': { boxShadow: 6 },
							maxWidth: 345,
							height: '100%',
						}}>
						<CardMedia
							sx={{ height: 200, objectFit: 'cover' }}
							image={person.imageUrl}
							title={person.name}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant='h5'
								component='div'>
								{person.name}
							</Typography>
							<Typography
								variant='body2'
								color='text.secondary'>
								{person.email}
							</Typography>
						</CardContent>
						<CardActions sx={{ m: 1 }}>
							<Button
								variant='contained'
								size='small'>
								Share
							</Button>
							<Button
								variant='outlined'
								onClick={() => handleDelete(person.id)}
								size='small'
								color='danger'
								sx={{
									'&:hover': {
										bgcolor: (theme) => theme.palette.danger.main,
										color: 'white',
									},
								}}>
								Delete
							</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default SpotlightCard;
