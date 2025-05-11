import { formatDate, generateId } from "./utils.js"


/**
 * Глобальный массив транзакций
 */
let transactions = [];


/**
 * Добавление транзакции
 * @param {float} amount    - сумма
 * @param {string} category  - категория (debit/credit)
 * @param {string} description - описания транзакции
 */
export function addTransaction(amount, category, description) {
    let transaction = {
        id: generateId(),
        date: formatDate(new Date()),
        amount,
        category,
        description
    };

    transactions.push(transaction);
}


/**
 * Удаляет транзацию из массива по соответствующему ид
 * @param {string} id - соотв. ид
 */
export function deleteTransaction(id) {
    transactions = transactions.filter(elem => elem.id !== id);
}


/**
 * 
 * @returns Возвращает глобальный массив объектов транзаций 
 */
export function getTransactions() {
    return transactions;
}