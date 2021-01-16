import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addTodolistTC,
    changeTodoListFilterAC,
    fetchTodolistsTC,
    removeTodolistTC, TodolistDomainType,
    updateTodolistTC
} from "../../state/todolists-reducer";
import {AppRootStateType} from "../../state/store";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {FilterValuesType, TasksStateType, TodoListType} from "../../app/App";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/TodoList";


type PropsType = {
    demo?: boolean
}


export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskTC(todoListID, taskID))
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskTC(taskID, {status}, todoListID))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistTC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(updateTaskTC(taskID, {title}, todoListID))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(updateTodolistTC(todoListID, title))
    }, [dispatch])
    return (
        <>
            <Grid container style={{padding: "10px", margin: "30px auto"}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let tasksForTodoList = tasks[tl.id];
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <TodoList
                                        todolist={tl}
                                        tasks={tasksForTodoList}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeStatus={changeStatus}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                        demo={demo}/>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
};
