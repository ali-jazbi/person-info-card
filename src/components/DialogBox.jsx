import { useState, useCallback } from 'react';
import {
	Button,
	Grid,
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const DialogBox = () => {
	const [people, setPeople] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		age: '',
		gender: '',
	});
	const handleClickOpen = useCallback(() => {
		setOpenDialog(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpenDialog(false);
		setFormData({ name: '', email: '', age: '', gender: '' }); // Reset form data
	}, []);
	const handleInputChange = useCallback((event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}, []);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			const newPerson = {
				...formData,
				id: people.length + 1,
			};
			setPeople((prevPeople) => [...prevPeople, newPerson]);

			// ذخیره کاربر جدید در localStorage
			const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
			localStorage.setItem('users', JSON.stringify([...storedUsers, newPerson]));

			console.log(newPerson);
			handleClose();
		},
		[formData, handleClose, people]
	);

	// Main render
	return (
		<Grid
			item
			xs={12}>
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
				<Button
					onClick={handleClickOpen}
					variant='contained'
					color='secondary'
					startIcon={<AddIcon />}
					sx={() => ({
						// ... سایر استایل‌ها
					})}>
					Add Item
				</Button>

				<Dialog
					open={openDialog}
					onClose={handleClose}>
					<form onSubmit={handleSubmit}>
						<DialogTitle>Add New Person</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Please enter the details of the new person.
							</DialogContentText>
							<TextField
								autoFocus
								required
								margin='dense'
								id='name'
								name='name'
								label='Name'
								type='text'
								fullWidth
								variant='standard'
								value={formData.name}
								onChange={handleInputChange}
							/>
							<TextField
								required
								margin='dense'
								id='email'
								name='email'
								label='Email Address'
								type='email'
								fullWidth
								variant='standard'
								value={formData.email}
								onChange={handleInputChange}
							/>
							<TextField
								required
								margin='dense'
								id='age'
								name='age'
								label='Age'
								type='number'
								fullWidth
								variant='standard'
								InputProps={{ inputProps: { min: 0, max: 120 } }}
								value={formData.age}
								onChange={handleInputChange}
							/>
							<FormControl
								fullWidth
								margin='dense'>
								<InputLabel id='gender-label'>Gender</InputLabel>
								<Select
									labelId='gender-label'
									id='gender'
									name='gender'
									label='Gender'
									value={formData.gender}
									onChange={handleInputChange}
									required>
									<MenuItem value='male'>Male</MenuItem>
									<MenuItem value='female'>Female</MenuItem>
									<MenuItem value='other'>Other</MenuItem>
								</Select>
							</FormControl>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button type='submit'>Add</Button>
						</DialogActions>
					</form>
				</Dialog>
			</Box>
		</Grid>
	);
};

export default DialogBox;
