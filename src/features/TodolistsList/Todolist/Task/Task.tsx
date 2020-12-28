import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core"
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan"
import {Delete} from "@material-ui/icons"
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";

export type TaskPropsType = {
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({removeTask, changeStatus, changeTaskTitle, task, todolistId}: TaskPropsType) => {
    const removeTaskCB = useCallback(() => {
        removeTask(task.id, todolistId)
    }, [removeTask, task.id, todolistId])
    const changeStatusCB = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [changeStatus, task.id, todolistId])
    const changeTaskTitleCB = useCallback((value: string) => {
        changeTaskTitle(task.id, value, todolistId)
    }, [changeTaskTitle, task.id, todolistId])
    return (
        <li key={task.id}>
            <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <Checkbox checked={task.status === TaskStatuses.Completed}
                          color={"primary"}
                          onChange={changeStatusCB}/>
                <EditableSpan
                    value={task.title}
                    changeValue={changeTaskTitleCB}/>
                <IconButton onClick={removeTaskCB}>
                    <Delete/>
                </IconButton>
            </div>
        </li>
    )
})

