import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

import s from './addItemForm.module.css'
import { Button } from '@mui/material'
type addItemFormType = {
	addItem: (title: string) => void
}

export const AddItemForm = (props: addItemFormType) => {
	const [newItemTitle, setNewItemTitle] = useState<string>('')
	const [error, setError] = useState<boolean>(false)

	const addTaskButtonHandler = () => {
		if (newItemTitle.trim() !== '') {
			props.addItem(newItemTitle)
			setNewItemTitle('')
			setError(false)
		} else {
			setError(true)
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewItemTitle(e.currentTarget.value)
		if (newItemTitle.trim() !== '') {
			setError(false)
		}
	}
	const onKeyPressEvent = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && newItemTitle.trim() !== '') {
			props.addItem(newItemTitle)
			setNewItemTitle('')
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
				value={newItemTitle}
			/>
			<Button
				variant='contained'
				size='small'
				onClick={() => {
					addTaskButtonHandler()
				}}
			>
				+
			</Button>

			{error && <div className={s.errorMessage}>Title is hard required</div>}
		</div>
	)
}
