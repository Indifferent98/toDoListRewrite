import axios from 'axios'
import React from 'react'
const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1',
	withCredentials: true,
	headers: { 'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9' },
})

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	High = 2,
	Urgently = 3,
	Later = 4,
}
export type toDoListResponseType = {
	id: string
	addedDate: string
	order: number
	title: string
}
export type ResponseType<D = {}> = {
	resultCode: number
	messages: string[]
	fieldsErrors: Array<string>
	data: D
}

export type itemTaskType = toDoListResponseType & {
	description: null | string
	todoListId: string

	status: TaskStatuses
	priority: TaskPriorities
	startDate: null | string
	deadline: null | string
}
type responseTaskType = {
	error: null | string
	totalCount: number
	items: itemTaskType[]
}

export type modelTaskType = {
	title?: string
	description?: string | null
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string | null
	deadline?: string | null
}

export type loginType = {
	email: string
	password: string
	rememberMe?: boolean
	captcha?: boolean
}

type authMeResponseType = {
	id: number
	email: string
	login: string
}

export const TodolistApi = {
	getToDoLists() {
		return instance.get<toDoListResponseType[]>('/todo-lists')
	},
	createToDoList(title: string) {
		return instance.post<ResponseType<{ item: toDoListResponseType }>>(
			'/todo-lists',
			{
				title: title,
			}
		)
	},
	deleteToDoList(toDoListId: string) {
		return instance.delete<ResponseType<{ item: toDoListResponseType }>>(
			`/todo-lists/${toDoListId}`
		)
	},
	updateToDoList(toDoListId: string, title: string) {
		return instance.put<ResponseType>(`/todo-lists/${toDoListId}`, {
			title: title,
		})
	},
	getTasks(toDoListId: string) {
		return instance.get<responseTaskType>(`/todo-lists/${toDoListId}/tasks`)
	},
	createTask(toDoListId: string, title: string) {
		return instance.post<ResponseType<{ item: itemTaskType }>>(
			`/todo-lists/${toDoListId}/tasks`,
			{ title: title }
		)
	},
	removeTask(toDoListId: string, taskId: string) {
		return instance.delete<ResponseType>(
			`/todo-lists/${toDoListId}/tasks/${taskId}`
		)
	},
	changeTaskState(toDoListId: string, taskId: string, model: modelTaskType) {
		return instance.put<ResponseType<{ item: itemTaskType }>>(
			`/todo-lists/${toDoListId}/tasks/${taskId}`,
			{ ...model }
		)
	},
}

export const AuthApi = {
	login(loginData: loginType) {
		return instance.post<ResponseType<{ userId: number }>>(
			'/auth/login',
			loginData
		)
	},
	logOut() {
		return instance.delete<ResponseType>('/auth/login')
	},
	me() {
		return instance.get<ResponseType<authMeResponseType>>('/auth/me')
	},
}
