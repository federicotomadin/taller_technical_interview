import React, { useState } from 'react';
import { TaskEntity } from '../model/TaskEntity';
import { useTasks } from '../hooks/useTasks';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';

export const TaskManager: React.FC = () => {
    const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
    const [editingTask, setEditingTask] = useState<TaskEntity | null>(null);

    const handleSubmit = async (taskData: {
        id?: string;
        title: string;
        completed: boolean;
    }) => {
        if (taskData.id) {
            // Update existing task
            await updateTask({
                id: taskData.id,
                title: taskData.title,
                completed: taskData.completed,
            });
            setEditingTask(null);
        } else {
            // Create new task
            await createTask({
                title: taskData.title,
                completed: taskData.completed,
            });
        }
    };

    const handleEdit = (task: TaskEntity) => {
        setEditingTask(task);
    };

    const handleCancel = () => {
        setEditingTask(null);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(id);
        }
    };

    const handleToggleComplete = async (task: TaskEntity) => {
        await updateTask({
            id: task.id,
            title: task.title,
            completed: !task.completed,
        });
    };

    if (loading && tasks.length === 0) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div className="task-manager" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Task Manager</h1>

            {error && (
                <div
                    style={{
                        padding: '10px',
                        marginBottom: '20px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        borderRadius: '5px',
                    }}
                >
                    Error: {error}
                </div>
            )}

            <TaskForm task={editingTask} onSubmit={handleSubmit} onCancel={handleCancel} />

            <TaskList
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
            />
        </div>
    );
};
