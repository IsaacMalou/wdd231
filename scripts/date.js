// Output current year
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Output last modified date
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;