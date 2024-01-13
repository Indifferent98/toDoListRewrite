import React from 'react'

import { v1 } from 'uuid'
import {
	TodolistApi,
	toDoListResponseType,
} from '../components/api/todolist-api'
import { Dispatch } from 'redux'
import { setErrorAC, setLoadingStatusAC } from './app-reducer'

export type filterValuesType = 'all' | 'completed' | 'active'
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type todoListDomainType = {
	filter: filterValuesType
	entityStatus: RequestStatusType
} & toDoListResponseType
let initialState: todoListDomainType[] = []
export type removeToDoListACtype = {
	type: 'REMOVE-TODOLIST'
	toDoListId: string
}

export type addToDoListACType = {
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
	| setToDoListsACType

export const removeToDoListAC = (toDoListId: string): removeToDoListACtype => ({
	type: 'REMOVE-TODOLIST',
	toDoListId,
})

export const addToDoListAC = (
	title: string,
	toDoListId: string
): addToDoListACType => ({
	type: 'ADD-TODOLIST',
	title,
	toDoListId,
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
export type setToDoListsACType = {
	type: 'SET-TODOLISTS'
	todolists: toDoListResponseType[]
}
export const setToDoListsAC = (
	todolists: toDoListResponseType[]
): setToDoListsACType => ({
	type: 'SET-TODOLISTS',
	todolists,
})

export const todolistReducer = (
	state: todoListDomainType[] = initialState,
	action: todolistActionsType
): todoListDomainType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return [...state.filter(t => t.id !== action.toDoListId)]

		case 'ADD-TODOLIST':
			return [
				...state,
				{
					id: action.toDoListId,
					title: action.title,
					filter: 'all',
					addedDate: String(Date.now()),
					entityStatus: 'idle',
					order: 0,
				},
			]

		case 'CHANGE-TODOLIST-FILTER':
			return state.map(t =>
				t.id === action.toDoListId ? { ...t, filter: action.filter } : t
			)

		case 'CHANGE-TODOLIST-TITLE':
			return state.map(t =>
				t.id === action.toDoListId ? { ...t, title: action.title } : t
			)

		case 'SET-TODOLISTS':
			return action.todolists.map(t => ({
				...t,
				entityStatus: 'idle',
				filter: 'all',
				addedDate: String(Date.now()),
				order: 0,
			}))

		default:
			return state
	}
}

export const fetchToDoListsTC = () => (dispatch: Dispatch) => {
	TodolistApi.getToDoLists().then(res => {
		if (res.data) {
			dispatch(setToDoListsAC(res.data))
			dispatch(setLoadingStatusAC('succeeded'))
		} else {
			dispatch(setErrorAC('Some error was occurred'))

			dispatch(setLoadingStatusAC('failed'))
		}
	})
}

export const removeToDoListTC =
	(toDoListId: string) => (dispatch: Dispatch) => {
		TodolistApi.deleteToDoList(toDoListId).then(res => {
			if (res.data.resultCode === 0) {
				dispatch(removeToDoListAC(toDoListId))
			} else {
				if (res.data.messages.length) {
					dispatch(setErrorAC(res.data.messages[0]))
				} else {
					dispatch(setErrorAC('Some error was occurred'))
				}
				dispatch(setLoadingStatusAC('failed'))
			}
		})
	}

export const addToDoListTC = (title: string) => (dispatch: Dispatch) => {
	TodolistApi.createToDoList(title).then(res => {
		if (res.data.resultCode === 0) {
			dispatch(addToDoListAC(title, res.data.data.item.id))
		} else {
			if (res.data.messages.length) {
				dispatch(setErrorAC(res.data.messages[0]))
			} else {
				dispatch(setErrorAC('Some error was occurred'))
			}
			dispatch(setLoadingStatusAC('failed'))
		}
	})
}

export const changeToDoListTitleTC =
	(toDoListId: string, title: string) => (dispatch: Dispatch) => {
		TodolistApi.updateToDoList(toDoListId, title).then(res => {
			if (res.data.resultCode === 0) {
				dispatch(changeToDoListTitleAC(title, toDoListId))
			} else {
				if (res.data.messages.length) {
					dispatch(setErrorAC(res.data.messages[0]))
				} else {
					dispatch(setErrorAC('Some error was occurred'))
				}
				dispatch(setLoadingStatusAC('failed'))
			}
		})
	}
