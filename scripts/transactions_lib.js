import {Clamp} from "./help_lib.js"
import {IsValueInRange} from "./help_lib.js"
import {IsDateInRange} from "./help_lib.js"


/**
 * Возвращает массив(множество) уникальных типов транзакций.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @returns {set} множество Set
 */
export function GetUniqueTransactionTypes(transactions)
{
   let newTransactions = new Set();

    for(let i = 0; i < transactions.length; i++)
        newTransactions.add(transactions[i].transaction_type);

    return newTransactions;
}


/**
 *  Вычисляет сумму всех транзакций.
 * @param {*} transactions - исходный массив транзакций (см. transactiobs.js)
 * @returns {float} - сумма транзакций
 */
export function CalculateTotalAmount(transactions)
{
    let summ = 0.0

    for(let i = 0; i < transactions.length; i++)
        summ += transactions[i].transaction_amount

    return summ;
}


/**
 * Вычисляет общую сумму транзакций за указанный год, месяц и день. [extra]
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @param {int} year  - год
 * @param {int} month - месяц
 * @param {int} day   - день
 * @returns {float} - вычисленная сумма
 */
export function CalculateTotalAmountByDate(transactions, year = 0, month = 0, day = 0)
{
    let dateFilter = (year !== 0) ? String(year) : null;

    if(dateFilter == null)
        return CalculateTotalAmount(transactions);

    let monthStr = null;
    if(month !== 0)
    {
        month = Clamp(month, 1, 12)
        monthStr = (month < 10) ? ("0" + month) : String(month);
        dateFilter += ("-" + monthStr);
    }

    let dayStr = null;
    if(day !== 0)
    {
        switch(month)
        {	
        case 2:
			day = Clamp(day, 1, (year % 4) ? 28 : 29);
			break;

        case 4:
        case 6:
        case 9:
        case 11:
			day = Clamp(day, 1, 30);
			break;
			
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
			day = Clamp(day, 1, 31);
			break;
        }

        dayStr = (day < 10) ? ("0" + day) : String(day);
        dateFilter += ("-" + dayStr);
    }

    let summ = 0.0;

    for(let i = 0; i < transactions.length; i++)
        if(transactions[i].transaction_date.includes(dateFilter))
            summ += transactions[i].transaction_amount;

    return summ;
}


/**
 * Возвращает транзакции указанного типа (debit или credit).
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @param {string} type - тип (debit или credit соотв.).
 * @returns {*}
 */
export function GetTransactionByType(transactions, type)
{
    if(type !== "debit" && type !== "credit")
	{
		console.log("GetTransactionByType: Invalid type!");
		return null;
	}

	let arr = [];
	for(let i = 0; i < transactions.length; i++)
	{
		if(transactions[i].transaction_type == type)
			arr.push(transactions[i]);
	}

	return arr;
}


/**
 * Возвращает массив транзакций, проведенных в указанном диапазоне дат от startDate до endDate.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @param {string} startDate -  начальная дата, в формате строки: yyyy-mm-dd
 * @param {string} endDate - конечная дата, в формате строки: yyyy-mm-dd
 * @returns {*}
 */
export function GetTransactionsInDateRange(transactions, startDate, endDate)
{
	let inRangeTransactions = [];

	for(let i = 0; i < transactions.length; i++)
		if(IsDateInRange(transactions[i].transaction_date, startDate, endDate))
			inRangeTransactions.push(transactions[i]);

    return inRangeTransactions;
}


/**
 * Возвращает массив транзакций, совершенных с указанным merchantName.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @param {string} merchantName - имя торговца, совершавшего транзакцию
 * @returns {array}
 */
export function GetTransactionsByMerchant(transactions, merchantName)
{
	let arr = [];

	for(let i = 0; i < transactions.length; i++)
		if(transactions[i].merchant_name == merchantName)
			arr.push(transactions[i])

	return arr;
}


/**
 * Возвращает среднее значение транзакций.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @returns {float} среднее значение транзакций
 */
export function CalculateAverageTransactionAmount(transactions)
{
    return CalculateTotalAmount(transactions) / transactions.length;
}


/**
 * Возвращает массив транзакций с суммой в заданном диапазоне от minAmount до maxAmount.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @param {float} minAmount - минимальная сумма транзакции
 * @param {float} maxAmount - максимальная сумма транзакции
 * @returns {array}
 */
export function GetTransactionsByAmountRange(transactions, minAmount, maxAmount)
{
	let arr = [];

	for(let i = 0; i < transactions.length; i++)
		if(IsValueInRange(transactions[i].transaction_amount, minAmount, maxAmount))
			arr.push(transactions[i]);

	return arr;
}


/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @returns {float}
 */
export function CalculateTotalDebitAmount(transactions)
{
	let summTransactionsDebit = 0.0;

	for(let i = 0; i < transactions.length; i++)
		if(transactions[i].transaction_type == "debit")
			summTransactionsDebit += transactions[i].transaction_amount;

    return summTransactionsDebit;
}


/**
 * Возвращает месяц, в котором было больше всего транзакций.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @returns {*}
 */
export function FindMostTransactionsMonth(transactions)
{
	let monthNames = [	"Jan", "Feb", "Mar", "Apr", 
						"May", "Jun", "Jul", "Aug",
						"Sep", "Oct", "Nov", "Dec"	];
	let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	let max = 0;

	for(let i = 0; i < transactions.length; i++)
	{
		let month = parseInt((transactions[i].transaction_date.split("-"))[1]);
		switch(month)
		{
		case 1: months[0]++; break;
		case 2: months[1]++; break;
		case 3: months[2]++; break;
		case 4: months[3]++; break;
		case 5: months[4]++; break;
		case 6: months[5]++; break;
		case 7: months[6]++; break;
		case 8: months[7]++; break;
		case 9: months[8]++; break;
		case 10: months[9]++; break;
		case 11: months[10]++; break;
		case 12: months[11]++; break;
		}
	}

	for(let i = 1; i < months.length; i++)
		if(months[max] < months[i])
			max = i;

	// console.log(months);
	return monthNames[max];
}


/**
 * Возвращает месяц, в котором было больше дебетовых транзакций.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @returns {*}
 */
export function FindMostDebitTransactionMonth(transactions)
{
	let monthNames = [	"Jan", "Feb", "Mar", "Apr", 
						"May", "Jun", "Jul", "Aug",
						"Sep", "Oct", "Nov", "Dec"	];
	let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	let max = 0;

	for(let i = 0; i < transactions.length; i++)
	{
		if(transactions[i].transaction_type === "debit")
		{
			let month = parseInt((transactions[i].transaction_date.split("-"))[1]);
			switch(month)
			{
			case 1: months[0]++; break;
			case 2: months[1]++; break;
			case 3: months[2]++; break;
			case 4: months[3]++; break;
			case 5: months[4]++; break;
			case 6: months[5]++; break;
			case 7: months[6]++; break;
			case 8: months[7]++; break;
			case 9: months[8]++; break;
			case 10: months[9]++; break;
			case 11: months[10]++; break;
			case 12: months[11]++; break;
			}
		}
	}

	for(let i = 1; i < months.length; i++)
		if(months[max] < months[i])
			max = i;

	return monthNames[max];
}


/**
 * Возвращает каких транзакций больше всего.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @returns {string} ["debit" - если дебетовых | "credit" - если кредитовых | "equal" - если количество равно]
 */
export function MostTransactionTypes(transactions)
{
	let debits = 0;
	let credits = 0;

	for(let i = 0; i < transactions.length; i++)
	{
		if(transactions[i].transaction_type == "debit")
			debits++;
		
		if(transactions[i].transaction_type == "credit")
			credits++;
	}

    return (debits === credits) ? "equal" : (debits > credits) ? "debit" : "credit";
}


/**
 * Возвращает массив транзакций, совершенных до указанной даты.
 * @param {array} transactions - исходный массив транзакций (см. transactiobs.js)
 * @param {string} date - дата, в формате строки: yyyy-mm-dd
 * @returns {*}
 */
export function GetTransactionsBeforeDate(transactions, date)
{
	let dateObj = new Date(date);
	let transactionsBefore = [];

	for(let i = 0; i < transactions.length; i++)
		if(new Date(transactions[i].transaction_date) < dateObj)
			transactionsBefore.push(transactions[i]);

	return transactionsBefore;
}


/**
 * Возвращает транзакцию по ее уникальному идентификатору (id).
 * @param {array} transactions 
 * @param {string} id - уникальный идентификатор
 * @returns {object} транзакция, в противном случае null
 */
export function FindTransactionById(transactions, id)
{
	for(let i = 0; i < transactions.length; i++)
	{
		if(transactions[i].transaction_id === id)
			return transactions[i];
	}
	return null;
}


/**
 * Возвращает новый массив, содержащий только описания транзакций.
 * @param {array} transactions 
 * @returns {array} массив описаний транзакций, в противном случае пустой массив
 */
export function MapTransactionDescriptions(transactions)
{
	let descs = [];

	for(let i = 0; i < transactions.length; i++)
		descs.push(transactions[i].transaction_description);

    return descs;
}