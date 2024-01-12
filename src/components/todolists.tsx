import { ChangeEvent, useCallback, useEffect } from 'react'
import s from './/todolist.module.css'
import { AddItemForm } from './addItemForm/addItemForm'
import { EditableSpan } from './editableSpan/editableSpan'
import Button from '@mui/material/Button'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { Delete } from '@mui/icons-material'

import Checkbox from '@mui/material/Checkbox'
import { filterValuesType } from '../reducers/todolists-reducer'

import React from 'react'
import { Task } from './task/task'
import { TaskStatuses, itemTaskType } from './api/todolist-api'
import { AppRootStateType, useAppDispatch } from '../state/store'
import { fetchTasksTC } from '../reducers/tasks-reducer'
import { useSelector } from 'react-redux'

type TodolistPropsType = {
	title: string
	toDoListId: string
	// tasks: itemTaskType[]
	removeTask: (id: string, toDoListId: string) => void
	filter: filterValuesType
	changeFilter: (newFilter: filterValuesType, toDoListId: string) => void
	addTask: (title: string, toDoListId: string) => void
	removeToDoList: (toDoListId: string) => void
	changeTaskStatus: (
		taskId: string,
		isDone: boolean,
		toDoListId: string
	) => void
	changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
	changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
	const tasks = useSelector<AppRootStateType, itemTaskType[]>(
		state => state.tasks[props.toDoListId]
	)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchTasksTC(props.toDoListId))
	}, [])

	console.log('todolist called')
	const removeToDoList = () => {
		props.removeToDoList(props.toDoListId)
	}

	const onAllClickHandler = useCallback(() => {
		props.changeFilter('all', props.toDoListId)
	}, [props.changeFilter, props.toDoListId])

	const onCompletedClickHandler = useCallback(() => {
		props.changeFilter('completed', props.toDoListId)
	}, [props.changeFilter, props.toDoListId])

	const onActiveClickHandler = useCallback(() => {
		props.changeFilter('active', props.toDoListId)
	}, [props.changeFilter, props.toDoListId])

	const addTask = useCallback(
		(title: string) => {
			props.addTask(title, props.toDoListId)
		},
		[props.addTask, props.toDoListId]
	)

	const changeTodolistTitle = useCallback(
		(title: string) => {
			props.changeTodolistTitle(props.toDoListId, title)
		},
		[props.changeTodolistTitle, props.toDoListId]
	)

	let filteredTask: itemTaskType[] = tasks
	if (props.filter === 'active') {
		filteredTask = tasks.filter(t => t.status === TaskStatuses.InProgress)
	}
	if (props.filter === 'completed') {
		filteredTask = tasks.filter(t => t.status === TaskStatuses.Completed)
	}

	return (
		<div className={s.main}>
			<div className={s.list}>
				<h3>
					<EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
					<IconButton
						onClick={removeToDoList}
						size='small'
						color='primary'
						style={{ maxHeight: '20px', maxWidth: '20px', width: '20px' }}
					>
						<DeleteIcon color='action' />
					</IconButton>
				</h3>
				<AddItemForm addItem={addTask} />
				<ul>
					{filteredTask.map(t => (
						<Task
							key={t.id}
							task={t}
							changeTaskStatus={props.changeTaskStatus}
							toDoListId={props.toDoListId}
							removeTask={props.removeTask}
							changeTaskTitle={props.changeTaskTitle}
						/>
					))}
				</ul>
				<div>
					<Button
						className={props.filter === 'all' ? s.currentButtonIsActive : ''}
						onClick={onAllClickHandler}
						color={props.filter === 'all' ? 'primary' : 'secondary'}
						variant={props.filter === 'all' ? 'contained' : 'outlined'}
						size='small'
						style={{ borderRadius: '12px' }}
					>
						All
					</Button>
					<Button
						className={props.filter === 'active' ? s.currentButtonIsActive : ''}
						onClick={onActiveClickHandler}
						variant={props.filter === 'active' ? 'contained' : 'outlined'}
						size='small'
						style={{ borderRadius: '12px' }}
					>
						Active
					</Button>
					<Button
						variant={props.filter === 'completed' ? 'contained' : 'outlined'}
						onClick={onCompletedClickHandler}
						size='small'
						style={{ borderRadius: '12px' }}
					>
						completed
					</Button>
				</div>
			</div>
		</div>
	)
})
