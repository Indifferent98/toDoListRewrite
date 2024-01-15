import React, { useEffect } from 'react'
import s from './App.module.css'
import MenuIcon from '@mui/icons-material/Menu'
import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Container,
	CircularProgress,
} from '@mui/material'
import {
	RequestStatusType,
	fetchToDoListsTC,
} from './reducers/todolists-reducer'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from './state/store'
import { ErrorSnackBar } from './components/errorSnackBar/errorSnackBar'
import { errorType } from './reducers/app-reducer'
import { ToDoLists } from './components/ToDoLists/todolists'
import { Login } from './Features/Login/Login'

export const App = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchToDoListsTC())
	}, [])
	const appError = useSelector<AppRootStateType, errorType>(
		state => state.appState.error
	)
	const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(
		state => state.appState.status
	)
	return loadingStatus === 'loading' ? (
		<div
			style={{
				position: 'fixed',
				top: '40%',
				textAlign: 'center',
				width: '100%',
			}}
		>
			<CircularProgress />
		</div>
	) : (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static' style={{ height: '50px' }}>
					<Toolbar>
						<IconButton
							style={{ marginBottom: '15px' }}
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant='h6'
							component='div'
							style={{ marginBottom: '15px' }}
							sx={{ flexGrow: 1 }}
						>
							Todolists
						</Typography>
						<Button color='inherit' style={{ marginBottom: '15px' }}>
							Login
						</Button>
					</Toolbar>
				</AppBar>
				<Container fixed>
					{/* <Login /> */}
					<ToDoLists />
				</Container>
			</Box>
			<div className={s.footer}>
				{appError && <ErrorSnackBar errorMessage={appError} />}
			</div>
		</>
	)
}
