import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Button from './Button'

const AddTask = ({ onAdd, setShowAddTask }) => {
    // Component level state
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [note, setNote] = useState('')
    const [pin, setPin] = useState(false)
    const [completed, setCompleted] = useState(false)

    const onSubmit = (e) => {
        // So it doesn't actually submit to a page
        e.preventDefault()
        onAdd({ text, day, note, pin, completed })
        setText('')
        setDay('')
        setNote('')
        setPin(false)
        setCompleted(false)
        setShowAddTask()
    }

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yy = today.getFullYear();

    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    today = (`${yy}-${mm}-${dd}`).toString();

    return (
        <div className="modal-background">
            <div className="modal-wrapper">
                <form className="add-form" onSubmit={onSubmit}>
                    <h1 className="text-center">Add a task!</h1>
                    <div className="form-control">
                        <label>Task</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Water the plants..."
                            value={text}
                            // 2 Way Binding, changes the state value into user input
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Date</label>
                        <input 
                            type="date"
                            min={today}
                            required
                            placeholder="9 Jan, 5pm..."
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Notes</label>
                        <input 
                            type="text"
                            required
                            placeholder="Carton of eggs..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <FaTimes className="modal-X" onClick={setShowAddTask}/>
                    <input type="submit" value="Add Task!" className="btn btn-block"/>
                </form>
            </div>
        </div>
    )
}

export default AddTask
