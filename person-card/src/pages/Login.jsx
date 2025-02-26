import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log('فرم ارسال شد:', data);
	};
	return (
		<div>
			<Box
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					maxWidth: 400,
					mx: 'auto',
					mt: 5,
					p: 3,
					boxShadow: 3,
					borderRadius: 2,
				}}>
				{/* فیلد نام */}
				<TextField
					label='نام'
					fullWidth
					margin='normal'
					{...register('name', { required: 'نام الزامی است' })}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>

				{/* فیلد ایمیل */}
				<TextField
					label='ایمیل'
					fullWidth
					margin='normal'
					{...register('email', {
						required: 'ایمیل الزامی است',
						pattern: { value: /^\S+@\S+\.\S+$/, message: 'ایمیل معتبر نیست' },
					})}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>

				{/* دکمه ارسال */}
				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					sx={{ mt: 2 }}>
					ارسال
				</Button>
			</Box>
		</div>
	);
};

export default Login;
