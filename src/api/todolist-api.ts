import axios from "axios";

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f1c82423-cd00-4395-b54c-61550699ae40'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<any>>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<any>>(`/todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    }
}
