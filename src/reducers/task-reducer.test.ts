import React from 'react'
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
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

test('task status should be changed', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()

	const initialState: todolistTasksType = {
		[todolistid1]: [
			{ id: '777', title: 'HTML&CSS', isDone: true },
			{ id: '888', title: 'JS', isDone: false },
			{ id: '444', title: 'ReactJS', isDone: false },
		],
		[todolistid2]: [
			{ id: '222', title: 'beer', isDone: true },
			{ id: '999', title: 'salt', isDone: false },
			{ id: '111', title: 'sugar', isDone: false },
		],
	}

	const result = taskReducer(
		initialState,
		changeTaskStatusAC('999', true, todolistid2)
	)
	expect(result[todolistid1][1].isDone).toBe(false)
	expect(result[todolistid2][1].isDone).toBe(true)
	expect(result[todolistid2].length).toBe(3)
	expect(result[todolistid1].length).toBe(3)
})

test('task title should be changed', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()

	const initialState: todolistTasksType = {
		[todolistid1]: [
			{ id: '777', title: 'HTML&CSS', isDone: true },
			{ id: '888', title: 'JS', isDone: false },
			{ id: '444', title: 'ReactJS', isDone: false },
		],
		[todolistid2]: [
			{ id: '222', title: 'beer', isDone: true },
			{ id: '999', title: 'salt', isDone: false },
			{ id: '111', title: 'sugar', isDone: false },
		],
	}

	const result = taskReducer(
		initialState,
		changeTaskTitleAC('HELLO WORLD', todolistid2, '999')
	)
	expect(result[todolistid1][1].title).toBe('JS')
	expect(result[todolistid2][1].title).toBe('HELLO WORLD')
	expect(result[todolistid2].length).toBe(3)
	expect(result[todolistid1].length).toBe(3)
})
