import React, {useCallback} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {AddItemForm} from "./AddItemForm"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core"
import {Menu} from "@material-ui/icons"
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    // let todoListID1 = v1()
    // let todoListID2 = v1()
    //
    // const [todoLists, dispatchToTodolist] = useReducer(todolistsReducer,[
    //     {id: todoListID1, title: "What to learn", filter: "all"},
    //     {id: todoListID2, title: "What to buy", filter: "all"}
    // ])
    //
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    //     [todoListID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: false},
    //         {id: v1(), title: "React", isDone: true},
    //         {id: v1(), title: "GraphQL", isDone: true},
    //         {id: v1(), title: "Rest API", isDone: true}
    //     ],
    //     [todoListID2]: [
    //         {id: v1(), title: "Books", isDone: true},
    //         {id: v1(), title: "Butter", isDone: false},
    //         {id: v1(), title: "Onion", isDone: true},
    //         {id: v1(), title: "Beer", isDone: true},
    //         {id: v1(), title: "Fish", isDone: true}
    //     ]
    // })
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, value))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoListAC(title))
    },[dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    },[dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(ChangeTodoListTitleAC(todoListID, title))
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            filter={tl.filter}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeStatus={changeStatus}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}/>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App


