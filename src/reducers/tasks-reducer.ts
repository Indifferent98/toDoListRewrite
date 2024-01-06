import React from 'react'

export type tasksType = {
	title: string
	id: string
	isDone: boolean
}
export type todolistTasksType = { [key: string]: tasksType[] }

const initialState: todolistTasksType = {}
type taskReducerType = {}

export const taskReducer = (
	state: todolistTasksType = initialState,
	action: taskReducerType
) => {
	return state
}
