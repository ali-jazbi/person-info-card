import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
	LinearProgress,
	Container,
} from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RefreshData from './RefreshData';

const SpotlightCard = () => {
	const queryClient = useQueryClient();
	const peopleQuery = useQuery({
		queryKey: ['people'],
		queryFn: () =>
			axios
				.get('https://jsonplaceholder.typicode.com/users')
				.then(({ data }) => data.slice(0)),
	});
	return (
		<Grid
			container
			spacing={3}>
			{peopleQuery?.isLoading ? (
				<Grid xs={12}>
					<LinearProgress />
				</Grid>
			) : (
				<>
					<Grid
						item
						xs={12}>
						<RefreshData />
					</Grid>
					{peopleQuery?.data?.map((person) => (
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
									image={`https://picsum.photos/id/${person.id + 10}/200/300`}
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
										component={RouterLink}
										to={`/user/${person.id}`}
										variant='contained'
										size='small'
										color='info'
										sx={{
											'&:hover': {
												bgcolor: (theme) => theme.palette.danger.main,
												color: 'white',
											},
										}}>
										More Info
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</>
			)}
		</Grid>
	);
};

export default SpotlightCard;
