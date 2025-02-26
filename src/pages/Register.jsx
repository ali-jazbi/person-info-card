import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	TextField,
	Button,
	Box,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormHelperText,
	Grid,
} from '@mui/material';

const Register = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log('اطلاعات ثبت‌نام:', data);
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				maxWidth: 800,
				mx: 'auto',
				mt: 5,
				p: 3,
				boxShadow: 3,
				borderRadius: 2,
			}}>
			<Grid
				container
				spacing={2}>
				<Grid
					item
					xs={12}
					sm={6}>
					<Controller
						name='Email'
						control={control}
						defaultValue=''
						rules={{
							required: 'ایمیل الزامی است',
							pattern: { value: /^\S+@\S+\.\S+$/, message: 'ایمیل معتبر نیست' },
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='ایمیل'
								fullWidth
								margin='normal'
								error={!!errors.Email}
								helperText={errors.Email?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}>
					<Controller
						name='NationalCode'
						control={control}
						defaultValue=''
						rules={{ required: 'کد ملی الزامی است' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='کد ملی'
								fullWidth
								margin='normal'
								error={!!errors.NationalCode}
								helperText={errors.NationalCode?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}>
					<Controller
						name='Password'
						control={control}
						defaultValue=''
						rules={{
							required: 'رمز عبور الزامی است',
							minLength: { value: 6, message: 'رمز عبور باید حداقل 6 کاراکتر باشد' },
						}}
						render={({ field }) => (
							<TextField
								{...field}
								type='password'
								label='رمز عبور'
								fullWidth
								margin='normal'
								error={!!errors.Password}
								helperText={errors.Password?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}>
					<Controller
						name='FirstName'
						control={control}
						defaultValue=''
						rules={{ required: 'نام الزامی است' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='نام'
								fullWidth
								margin='normal'
								error={!!errors.FirstName}
								helperText={errors.FirstName?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}>
					<Controller
						name='LastName'
						control={control}
						defaultValue=''
						rules={{ required: 'نام خانوادگی الزامی است' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='نام خانوادگی'
								fullWidth
								margin='normal'
								error={!!errors.LastName}
								helperText={errors.LastName?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}>
					<Controller
						name='CellPhone'
						control={control}
						defaultValue=''
						rules={{ required: 'شماره موبایل الزامی است' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='شماره موبایل'
								fullWidth
								margin='normal'
								error={!!errors.CellPhone}
								helperText={errors.CellPhone?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}>
					<Controller
						name='SexId'
						control={control}
						defaultValue=''
						rules={{ required: 'جنسیت الزامی است' }}
						render={({ field }) => (
							<FormControl
								fullWidth
								margin='normal'
								error={!!errors.SexId}>
								<InputLabel>جنسیت</InputLabel>
								<Select
									{...field}
									label='جنسیت'>
									<MenuItem value={1}>مرد</MenuItem>
									<MenuItem value={2}>زن</MenuItem>
								</Select>
								<FormHelperText>{errors.SexId?.message}</FormHelperText>
							</FormControl>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}>
					<Controller
						name='UserTypeId'
						control={control}
						defaultValue=''
						rules={{ required: 'نوع کاربر الزامی است' }}
						render={({ field }) => (
							<FormControl
								fullWidth
								margin='normal'
								error={!!errors.UserTypeId}>
								<InputLabel>نوع کاربر</InputLabel>
								<Select
									{...field}
									label='نوع کاربر'>
									<MenuItem value={1}>نوع 1</MenuItem>
									<MenuItem value={2}>نوع 2</MenuItem>
									<MenuItem value={3}>نوع 3</MenuItem>
								</Select>
								<FormHelperText>{errors.UserTypeId?.message}</FormHelperText>
							</FormControl>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						fullWidth
						sx={{ mt: 2 }}>
						ثبت‌نام
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Register;
