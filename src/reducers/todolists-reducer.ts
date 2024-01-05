import React from 'react'

import { v1 } from 'uuid'

export type filterValuesType = 'all' | 'completed' | 'active'
export type todolistsType = {
	id: string
	title: string
	filter: filterValuesType
}
let initialState: todolistsType[] = []
type removeToDoListACtype = { type: 'REMOVE-TODOLIST'; toDoListId: string }

type addToDoListACType = {
	type: 'ADD-TODOLIST'
	title: string
	toDoListId: string
}

type todolistActionsType = removeToDoListACtype | addToDoListACType

export const removeToDoListAC = (toDoListId: string): removeToDoListACtype => ({
	type: 'REMOVE-TODOLIST',
	toDoListId,
})

// const removeToDoList = (toDoListId: string) => {
// 	setTodolists(todolists.filter(t => t.id !== toDoListId))
// 	delete tasks[toDoListId]
// }

export const addToDoListAC = (title: string): addToDoListACType => ({
	type: 'ADD-TODOLIST',
	title,
	toDoListId: v1(),
})

// const addToDoList = (title: string) => {
// 	const toDoListId = v1()
// 	setTodolists([...todolists, { id: toDoListId, title, filter: 'all' }])
// 	setTasks({ ...tasks, [toDoListId]: [] })
// }

export const todolistReducer = (
	state: todolistsType[] = initialState,
	action: todolistActionsType
) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return [...state.filter(t => t.id !== action.toDoListId)]
		//не забыть сделать action для taskReducer'a
		case 'ADD-TODOLIST':
			return [
				...state,
				{ id: action.toDoListId, title: action.title, filter: 'all' },
			]

		//не забыть сделать action для taskReducer'a
		default:
			return state
	}
}
