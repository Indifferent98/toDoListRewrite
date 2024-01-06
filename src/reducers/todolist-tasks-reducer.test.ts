import React from 'react'
import { v1 } from 'uuid'
import { taskReducer, todolistTasksType } from './tasks-reducer'
import {
	addToDoListAC,
	removeToDoListAC,
	todolistReducer,
	todolistsType,
} from './todolists-reducer'

test('todolist and task for todolist should be added', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()

	const initialTasksState: todolistTasksType = {
		[todolistid1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistid2]: [
			{ id: v1(), title: 'beer', isDone: true },
			{ id: v1(), title: 'salt', isDone: false },
			{ id: v1(), title: 'sugar', isDone: false },
		],
	}

	const todolistInitialState: todolistsType[] = [
		{
			id: todolistid1,
			title: 'what to learn',
			filter: 'all',
		},
		{
			id: todolistid2,
			title: 'what to read',
			filter: 'all',
		},
	]

	const action = addToDoListAC('new todolist')
	const taskResult = taskReducer(initialTasksState, action)
	const todolistResult = todolistReducer(todolistInitialState, action)

	expect(action.toDoListId).toBe(todolistResult[2].id)
	expect(taskResult[action.toDoListId].length).toBe(0)
	expect(todolistResult.length).toBe(3)
	expect(Object.keys(taskResult).length).toBe(3)
})

test('todolist and task for todolist should be removed', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()

	const initialTasksState: todolistTasksType = {
		[todolistid1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistid2]: [
			{ id: v1(), title: 'beer', isDone: true },
			{ id: v1(), title: 'salt', isDone: false },
			{ id: v1(), title: 'sugar', isDone: false },
		],
	}

	const todolistInitialState: todolistsType[] = [
		{
			id: todolistid1,
			title: 'what to learn',
			filter: 'all',
		},
		{
			id: todolistid2,
			title: 'what to read',
			filter: 'all',
		},
	]

	const action = removeToDoListAC(todolistid2)
	const taskResult = taskReducer(initialTasksState, action)
	const todolistResult = todolistReducer(todolistInitialState, action)

	expect(todolistResult.length).toBe(1)
	expect(todolistResult[0].id).toBe(todolistid1)
	expect(Object.keys(taskResult).length).toBe(1)
	expect(taskResult[todolistid2]).toBe(undefined)
})
