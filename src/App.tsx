import React, { useCallback, useState } from 'react'

import { Todolist } from './components/todolist'
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
	changeToDoListFilterAC,
	changeToDoListTitleAC,
	filterValuesType,
	removeToDoListAC,
	todoListDomainType,
} from './reducers/todolists-reducer'
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	todolistTasksType,
} from './reducers/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'
import { itemTaskType } from './components/api/todolist-api'

function App() {
	const dispatch = useDispatch()
	const tasks = useSelector<AppRootStateType, todolistTasksType>(
		state => state.tasks
	)

	const todolists = useSelector<AppRootStateType, todoListDomainType[]>(
		state => state.todolists
	)

	const removeToDoList = useCallback(
		(toDoListId: string) => {
			dispatch(removeToDoListAC(toDoListId))
		},
		[dispatch]
	)

	const addTask = useCallback(
		(title: string, toDoListId: string) => {
			dispatch(addTaskAC(title, toDoListId))
		},
		[dispatch]
	)
	const removeTask = useCallback(
		(id: string, toDoListId: string) => {
			dispatch(removeTaskAC(id, toDoListId))
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
			dispatch(changeTaskStatusAC(taskId, isDone, toDoListId))
		},
		[dispatch]
	)
	const addToDoList = useCallback(
		(title: string) => {
			dispatch(addToDoListAC(title))
		},
		[dispatch]
	)

	const changeTaskTitle = useCallback(
		(title: string, todolistId: string, taskId: string) => {
			dispatch(changeTaskTitleAC(title, todolistId, taskId))
		},
		[dispatch]
	)

	const changeTodolistTitle = useCallback(
		(todolistId: string, title: string) => {
			dispatch(changeToDoListTitleAC(title, todolistId))
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
										tasks={tasks[t.id]}
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
