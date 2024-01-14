import React from 'react'
import { RequestStatusType } from './todolists-reducer'
export type errorType = string | null
type initialStateType = {
	error: errorType
	status: RequestStatusType
}
const initialState: initialStateType = {
	error: null,
	status: 'loading',
}
type setAppErrorACType = {
	type: 'SET-ERROR'
	errorStatus: string | null
}
type setLoadingStatusACType = {
	type: 'SET-LOADING-STATUS'
	loadingStatus: RequestStatusType
}
export const setLoadingStatusAC = (
	loadingStatus: RequestStatusType
): setLoadingStatusACType => ({
	type: 'SET-LOADING-STATUS',
	loadingStatus,
})
export const setAppErrorAC = (
	errorStatus: string | null
): setAppErrorACType => ({
	type: 'SET-ERROR',
	errorStatus,
})
type appActionsType = setAppErrorACType | setLoadingStatusACType
export const appReducer = (
	state: initialStateType = initialState,
	action: appActionsType
) => {
	switch (action.type) {
		case 'SET-ERROR':
			return { ...state, error: action.errorStatus }

		case 'SET-LOADING-STATUS':
			return { ...state, status: action.loadingStatus }
		default:
			return state
	}
}
