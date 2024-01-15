import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Formik, useFormik } from 'formik'
import React from 'react'
type formikErrorsType = {
	email?: string
	password?: string
	rememberMe?: string
}
export const Login = () => {
	const formik = useFormik({
		initialValues: {
			password: '',
			email: '',
			rememberMe: false,
		},
		validate: values => {
			const errors: formikErrorsType = {}
			if (!values.email) {
				errors.email = 'Required'
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
			) {
				errors.email = 'Invalid email address'
			}
			if (!values.password) {
				errors.password = 'Password is required'
			} else if (values.password.trim().length < 4) {
				errors.password = 'Password must be longer'
			}
			return errors
		},

		onSubmit: values => {
			alert(JSON.stringify(values, null, 2))
		},
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container justifyContent={'center'}>
				<Grid item justifyContent={'center'}>
					<FormControl>
						<FormLabel>
							<p>
								To log in get registered
								<a
									href={'https://social-network.samuraijs.com/'}
									target={'_blank'}
								>
									{' '}
									here
								</a>
							</p>
							<p>or use common test account credentials:</p>
							<p>Email: free@samuraijs.com</p>
							<p>Password: free</p>
						</FormLabel>
						<FormGroup>
							<TextField
								label='Email'
								margin='normal'
								id='email'
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							<span style={{ color: 'rgb(207, 42, 42) ' }}>
								{formik.errors.email}
							</span>
							<TextField
								type='password'
								label='Password'
								margin='normal'
								id='password'
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
							<span style={{ color: 'rgb(207, 42, 42) ' }}>
								{formik.errors.password}
							</span>
							<FormControlLabel
								label={'Remember me'}
								control={
									<Checkbox
										id='rememberMe'
										onChange={formik.handleChange}
										value={formik.values.rememberMe}
									/>
								}
							/>
							<Button type={'submit'} variant={'contained'} color={'primary'}>
								Login
							</Button>
						</FormGroup>
					</FormControl>
				</Grid>
			</Grid>
		</form>
	)
}
