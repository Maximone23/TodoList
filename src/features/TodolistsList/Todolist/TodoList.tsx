import React, {useCallback, useEffect} from "react"
import {FilterValuesType} from "../../../app/App"
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan"
import {Button, IconButton} from "@material-ui/core"
import {Delete} from "@material-ui/icons"
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm"
import {Task} from "./Task/Task"
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {TodolistDomainType} from "../../../state/todolists-reducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
    demo?: boolean
}

export const TodoList: React.FC<PropsType> = React.memo((
    {
        tasks, todolist, addTask, removeTask, changeStatus,
        changeTaskTitle, changeFilter, changeTodoListTitle, removeTodoList, demo = false
    }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        if(demo) {
            return
        }
        dispatch(fetchTasksTC(todolist.id))
    }, [dispatch, todolist.id])
    let tasksForTodoList = tasks
    if (todolist.filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.status)
    }
    if (todolist.filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.status)
    }

    const addTaskCB = useCallback((title: string) => {
        addTask(title, todolist.id)
    }, [todolist.id, addTask])
    const changeTodoListTitleCB = useCallback((title: string) => {
        changeTodoListTitle(todolist.id, title)
    }, [changeTodoListTitle, todolist.id])

    const onAllClickHandler = useCallback(() => changeFilter("all", todolist.id), [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => changeFilter("active", todolist.id), [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", todolist.id), [changeFilter, todolist.id])
    return (
        <div className={"wrapper"}>
            <h3 className={"todoListTitle"}>
                <EditableSpan value={todolist.title} changeValue={changeTodoListTitleCB}/>
                <IconButton onClick={() => removeTodoList(todolist.id)} disabled={todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCB} disabled={todolist.entityStatus === 'loading'}/>
            <ul>
                {tasksForTodoList.map(t => <Task key={t.id}
                                                 task={t}
                                                 removeTask={removeTask}
                                                 changeStatus={changeStatus}
                                                 changeTaskTitle={changeTaskTitle}
                                                 todolistId={todolist.id}
                />)
                }
            </ul>
            <div className={"filterWrapper"}>
                <Button color={todolist.filter === "all" ? "primary" : "default"}
                        onClick={onAllClickHandler}
                        variant="contained"
                        style={{marginRight: "5px"}}>
                    All
                </Button>
                <Button color={todolist.filter === "active" ? "primary" : "default"}
                        onClick={onActiveClickHandler}
                        variant="contained"
                        style={{marginRight: "5px"}}>
                    Active
                </Button>
                <Button color={todolist.filter === "completed" ? "primary" : "default"}
                        onClick={onCompletedClickHandler}
                        variant="contained">
                    Completed
                </Button>
            </div>
        </div>
    )
})