import React, { useState } from 'react'
import s from './App.module.css'
import { Todolist, filterValuesType, tasksType } from './components/todolist'
import { v1 } from 'uuid'

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

	// const [filter, setFilter] = useState<filterValuesType>('all')

	// const tasks2 = [
	// 	{ id: 1, title: 'Hello world', isDone: true },
	// 	{ id: 2, title: 'I am Happy', isDone: false },
	// 	{ id: 3, title: 'Yo', isDone: false },
	// 	{ id: 4, title: 'Rest Api', isDone: false },
	// 	{ id: 5, title: 'Graph QL', isDone: false },
	// ]
	type todolistsType = {
		id: string
		title: string
		filter: filterValuesType
	}

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

	// let filteredTask: todolistTasksType[]
	// if (filter === 'active') {
	// 	filteredTask = tasks.filter(t => !t.isDone)
	// } else if (filter === 'completed') {
	// 	filteredTask = tasks.filter(t => t.isDone)
	// } else {
	// 	filteredTask = tasks
	// }

	return (
		<div className={s.app}>
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
					<Todolist
						title='what to buy'
						tasks={filteredTask}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={t.filter}
						toDoListId={t.id}
						removeToDoList={removeToDoList}
					/>
				)
			})}
			{/* <Todolist
				title='what to buy'
				tasks={filteredTask}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus}
				filter={filter}
			/> */}
		</div>
	)
}

export default App
