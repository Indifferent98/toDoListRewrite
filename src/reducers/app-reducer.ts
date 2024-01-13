import React from 'react'
export type errorType = string | null
type initialStateType = {
	error: errorType
}
const initialState: initialStateType = {
	error: null,
}
type setErrorACType = {
	type: 'SET-ERROR'
	errorStatus: string | null
}
export const setErrorAC = (errorStatus: string | null): setErrorACType => ({
	type: 'SET-ERROR',
	errorStatus,
})
type appActionsType = setErrorACType
export const appReducer = (
	state: initialStateType = initialState,
	action: appActionsType
) => {
	switch (action.type) {
		case 'SET-ERROR':
			return { ...state, error: action.errorStatus }

		default:
			return state
	}
}
