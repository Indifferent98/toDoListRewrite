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
import { TaskPriorities, TaskStatuses } from '../components/api/todolist-api'

test('task should be added', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()

	const initialState: todolistTasksType = {
		[todolistid1]: [
			{
				id: v1(),
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
			{
				id: v1(),
				title: 'JS',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
			{
				id: v1(),
				title: 'ReactJS',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
		],
		[todolistid2]: [
			{
				id: v1(),
				title: 'beer',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
			{
				id: v1(),
				title: 'salt',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
			{
				id: v1(),
				title: 'sugar',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
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
			{
				id: '777',
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
			{
				id: '888',
				title: 'JS',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
			{
				id: '444',
				title: 'ReactJS',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
		],
		[todolistid2]: [
			{
				id: '222',
				title: 'beer',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
			{
				id: '999',
				title: 'salt',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
			{
				id: '111',
				title: 'sugar',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
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
			{
				id: '777',
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
			{
				id: '888',
				title: 'JS',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
			{
				id: '444',
				title: 'ReactJS',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
		],
		[todolistid2]: [
			{
				id: '222',
				title: 'beer',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
			{
				id: '999',
				title: 'salt',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
			{
				id: '111',
				title: 'sugar',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
		],
	}

	const result = taskReducer(
		initialState,
		changeTaskStatusAC('999', true, todolistid2)
	)
	expect(result[todolistid1][1].status).toBe(TaskStatuses.InProgress)
	expect(result[todolistid2][1].status).toBe(TaskStatuses.Completed)
	expect(result[todolistid2].length).toBe(3)
	expect(result[todolistid1].length).toBe(3)
})

test('task title should be changed', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()

	const initialState: todolistTasksType = {
		[todolistid1]: [
			{
				id: '777',
				title: 'HTML&CSS',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
			{
				id: '888',
				title: 'JS',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
			{
				id: '444',
				title: 'ReactJS',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid1,
			},
		],
		[todolistid2]: [
			{
				id: '222',
				title: 'beer',
				status: TaskStatuses.Completed,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
			{
				id: '999',
				title: 'salt',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
			{
				id: '111',
				title: 'sugar',
				status: TaskStatuses.InProgress,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: TaskPriorities.Low,
				startDate: '',
				todoListId: todolistid2,
			},
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
