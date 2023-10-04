// const express = require("express");
const Task = require("../models/taskModels");

//* Create
const createTask = async (req, res) => {
  console.log(req.body);
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

//* Read
const getTask = async (req, res) => {
  console.log("xxxx");
  try {
    const task = await Task.findAll();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to get tasks" });
  }
};
const getOneTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get task" });
  }
};

//* Update
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

//* Delete
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getOneTask,
};
