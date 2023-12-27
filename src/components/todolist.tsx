import { ChangeEvent, useState } from 'react'
import s from './/todolist.module.css'

export type tasksType = {
	title: string
	id: string
	isDone: boolean
}
export type filterValuesType = 'all' | 'completed' | 'active'

type TodolistPropsType = {
	title: string
	tasks: tasksType[]
	removeTask: (id: string) => void
	// filter: filterValuesType
	changeFilter: (newFilter: filterValuesType) => void
	addTask: (title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
	const [newTaskTitle, setTaskTitle] = useState<string>('')
	const addTaskButtonHandler = (title: string) => {
		props.addTask(title)
		setTaskTitle('')
	}
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value)
		console.log(newTaskTitle)
	}
	return (
		<div className={s.main}>
			<div className={s.list}>
				<h3>{props.title}</h3>
				<div>
					<input onChange={onChangeHandler} value={newTaskTitle} />
					<button
						onClick={() => {
							addTaskButtonHandler(newTaskTitle)
						}}
					>
						+
					</button>
				</div>
				<ul>
					{props.tasks.map(t => (
						<li key={t.id}>
							<input type='checkbox' checked={t.isDone} />
							<span>{t.title}</span>
							<button
								onClick={() => {
									props.removeTask(t.id)
								}}
							>
								x
							</button>
						</li>
					))}
				</ul>
				<div>
					<button
						onClick={() => {
							props.changeFilter('all')
						}}
					>
						All
					</button>
					<button
						onClick={() => {
							props.changeFilter('active')
						}}
					>
						Active
					</button>
					<button
						onClick={() => {
							props.changeFilter('completed')
						}}
					>
						Completed
					</button>
				</div>
			</div>
		</div>
	)
}
