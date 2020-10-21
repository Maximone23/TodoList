import {TasksStateType, TaskType} from "../App"
import {v1} from "uuid"
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";


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



export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            // let copyState = {...state}
            // copyState[action.todolistID] = copyState[action.todolistID].filter(t => t.id != action.taskID)
            // return copyState
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id != action.taskID)}
        case 'ADD-TASK':
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        case 'CHANGE-STATUS-TASK': {
            let todoListTasks = state[action.todoListID]
            let task = todoListTasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state, [action.todoListID]: todoListTasks}
        }

        case 'CHANGE-TITLE-TASK':{
            const todoListTasks = state[action.todoListID]
            const task = todoListTasks.find(task => task.id === action.taskID)
            if (task) {
                task.title = action.title
            }
            return {...state, [action.todoListID]: todoListTasks}
        }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistID]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            throw new Error("I don`t understand this type of action")
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) :removeTaskActionType  => ({type: 'REMOVE-TASK', taskID, todolistID})
export const addTaskAC = (title: string, todolistID: string) :addTaskActionType  => ({type: 'ADD-TASK', title, todolistID})
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) :changeTaskStatusActionType  => ({type: 'CHANGE-STATUS-TASK', taskID, isDone, todoListID })
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) :changeTaskTitleActionType  => ({type: 'CHANGE-TITLE-TASK', taskID, title, todoListID })
