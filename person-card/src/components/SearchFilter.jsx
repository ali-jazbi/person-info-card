import { useState, useEffect, useRef, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import {
	Button,
	Typography,
	Grid,
	InputBase,
	Box,
	IconButton,
	Radio,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	FormControl,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
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

const SearchFilter = ({ page, setPage }) => {
	// URL params and state
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
	const [searchInput, setSearchInput] = useState('');
	const [genderFilter, setGenderFilter] = useState(
		searchParams.get('gender') || 'all'
	);
	const [ageFilter, setAgeFilter] = useState(searchParams.get('age') || 'all');
	const searchInputRef = useRef(null);

	// Event handlers
	const handleReset = useCallback(() => {
		setSearchInput('');
		setSearchTerm('');
		setGenderFilter('all');
		setAgeFilter('all');
		setPage(1);
		setSearchParams(new URLSearchParams());
	}, [setSearchParams, setPage]);

	const handleAgeFilterChange = useCallback(
		(event) => {
			setAgeFilter(event.target.value);
			setPage(1);
		},
		[setPage]
	);

	const handleGenderFilterChange = useCallback(
		(event) => {
			setGenderFilter(event.target.value);
			setPage(1);
		},
		[setPage]
	);

	const handleSearchChange = useCallback((event) => {
		setSearchInput(event.target.value);
	}, []);

	const handleSearch = useCallback(() => {
		setSearchTerm(searchInput);
		setPage(1);
	}, [searchInput, setPage]);

	const handleClearSearch = useCallback(() => {
		setSearchInput('');
		setSearchTerm('');
		setPage(1);
		searchInputRef.current.focus();
	}, [setPage]);

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
				</Box>
			</Grid>

			{/* Filters */}
			<Grid
				item
				xs={12}>
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
			</Grid>
		</Grid>
	);
};

export default SearchFilter;
