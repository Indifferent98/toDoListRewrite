import { ChangeEvent, useState, KeyboardEvent } from 'react'
import s from './/todolist.module.css'
import { AddItemForm } from './addItemForm/addItemForm'
import { EditableSpan } from './editableSpan/editableSpan'

export type tasksType = {
	title: string
	id: string
	isDone: boolean
}

export type filterValuesType = 'all' | 'completed' | 'active'

type TodolistPropsType = {
	title: string
	toDoListId: string
	tasks: tasksType[]
	removeTask: (id: string, toDoListId: string) => void
	filter: filterValuesType
	changeFilter: (newFilter: filterValuesType, toDoListId: string) => void
	addTask: (title: string, toDoListId: string) => void
	removeToDoList: (toDoListId: string) => void
	changeTaskStatus: (
		taskId: string,
		isDone: boolean,
		toDoListId: string
	) => void
	changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
	changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
	const removeToDoList = () => {
		props.removeToDoList(props.toDoListId)
	}
	const onAllClickHandler = () => {
		props.changeFilter('all', props.toDoListId)
	}
	const onCompletedClickHandler = () => {
		props.changeFilter('completed', props.toDoListId)
	}
	const onActiveClickHandler = () => {
		props.changeFilter('active', props.toDoListId)
	}
	const addTask = (title: string) => {
		props.addTask(title, props.toDoListId)
	}

	const changeTodolistTitle = (title: string) => {
		props.changeTodolistTitle(props.toDoListId, title)
	}
	return (
		<div className={s.main}>
			<div className={s.list}>
				<h3>
					<EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
					<button onClick={removeToDoList}>x</button>
				</h3>
				<AddItemForm addItem={addTask} />
				<ul>
					{props.tasks.map(t => {
						const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeTaskStatus(
								t.id,
								e.currentTarget.checked,
								props.toDoListId
							)
						}
						const changeTaskTitle = (title: string) => {
							debugger
							props.changeTaskTitle(title, props.toDoListId, t.id)
						}
						return (
							<li key={t.id}>
								<input
									type='checkbox'
									onChange={changeTaskStatus}
									checked={t.isDone}
								/>
								<span className={t.isDone ? s.taskIsDone : ''}>
									<EditableSpan title={t.title} changeTitle={changeTaskTitle} />
								</span>
								<button
									onClick={() => {
										props.removeTask(t.id, props.toDoListId)
									}}
								>
									x
								</button>
							</li>
						)
					})}
				</ul>
				<div>
					<button
						className={props.filter === 'all' ? s.currentButtonIsActive : ''}
						onClick={onAllClickHandler}
					>
						All
					</button>
					<button
						className={props.filter === 'active' ? s.currentButtonIsActive : ''}
						onClick={onActiveClickHandler}
					>
						Active
					</button>
					<button
						className={
							props.filter === 'completed' ? s.currentButtonIsActive : ''
						}
						onClick={onCompletedClickHandler}
					>
						Completed
					</button>
				</div>
			</div>
		</div>
	)
}
