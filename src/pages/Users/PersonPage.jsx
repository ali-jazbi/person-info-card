import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
	const navigate = useNavigate();
	const [imageLoaded, setImageLoaded] = useState(false);

	const peopleQuery = useQuery({
		queryKey: ['user', id],
		queryFn: async () => {
			// If user not found in localStorage, fetch from API
			try {
				const response = await axios.get(`https://dummyjson.com/users/${id}`);
				return response.data;
			} catch (error) {
				console.error('Error fetching user data:', error);
				throw new Error('User not found');
			}
		},
		retry: false,
		onError: (error) => {
			console.error('Error in query:', error);
			navigate('/');
		},
	});

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

	if (!peopleQuery.data) {
		return <Typography>No user data available</Typography>;
	}

	const { firstName, lastName, email, gender, age } = peopleQuery.data;

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
							{firstName} {lastName}
							{gender === 'male' ? (
								<MaleIcon color='primary' />
							) : (
								<FemaleIcon color='secondary' />
							)}
						</Typography>
						{!imageLoaded && (
							<Skeleton
								variant='rectangular'
								width={300}
								height={200}
								animation='wave'
								sx={{ marginTop: 2, marginBottom: 2 }}
							/>
						)}
						<Box
							component='img'
							src={`https://dummyjson.com/image/400x200/008080/ffffff?fontFamily=pacifico&text=${
								firstName + ' ' + lastName
							}`}
							onLoad={() => setImageLoaded(true)}
							alt={`Avatar of ${firstName} ${lastName}`}
							sx={{
								width: '300px',
								height: '200px',
								objectFit: 'cover',
								borderRadius: '8px',
								marginTop: 2,
								marginBottom: 2,
								display: imageLoaded ? 'block' : 'none',
								boxShadow: '5px 5px 3px 1px #c4c4c4',
							}}
						/>
						<Typography
							variant='h6'
							component={'p'}
							sx={{ marginTop: 2, marginBottom: 2 }}>
							{email}
						</Typography>
						<Typography
							variant='body1'
							component={'p'}>
							Age: {age}
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
