import { ChangeEvent, useState, KeyboardEvent } from 'react'
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
	const onKeyPressEvent = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			props.addTask(newTaskTitle)
			setTaskTitle('')
		}
	}

	const onAllClickHandler = () => {
		props.changeFilter('all')
	}
	const onCompletedClickHandler = () => {
		props.changeFilter('completed')
	}
	const onActiveClickHandler = () => {
		props.changeFilter('active')
	}

	return (
		<div className={s.main}>
			<div className={s.list}>
				<h3>{props.title}</h3>
				<div>
					<input
						onChange={onChangeHandler}
						onKeyDown={onKeyPressEvent}
						value={newTaskTitle}
					/>
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
					<button onClick={onAllClickHandler}>All</button>
					<button onClick={onActiveClickHandler}>Active</button>
					<button onClick={onCompletedClickHandler}>Completed</button>
				</div>
			</div>
		</div>
	)
}
