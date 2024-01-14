import React from 'react'
import { ResponseType } from '../components/api/todolist-api'
import { Dispatch } from 'redux'
import { setAppErrorAC, setLoadingStatusAC } from '../reducers/app-reducer'

export const handleServerNetworkError = (
	dispatch: Dispatch,
	error: { message: string }
) => {
	dispatch(setAppErrorAC(error.message))
	dispatch(setLoadingStatusAC('failed'))
}

export const handleServerAppError = <T>(
	data: ResponseType<T>,
	dispatch: Dispatch
) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC(data.messages[0]))
	} else {
		dispatch(setAppErrorAC('Some error was occurred'))
	}
	dispatch(setLoadingStatusAC('failed'))
}
