import TextField from '@mui/material/TextField'
import React, { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react'

type EditableSpanPropsType = {
	title: string
	changeTitle: (title: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
	const [editMode, setEditMode] = useState<boolean>(false)
	const activeEditMode = () => {
		setEditMode(true)
	}
	const [newTitle, setNewTitle] = useState<string>(props.title)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}
	const changeTitle = useCallback(() => {
		props.changeTitle(newTitle)
		setEditMode(false)
	}, [props.changeTitle])
	const onKeyUpHandler = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				// changeTitle()
				props.changeTitle(newTitle)
				setEditMode(false)
			}
		},
		[props.changeTitle]
	)

	return editMode ? (
		<TextField
			id='outlined-basic'
			label='Outlined'
			variant='outlined'
			value={newTitle}
			onKeyDown={onKeyUpHandler}
			onChange={onChangeHandler}
			onBlur={changeTitle}
			size='small'
			style={{ width: '200px' }}
			// error={true}
			// label='Error'
			autoFocus
		/>
	) : (
		<span onDoubleClick={activeEditMode}>{props.title}</span>
	)
})
