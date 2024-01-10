import axios from 'axios'
import React from 'react'
const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1',
	withCredentials: true,
	headers: { 'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9' },
})

export const TodolistApi = {
	getToDoLists() {
		return instance.get('/todo-lists')
	},
	createToDoList(title: string) {
		instance.post('/todo-lists', { title: title })
	},
	deleteToDoList(toDoListId: string) {
		return instance.delete(`/todo-lists/${toDoListId}`)
	},
	updateToDoList(toDoListId: string, title: string) {
		return instance.put(`/todo-lists/${toDoListId}`, { title: title })
	},
	getTasks(toDoListId: string) {
		return instance.get(`/todo-lists/${toDoListId}/tasks`)
	},
	addTask(toDoListId: string, title: string) {
		return instance.post(`/todo-lists/${toDoListId}/tasks`, { title: title })
	},
	removeTask(toDoListId: string, taskId: string) {
		return instance.delete(`/todo-lists/${toDoListId}/${taskId}`)
	},
}
