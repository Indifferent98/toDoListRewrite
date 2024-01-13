import React, { useCallback, useEffect } from 'react'

import { Todolist } from './components/todolists'
import s from './App.module.css'
import { AddItemForm } from './components/addItemForm/addItemForm'
import MenuIcon from '@mui/icons-material/Menu'
import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Container,
	Grid,
	Paper,
	CircularProgress,
} from '@mui/material'
import {
	RequestStatusType,
	addToDoListTC,
	changeToDoListFilterAC,
	changeToDoListTitleTC,
	fetchToDoListsTC,
	filterValuesType,
	removeToDoListTC,
	todoListDomainType,
} from './reducers/todolists-reducer'
import {
	addTaskTC,
	removeTaskTC,
	updateTaskStatusTC,
} from './reducers/tasks-reducer'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from './state/store'
import { TaskStatuses } from './components/api/todolist-api'
import { ErrorSnackBar } from './components/errorSnackBar/errorSnackBar'
import { errorType } from './reducers/app-reducer'

function App() {
	const dispatch = useAppDispatch()
	const appError = useSelector<AppRootStateType, errorType>(
		state => state.appState.error
	)
	const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(
		state => state.appState.status
	)
	useEffect(() => {
		dispatch(fetchToDoListsTC())
	}, [])
	const todolists = useSelector<AppRootStateType, todoListDomainType[]>(
		state => state.todolists
	)

	const removeToDoList = useCallback(
		(toDoListId: string) => {
			dispatch(removeToDoListTC(toDoListId))
		},
		[dispatch]
	)

	const addTask = useCallback(
		(title: string, toDoListId: string) => {
			dispatch(addTaskTC(toDoListId, title))
		},
		[dispatch]
	)
	const removeTask = useCallback(
		(id: string, toDoListId: string) => {
			dispatch(removeTaskTC(toDoListId, id))
		},
		[dispatch]
	)
	const changeFilter = useCallback(
		(newFilter: filterValuesType, toDoListId: string) => {
			dispatch(changeToDoListFilterAC(newFilter, toDoListId))
		},
		[dispatch]
	)
	const changeTaskStatus = useCallback(
		(taskId: string, isDone: boolean, toDoListId: string) => {
			dispatch(
				updateTaskStatusTC(toDoListId, taskId, {
					status: isDone ? TaskStatuses.Completed : TaskStatuses.InProgress,
				})
			)
		},
		[dispatch]
	)
	const addToDoList = useCallback(
		(title: string) => {
			dispatch(addToDoListTC(title))
		},
		[dispatch]
	)

	const changeTaskTitle = useCallback(
		(title: string, todolistId: string, taskId: string) => {
			dispatch(
				updateTaskStatusTC(todolistId, taskId, {
					title: title,
				})
			)
		},
		[dispatch]
	)

	const changeTodolistTitle = useCallback(
		(todolistId: string, title: string) => {
			dispatch(changeToDoListTitleTC(todolistId, title))
		},
		[dispatch]
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
					<Grid container>
						<span style={{ marginTop: '15px', marginBottom: '15px' }}>
							<AddItemForm addItem={addToDoList} disabled={false} />
						</span>
					</Grid>
					<Grid container spacing={2}>
						{todolists.map(t => {
							return (
								<Grid key={t.id} item>
									<Paper style={{ padding: '10px' }} elevation={3}>
										<Todolist
											key={t.id}
											title={t.title}
											// tasks={tasks[t.id]}
											removeTask={removeTask}
											changeFilter={changeFilter}
											addTask={addTask}
											changeTaskStatus={changeTaskStatus}
											filter={t.filter}
											toDoListId={t.id}
											removeToDoList={removeToDoList}
											changeTaskTitle={changeTaskTitle}
											changeTodolistTitle={changeTodolistTitle}
										/>
									</Paper>
								</Grid>
							)
						})}
					</Grid>
				</Container>
			</Box>
			<div className={s.footer}>
				{appError && <ErrorSnackBar errorMessage={appError} />}
			</div>
		</>
	)
}

export default App
