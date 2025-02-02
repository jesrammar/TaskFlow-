import Task from '../models/task.model.js';

// Obtener todas las tareas
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
};

// Obtener una tarea por ID
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "There isn't any task with ID: " + req.params.id });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the task", error });
    }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newTask = new Task({ title, description, date });
        const taskSaved = await newTask.save();
        res.json(taskSaved);
    } catch (error) {
        res.status(500).json({ message: "Error creating the task", error });
    }
};

// Eliminar una tarea por ID
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "There isn't any task with ID: " + req.params.id });
        res.json({ message: "Task deleted successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error deleting the task", error });
    }
};

// Actualizar una tarea por ID
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "There isn't any task with ID: " + req.params.id });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating the task", error });
    }
};
