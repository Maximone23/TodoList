import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {TextField} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import {AddBox} from "@material-ui/icons"

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( ({addItem}: AddItemFormType) => {
    console.log('addItemForm')

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onAddTaskClick = () => {
        if (title.trim()) {
            addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required!")
        }

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            onAddTaskClick()
        }
    }
    return (
        <div>
            {/*<input*/}
            {/*    placeholder="Add new"*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onKeyUpHandler}*/}
            {/*    className={error ? "error" : ""}/>*/}
            {/*<button onClick={onAddTaskClick}>+</button>*/}
            <TextField variant={"outlined"}
                       size={"small"}
                       placeholder="Add new"
                       label={"Title"}
                       value={title}
                       helperText={error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}/>
            {/*<Button variant="contained" color="primary" size="small" onClick={onAddTaskClick}>+</Button>*/}
            <IconButton color="primary" onClick={onAddTaskClick}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )

})