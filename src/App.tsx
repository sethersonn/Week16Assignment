import { useState } from 'react';
import { testData } from './data';
import TopBar from './components/TopBar';
import ItemList from './components/ItemList';
import { Task } from './types';
import TaskForm from './components/TaskForm';

//App component
const App = () => {
  //state hook for managing list of tasks
  //`tasks` state holds array of task objects
  //`setTasks` is function used to update state
  const [tasks, setTasks] = useState<Task[]>(testData); //initialize tasks with testData

  //state hook managing input field value/new task text
  //`newTask` state holds current value of input
  //`setNewTask` is function used to update
  const [newTask, setNewTask] = useState(''); //initialize `newTask as empty string

  //State to handle task editing
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  //State to toggle form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);

  //function called when "Add" button is clicked
  const addTask = () => {
    //only add new task if `newTask` input field is not empty
    if (newTask) {
      //Generate a unique ID by finding the max id in the current tasks and incrementing it
      const newId = tasks.reduce((maxId, task) => (task.id > maxId ? task.id : maxId), 0) + 1;

      //create new task object
      const newTaskObj = {
        //use the calculated new ID
        id: newId,
        //task's description is input value
        task: newTask,
        //task not completed
        completed: false,
      };
      //update tasks state by adding new task object to array
      setTasks([...tasks, newTaskObj]);
      //clear input field
      setNewTask('');
    }
  };


  // Function to delete a task
  const deleteTask = (id: number) => {
    // Filter out the task by id
    setTasks(tasks.filter((task) => task.id !== id));
  };


  const toggleCompletion = (id: number) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  //Handle saving a task (add or update)
  const saveTask = (task: Task) => {
    if (taskToEdit) {
      setTasks(tasks.map(t => t.id === task.id ? task : t)); // Update task
    } else {
      setTasks([...tasks, task]); // Add new task
    }
    setIsFormVisible(false); // Hide the form
    setTaskToEdit(null); // Clear the task being edited
  };

  // Handle cancelling the form (reset state)
  const cancelForm = () => {
    setIsFormVisible(false);
    setTaskToEdit(null); // Clear the task being edited
  };

  // Show the form for adding a new task or editing an existing task
  const showForm = (task?: Task) => {
    setTaskToEdit(task || null);
    setIsFormVisible(true);
  };

  return (
    <div>
      {/* TopBar Component */}
      <TopBar
        //Passing the current value of the input field
        newTask={newTask}
        //Passing the function to update the input field value
        setNewTask={setNewTask}
        //Passing the function to add a new task
        addTask={addTask} />

      {/* Button to open the form for adding a new task */}
      <button onClick={() => showForm()}>Add New Task</button>

      {/* ItemList Component */}
      <ItemList
        //Passing the list of tasks to ItemList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />

      {/* Conditionally render TaskForm if it's visible */}
      {isFormVisible && (
        <TaskForm
          taskToEdit={taskToEdit}
          onSave={saveTask}
          onCancel={cancelForm}
        />
      )}
    </div>
  );
};

export default App;
