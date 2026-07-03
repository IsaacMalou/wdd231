const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const courseContainer = document.getElementById('course-container');
const totalCreditsEl = document.getElementById('total-credits');

function displayCourses(courseList) {
    courseContainer.innerHTML = '';

    courseList.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        // CSS class toggle
        if (course.completed) {
            courseCard.classList.add('completed');
        } else {
            courseCard.classList.add('uncompleted');
        }

        courseCard.innerHTML = `<p>${course.subject} ${course.number}</p>`;
        courseContainer.appendChild(courseCard);
    });

    // Reduce function to calculate total credits
    const totalCredits = courseList.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsEl.textContent = totalCredits;
}

// Button Event Listeners
document.getElementById('btn-all').addEventListener('click', () => displayCourses(courses));
document.getElementById('btn-cse').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'CSE')));
document.getElementById('btn-wdd').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'WDD')));

// Initial display
displayCourses(courses);