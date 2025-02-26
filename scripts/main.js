import {transactionsUSM} from "./transactions.js"

import {GetUniqueTransactionTypes} from "./transactions_lib.js"
import {CalculateTotalAmount} from "./transactions_lib.js"
import {CalculateTotalAmountByDate} from "./transactions_lib.js"
import {GetTransactionByType} from "./transactions_lib.js"
import {GetTransactionsInDateRange} from "./transactions_lib.js"
import {GetTransactionsByMerchant} from "./transactions_lib.js"
import {CalculateAverageTransactionAmount} from "./transactions_lib.js"
import {GetTransactionsByAmountRange} from "./transactions_lib.js"
import {CalculateTotalDebitAmount} from "./transactions_lib.js"
import {FindMostTransactionsMonth} from "./transactions_lib.js"
import {FindMostDebitTransactionMonth} from "./transactions_lib.js"
import {MostTransactionTypes} from "./transactions_lib.js"
import {GetTransactionsBeforeDate} from "./transactions_lib.js"
import {FindTransactionById} from "./transactions_lib.js"
import {MapTransactionDescriptions} from "./transactions_lib.js"


console.log("Function 1 ready");
console.log(GetUniqueTransactionTypes(transactionsUSM));

console.log("Function 2 ready");
console.log(CalculateTotalAmount(transactionsUSM));

console.log("Function 3 [extra] ready");
console.log(CalculateTotalAmountByDate(transactionsUSM, 2019, 1, 1));

console.log("Function 4 ready");
console.log(GetTransactionByType(transactionsUSM, "debit"));

console.log("Function 5 ready");
console.log(GetTransactionsInDateRange(transactionsUSM, "2019-01-01", "2019-01-10"));

console.log("Function 6 ready");
console.log(GetTransactionsByMerchant(transactionsUSM, "GasStationXYZ"));

console.log("Function 7 ready");
console.log(CalculateAverageTransactionAmount(transactionsUSM));

console.log("Function 8 ready");
console.log(GetTransactionsByAmountRange(transactionsUSM, 30, 60));

console.log("Function 9 ready");
console.log(CalculateTotalDebitAmount(transactionsUSM));

console.log("Function 10 ready");
console.log(FindMostTransactionsMonth(transactionsUSM));

console.log("Function 11");
console.log(FindMostDebitTransactionMonth(transactionsUSM));

console.log("Function 12");
console.log(MostTransactionTypes(transactionsUSM));

console.log("Function 13");
console.log(GetTransactionsBeforeDate(transactionsUSM, "2019-02-28"));

console.log("Function 14");
console.log(FindTransactionById(transactionsUSM, "121"));

console.log("Function 15");
console.log(MapTransactionDescriptions(transactionsUSM));