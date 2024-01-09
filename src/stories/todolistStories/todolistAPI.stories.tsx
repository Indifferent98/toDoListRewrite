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
