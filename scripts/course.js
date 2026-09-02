// Set completed to true only for courses you have personally finished.
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
        technology: ["Python"],
        completed: false
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
        technology: ["HTML", "CSS"],
        completed: false
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
        technology: ["Python"],
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
        technology: ["C#"],
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false
    }
];

const courseList = document.querySelector("#course-list");
const creditSummary = document.querySelector("#credit-summary");
const filterButtons = document.querySelectorAll("[data-filter]");

function displayCourses(subject) {
    const visibleCourses = courses.filter((course) => subject === "all" || course.subject === subject);
    const cards = visibleCourses.map((course) => {
        const card = document.createElement("li");
        card.classList.add("course-card");
        card.classList.toggle("completed", course.completed);

        const heading = document.createElement("h3");
        heading.textContent = `${course.subject} ${course.number}`;

        const title = document.createElement("p");
        title.className = "course-title";
        title.textContent = course.title;

        const details = document.createElement("p");
        details.className = "course-details";

        const credits = document.createElement("span");
        credits.textContent = `${course.credits} ${course.credits === 1 ? "credit" : "credits"}`;

        const status = document.createElement("span");
        status.className = "course-status";
        status.textContent = course.completed ? "Completed" : "Not completed";

        details.append(credits, status);
        card.append(heading, title, details);
        return card;
    });

    courseList.replaceChildren(...cards);

    const totalCredits = visibleCourses.reduce((total, course) => total + course.credits, 0);
    const courseWord = visibleCourses.length === 1 ? "course" : "courses";
    const creditWord = totalCredits === 1 ? "credit" : "credits";
    creditSummary.textContent = `${visibleCourses.length} ${courseWord} shown \u00B7 ${totalCredits} total ${creditWord}`;

    filterButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.filter === subject));
    });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => displayCourses(button.dataset.filter));
});

displayCourses("all");
