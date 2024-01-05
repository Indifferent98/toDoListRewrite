import React, { useState } from 'react'

import { Todolist, tasksType } from './components/todolist'
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
import { filterValuesType, todolistsType } from './reducers/todolists-reducer'

function App() {
	type todolistTasksType = { [key: string]: tasksType[] }
	let todolistId1 = v1()
	let todolistId2 = v1()
	const [tasks, setTasks] = useState<todolistTasksType>({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'beer', isDone: true },
			{ id: v1(), title: 'salt', isDone: false },
			{ id: v1(), title: 'sugar', isDone: false },
		],
	})

	const [todolists, setTodolists] = useState<todolistsType[]>([
		{
			id: todolistId1,
			title: 'what to learn',
			filter: 'all',
		},
		{
			id: todolistId2,
			title: 'what to read',
			filter: 'all',
		},
	])

	const removeToDoList = (toDoListId: string) => {
		setTodolists(todolists.filter(t => t.id !== toDoListId))
		delete tasks[toDoListId]
	}

	const addTask = (title: string, toDoListId: string) => {
		const newTask = { id: v1(), title, isDone: false }
		setTasks({ ...tasks, [toDoListId]: [newTask, ...tasks[toDoListId]] })
	}
	const removeTask = (id: string, toDoListId: string) => {
		setTasks({
			...tasks,
			[toDoListId]: tasks[toDoListId].filter(t => t.id !== id),
		})
	}
	const changeFilter = (newFilter: filterValuesType, toDoListId: string) => {
		setTodolists(
			todolists.map(t =>
				t.id === toDoListId ? { ...t, filter: newFilter } : t
			)
		)
	}
	const changeTaskStatus = (
		taskId: string,
		isDone: boolean,
		toDoListId: string
	) => {
		setTasks({
			...tasks,
			[toDoListId]: tasks[toDoListId].map(t =>
				t.id === taskId ? { ...t, isDone } : t
			),
		})
	}
	const addToDoList = (title: string) => {
		const toDoListId = v1()
		setTodolists([...todolists, { id: toDoListId, title, filter: 'all' }])
		setTasks({ ...tasks, [toDoListId]: [] })
	}

	const changeTaskTitle = (
		title: string,
		todolistId: string,
		taskId: string
	) => {
		debugger
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map(t =>
				t.id === taskId ? { ...t, title } : t
			),
		})
	}

	const changeTodolistTitle = (todolistId: string, title: string) => {
		setTodolists(
			todolists.map(t => (t.id === todolistId ? { ...t, title } : t))
		)
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
