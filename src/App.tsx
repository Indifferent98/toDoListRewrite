import React, { useCallback, useEffect, useState } from 'react'

import { Todolist } from './components/todolists'
import { v1 } from 'uuid'
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
} from '@mui/material'
import {
	addToDoListAC,
	addToDoListTC,
	changeToDoListFilterAC,
	changeToDoListTitleAC,
	changeToDoListTitleTC,
	fetchToDoListsTC,
	filterValuesType,
	removeToDoListAC,
	removeToDoListTC,
	todoListDomainType,
} from './reducers/todolists-reducer'
import {
	addTaskAC,
	addTaskTC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	removeTaskTC,
	todolistTasksType,
	updateTaskStatusTC,
} from './reducers/tasks-reducer'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from './state/store'
import { TaskStatuses } from './components/api/todolist-api'

function App() {
	const dispatch = useAppDispatch()
	// const tasks = useSelector<AppRootStateType, todolistTasksType>(
	// 	state => state.tasks
	// )
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

	return (
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
						<AddItemForm addItem={addToDoList} />
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
	)
}

export default App
