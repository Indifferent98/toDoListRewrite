import React from 'react'

type initialStateType = {
	isLoggedIn: boolean
}
const initialState: initialStateType = {
	isLoggedIn: false,
}

type actionsType = {}

export const authReducer = (
	state: initialStateType = initialState,
	action: actionsType
) => {}
