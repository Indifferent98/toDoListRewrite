import React from 'react'
import {
	addTaskAC,
	removeTaskAC,
	taskReducer,
	todolistTasksType,
} from './tasks-reducer'
import { v1 } from 'uuid'

test('task should be added', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()

	const initialState: todolistTasksType = {
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

	const result = taskReducer(initialState, addTaskAC('new Task', todolistid2))
	expect(result[todolistid1].length).toBe(3)
	expect(result[todolistid1][0].title).toBe('HTML&CSS')
	expect(result[todolistid2].length).toBe(4)
	expect(result[todolistid2][0].title).toBe('new Task')
})

test('task should be removed', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()

	const initialState: todolistTasksType = {
		[todolistid1]: [
			{ id: '777', title: 'HTML&CSS', isDone: true },
			{ id: '888', title: 'JS', isDone: true },
			{ id: '444', title: 'ReactJS', isDone: false },
		],
		[todolistid2]: [
			{ id: '222', title: 'beer', isDone: true },
			{ id: '999', title: 'salt', isDone: false },
			{ id: '111', title: 'sugar', isDone: false },
		],
	}

	const result = taskReducer(initialState, removeTaskAC('999', todolistid2))
	expect(result[todolistid1].length).toBe(3)
	expect(result[todolistid2].length).toBe(2)
	expect(result[todolistid2][1].id).toBe('111')
})
