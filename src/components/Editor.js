import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const Editor = ({tasks, onEdit, setShowEditor}) => {

    const onSubmit = (e) => {
        e.preventDefault();
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
                            value={tasks.text}
                            required
                            // 2 Way Binding, changes the state value into user input
                            // onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Date</label>
                        <input 
                            type="date"
                            min={today}
                            required
                            value={tasks.day}
                            // onChange={(e) => setDay(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Notes (Optional)</label>
                        <input 
                            type="text"
                            value={tasks.note}
                            // onChange={(e) => setNote(e.target.value)}
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
