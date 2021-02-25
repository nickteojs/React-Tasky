import { useLocation } from 'react-router-dom'
import { AiFillPushpin, AiFillStar } from 'react-icons/ai'
import Button from './Button'
import Footer from './Footer'
import Quote from './Quote'
import Pinned from './Pinned'

const Sidebar = ({tasks, pinnedTasks, filteredTasks, onAdd, showAdd, setStatus, status}) => {
    const location = useLocation()

    const allHandler = () => {
        setStatus('all')
    }
    const uncompletedHandler = () => {
        setStatus('uncompleted')
    }
    const completedHandler = () => {
        setStatus('completed')
    }

    return (
        <div className="sidebar">
            <h1 className="app-title">Tasky</h1>
            <div className="status-buttons">
                <div className={`status-btn ${status === 'all' ? 'active' : ''}`} onClick={allHandler}>All ({tasks.length})</div>
                <div className={`status-btn ${status === 'uncompleted' ? 'active' : ''}`} onClick={uncompletedHandler}>Uncompleted {(filteredTasks.filter((task) => task.completed === false)).length}</div>
                <div className={`status-btn ${status === 'completed' ? 'active' : ''}`} onClick={completedHandler}>Completed {(filteredTasks.filter((task) => task.completed === true)).length}</div>
            </div>
            {location.pathname === '/' && <button className="add-task-btn" color='green' text='Add' onClick={onAdd}>Add Task</button>}
            <Quote />
            <div className="pinned-task-header"><p><AiFillStar className="pin-star"/>Important Tasks</p></div>
            {pinnedTasks.map((task) => (
                <Pinned pinnedTasks={task} key={task.id}/>
            ))}
            <Footer className="footer"/>
            {/* <div className="custom-select">
                <select name="todos">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div> */}
        </div>
    )
}

export default Sidebar
