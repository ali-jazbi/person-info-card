import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
	CssBaseline,
	LinearProgress,
	Container,
	Box,
} from '@mui/material';
const PersonPage = () => {
	const { id } = useParams();
	const peopleQuery = useQuery({
		queryKey: ['user', id],

		queryFn: () =>
			axios
				.get(`https://jsonplaceholder.typicode.com/users/${id}`)
				.then(({ data }) => data),
	});
	if (peopleQuery.isLoading) {
		return <LinearProgress />;
	}
	if (peopleQuery.isError) {
		return (
			<Typography color='error'>Error: {peopleQuery.error.message}</Typography>
		);
	}
	return (
		<div>
			<CssBaseline />
			<Container>
				<Grid
					container
					spacing={3}
					sx={{ minHeight: 'calc(100vh - 92px)', paddingTop: 4, paddingBottom: 5 }}>
					<Grid
						item
						xs={8}>
						<Typography
							variant='h4'
							component={'h1'}>
							Dynamic Page of {peopleQuery.data?.name}
						</Typography>
						<Box
							component='img'
							src={`https://picsum.photos/id/${peopleQuery.data?.id + 10}/200/300`}
							alt={`Avatar of ${peopleQuery.data?.name}`}
							sx={{
								width: '300px',
								height: '200px',
								borderRadius: '8px',
								marginTop: 2,
								marginBottom: 2,
							}}
						/>
						<Typography
							variant='h6'
							component={'p'}
							sx={{ marginTop: 2, marginBottom: 2 }}>
							{peopleQuery.data?.email}
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default PersonPage;
