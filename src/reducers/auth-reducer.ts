import React from 'react'
import { Dispatch } from 'redux'
import { AuthApi, loginType } from '../components/api/todolist-api'
import {
	handleServerAppError,
	handleServerNetworkError,
} from '../utils/error-utils'
import { changeInitializeStatus } from './app-reducer'

type initialStateType = {
	isLoggedIn: boolean
}
const initialState: initialStateType = {
	isLoggedIn: false,
}

type changeLoginStatus = {
	type: 'CHANGE-LOGIN-STATUS'
	isLoggedIn: boolean
}

export const changeLoginStatus = (isLoggedIn: boolean): changeLoginStatus => ({
	type: 'CHANGE-LOGIN-STATUS',
	isLoggedIn,
})

type actionsType = changeLoginStatus

export const authReducer = (
	state: initialStateType = initialState,
	action: actionsType
): initialStateType => {
	switch (action.type) {
		case 'CHANGE-LOGIN-STATUS':
			return { ...state, isLoggedIn: action.isLoggedIn }
		default:
			return state
	}
}

export const LogInTC = (loginData: loginType) => (dispatch: Dispatch) => {
	AuthApi.login(loginData)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(changeLoginStatus(true))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(dispatch, error.messages)
		})
}

export const LogOutTC = () => (dispatch: Dispatch) => {
	AuthApi.logOut()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(changeLoginStatus(false))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(dispatch, error.messages)
		})
}

export const MeTC = () => (dispatch: Dispatch) => {
	AuthApi.me()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(changeLoginStatus(true))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(dispatch, error.messages)
		})
		.finally(() => {
			dispatch(changeInitializeStatus(true))
		})
}
