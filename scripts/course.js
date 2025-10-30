// Course list and filtering functionality

// Course data array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions in the Python programming language.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Function to display courses with complete information
function displayCourses(coursesToDisplay) {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    coursesToDisplay.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');

        if (course.completed) {
            courseItem.classList.add('completed');
        }

        // Complete course card with title and credits
        courseItem.innerHTML = `
            <div class="course-code">${course.subject} ${course.number}</div>
            <div class="course-title">${course.title}</div>
            <div class="course-credits">${course.credits} Credits</div>
        `;

        container.appendChild(courseItem);
    });

    // Update total credits
    updateTotalCredits(coursesToDisplay);
}

// Function to calculate and display total credits
function updateTotalCredits(coursesToDisplay) {
    const totalCredits = coursesToDisplay.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    document.getElementById('total-credits').textContent = totalCredits;
}

// Function to filter courses
function filterCourses(subject) {
    if (subject === 'all') {
        displayCourses(courses);
    } else {
        const filtered = courses.filter(course => course.subject === subject);
        displayCourses(filtered);
    }
}

// Event listeners for filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Filter courses
        const filter = button.getAttribute('data-filter');
        filterCourses(filter);
    });
});

// Display all courses on page load
displayCourses(courses);