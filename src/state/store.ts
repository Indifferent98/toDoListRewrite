import React from 'react'
import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore,
} from 'redux'
import { taskReducer } from '../reducers/tasks-reducer'
import { todolistReducer } from '../reducers/todolists-reducer'
import { ThunkDispatch, ThunkMiddleware, thunk } from 'redux-thunk'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
	tasks: taskReducer,
	todolists: todolistReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(
	rootReducer,
	applyMiddleware(thunk) as any
)
export type AppDispatchType = ThunkDispatch<
	AppRootStateType,
	unknown,
	AnyAction
>
export const useAppDispatch = useDispatch<AppDispatchType>
// @ts-ignore
window.store = store
