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
}
