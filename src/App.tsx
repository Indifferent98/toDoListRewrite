import React, { useState } from 'react'
import s from './App.module.css'
import { Todolist, filterValuesType, tasksType } from './components/todolist'
import { v1 } from 'uuid'

function App() {
	const [tasks, setTasks] = useState<tasksType[]>([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
	])

	const [filter, setFilter] = useState<filterValuesType>('all')
	// const tasks2 = [
	// 	{ id: 1, title: 'Hello world', isDone: true },
	// 	{ id: 2, title: 'I am Happy', isDone: false },
	// 	{ id: 3, title: 'Yo', isDone: false },
	// 	{ id: 4, title: 'Rest Api', isDone: false },
	// 	{ id: 5, title: 'Graph QL', isDone: false },
	// ]
	const addTask = (title: string) => {
		const newTask = { id: v1(), title, isDone: false }
		setTasks([newTask, ...tasks])
	}
	const removeTask = (id: string) => {
		setTasks(tasks.filter(t => t.id !== id))
	}
	const changeFilter = (newFilter: filterValuesType) => {
		setFilter(newFilter)
	}
	const changeTaskStatus = (taskId: string, isDone: boolean) => {
		setTasks(tasks.map(t => (t.id === taskId ? { ...t, isDone } : t)))
	}

	let filteredTask
	if (filter === 'active') {
		filteredTask = tasks.filter(t => !t.isDone)
	} else if (filter === 'completed') {
		filteredTask = tasks.filter(t => t.isDone)
	} else {
		filteredTask = tasks
	}

	return (
		<div className={s.app}>
			<Todolist
				title='what to buy'
				tasks={filteredTask}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus}
			/>
			{/* <Todolist title='what to learn' tasks={tasks2} /> */}
		</div>
	)
}

export default App
