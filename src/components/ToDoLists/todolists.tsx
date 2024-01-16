import { Grid, Paper } from '@mui/material'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
	addTaskTC,
	removeTaskTC,
	updateTaskStatusTC,
} from '../../reducers/tasks-reducer'
import {
	fetchToDoListsTC,
	todoListDomainType,
	removeToDoListTC,
	filterValuesType,
	changeToDoListFilterAC,
	addToDoListTC,
	changeToDoListTitleTC,
} from '../../reducers/todolists-reducer'
import { useAppDispatch, AppRootStateType } from '../../state/store'
import { AddItemForm } from '../addItemForm/addItemForm'
import { TaskStatuses } from '../api/todolist-api'
import { Todolist } from './ToDoList/todolist'

export const ToDoLists = () => {
	const dispatch = useAppDispatch()

	const todolists = useSelector<AppRootStateType, todoListDomainType[]>(
		state => state.todolists
	)

	const removeToDoList = useCallback(
		(toDoListId: string) => {
			dispatch(removeToDoListTC(toDoListId))
		},
		[dispatch]
	)

	const addTask = useCallback(
		(title: string, toDoListId: string) => {
			dispatch(addTaskTC(toDoListId, title))
		},
		[dispatch]
	)
	const removeTask = useCallback(
		(id: string, toDoListId: string) => {
			dispatch(removeTaskTC(toDoListId, id))
		},
		[dispatch]
	)
	const changeFilter = useCallback(
		(newFilter: filterValuesType, toDoListId: string) => {
			dispatch(changeToDoListFilterAC(newFilter, toDoListId))
		},
		[dispatch]
	)
	const changeTaskStatus = useCallback(
		(taskId: string, isDone: boolean, toDoListId: string) => {
			dispatch(
				updateTaskStatusTC(toDoListId, taskId, {
					status: isDone ? TaskStatuses.Completed : TaskStatuses.InProgress,
				})
			)
		},
		[dispatch]
	)
	const addToDoList = useCallback(
		(title: string) => {
			dispatch(addToDoListTC(title))
		},
		[dispatch]
	)

	const changeTaskTitle = useCallback(
		(title: string, todolistId: string, taskId: string) => {
			dispatch(
				updateTaskStatusTC(todolistId, taskId, {
					title: title,
				})
			)
		},
		[dispatch]
	)

	const changeTodolistTitle = useCallback(
		(todolistId: string, title: string) => {
			dispatch(changeToDoListTitleTC(todolistId, title))
		},
		[dispatch]
	)

	return (
		<>
			<Grid container>
				<span style={{ marginTop: '15px', marginBottom: '15px' }}>
					<AddItemForm addItem={addToDoList} disabled={false} />
				</span>
			</Grid>
			<Grid container spacing={2}>
				{todolists.map(t => {
					return (
						<Grid key={t.id} item>
							<Paper style={{ padding: '10px' }} elevation={3}>
								<Todolist
									key={t.id}
									title={t.title}
									removeTask={removeTask}
									changeFilter={changeFilter}
									addTask={addTask}
									changeTaskStatus={changeTaskStatus}
									filter={t.filter}
									toDoListId={t.id}
									removeToDoList={removeToDoList}
									changeTaskTitle={changeTaskTitle}
									changeTodolistTitle={changeTodolistTitle}
								/>
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
}
