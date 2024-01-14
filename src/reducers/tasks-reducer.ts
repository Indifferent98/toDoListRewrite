import React from 'react'
import { v1 } from 'uuid'
import {
	RequestStatusType,
	addToDoListACType,
	removeToDoListACtype,
	setToDoListsACType,
} from './todolists-reducer'
import {
	TaskPriorities,
	TaskStatuses,
	TodolistApi,
	itemTaskType,
	modelTaskType,
} from '../components/api/todolist-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from '../state/store'
import { setAppErrorAC, setLoadingStatusAC } from './app-reducer'
import { handleServerNetworkError } from '../utils/error-utils'

// export type tasksType = {
// 	title: string
// 	id: string
// 	isDone: boolean
// }
export type todolistTasksType = { [key: string]: itemTaskType[] }

const initialState: todolistTasksType = {}

type addTaskACType = {
	type: 'ADD-TASK'
	title: string
	toDoListId: string
	taskId: string
}
export const addTaskAC = (
	title: string,
	toDoListId: string,
	taskId: string
): addTaskACType => ({
	type: 'ADD-TASK',
	title,
	toDoListId,
	taskId,
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
type setTasksACType = {
	type: 'SET-TASKS'
	tasks: itemTaskType[]
	toDoListId: string
}
export const setTasksAC = (
	tasks: itemTaskType[],
	toDoListId: string
): setTasksACType => ({
	type: 'SET-TASKS',
	tasks,
	toDoListId,
})
type updateTaskEntityStatusACType = {
	type: 'UPDATE-TASK-ENTITY-STATUS'
	toDoListId: string
	taskId: string
	task: itemTaskType
}
export const updateTaskEntityStatusAC = (
	toDoListId: string,
	taskId: string,
	task: itemTaskType
): updateTaskEntityStatusACType => ({
	type: 'UPDATE-TASK-ENTITY-STATUS',
	toDoListId,
	taskId,
	task,
})
type changeTaskLoadingStatusAC = {
	type: 'CHANGE-TASK-LOADING-STATUS'
	taskId: string
	toDoListId: string
	status: RequestStatusType
}
export const changeTaskLoadingStatusAC = (
	toDoListId: string,
	taskId: string,
	status: RequestStatusType
): changeTaskLoadingStatusAC => ({
	type: 'CHANGE-TASK-LOADING-STATUS',
	toDoListId,
	taskId,
	status,
})

type taskReducerType =
	| addTaskACType
	| removeTaskACType
	| changeTaskStatusACType
	| changeTaskTitleACType
	| addToDoListACType
	| removeToDoListACtype
	| setTasksACType
	| setToDoListsACType
	| updateTaskEntityStatusACType
	| changeTaskLoadingStatusAC

export const taskReducer = (
	state: todolistTasksType = initialState,
	action: taskReducerType
): todolistTasksType => {
	switch (action.type) {
		case 'ADD-TASK':
			const newTask: itemTaskType = {
				id: action.taskId,
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

		case 'SET-TASKS':
			return { ...state, [action.toDoListId]: action.tasks }

		case 'SET-TODOLISTS':
			const stateCopy = { ...state }
			action.todolists.forEach(t => (stateCopy[t.id] = []))
			return stateCopy

		case 'UPDATE-TASK-ENTITY-STATUS':
			return {
				...state,
				[action.toDoListId]: state[action.toDoListId].map(t =>
					t.id === action.taskId ? action.task : t
				),
			}
		// case 'CHANGE-TASK-LOADING-STATUS':
		// 	return {
		// 		...state,
		// 		[action.toDoListId]: state[action.toDoListId].map(t =>
		// 			t.id === action.taskId ? { ...t, isLoading: action.status } : t
		// 		),
		// 	}

		default:
			return state
	}
}

export const fetchTasksTC = (toDoListId: string) => (dispatch: Dispatch) => {
	TodolistApi.getTasks(toDoListId)
		.then(res => {
			if (res.data.items) {
				dispatch(setTasksAC(res.data.items, toDoListId))
			} else {
				dispatch(setAppErrorAC(res.data.error))
			}
		})
		.catch(error => {
			handleServerNetworkError(dispatch, error)
		})
}

export const updateTaskStatusTC =
	(toDoListId: string, taskId: string, data: modelTaskType) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		const task: itemTaskType = getState().tasks[toDoListId].filter(
			t => t.id === taskId
		)[0]
		const model: modelTaskType = {
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			status: task.status,
			title: task.title,

			...data,
		}

		TodolistApi.changeTaskState(toDoListId, taskId, model)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(
						updateTaskEntityStatusAC(toDoListId, taskId, { ...task, ...data })
					)
				} else {
					if (res.data.messages.length) {
						dispatch(setAppErrorAC(res.data.messages[0]))
					} else {
						dispatch(setAppErrorAC('Some error was occurred'))
					}
					dispatch(setLoadingStatusAC('failed'))
				}
			})
			.catch(error => {
				handleServerNetworkError(dispatch, error)
			})
	}

export const addTaskTC =
	(toDoListId: string, title: string) => (dispatch: Dispatch) => {
		TodolistApi.createTask(toDoListId, title)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(addTaskAC(title, toDoListId, res.data.data.item.id))
				} else {
					if (res.data.messages.length) {
						dispatch(setAppErrorAC(res.data.messages[0]))
					} else {
						dispatch(setAppErrorAC('Some error was occurred'))
					}
					dispatch(setLoadingStatusAC('failed'))
				}
			})
			.catch(error => {
				handleServerNetworkError(dispatch, error)
			})
	}

export const removeTaskTC =
	(toDoListId: string, taskId: string) => (dispatch: Dispatch) => {
		TodolistApi.removeTask(toDoListId, taskId)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(removeTaskAC(taskId, toDoListId))
				} else {
					if (res.data.messages.length) {
						dispatch(setAppErrorAC(res.data.messages[0]))
					} else {
						dispatch(setAppErrorAC('Some error was occurred'))
					}
					dispatch(setLoadingStatusAC('failed'))
				}
			})
			.catch(error => {
				handleServerNetworkError(dispatch, error)
			})
	}
