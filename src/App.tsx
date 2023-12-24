import React from 'react'
import s from './App.module.css'
import { Todolist } from './components/todolist'

function App() {
	const tasks1 = [
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
	]
	const tasks2 = [
		{ id: 1, title: 'Hello world', isDone: true },
		{ id: 2, title: 'I am Happy', isDone: false },
		{ id: 3, title: 'Yo', isDone: false },
	]

	return (
		<div className={s.app}>
			<Todolist title='what to buy' />
			<Todolist title='what to learn' />
			<Todolist title='what to read' />
		</div>
	)
}

export default App
