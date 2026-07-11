
const yearElement = document.querySelector('#currentyear');
const lastModifiedElement = document.querySelector('#lastModified');
const today = new Date();
yearElement.innerHTML = today.getFullYear();
lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;