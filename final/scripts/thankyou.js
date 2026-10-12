const parameters = new URLSearchParams(window.location.search);
const details = document.querySelector('#suggestion-details');
const fields = [
    ['visitor', 'Your name'],
    ['email', 'Email address'],
    ['meal', 'Meal name'],
    ['category', 'Category'],
    ['description', 'Description'],
    ['area', 'Another name or area']
];
const required = ['visitor', 'email', 'meal', 'category', 'description'];

if (required.every((name) => parameters.get(name)?.trim())) {
    fields.forEach(([name, label]) => {
        const term = document.createElement('dt');
        const value = document.createElement('dd');
        term.textContent = label;
        value.textContent = parameters.get(name) || 'Not provided';
        details.append(term, value);
    });
} else {
    document.querySelector('h1').textContent = 'Make a meal suggestion';
    document.querySelector('#confirmation-message').textContent = 'Complete the suggestion form to see your information here.';
    document.querySelector('.confirmation').hidden = true;
    const link = document.querySelector('.confirmation-links .button');
    link.href = 'suggest.html';
    link.textContent = 'Open the suggestion form';
}
