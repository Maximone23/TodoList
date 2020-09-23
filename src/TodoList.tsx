import React, {ChangeEvent} from "react"
import {FilterValuesType, TaskType} from "./App"
import AddItemForm from "./addItemForm";
import EditableSpan from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export function TodoList(props: PropsType) {

    const tasks = props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.id)
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)
            const changeTaskTitle = (value: string) => {
                props.changeTaskTitle(t.id, value, props.id)
            }
            return (
                <li key={t.id} className={"tasksWrapper"}>
                    <div>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={changeStatus}/>
                        <EditableSpan
                            isDone={t.isDone}
                            value={t.title}
                            changeValue={changeTaskTitle}/>
                    </div>
                    <div>
                        <button onClick={removeTask} className={"delete"}>&#10008;</button>
                    </div>
                </li>
            )
        })

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    return (
        <div className={"wrapper"}>
            <button className={"delete deleteTodoList"} onClick={() => props.removeTodoList(props.id)}>&#10008;</button>
            <h3 className={"todoListTitle"}>
                <EditableSpan value={props.title}  changeValue={changeTodoListTitle} />

            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                { tasks }
            </ul>
            <div className={"filterWrapper"}>
                <button className={props.filter === "all" ? "active-filter filterBtn" : "filterBtn"}
                        onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === "active" ? "active-filter filterBtn" : "filterBtn"}
                        onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === "completed" ? "active-filter filterBtn" : "filterBtn"}
                        onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )
}