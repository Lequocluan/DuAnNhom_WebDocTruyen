function convertDate(dateStr) {
    const [day, month, year] = dateStr.split('/'); 
    return `${year}-${month}-${day}`;
}

export {convertDate}