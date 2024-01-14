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
