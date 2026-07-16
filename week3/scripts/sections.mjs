// sections.mjs
export function setSectionSelection(sections) {
    const sectionSelector = document.querySelector("#sectionNumber");
    sectionSelector.innerHTML = "";

    sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section.sectionNum;
        option.textContent = `Section ${section.sectionNum}`;
        sectionSelector.appendChild(option);
    });
}