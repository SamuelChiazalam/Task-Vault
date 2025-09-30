const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { isAuthenticated } = require("../middleware/auth");
const logger = require("../utils/logger");

// All routes require authentication
router.use(isAuthenticated);

// GET all todos (with filtering)
router.get("/", async (req, res) => {
  try {
    const filter = req.query.filter || "all"; // all, pending, completed
    const userId = req.session.userId;

    let query = { user: userId, status: { $ne: "deleted" } };

    if (filter === "pending") {
      query.status = "pending";
    } else if (filter === "completed") {
      query.status = "completed";
    }

    const todos = await Todo.find(query).sort({ createdAt: -1 });

    logger.info("Todos fetched", { userId, filter, count: todos.length });
    res.render("todos", { todos, filter, username: req.session.username });
  } catch (error) {
    logger.error("Error fetching todos", error);
    res.status(500).send("Error loading todos");
  }
});

// POST create new todo
router.post("/create", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      logger.warn("Create todo attempt with empty title");
      return res.redirect("/todos?error=Title is required");
    }

    const todo = new Todo({
      title: title.trim(),
      description: description ? description.trim() : "",
      user: req.session.userId,
    });

    await todo.save();

    logger.info("Todo created", {
      todoId: todo._id,
      userId: req.session.userId,
    });
    res.redirect("/todos");
  } catch (error) {
    logger.error("Error creating todo", error);
    res.redirect("/todos?error=Error creating todo");
  }
});

// POST update todo status
router.post("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "completed", "deleted"].includes(status)) {
      logger.warn("Invalid status update attempt", { status });
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const todo = await Todo.findOne({ _id: id, user: req.session.userId });

    if (!todo) {
      logger.warn("Todo not found or unauthorized", { todoId: id });
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    todo.status = status;
    await todo.save();

    logger.info("Todo status updated", { todoId: id, newStatus: status });
    res.json({ success: true });
  } catch (error) {
    logger.error("Error updating todo status", error);
    res.status(500).json({ success: false, message: "Error updating todo" });
  }
});

// POST delete todo (soft delete)
router.post("/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, user: req.session.userId });

    if (!todo) {
      logger.warn("Delete attempt on non-existent todo", { todoId: id });
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    todo.status = "deleted";
    await todo.save();

    logger.info("Todo deleted", { todoId: id });
    res.json({ success: true });
  } catch (error) {
    logger.error("Error deleting todo", error);
    res.status(500).json({ success: false, message: "Error deleting todo" });
  }
});

module.exports = router;
