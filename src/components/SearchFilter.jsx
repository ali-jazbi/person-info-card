import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
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

const SearchFilter = ({}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = useState(searchParams.get('search') ?? '');
	const [searchDebounced] = useDebounce(search, 1000);

	// Event handlers
	const handleReset = () => {
		setSearchParams(new URLSearchParams());
		handleClearSearch();
	};

	const handleAgeFilterChange = (event) => {
		setSearchParams((params) => {
			params.set('age', event.target.value);
			return params;
		});
	};

	const handleGenderFilterChange = (event) => {
		setSearchParams((params) => {
			params.set('gender', event.target.value);
			return params;
		});
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		setSearchParams((params) => {
			if (searchDebounced?.length > 1) {
				params.set('search', searchDebounced);
			} else {
				params.delete('search');
			}
			return params;
		});
	}, [searchDebounced]);

	const handleClearSearch = () => {
		setSearch('');
	};

	// Main render
	return (
		<Grid
			container
			spacing={3}
			mt={2}>
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
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
							value={search}
							onChange={handleSearchChange}
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
							value={searchParams.get('gender')}
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
							value={searchParams.get('age')}
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
