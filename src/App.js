import { BrowserRouter as Router, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Editor from './components/Editor'
import About from './components/About'
import { FcPlus } from 'react-icons/fc'
import Button from './components/Button'
import { useState, useEffect } from 'react'
import { TaskContext, TaskProvider } from './context/TaskContext'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [showEditor, setShowEditor] = useState(false)
    // 1st part is state you want to update, 2nd is the function to update it
    let storedTasks = localStorage.getItem('task');
    const [tasks, setTasks] = useState(storedTasks ? JSON.parse(storedTasks) : []);
    const [status, setStatus] = useState('all');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [pinnedTasks, setPinnedTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [unCompletedTasks, setUncompletedTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('')
    const [taskToEdit, setTaskToEdit] = useState({});

    useEffect(() => {
      localStorage.setItem('task', JSON.stringify(tasks));
    }, [tasks])

    useEffect(() => {
      filterHandler();
    }, [tasks, status])

    useEffect(() => {
      pinnedFilterHandler()
    }, [tasks])

    useEffect(() => {
      let completedTasks = (tasks.filter(task => task.completed)).length;
      setCompletedTasks(completedTasks);
      let unCompletedTasks = (tasks.filter(task => !task.completed)).length;
      setUncompletedTasks(unCompletedTasks);
    }, [tasks])

    useEffect(() => {
      
    })

  // Add Task
  const addTask = (task) => {
    console.log(task)
    // Generates ID for tasks
    const id = Math.floor(Math.random() * 10000) + 1;
    // Takes task info and makes an object
    const newTask = {id, ...task};
    // Update State
    localStorage.setItem('task', JSON.stringify(newTask));
    setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = (id) => {
    // Filter out the id's that are not the ID we have from the click event.
    localStorage.setItem('task', JSON.stringify(tasks.filter((task) => task.id !== id)));
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Task Completion 
  const onComplete = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, completed: !task.completed, pin: false} : task))
  }

  // Toggle Task's Pinned State
  // Takes ID so it can find out which task to toggle
  const togglePin = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, pin: !task.pin,} : task))
  }

  // Filter Pinned Tasks
  const pinnedFilterHandler = () => {
    setPinnedTasks(tasks.filter(task=> task.pin === true))
  }

  // Filter Handler
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTasks(tasks.filter(task => task.completed === true));
        setTaskTitle('Completed Tasks')
        break;
      case 'uncompleted':
        setFilteredTasks(tasks.filter(task => task.completed === false));
        setTaskTitle('Uncompleted Tasks')
        break;
      case 'all':
        setFilteredTasks(tasks);
        setTaskTitle('All Tasks')
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  }

  // Editor Handler
  const editorHandler = (task) => {
    setShowEditor(true);
    console.log(task)
  }
  

  return (
    <Router>
      <Sidebar 
        tasks={tasks} 
        completedTasks={completedTasks}
        unCompletedTasks={unCompletedTasks}
        pinnedTasks={pinnedTasks} 
        filteredTasks={filteredTasks} 
        showAdd={showAddTask} 
        setStatus={setStatus} 
        status={status}
      />
      <TaskProvider>
        {showEditor && <Editor tasks={tasks} setShowEditor={() => setShowEditor(!showEditor)}/>}
      </TaskProvider>
      <div className="container">
        <Route path='/' exact render={(props) => (
          <>
            {/* Shorthand turnary if else is nothing */}
          {showAddTask && <AddTask onAdd={addTask} setShowAddTask={() => setShowAddTask(!showAddTask)}/>}
          {/* Turnary Operator to display no tasks message */}
          <div className="task-title">{taskTitle}</div>
          {tasks.length> 0 ? <Tasks tasks={tasks} filteredTasks={filteredTasks} onDelete={deleteTask} togglePin={togglePin} onToggle={onComplete} editorHandler={editorHandler}/> : <div style={{color: 'white'}}>Get started!</div>}
          <FcPlus className="add-task" onClick={() => setShowAddTask(!showAddTask)}/>
          </>
        )}/>
        <Route path='/about' component={About}/>
      </div>
    </Router>
  );
}

export default App;
