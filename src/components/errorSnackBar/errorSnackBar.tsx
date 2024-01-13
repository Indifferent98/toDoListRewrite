import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { errorType, setErrorAC } from '../../reducers/app-reducer'
import { useAppDispatch } from '../../state/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})
type ErrorSnackBarPropsType = {
	errorMessage: errorType
}
export const ErrorSnackBar = (props: ErrorSnackBarPropsType) => {
	const [open, setOpen] = React.useState(true)
	const dispatch = useAppDispatch()
	const handleClick = () => {
		dispatch(setErrorAC(null))
	}

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		debugger
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<Snackbar autoHideDuration={1111} onClose={handleClose}></Snackbar>

			<Alert severity='error'>
				{props.errorMessage}
				<Button
					onClick={handleClick}
					color='warning'
					style={{ width: '20px', height: '20px' }}
					variant='contained'
					size={'small'}
				>
					x
				</Button>
			</Alert>
		</Stack>
	)
}
