import React, { useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskFormProps {
    taskToEdit: Task | null; // The task we want to edit (null if creating a new task)
    onSave: (task: Task) => void; // Callback function to save the task
    onCancel: () => void; // Callback function to cancel and close the form
}

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, onSave, onCancel }) => {
    const [taskName, setTaskName] = useState('');

    // Effect to set taskName when taskToEdit changes
    useEffect(() => {
        if (taskToEdit) {
            setTaskName(taskToEdit.task);
        }
    }, [taskToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // If taskName is empty, do nothing
        if (!taskName) return;

        // Create a task object
        const task: Task = taskToEdit
            ? { ...taskToEdit, task: taskName } // Update existing task
            : { id: Date.now(), task: taskName, completed: false }; // New task

        onSave(task); // Call the onSave callback to save the task
        setTaskName(''); // Reset the input field
    };

    return (
        <div className="task-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task"
                />
                <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default TaskForm;
