import { v1 } from 'uuid'
import {
	addToDoListAC,
	changeToDoListFilterAC,
	changeToDoListTitleAC,
	removeToDoListAC,
	todoListDomainType,
	todolistReducer,
} from './todolists-reducer'

test('todolist should be removed', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()
	const initialState: todoListDomainType[] = [
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

	const result = todolistReducer(initialState, removeToDoListAC(todolistid2))
	expect(result.length).toBe(1)
	expect(result[0].id).toBe(todolistid1)
	expect(result[1]).toBe(undefined)
})

test('todolist should be added', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()
	const initialState: todoListDomainType[] = [
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

	const result = todolistReducer(initialState, addToDoListAC('newList'))

	expect(result.length).toBe(3)
	expect(result[2].title).toBe('newList')
	expect(result[0].title).toBe('what to learn')
	expect(result[1].title).toBe('what to read')
})

test('todolist filter should be changed', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()
	const initialState: todoListDomainType[] = [
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

	const result = todolistReducer(
		initialState,
		changeToDoListFilterAC('completed', todolistid2)
	)

	expect(result.length).toBe(2)
	expect(result[1].filter).toBe('completed')
	expect(result[0].filter).toBe('all')
})

test('todolist title should be changed', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()
	const initialState: todoListDomainType[] = [
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

	const result = todolistReducer(
		initialState,
		changeToDoListTitleAC('nowItsNewTitle', todolistid2)
	)

	expect(result.length).toBe(2)
	expect(result[1].title).toBe('nowItsNewTitle')
	expect(result[0].title).toBe('what to learn')
})
