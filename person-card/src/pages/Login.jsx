import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log('اطلاعات ورود:', data);
	};

	return (
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
			<TextField
				label='رمز عبور'
				type='password'
				fullWidth
				margin='normal'
				{...register('password', {
					required: 'رمز عبور الزامی است',
					minLength: { value: 6, message: 'رمز عبور باید حداقل 6 کاراکتر باشد' },
				})}
				error={!!errors.password}
				helperText={errors.password?.message}
			/>
			<Button
				type='submit'
				variant='contained'
				color='primary'
				fullWidth
				sx={{ mt: 2 }}>
				ورود
			</Button>
		</Box>
	);
};

export default LoginForm;
