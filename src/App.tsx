import React, {useState} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {v1} from "uuid"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string] : Array<TaskType>
}


function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "Rest API", isDone: true}
        ],
        [todoListID2] : [
            {id: v1(), title: "Books", isDone: true},
            {id: v1(), title: "Butter", isDone: false},
            {id: v1(), title: "Onion", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true}
        ]
    })

    function addTask(title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function removeTask(taskID: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                    }
                    return <TodoList
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        removeTodoList={removeTodoList}/>
                })
            }

        </div>
    )
}

export default App


