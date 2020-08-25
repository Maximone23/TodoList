import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState <Array<TaskType>>(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: false},
            {id: 3, title: "React", isDone: true},
            {id: 4, title: "GraphQL", isDone: true},
            {id: 5, title: "Rest API", isDone: true}
        ]
    )

   const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskID: number) {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if(filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if(filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;


