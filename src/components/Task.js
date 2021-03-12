import { MdDelete } from 'react-icons/md'
import { TiTick, TiPencil } from 'react-icons/ti'
import { AiFillStar } from 'react-icons/ai'

const Task = ({ task, onDelete, onToggle, togglePin, editorHandler, taskComplete, taskRemove }) => {
    const currentDate = new Date();
    const dueDate = (Date.parse(task.day))
    const timeDifference = dueDate - currentDate;
    const timeDifferenceinDays = Math.floor(timeDifference / (1000*3600*24));

    const completeHandler = (task) => {
        taskComplete();
        onToggle(task.id)
    }

    const removeHandler = (task) => {
        taskRemove();
        onDelete(task.id);
    }

    return (
        <div className="task">
            <div className={`task-header ${task.completed ? 'completed' : ''}`}><h3>{task.text}</h3></div>
            <p className="task-date">Due Date: {task.day} {task.pin ? <AiFillStar className="name-star"/> : ''}</p>
            {!task.completed && <p className="task-time">Days left: {timeDifferenceinDays}</p>}
            <p className="task-desc">{task.note ? 'Notes:' : 'No notes.'} {task.note}</p>
            <div className="task-buttons">
                {!task.completed && <div className="task-btn btn-add" onClick={() => completeHandler(task)}><TiTick className="add-button"/></div>}
                <div className="task-btn btn-delete" onClick={() => removeHandler(task)}><MdDelete className="delete-button" /></div>
                {!task.completed && <div className="task-btn btn-update" onClick={() => editorHandler(task)}><TiPencil className="update-button" /></div>}
                {!task.completed && <div className="task-btn btn-pin" onClick={() => togglePin(task.id)}><AiFillStar className="pin-button"/></div>}
            </div>
        </div>
    )
}

export default Task
