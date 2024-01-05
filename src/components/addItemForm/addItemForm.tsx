import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import AddIcon from '@mui/icons-material/Add'
import s from './addItemForm.module.css'
import { Button, TextField } from '@mui/material'
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
			<TextField
				id='outlined-basic'
				label={error ? 'Title is hard required' : 'Enter title'}
				size='small'
				variant='outlined'
				onChange={onChangeHandler}
				onKeyDown={onKeyPressEvent}
				value={newItemTitle}
				error={error}
			/>

			<Button
				variant='contained'
				size='small'
				style={{
					maxWidth: '50px',
					maxHeight: '40px',
					minWidth: '50px',
					minHeight: '40px',
				}}
				onClick={() => {
					addTaskButtonHandler()
				}}
			>
				<AddIcon />
			</Button>

			{/* {error && <div className={s.errorMessage}>Title is hard required</div>} */}
		</div>
	)
}
