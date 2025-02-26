/**
 * Возвращает значение, ограниченное диапазоном [min..max]
 * @param {*} val - проверяемое значение
 * @param {*} min - минимальное значение
 * @param {*} max - максимальное значение
 * @returns val, если не выходит за диапазон, 
 */
export function Clamp(val, min, max)
{
    return (val < min) ? min : (val > max) ? max : val;
}


/**
 * Проверяет, если значение находится в диапазоне [min..max]
 * @param {*} val - проверяемое значение
 * @param {*} min - минимальное значение
 * @param {*} max - максимальное значение
 * @returns true, если значение val в диапазоне [min..max]
 */
export function IsValueInRange(val, min, max)
{
	return (val >= min && val <= max);
}


/**
 * Проверяет, если дата находится в диапазоне [min..max]
 * @param {string} date - дата в формате yyyy-mm-dd
 * @param {*} min - минимальная дата
 * @param {*} max - максимальная дата
 * @returns true, если дата в диапазоне [min..max]
 */
export function IsDateInRange(date, min, max)
{
	let dateValue = new Date(date);
    let minValue = new Date(min);
    let maxValue = new Date(max);

	return dateValue >= minValue && dateValue <= maxValue;
}