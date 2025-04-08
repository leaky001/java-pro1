document.addEventListener("DOMContentLoaded", loadExpenses);
// it makes it wait until the html pages is fully loaded

const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalSpent = document.getElementById("total-spent");
const budgetInput = document.getElementById("budget-input");
const budgetAlert = document.getElementById("budget-alert"); 
const searchInput = document.getElementById("search-input");
const darkModeToggle = document.getElementById("dark-mode-toggle");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = localStorage.getItem("budget") ? parseFloat(localStorage.getItem("budget")) : 0;

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const date = document.getElementById("expense-date").value;

    if (!name || !amount || !date) return;

    const expense = { name, amount, date, completed: false };
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));
    
    addExpenseToList(expense, expenses.length - 1);
    updateTotal();
    
    form.reset();
});

function addExpenseToList(expense, index) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="${expense.completed ? 'completed' : ''}">${expense.name} - $${expense.amount} on ${expense.date}</span>
        <button onclick="editExpense(${index})">✏ Edit</button>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteExpense(${index})">❌</button>
    `;
    expenseList.appendChild(li);
}



function loadExpenses() {
    expenseList.innerHTML = ""; 
    expenses.forEach((expense, index) => addExpenseToList(expense, index));
    updateTotal();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    loadExpenses(); 
}

function toggleComplete(index) {
    expenses[index].completed = !expenses[index].completed;
    localStorage.setItem("expenses", JSON.stringify(expenses));
    loadExpenses(); 
}


function editExpense(index) {
    const newName = prompt("Enter new expense name:", expenses[index].name);
    const newAmount = parseFloat(prompt("Enter new expense amount:", expenses[index].amount));
    const newDate = prompt("Enter new expense date:", expenses[index].date);

    if (newName && !isNaN(newAmount) && newDate) {
        expenses[index] = { name: newName, amount: newAmount, date: newDate, completed: expenses[index].completed };
        localStorage.setItem("expenses", JSON.stringify(expenses));
        loadExpenses();
    }
}



budgetInput.addEventListener("input", function() {
    budget = parseFloat(budgetInput.value) || 0;
    localStorage.setItem("budget", budget);
    updateTotal();
});


