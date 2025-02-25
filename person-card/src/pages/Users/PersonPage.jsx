import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
	Button,
	Typography,
	Grid,
	CssBaseline,
	Container,
	Box,
	Skeleton,
	Tooltip,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PersonPage = () => {
	const { id } = useParams();
	const [imageLoaded, setImageLoaded] = useState(false);

	const peopleQuery = useQuery({
		queryKey: ['user', id],
		queryFn: async () => {
			const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
			const storedUser = storedUsers.find((user) => user.id === parseInt(id));

			if (storedUser) {
				return storedUser;
			}

			const { data } = await axios.get(
				`https://jsonplaceholder.typicode.com/users/${id}`
			);
			return {
				...data,
				gender: Math.random() > 0.5 ? 'male' : 'female',
				age: Math.floor(Math.random() * (70 - 18 + 1)) + 18,
			};
		},
	});

	useEffect(() => {
		if (peopleQuery.data) {
			const img = new Image();
			img.src = `https://picsum.photos/id/${peopleQuery.data.id + 10}/200/300`;
			img.onload = () => setImageLoaded(true);
		}
	}, [peopleQuery.data]);

	if (peopleQuery.isLoading) {
		return (
			<Container>
				<Grid
					container
					spacing={3}
					sx={{ minHeight: 'calc(100vh - 92px)', paddingTop: 4, paddingBottom: 5 }}>
					<Grid
						item
						xs={8}>
						<Skeleton
							variant='text'
							sx={{ fontSize: '2.125rem', width: '60%', marginBottom: 2 }}
						/>
						<Skeleton
							variant='rectangular'
							width={300}
							height={200}
							sx={{ marginBottom: 2 }}
						/>
						<Skeleton
							variant='text'
							sx={{ fontSize: '1.25rem', width: '40%', marginBottom: 2 }}
						/>
						<Skeleton
							variant='text'
							sx={{ fontSize: '1rem' }}
						/>
						<Skeleton
							variant='text'
							sx={{ fontSize: '1rem' }}
						/>
						<Skeleton
							variant='text'
							sx={{ fontSize: '1rem', width: '80%' }}
						/>
					</Grid>
				</Grid>
			</Container>
		);
	}

	if (peopleQuery.isError) {
		return (
			<Typography color='error'>Error: {peopleQuery.error.message}</Typography>
		);
	}

	const userData = peopleQuery.data;

	return (
		<div>
			<CssBaseline />
			<Tooltip title='Back to Home'>
				<Button
					component={Link}
					to='/'
					variant='outlined'
					sx={{
						minWidth: 'auto',
						width: '35px',
						height: '35px',
						borderRadius: '50%',
						padding: 0,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						top: '95px',
						left: '300px',
						'&:hover': {
							bgcolor: 'primary.main',
							color: 'white',
						},
					}}>
					<FontAwesomeIcon
						icon='fa-solid fa-xmark'
						size='lg'
					/>
				</Button>
			</Tooltip>
			<Container>
				<Grid
					container
					spacing={3}
					sx={{ minHeight: 'calc(100vh - 92px)', paddingTop: 4, paddingBottom: 5 }}>
					<Grid
						item
						xs={8}>
						<Typography
							variant='h5'
							sx={{ fontSize: 27 }}
							component={'h1'}>
							{userData?.name}{' '}
							{userData?.gender === 'male' ? (
								<MaleIcon color='primary' />
							) : (
								<FemaleIcon color='secondary' />
							)}
						</Typography>
						{!imageLoaded ? (
							<Skeleton
								variant='rectangular'
								width={300}
								height={200}
								animation='wave'
								sx={{ marginTop: 2, marginBottom: 2 }}
							/>
						) : (
							<Box
								component='img'
								src={`https://picsum.photos/id/${userData?.id + 10}/200/300`}
								alt={`Avatar of ${userData?.name}`}
								sx={{
									width: '300px',
									height: '200px',
									objectFit: 'cover',
									borderRadius: '8px',
									marginTop: 2,
									marginBottom: 2,
								}}
							/>
						)}
						<Typography
							variant='h6'
							component={'p'}
							sx={{ marginTop: 2, marginBottom: 2 }}>
							{userData?.email}
						</Typography>
						<Typography
							variant='body1'
							component={'p'}
							sx={{ marginTop: 2, marginBottom: 2 }}>
							Age: {userData?.age}
						</Typography>
						<Typography
							variant='body1'
							component={'p'}
							sx={{ mt: 5 }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
							incidunt maxime laudantium commodi distinctio quis magnam odio unde?
							Expedita odio nam optio dolore nihil ullam provident reiciendis aliquam
							harum impedit?
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default PersonPage;
