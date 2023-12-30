import React, { ChangeEvent, useState } from 'react'

type EditableSpanPropsType = {
	title: string
	changeTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
	const [editMode, setEditMode] = useState<boolean>(false)
	const activeEditMode = () => {
		setEditMode(true)
	}
	const [newTitle, setNewTitle] = useState<string>(props.title)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}
	const changeTitle = () => {
		props.changeTitle(newTitle)
		setEditMode(false)
	}

	return editMode ? (
		<input
			value={newTitle}
			onChange={onChangeHandler}
			onBlur={changeTitle}
			autoFocus
		/>
	) : (
		<span onDoubleClick={activeEditMode}>{props.title}</span>
	)
}
