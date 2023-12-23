function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

function createSlug(str) {
    return str
        .toLowerCase() // Convert the string to lowercase
        .replace(/[^\w\s-]/g, '') // Remove non-word characters except spaces and hyphens
        .trim() // Trim leading/trailing spaces
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace consecutive hyphens with a single hyphen
}

function simplifyDate(inputDate) {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const parts = inputDate.split('-');
    const monthIndex = parseInt(parts[1], 10) - 1;
    const month = months[monthIndex];
    const day = parseInt(parts[0], 10);
    const year = parts[2];

    return `${month} ${day}, ${year}`;
}

export { formatDate, createSlug, simplifyDate };
