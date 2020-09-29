import React, {ChangeEvent, useState} from 'react'
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    value: string
    isDone?: boolean
    changeValue: (value: string) => void
}

function EditableSpan(props: EditableSpanType) {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ?
            // <input
            //     value={title}
            //     onBlur={deActivatedEditMode}
            //     autoFocus={true}
            //     onChange={onChangeHandler}/>
            <TextField value={title}
                       onBlur={deActivatedEditMode}
                       autoFocus={true}
                       onChange={onChangeHandler}/>
            : <span
                className={props.isDone ? "is-done" : ""}
                onDoubleClick={activatedEditMode}>
                {props.value}
              </span>
    )
}

export default EditableSpan