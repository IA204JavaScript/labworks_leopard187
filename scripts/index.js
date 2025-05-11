import {addTransaction, deleteTransaction, getTransactions} from './transactions.js'
import {showTransactionTable, calculateTotal, showFullDescription} from './ui.js'

const form = document.getElementById('inputForm');
const table = document.getElementById('transactionTable');


function updateUI() {
    const transactions = getTransactions();
    showTransactionTable(transactions);
    calculateTotal(transactions);
}


form.addEventListener("submit", event => {
    event.preventDefault();

    const summInput = parseFloat(document.getElementById('summInput').value);
    const categorySelect = document.getElementById('categorySelect').value;
    const descInput = document.getElementById("descInput").value.trim();

    if (!summInput || !categorySelect || !descInput) 
        return;

    addTransaction(summInput, categorySelect, descInput);
    updateUI()

    form.reset();
});


table.addEventListener("click", event => {
    if (event.target.classList.contains("deleteButton")) {
        const id = event.target.dataset.id;
        deleteTransaction(id);
        updateUI()
    }
    else if (event.target.tagName === 'TD') {
        let row = event.target.parentElement;
        showFullDescription(row.dataset.description);
    }
});