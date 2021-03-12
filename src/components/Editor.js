import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const Editor = ({taskToEdit, onEdit, setShowEditor, taskUpdate}) => {
    const [text, setEditedText] = useState(taskToEdit.text)
    const [day, setEditedDay] = useState(taskToEdit.day)
    const [note, setEditedNote] = useState(taskToEdit.note)

    const onSubmit = (e) => {
        e.preventDefault();
        onEdit({...taskToEdit, text, day, note});
        setShowEditor(false);
        taskUpdate();
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
        <div>
            <div className="modal-background">
            <div className="modal-wrapper">
                <form className="add-form" onSubmit={onSubmit}>
                    <h1 className="text-center">Editing Task</h1>
                    <div className="form-control">
                        <label>Task</label>
                        <input 
                            type="text" 
                            defaultValue={taskToEdit.text}
                            required
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Date</label>
                        <input 
                            type="date"
                            min={today}
                            required
                            defaultValue={taskToEdit.day}
                            onChange={(e) => setEditedDay(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Notes (Optional)</label>
                        <input 
                            type="text"
                            defaultValue={taskToEdit.note}
                            onChange={(e) => setEditedNote(e.target.value)}
                        />
                    </div>
                    <FaTimes className="modal-X" onClick={setShowEditor}/>
                    <input type="submit" value="Save changes!" className="btn btn-block"/>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Editor
