import {TasksStateType, TaskType} from "../AppWithRedux"
import {v1} from "uuid"
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";


type ActionType = removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

type removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-STATUS-TASK'
    taskID: string
    isDone: boolean
    todoListID: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TITLE-TASK'
    taskID: string
    title: string
    todoListID: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK':
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        case 'CHANGE-STATUS-TASK': {
            let todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskID
                    ? {...t, isDone: action.isDone}
                    : t)
            return {...state}
        }

        case 'CHANGE-TITLE-TASK': {
            const todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskID
                    ? {...t, title: action.title}
                    : t)
            return {...state}
        }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistID]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): removeTaskActionType => ({
    type: 'REMOVE-TASK',
    taskID,
    todolistID
})
export const addTaskAC = (title: string, todolistID: string): addTaskActionType => ({
    type: 'ADD-TASK',
    title,
    todolistID
})
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): changeTaskStatusActionType => ({
    type: 'CHANGE-STATUS-TASK',
    taskID,
    isDone,
    todoListID
})
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): changeTaskTitleActionType => ({
    type: 'CHANGE-TITLE-TASK',
    taskID,
    title,
    todoListID
})
