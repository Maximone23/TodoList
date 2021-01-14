import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core"
import {Menu} from "@material-ui/icons"
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {AppStatusType} from "../state/app-reducer";


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
    const appStatus = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)

    return (
        <div className="App">
            <AppBar position="sticky">
                <ErrorSnackbar/>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                { appStatus === 'loading' && < LinearProgress /> }
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App


