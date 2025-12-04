import React, { useState, useEffect } from 'react';
import { TaskEntity } from '../model/TaskEntity';

interface TaskFormProps {
    task?: TaskEntity | null;
    onSubmit: (task: { id?: string; title: string; completed: boolean }) => void;
    onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setCompleted(task.completed);
        } else {
            setTitle('');
            setCompleted(false);
        }
    }, [task]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit({
                ...(task && { id: task.id }),
                title: title.trim(),
                completed,
            });
            setTitle('');
            setCompleted(false);
        }
    };

    return (
        <div className="task-form" style={{ marginBottom: '20px' }}>
            <h3>{task ? 'Edit Task' : 'Create New Task'}</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '3px',
                            border: '1px solid #ddd',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                        Completed
                    </label>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '8px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                        }}
                    >
                        {task ? 'Update' : 'Create'}
                    </button>
                    {task && (
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                padding: '8px 20px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
