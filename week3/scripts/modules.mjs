// modules.mjs
import byuiCourse from './course.mjs'; // Default import (no brackets)
import { setSectionSelection } from './sections.mjs'; // Named import
import { setTitle, renderSections } from "./output.mjs"; // Multiple named imports

// 1. Initial Page Load Rendering
setTitle(byuiCourse);
renderSections(byuiCourse.sections);
setSectionSelection(byuiCourse.sections);

// 2. Event Listeners for the Buttons
document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum);

    renderSections(byuiCourse.sections);
});

document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum, false);

    renderSections(byuiCourse.sections);
});