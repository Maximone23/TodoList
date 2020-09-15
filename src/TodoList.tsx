import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValuesType, TaskType} from "./App"

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
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim(), props.id)
            setTitle("")
        } else {
            setError("Title is required!")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    return (
        <div className={"wrapper"}>
            <button className={"delete deleteTodoList"} onClick={() => props.removeTodoList(props.id)}>&#10008;</button>
            <h3 className={"todoListTitle"}>{props.title}</h3>
            <div>
                <input
                    placeholder="Add new task"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyUpHandler}
                    className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id, props.id)
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        return (
                            <li key={t.id} className={"tasksWrapper"}>
                                <div>
                                    <input type="checkbox" checked={t.isDone} onChange={changeStatus}/>
                                    <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                                </div>
                                <div>
                                    <button onClick={removeTask} className={"delete"}>&#10008;</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={"filterWrapper"}>
                <button className={props.filter === "all" ? "active-filter filterBtn" : "filterBtn"} onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === "active" ? "active-filter filterBtn" : "filterBtn"} onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === "completed" ? "active-filter filterBtn" : "filterBtn"} onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )
}