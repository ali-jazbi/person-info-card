import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import { Outlet, Link as RouterLink, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
	Container,
	Skeleton,
	Pagination,
	InputBase,
	Box,
	IconButton,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import RefreshIcon from '@mui/icons-material/Refresh';

// Styled components
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.background.custom,
	'&:hover': {
		backgroundColor: theme.palette.background.customHover,
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: '300px',
	},
	display: 'flex',
	alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 999,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: theme.palette.text.primary,
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		paddingRight: theme.spacing(4),
		width: '100%',
	},
}));

// Constants
const ITEMS_PER_PAGE = 4;

const SpotlightCard = () => {
	// URL params and state
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);
	const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
	const [searchInput, setSearchInput] = useState('');
	const [genderFilter, setGenderFilter] = useState(
		searchParams.get('gender') || 'all'
	);
	const [ageFilter, setAgeFilter] = useState(searchParams.get('age') || 'all');

	const searchInputRef = useRef(null);

	// Data fetching
	const peopleQuery = useQuery({
		queryKey: ['people'],
		queryFn: async () => {
			const { data } = await axios.get(
				'https://jsonplaceholder.typicode.com/users'
			);
			return data.map((user) => ({
				...user,
				gender: Math.random() > 0.5 ? 'male' : 'female',
				age: Math.floor(Math.random() * (70 - 18 + 1)) + 18,
			}));
		},
	});

	// Filter data based on search term, gender, and age
	const filteredData = peopleQuery?.data
		? peopleQuery.data.filter((person) => {
				const searchableFields = [person.name, person.email];
				const matchesSearch = searchableFields.some((field) =>
					field.toLowerCase().startsWith(searchTerm.toLowerCase())
				);
				const matchesGender =
					genderFilter === 'all' || person.gender === genderFilter;
				const matchesAge =
					ageFilter === 'all' ||
					(ageFilter === 'young' && person.age < 30) ||
					(ageFilter === 'old' && person.age >= 30);

				return matchesSearch && matchesGender && matchesAge;
		  })
		: [];

	// Pagination
	const paginatedData = filteredData.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	);
	const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

	// Event handlers
	const handleReset = useCallback(() => {
		setSearchInput('');
		setSearchTerm('');
		setGenderFilter('all');
		setAgeFilter('all');
		setPage(1);
		setSearchParams(new URLSearchParams());
	}, [setSearchParams]);

	const handleChangePage = useCallback((event, newPage) => {
		setPage(newPage);
	}, []);

	const handleAgeFilterChange = useCallback((event) => {
		setAgeFilter(event.target.value);
		setPage(1);
	}, []);

	const handleGenderFilterChange = useCallback((event) => {
		setGenderFilter(event.target.value);
		setPage(1);
	}, []);

	const handleSearchChange = useCallback((event) => {
		setSearchInput(event.target.value);
	}, []);

	const handleSearch = useCallback(() => {
		setSearchTerm(searchInput);
		setPage(1);
	}, [searchInput]);

	const handleClearSearch = useCallback(() => {
		setSearchInput('');
		setSearchTerm('');
		setPage(1);
		searchInputRef.current.focus();
	}, []);

	// Effects
	useEffect(() => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [searchInput]);

	useEffect(() => {
		const params = new URLSearchParams();
		if (page !== 1) params.append('page', page);
		if (searchTerm) params.append('search', searchTerm);
		if (genderFilter !== 'all') params.append('gender', genderFilter);
		if (ageFilter !== 'all') params.append('age', ageFilter);

		setSearchParams(params);
	}, [page, searchTerm, genderFilter, ageFilter, setSearchParams]);

	// Render functions
	const renderSearchBar = () => (
		<Search>
			<SearchIconWrapper>
				<IconButton
					onClick={handleSearch}
					sx={{
						position: 'absolute',
						left: 8,
						top: '50%',
						transform: 'translateY(-50%)',
					}}>
					<SearchIcon />
				</IconButton>
			</SearchIconWrapper>
			<StyledInputBase
				placeholder='Search…'
				inputProps={{ 'aria-label': 'search' }}
				value={searchInput}
				onChange={handleSearchChange}
				inputRef={searchInputRef}
			/>
			<IconButton
				sx={{
					padding: '10px',
					position: 'absolute',
					right: 10,
					top: '50%',
					transform: 'translateY(-50%)',
				}}
				aria-label='clear'
				onClick={handleClearSearch}>
				<ClearIcon />
			</IconButton>
		</Search>
	);

	const renderFilterControls = () => (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
			<Button
				variant='contained'
				color='primary'
				onClick={handleReset}
				startIcon={<RefreshIcon />}>
				Reset Filters
			</Button>
			<FormControl component='fieldset'>
				<FormLabel component='legend'>Filter by Gender</FormLabel>
				<RadioGroup
					row
					aria-label='gender'
					name='gender'
					value={genderFilter}
					onChange={handleGenderFilterChange}>
					<FormControlLabel
						value='all'
						control={<Radio />}
						label='All'
					/>
					<FormControlLabel
						value='male'
						control={<Radio />}
						label='Male'
					/>
					<FormControlLabel
						value='female'
						control={<Radio />}
						label='Female'
					/>
				</RadioGroup>
			</FormControl>
			<FormControl
				component='fieldset'
				sx={{ marginInline: '100px' }}>
				<FormLabel component='legend'>Filter by Age</FormLabel>
				<RadioGroup
					row
					aria-label='age'
					name='age'
					value={ageFilter}
					onChange={handleAgeFilterChange}>
					<FormControlLabel
						value='all'
						control={<Radio />}
						label='All'
					/>
					<FormControlLabel
						value='young'
						control={<Radio />}
						label='Young (< 30)'
					/>
					<FormControlLabel
						value='old'
						control={<Radio />}
						label='Old (≥ 30)'
					/>
				</RadioGroup>
			</FormControl>
		</Box>
	);

	const renderLoadingSkeletons = () => (
		<Grid
			container
			spacing={3}
			sx={{ margin: 1 }}>
			{[1, 2, 3].map((item) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					key={item}>
					<Card sx={{ maxWidth: 345, height: '100%' }}>
						<Skeleton
							variant='rectangular'
							height={200}
						/>
						<CardContent>
							<Skeleton
								variant='text'
								height={32}
								width='80%'
								sx={{ marginBottom: 1 }}
							/>
							<Skeleton
								variant='text'
								height={20}
								width='60%'
							/>
						</CardContent>
						<CardActions sx={{ m: 1 }}>
							<Skeleton
								variant='rectangular'
								width={70}
								height={36}
								sx={{ borderRadius: 1, marginRight: 1 }}
							/>
							<Skeleton
								variant='rectangular'
								width={90}
								height={36}
								sx={{ borderRadius: 1 }}
							/>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);

	const renderPersonCard = (person) => (
		<Grid
			item
			xs={12}
			sm={6}
			md={3}
			key={person.id}>
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
							<FemaleIcon color='secondary' />
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
						variant='contained'
						size='small'
						color='success'
						sx={{
							'&:hover': {
								bgcolor: 'success.dark',
								color: 'white',
							},
						}}>
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
								bgcolor: 'info.dark',
								color: 'white',
							},
						}}>
						More Info
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);

	const renderPagination = () => (
		<Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
			<Pagination
				count={pageCount}
				page={page}
				onChange={handleChangePage}
				disabled={pageCount <= 1}
				color='primary'
			/>
		</Box>
	);

	const renderNoResults = () => (
		<Typography
			variant='h6'
			sx={{ textAlign: 'center', mt: 4 }}>
			No results found for "{searchTerm}"
		</Typography>
	);

	// Main render
	return (
		<Grid
			container
			spacing={3}>
			{/* Header and Search */}
			<Grid
				item
				xs={12}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 2,
					}}>
					<Typography
						variant='h4'
						component='h1'>
						Person List
					</Typography>
					{renderSearchBar()}
				</Box>
			</Grid>

			{/* Filters */}
			<Grid
				item
				xs={12}>
				{renderFilterControls()}
			</Grid>

			{/* Card Group */}
			<Grid
				item
				xs={12}>
				{peopleQuery?.isLoading ? (
					renderLoadingSkeletons()
				) : (
					<>
						<Grid
							container
							spacing={3}>
							{paginatedData.map(renderPersonCard)}
						</Grid>
						{!peopleQuery.isLoading && filteredData.length > 0 && renderPagination()}
						{!peopleQuery.isLoading && filteredData.length === 0 && renderNoResults()}
					</>
				)}
			</Grid>
		</Grid>
	);
};

export default SpotlightCard;
