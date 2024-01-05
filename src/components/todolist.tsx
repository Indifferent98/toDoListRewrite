import { ChangeEvent } from 'react'
import s from './/todolist.module.css'
import { AddItemForm } from './addItemForm/addItemForm'
import { EditableSpan } from './editableSpan/editableSpan'
import Button from '@mui/material/Button'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { Delete } from '@mui/icons-material'

import Checkbox from '@mui/material/Checkbox'
import { filterValuesType } from '../reducers/todolists-reducer'
export type tasksType = {
	title: string
	id: string
	isDone: boolean
}

type TodolistPropsType = {
	title: string
	toDoListId: string
	tasks: tasksType[]
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

export const Todolist = (props: TodolistPropsType) => {
	const removeToDoList = () => {
		props.removeToDoList(props.toDoListId)
	}
	const onAllClickHandler = () => {
		props.changeFilter('all', props.toDoListId)
	}
	const onCompletedClickHandler = () => {
		props.changeFilter('completed', props.toDoListId)
	}
	const onActiveClickHandler = () => {
		props.changeFilter('active', props.toDoListId)
	}
	const addTask = (title: string) => {
		props.addTask(title, props.toDoListId)
	}

	const changeTodolistTitle = (title: string) => {
		props.changeTodolistTitle(props.toDoListId, title)
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
					{props.tasks.map(t => {
						const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeTaskStatus(
								t.id,
								e.currentTarget.checked,
								props.toDoListId
							)
						}
						const changeTaskTitle = (title: string) => {
							debugger
							props.changeTaskTitle(title, props.toDoListId, t.id)
						}
						return (
							<li key={t.id}>
								<Checkbox
									defaultChecked
									onChange={changeTaskStatus}
									checked={t.isDone}
									size='small'
								/>

								<span className={t.isDone ? s.taskIsDone : ''}>
									<EditableSpan title={t.title} changeTitle={changeTaskTitle} />
								</span>
								<IconButton
									size='small'
									color='default'
									style={{ maxHeight: '20px', maxWidth: '20px', width: '20px' }}
									onClick={() => {
										props.removeTask(t.id, props.toDoListId)
									}}
								>
									<Delete />
								</IconButton>
							</li>
						)
					})}
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
}
