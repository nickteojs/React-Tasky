import { FaTimes } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import {  AiFillStar } from 'react-icons/ai'
import Button from './Button'

const Task = ({ task, onDelete, onToggle, togglePin }) => {
    return (
        <div className="task">
            <div className={`task-header ${task.completed ? 'completed' : ''}`}><h3>{task.text}</h3></div>
            <p className="task-date">Due Date: {task.day}{task.pin ? <AiFillStar className="name-star"/> : ''}</p>
            <p className="task-desc">{task.note ? 'Notes:' : 'No notes.'} {task.note}</p>
            <div className="task-buttons">
                <div className="task-btn btn-add" onClick={() => onToggle(task.id)}><TiTick  className="add-button"/></div>
                <div className="task-btn btn-delete" onClick={() => onDelete(task.id)}><MdDelete className="delete-button" /></div>
                <div className="task-btn btn-pin" onClick={() => togglePin(task.id)}><AiFillStar className="pin-button"/></div>
            </div>
        </div>
        // <h3>{`${task.text} ${task.completed ? '(COMPLETED)' : ''}`}</h3>
    )
}

export default Task
