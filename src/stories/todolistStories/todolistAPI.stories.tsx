import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { TodolistApi } from '../../components/api/todolist-api'

export default {
	title: 'API',
}

export const GetToDoLists = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		TodolistApi.getToDoLists().then(res => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const CreateToDoLists = () => {
	// const [state, setState] = useState<any>(null)
	const [value, setValue] = useState<string>('')
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	const addTodolist = () => {
		TodolistApi.createToDoList(value)
		setValue('')
	}

	return (
		<div>
			<input value={value} onChange={onChangeHandler} />
			<button onClick={addTodolist}>add todolist</button>
		</div>
	)
}

export const UpdateToDoList = () => {
	const [listIdValue, setListIdValue] = useState<string>('')
	const [titleValue, setTitleValue] = useState<string>('')
	const updateToDoList = () => {
		const response = TodolistApi.updateToDoList(listIdValue, titleValue)
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitleValue(e.currentTarget.value)
	}
	const changeToDoListId = (e: ChangeEvent<HTMLInputElement>) => {
		setListIdValue(e.currentTarget.value)
	}
	return (
		<div>
			<div>
				todolistId:
				<input
					placeholder='todolistId'
					value={listIdValue}
					onChange={changeToDoListId}
				/>
			</div>
			<div>
				newTitle:
				<input placeholder='title' value={titleValue} onChange={changeTitle} />
				<button onClick={updateToDoList}>+</button>
			</div>
		</div>
	)
}

export const getTasks = () => {
	return (
		<div>
			{JSON.stringify(
				TodolistApi.getTasks('47e2e755-f6e4-4eb1-a754-a32ad082eaff')
			)}
		</div>
	)
}
