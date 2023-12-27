import React, { useState } from 'react'
import s from './App.module.css'
import { Todolist, filterValuesType, tasksType } from './components/todolist'

function App() {
	const [tasks, setTasks] = useState<tasksType[]>([
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
	])

	const [filter, setFilter] = useState<filterValuesType>('all')
	// const tasks2 = [
	// 	{ id: 1, title: 'Hello world', isDone: true },
	// 	{ id: 2, title: 'I am Happy', isDone: false },
	// 	{ id: 3, title: 'Yo', isDone: false },
	// 	{ id: 4, title: 'Rest Api', isDone: false },
	// 	{ id: 5, title: 'Graph QL', isDone: false },
	// ]
	const removeTask = (id: number) => {
		setTasks(tasks.filter(t => t.id !== id))
	}
	const changeFilter = (newFilter: filterValuesType) => {
		setFilter(newFilter)
	}

	let filtredTask
	if (filter === 'active') {
		filtredTask = tasks.filter(t => !t.isDone)
	} else if (filter === 'completed') {
		filtredTask = tasks.filter(t => t.isDone)
	} else {
		filtredTask = tasks
	}

	return (
		<div className={s.app}>
			<Todolist
				title='what to buy'
				tasks={filtredTask}
				removeTask={removeTask}
				changeFilter={changeFilter}
			/>
			{/* <Todolist title='what to learn' tasks={tasks2} /> */}
		</div>
	)
}

export default App
