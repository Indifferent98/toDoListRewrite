import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

import s from './addItemForm.module.css'
type addItemFormType = {
	addTask: (title: string, toDoListId: string) => void
	toDoListId: string
}

export const AddItemForm = (props: addItemFormType) => {
	const [newTaskTitle, setTaskTitle] = useState<string>('')
	const [error, setError] = useState<boolean>(false)

	const addTaskButtonHandler = () => {
		if (newTaskTitle.trim() !== '') {
			props.addTask(newTaskTitle, props.toDoListId)
			setTaskTitle('')
			setError(false)
		} else {
			setError(true)
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value)
		if (newTaskTitle.trim() !== '') {
			setError(false)
		}
	}
	const onKeyPressEvent = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && newTaskTitle.trim() !== '') {
			props.addTask(newTaskTitle, props.toDoListId)
			setTaskTitle('')
			setError(false)
		} else if (e.key === 'Enter') {
			setError(true)
		}
	}
	return (
		<div>
			<input
				className={error ? s.error : ''}
				onChange={onChangeHandler}
				onKeyDown={onKeyPressEvent}
				value={newTaskTitle}
			/>

			<button
				onClick={() => {
					addTaskButtonHandler()
				}}
			>
				+
			</button>
			{error && <div className={s.errorMessage}>Title is hard required</div>}
		</div>
	)
}
