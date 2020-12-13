import React, {useCallback} from "react"
import {FilterValuesType, TaskType} from "./AppWithRedux"
import {EditableSpan} from "./EditableSpan"
import {Button, IconButton} from "@material-ui/core"
import {Delete} from "@material-ui/icons"
import {AddItemForm} from "./AddItemForm"
import {Task} from "./Task"

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

export const TodoList: React.FC<PropsType> = React.memo((props: PropsType) => {
    console.log('TodoList')

    let tasksForTodoList = props.tasks
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.changeTodoListTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])
    return (
        <div className={"wrapper"}>
            <h3 className={"todoListTitle"}>
                <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.id)}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksForTodoList.map(t => <Task key={t.id}
                                                 task={t}
                                                 removeTask={props.removeTask}
                                                 changeStatus={props.changeStatus}
                                                 changeTaskTitle={props.changeTaskTitle}
                                                 todolistId={props.id}
                />)
                }
            </ul>
            <div className={"filterWrapper"}>
                <Button color={props.filter === "all" ? "primary" : "default"}
                        onClick={onAllClickHandler}
                        variant="contained"
                        style={{marginRight: "5px"}}>
                    All
                </Button>
                <Button color={props.filter === "active" ? "primary" : "default"}
                        onClick={onActiveClickHandler}
                        variant="contained"
                        style={{marginRight: "5px"}}>
                    Active
                </Button>
                <Button color={props.filter === "completed" ? "primary" : "default"}
                        onClick={onCompletedClickHandler}
                        variant="contained">
                    Completed
                </Button>
            </div>
        </div>
    )
})