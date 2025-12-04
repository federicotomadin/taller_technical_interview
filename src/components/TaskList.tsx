import React from 'react';
import { TaskEntity } from '../model/TaskEntity';

interface TaskListProps {
    tasks: TaskEntity[];
    onEdit: (task: TaskEntity) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (task: TaskEntity) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
                                                      tasks,
                                                      onEdit,
                                                      onDelete,
                                                      onToggleComplete,
                                                  }) => {
    return (
        <div className="task-list">
            <h2>Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks available. Create one to get started!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            style={{
                                padding: '15px',
                                marginBottom: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => onToggleComplete(task)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span
                                    style={{
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? '#888' : '#000',
                                    }}
                                >
                  {task.title}
                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => onEdit(task)}
                                    style={{
                                        padding: '5px 15px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(task.id)}
                                    style={{
                                        padding: '5px 15px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
