import React from 'react'
import { v1 } from 'uuid'

export type tasksType = {
	title: string
	id: string
	isDone: boolean
}
export type todolistTasksType = { [key: string]: tasksType[] }

const initialState: todolistTasksType = {}

type addTaskACType = { type: 'ADD-TASK'; title: string; toDoListId: string }
export const addTaskAC = (
	title: string,
	toDoListId: string
): addTaskACType => ({
	type: 'ADD-TASK',
	title,
	toDoListId,
})

type removeTaskACType = {
	type: 'REMOVE-TASK'
	taskId: string
	toDoListId: string
}

export const removeTaskAC = (
	taskId: string,
	toDoListId: string
): removeTaskACType => ({ type: 'REMOVE-TASK', taskId, toDoListId })

type taskReducerType = addTaskACType | removeTaskACType
export const taskReducer = (
	state: todolistTasksType = initialState,
	action: taskReducerType
): todolistTasksType => {
	switch (action.type) {
		case 'ADD-TASK':
			const newTask = { id: v1(), title: action.title, isDone: false }
			return {
				...state,
				[action.toDoListId]: [newTask, ...state[action.toDoListId]],
			}
		case 'REMOVE-TASK':
			return {
				...state,
				[action.toDoListId]: state[action.toDoListId].filter(
					t => t.id !== action.taskId
				),
			}
		default:
			return state
	}
}
