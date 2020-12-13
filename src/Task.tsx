import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core"
import {EditableSpan} from "./EditableSpan"
import {Delete} from "@material-ui/icons"
import {TaskType} from "./AppWithRedux"

type TaskPropsType = {
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const removeTask = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.removeTask, props.task.id, props.todolistId])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }, [props.changeStatus, props.task.id, props.todolistId])
    const changeTaskTitle = useCallback((value: string) => {
        props.changeTaskTitle(props.task.id, value, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])
    return (
        <li key={props.task.id}>
            <div>
                <Checkbox checked={props.task.isDone}
                          color={"primary"}
                          onChange={changeStatus}/>
                <EditableSpan
                    isDone={props.task.isDone}
                    value={props.task.title}
                    changeValue={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
        </li>
    )
})

