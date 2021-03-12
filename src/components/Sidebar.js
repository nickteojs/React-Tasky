import { AiFillStar } from 'react-icons/ai'
import Footer from './Footer'
import Quote from './Quote'
import Pinned from './Pinned'

const Sidebar = ({tasks, pinnedTasks, completedTasks, unCompletedTasks, setStatus, status}) => {

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
                <div className={`status-btn ${status === 'uncompleted' ? 'active' : ''}`} onClick={uncompletedHandler}>Uncompleted ({unCompletedTasks})</div>
                <div className={`status-btn ${status === 'completed' ? 'active' : ''}`} onClick={completedHandler}>Completed ({completedTasks})</div>
            </div>
            <Quote />
            <div className="pinned-task-header"><p><AiFillStar className="pin-star"/>Important Tasks</p></div>
            <div className="pinned-container" id={pinnedTasks.length > 6 && 'style-1'}>
                {pinnedTasks.map((task) => (
                    <Pinned pinnedTasks={task} key={task.id}/>
                ))}
            </div>
            <Footer className="footer"/>
        </div>
    )
}

export default Sidebar
