import React, {useCallback, useEffect} from "react"
import {FilterValuesType} from "./AppWithRedux"
import {EditableSpan} from "./EditableSpan"
import {Button, IconButton} from "@material-ui/core"
import {Delete} from "@material-ui/icons"
import {AddItemForm} from "./AddItemForm"
import {Task} from "./Task"
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const TodoList: React.FC<PropsType> = React.memo((
    {
        id, title, tasks, filter, addTask, removeTask, changeStatus,
        changeTaskTitle, changeFilter, changeTodoListTitle, removeTodoList
    }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id])
    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.status)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.status)
    }

    const addTaskCB = useCallback((title: string) => {
        addTask(title, id)
    }, [id, addTask])
    const changeTodoListTitleCB = useCallback((title: string) => {
        changeTodoListTitle(id, title)
    }, [changeTodoListTitle, id])

    const onAllClickHandler = useCallback(() => changeFilter("all", id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [changeFilter, id])
    return (
        <div className={"wrapper"}>
            <h3 className={"todoListTitle"}>
                <EditableSpan value={title} changeValue={changeTodoListTitleCB}/>
                <IconButton onClick={() => removeTodoList(id)}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCB}/>
            <ul>
                {tasksForTodoList.map(t => <Task key={t.id}
                                                 task={t}
                                                 removeTask={removeTask}
                                                 changeStatus={changeStatus}
                                                 changeTaskTitle={changeTaskTitle}
                                                 todolistId={id}
                />)
                }
            </ul>
            <div className={"filterWrapper"}>
                <Button color={filter === "all" ? "primary" : "default"}
                        onClick={onAllClickHandler}
                        variant="contained"
                        style={{marginRight: "5px"}}>
                    All
                </Button>
                <Button color={filter === "active" ? "primary" : "default"}
                        onClick={onActiveClickHandler}
                        variant="contained"
                        style={{marginRight: "5px"}}>
                    Active
                </Button>
                <Button color={filter === "completed" ? "primary" : "default"}
                        onClick={onCompletedClickHandler}
                        variant="contained">
                    Completed
                </Button>
            </div>
        </div>
    )
})