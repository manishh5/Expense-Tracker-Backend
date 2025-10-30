const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET all
router.get("/", async (req, res) => {
    const data = await Expense.find();
    res.json(data);
});

// POST create
router.post("/", async (req, res) => {
    const { title, amount, category, date } = req.body;

    if(!title || !amount || !category || !date)
        return res.status(400).json({ message: "All fields required" });

    const newExpense = new Expense({ title, amount, category, date });
    await newExpense.save();
    res.json({ message: "Expense Added", newExpense });
});

// DELETE 
router.delete("/:id", async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
