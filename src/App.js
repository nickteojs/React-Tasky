import { BrowserRouter as Router, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Button from './components/Button'
import { useState, useEffect } from 'react'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    // 1st part is state you want to update, 2nd is the function to update it
    let storedTasks = localStorage.getItem('task');
    const [tasks, setTasks] = useState(storedTasks ? JSON.parse(storedTasks) : []);
    const [status, setStatus] = useState('all');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [pinnedTasks, setPinnedTasks] = useState([]);
    // const localItem = localStorage.getItem('tasks');
    // console.log(JSON.parse(localItem));

    useEffect(() => {
      localStorage.setItem('task', JSON.stringify(tasks));
    }, [tasks])

    useEffect(() => {
      filterHandler();
    }, [tasks, status])

    useEffect(() => {
      pinnedFilterHandler()
    }, [tasks])

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

  // CompleteToggler
  const onComplete = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, completed: !task.completed} : task))
  }


  // Toggle Pin
  // Takes ID so it can find out which task to toggle
  const togglePin = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, pin: !task.pin} : task))
  }

  // Pin Filter Handler
  const pinnedFilterHandler = () => {
    setPinnedTasks(tasks.filter(task=> task.pin === true))
  }

  // Filter Handler
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTasks(tasks.filter(task => task.completed === true));
        break;
      case 'uncompleted':
        setFilteredTasks(tasks.filter(task => task.completed === false));
        break;
      case 'all':
        setFilteredTasks(tasks);
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  }

  return (
    <Router>
      <Sidebar tasks={tasks} pinnedTasks={pinnedTasks} filteredTasks={filteredTasks} onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} setStatus={setStatus} status={status}/>
      <div className="container">
        <Route path='/' exact render={(props) => (
          <>
            {/* Shorthand turnary if else is nothing */}
          {showAddTask && <AddTask onAdd={addTask} setShowAddTask={() => setShowAddTask(!showAddTask)}/>}
          {/* Turnary Operator to display no tasks message */}
          {tasks.length> 0 ? <Tasks tasks={tasks} filteredTasks={filteredTasks} onDelete={deleteTask} togglePin={togglePin} onToggle={onComplete}/> : 'Add a task!'}
          </>
        )}/>
        <Route path='/about' component={About}/>
      </div>
    </Router>
  );
}

export default App;
