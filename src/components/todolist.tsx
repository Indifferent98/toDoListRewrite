import s from './/todolist.module.css'

type tasksType = {
	title: string
	id: number
	isDone: boolean
}
type TodolistPropsType = {
	title: string
	tasks: tasksType[]
	removeTask: (id: number) => void
}
export const Todolist = (props: TodolistPropsType) => (
	<div className={s.main}>
		<div className={s.list}>
			<h3>{props.title}</h3>
			<div>
				<input />
				<button>+</button>
			</div>
			<ul>
				{props.tasks.map(t => (
					<li key={t.id}>
						<input type='checkbox' checked={t.isDone} />
						<span>{t.title}</span>
						<button
							onClick={() => {
								props.removeTask(t.id)
							}}
						>
							x
						</button>
					</li>
				))}
			</ul>
			<div>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	</div>
)
