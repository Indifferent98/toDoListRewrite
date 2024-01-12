import React from 'react'
import { v1 } from 'uuid'
import { taskReducer, todolistTasksType } from './tasks-reducer'
import {
	addToDoListAC,
	removeToDoListAC,
	todoListDomainType,
	todolistReducer,
} from './todolists-reducer'
import { TaskPriorities, TaskStatuses } from '../components/api/todolist-api'

test('todolist and task for todolist should be added', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()

	const initialTasksState: todolistTasksType = {
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

	const todolistInitialState: todoListDomainType[] = [
		{
			id: todolistid1,
			title: 'what to learn',
			filter: 'all',
			addedDate: '',
			entityStatus: 'idle',
			order: 0,
		},
		{
			id: todolistid2,
			title: 'what to read',
			filter: 'all',
			addedDate: '',
			entityStatus: 'idle',
			order: 0,
		},
	]

	const action = addToDoListAC('new todolist', v1())
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

	const todolistInitialState: todoListDomainType[] = [
		{
			id: todolistid1,
			title: 'what to learn',
			filter: 'all',
			addedDate: '',
			entityStatus: 'idle',
			order: 0,
		},
		{
			id: todolistid2,
			title: 'what to read',
			filter: 'all',
			addedDate: '',
			entityStatus: 'idle',
			order: 0,
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
