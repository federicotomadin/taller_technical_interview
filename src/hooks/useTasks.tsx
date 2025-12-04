import { useState, useEffect, useCallback } from 'react';
import { TaskEntity, CreateTaskDto, UpdateTaskDto } from '../model/TaskEntity';
import { taskService } from '../services/TaskService';

export const useTasks = () => {
    const [tasks, setTasks] = useState<TaskEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await taskService.getAllTasks();
            setTasks(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, []);

    const getTaskById = useCallback(async (id: string): Promise<TaskEntity | null> => {
        setLoading(true);
        setError(null);
        try {
            const task = await taskService.getTaskById(id);
            return task;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch task');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = useCallback(async (task: CreateTaskDto): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const success = await taskService.createTask(task);
            if (success) {
                await fetchTasks(); // Refresh the list
            }
            return success;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create task');
            return false;
        } finally {
            setLoading(false);
        }
    }, [fetchTasks]);

    const updateTask = useCallback(async (task: UpdateTaskDto): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const success = await taskService.updateTask(task.id, task);
            if (success) {
                await fetchTasks();
            }
            return success;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update task');
            return false;
        } finally {
            setLoading(false);
        }
    }, [fetchTasks]);

    const deleteTask = useCallback(async (id: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const success = await taskService.deleteTask(id);
            if (success) {
                await fetchTasks(); // Refresh the list
            }
            return success;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete task');
            return false;
        } finally {
            setLoading(false);
        }
    }, [fetchTasks]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        getTaskById,
        createTask,
        updateTask,
        deleteTask,
    };
};
