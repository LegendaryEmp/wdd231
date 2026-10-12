export async function getMeals() {
    const response = await fetch(new URL('../data/meals.json', import.meta.url));
    if (!response.ok) {
        throw new Error('The meal data could not be loaded.');
    }
    const meals = await response.json();
    if (!Array.isArray(meals) || meals.length === 0) {
        throw new Error('The meal list is empty or invalid.');
    }
    return meals;
}
