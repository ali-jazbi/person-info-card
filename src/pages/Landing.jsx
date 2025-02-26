import React from 'react';
import { Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Landing = () => {
	return (
		<Container>
			<h1>Landing Page</h1>
			{/* Add your landing page content here */}
			<p>Welcome to the Person Info Card!</p>
			<p>
				This app is designed to display a list of people, their details, and a
				profile picture.
			</p>
			<p>Feel free to explore the features and test it out.</p>
			<Link to={`/people`}>
				<Button>Go to People Page</Button>
			</Link>
		</Container>
	);
};

export default Landing;
