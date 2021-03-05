import Task from './Task'

const Tasks = ({tasks, filteredTasks, onDelete, onToggle, togglePin, editorHandler}) => {
    return (
        <>
            {filteredTasks.map((task) => (
                // KEY = Unique identifier, in this case, the task id
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} togglePin={togglePin} editorHandler={editorHandler}/>
            ))}
        </>
    )
}

export default Tasks
