
/**
 * Отображет массив транзакций в таблице
 * @param {object_array} transactions 
 */
export function showTransactionTable(transactions) {
    const tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = ""; 
    
    for(let i = 0; i < transactions.length; i++)
    {
        let elem = transactions[i];

        const tr = document.createElement("tr");
        tr.className = elem.amount >= 0 ? "positive" : "negative";
        tr.dataset.description = elem.description;

        tr.innerHTML = `
        <td>${elem.date}</td>
        <td>${elem.category}</td>
        <td>${elem.description.split(" ").slice(0, 4).join(" ")}...</td>
        <td>
            <button class="deleteButton" data-id="${elem.id}">Удалить</button>
        </td>
        `

        tableBody.appendChild(tr);
    }

}


/**
 * Высчитывает общую сумму транзакций
 * @param {object_array} transactions - массив транзакций
 */
export function calculateTotal(transactions) {
    let total = 0;
    for(let i = 0; i < transactions.length; i++)
        total += transactions[i].amount;
    document.getElementById("totalSumm").textContent = total.toFixed(2);
}


/**
 * Отображает полное описание в отдельном div блоке
 * @param {string} desc - само описание транзакции
 */
export function showFullDescription(desc) {
    document.getElementById("fullDesc").textContent = `Полное описание: ${desc} `;
}