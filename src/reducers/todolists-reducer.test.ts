import { v1 } from 'uuid'
import {
	removeToDoListAC,
	todolistReducer,
	todolistsType,
} from './todolists-reducer'

test('todolist should be removed', () => {
	const todolistid1 = v1()
	const todolistid2 = v1()
	const initialState: todolistsType[] = [
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

	const result = todolistReducer(initialState, removeToDoListAC(todolistid2))
	expect(result.length).toBe(1)
	expect(result[0].id).toBe(todolistid1)
	expect(result[1]).toBe(undefined)
})
