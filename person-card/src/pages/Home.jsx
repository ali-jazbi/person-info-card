import { useState } from 'react';
import { Container, Grid, Pagination, Box } from '@mui/material';
import PersonCard from '../components/PersonCard';
import SearchFilter from '../components/SearchFilter';
import DialogBox from '../components/DialogBox';
import LoadingSkeletons from '../components/LoadingSkeletons';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const ITEMS_PER_PAGE = 4;

const Home = () => {
	// Data fetching
	const peopleQuery = useQuery({
		queryKey: ['people'],
		queryFn: () => {
			return axios
				.get('https://jsonplaceholder.typicode.com/users')
				.then((response) => {
					return response.data;
				});
		},
	});
	// Pagnation And Pages
	const [searchParams] = useSearchParams();
	const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);
	const handlePageChange = (newPage) => {
		setPage(newPage);
	};
	const paginatedData = peopleQuery.data
		? peopleQuery.data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
		: [];
	const pageCount = peopleQuery.data
		? Math.ceil(peopleQuery.data.length / ITEMS_PER_PAGE)
		: 0;

	// Main render
	return (
		<Container
			sx={{ minHeight: 'calc(100vh - 64px)', paddingTop: 4, paddingBottom: 5 }}>
			<Grid
				container
				spacing={3}>
				{/* Header and Search and Filter */}
				<SearchFilter
					page={page}
					setPage={setPage}
				/>
				{/* Dialog Box Show */}
				<Grid
					item
					xs={12}>
					<DialogBox />
				</Grid>
				{/* Card Group */}
				<Grid
					item
					xs={12}>
					{peopleQuery?.isLoading ? (
						<LoadingSkeletons />
					) : (
						<>
							<Grid
								container
								spacing={3}>
								{paginatedData.map((person) => (
									<Grid
										item
										xs={12}
										sm={6}
										md={3}
										key={person.id}>
										<PersonCard person={person} />
									</Grid>
								))}
							</Grid>
							{peopleQuery?.data && peopleQuery.data.length > 0 && (
								<Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
									<Pagination
										count={pageCount}
										page={page}
										onChange={(event, value) => handlePageChange(value)}
										disabled={pageCount <= 1}
										color='primary'
									/>
								</Box>
							)}
						</>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
