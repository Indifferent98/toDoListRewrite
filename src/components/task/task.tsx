import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from '../editableSpan/editableSpan'
import IconButton from '@mui/material/IconButton'
import Delete from '@mui/icons-material/Delete'
import { tasksType } from '../../reducers/tasks-reducer'
import s from './task.module.css'
type TaskType = {
	changeTaskStatus: (
		taskId: string,
		isDone: boolean,
		toDoListId: string
	) => void
	toDoListId: string
	changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
	removeTask: (id: string, toDoListId: string) => void
	task: tasksType
}
export const Task = React.memo((props: TaskType) => {
	const changeTaskStatus = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			props.changeTaskStatus(
				props.task.id,
				e.currentTarget.checked,
				props.toDoListId
			)
		},
		[props.toDoListId, props.task.id]
	)
	const changeTaskTitle = useCallback(
		(title: string) => {
			props.changeTaskTitle(title, props.toDoListId, props.task.id)
		},
		[props.changeTaskTitle, props.toDoListId, props.task.id]
	)

	return (
		<li>
			<Checkbox
				onChange={changeTaskStatus}
				checked={props.task.isDone}
				size='small'
			/>

			<span className={props.task.isDone ? s.taskIsDone : ''}>
				<EditableSpan title={props.task.title} changeTitle={changeTaskTitle} />
			</span>
			<IconButton
				size='small'
				color='default'
				style={{ maxHeight: '20px', maxWidth: '20px', width: '20px' }}
				onClick={() => {
					props.removeTask(props.task.id, props.toDoListId)
				}}
			>
				<Delete />
			</IconButton>
		</li>
	)
})
