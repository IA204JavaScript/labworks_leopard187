export function generateId() {
    return 'tr_KB' + Math.random().toString(36).slice(2, 9);
}

export function formatDate(date) {
    return date.toLocaleString();
}