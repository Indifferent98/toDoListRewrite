import React, { useState } from 'react'

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
	todolistsType,
} from './reducers/todolists-reducer'
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksType,
	todolistTasksType,
} from './reducers/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'

function App() {
	const dispatch = useDispatch()
	const tasks = useSelector<AppRootStateType, todolistTasksType>(
		state => state.tasks
	)

	const todolists = useSelector<AppRootStateType, todolistsType[]>(
		state => state.todolists
	)

	const removeToDoList = (toDoListId: string) => {
		dispatch(removeToDoListAC(toDoListId))
	}

	const addTask = (title: string, toDoListId: string) => {
		dispatch(addTaskAC(title, toDoListId))
	}
	const removeTask = (id: string, toDoListId: string) => {
		dispatch(removeTaskAC(id, toDoListId))
	}
	const changeFilter = (newFilter: filterValuesType, toDoListId: string) => {
		dispatch(changeToDoListFilterAC(newFilter, toDoListId))
	}
	const changeTaskStatus = (
		taskId: string,
		isDone: boolean,
		toDoListId: string
	) => {
		dispatch(changeTaskStatusAC(taskId, isDone, toDoListId))
	}
	const addToDoList = (title: string) => {
		dispatch(addToDoListAC(title))
	}

	const changeTaskTitle = (
		title: string,
		todolistId: string,
		taskId: string
	) => {
		dispatch(changeTaskTitleAC(title, todolistId, taskId))
	}

	const changeTodolistTitle = (todolistId: string, title: string) => {
		dispatch(changeToDoListTitleAC(title, todolistId))
	}

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
						let filteredTask: tasksType[]
						if (t.filter === 'active') {
							filteredTask = tasks[t.id].filter(t => !t.isDone)
						} else if (t.filter === 'completed') {
							filteredTask = tasks[t.id].filter(t => t.isDone)
						} else {
							filteredTask = tasks[t.id]
						}
						return (
							<Grid item>
								<Paper style={{ padding: '10px' }} elevation={3}>
									<Todolist
										key={t.id}
										title={t.title}
										tasks={filteredTask}
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
