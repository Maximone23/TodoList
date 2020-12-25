import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core"
import {EditableSpan} from "./EditableSpan"
import {Delete} from "@material-ui/icons"
import {TaskType} from "./api/todolist-api";

export type TaskPropsType = {
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({removeTask, changeStatus, changeTaskTitle, task, todolistId}: TaskPropsType) => {
    const removeTaskCB = useCallback(() => {
        removeTask(task.id, todolistId)
    }, [removeTask, task.id, todolistId])
    const changeStatusCB = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, e.currentTarget.checked, todolistId)
    }, [changeStatus, task.id, todolistId])
    const changeTaskTitleCB = useCallback((value: string) => {
        changeTaskTitle(task.id, value, todolistId)
    }, [changeTaskTitle, task.id, todolistId])
    return (
        <li key={task.id}>
            <div>
                <Checkbox checked={task.completed}
                          color={"primary"}
                          onChange={changeStatusCB}/>
                <EditableSpan
                    isDone={task.completed}
                    value={task.title}
                    changeValue={changeTaskTitleCB}/>
                <IconButton onClick={removeTaskCB}>
                    <Delete/>
                </IconButton>
            </div>
        </li>
    )
})

