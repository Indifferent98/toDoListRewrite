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

type changeToDoListFilterACType = {
	type: 'CHANGE-TODOLIST-FILTER'
	filter: filterValuesType
	toDoListId: string
}
type changeToDoListTitleACType = {
	type: 'CHANGE-TODOLIST-TITLE'
	title: string
	toDoListId: string
}
type todolistActionsType =
	| removeToDoListACtype
	| addToDoListACType
	| changeToDoListFilterACType
	| changeToDoListTitleACType

export const removeToDoListAC = (toDoListId: string): removeToDoListACtype => ({
	type: 'REMOVE-TODOLIST',
	toDoListId,
})

export const addToDoListAC = (title: string): addToDoListACType => ({
	type: 'ADD-TODOLIST',
	title,
	toDoListId: v1(),
})

export const changeToDoListTitleAC = (
	title: string,
	toDoListId: string
): changeToDoListTitleACType => ({
	type: 'CHANGE-TODOLIST-TITLE',
	title,
	toDoListId,
})

export const changeToDoListFilterAC = (
	filter: filterValuesType,
	toDoListId: string
): changeToDoListFilterACType => ({
	type: 'CHANGE-TODOLIST-FILTER',
	filter,
	toDoListId,
})

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
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(t =>
				t.id === action.toDoListId ? { ...t, filter: action.filter } : t
			)

		case 'CHANGE-TODOLIST-TITLE':
			return state.map(t =>
				t.id === action.toDoListId ? { ...t, title: action.title } : t
			)
		default:
			return state
	}
}
