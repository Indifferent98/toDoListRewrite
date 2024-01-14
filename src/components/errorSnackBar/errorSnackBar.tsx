import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { errorType, setAppErrorAC } from '../../reducers/app-reducer'
import { useAppDispatch } from '../../state/store'
import { useEffect, useState } from 'react'

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
	const dispatch = useAppDispatch()

	const [timerId, setTimerId] = useState<NodeJS.Timeout>()
	useEffect(() => {
		let id = setTimeout(() => {
			dispatch(setAppErrorAC(null))
		}, 8000)
		setTimerId(id)
	}, [])
	const handleClick = () => {
		clearTimeout(timerId)
		dispatch(setAppErrorAC(null))
	}

	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<Snackbar autoHideDuration={1111}></Snackbar>

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
