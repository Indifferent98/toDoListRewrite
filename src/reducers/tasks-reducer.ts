import React from 'react'
import { v1 } from 'uuid'
import { addToDoListACType, removeToDoListACtype } from './todolists-reducer'
import {
	TaskPriorities,
	TaskStatuses,
	itemTaskType,
} from '../components/api/todolist-api'

// export type tasksType = {
// 	title: string
// 	id: string
// 	isDone: boolean
// }
export type todolistTasksType = { [key: string]: itemTaskType[] }

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

type changeTaskStatusACType = {
	type: 'CHANGE-TASK-STATUS'
	taskId: string
	isDone: boolean
	toDoListId: string
}
export const changeTaskStatusAC = (
	taskId: string,
	isDone: boolean,
	toDoListId: string
): changeTaskStatusACType => ({
	type: 'CHANGE-TASK-STATUS',
	taskId,
	isDone,
	toDoListId,
})
type changeTaskTitleACType = {
	type: 'CHANGE-TASK-TITLE'
	title: string
	todolistId: string
	taskId: string
}
export const changeTaskTitleAC = (
	title: string,
	todolistId: string,
	taskId: string
): changeTaskTitleACType => ({
	type: 'CHANGE-TASK-TITLE',
	title,
	todolistId,
	taskId,
})

type taskReducerType =
	| addTaskACType
	| removeTaskACType
	| changeTaskStatusACType
	| changeTaskTitleACType
	| addToDoListACType
	| removeToDoListACtype

export const taskReducer = (
	state: todolistTasksType = initialState,
	action: taskReducerType
): todolistTasksType => {
	switch (action.type) {
		case 'ADD-TASK':
			const newTask: itemTaskType = {
				id: v1(),
				title: action.title,
				status: TaskStatuses.InProgress,
				addedDate: String(new Date()),
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: action.toDoListId,
			}
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

		case 'CHANGE-TASK-STATUS':
			const newStatus: TaskStatuses = action.isDone
				? TaskStatuses.Completed
				: TaskStatuses.InProgress
			return {
				...state,
				[action.toDoListId]: state[action.toDoListId].map(t =>
					t.id === action.taskId ? { ...t, status: newStatus } : t
				),
			}

		case 'CHANGE-TASK-TITLE':
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map(t =>
					t.id === action.taskId ? { ...t, title: action.title } : t
				),
			}

		case 'ADD-TODOLIST':
			return { ...state, [action.toDoListId]: [] }

		case 'REMOVE-TODOLIST':
			delete state[action.toDoListId]
			return state

		default:
			return state
	}
}
