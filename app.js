document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habit-form');
    const habitInput = document.getElementById('habit-input');
    const habitCategory = document.getElementById('habit-category');
    const habitsList = document.getElementById('habits-list');

    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    function renderHabits() {
        habitsList.innerHTML = '';
        habits.forEach((habit, index) => {
            const habitElement = document.createElement('div');
            habitElement.innerHTML = `
                <h3>${habit.name} (${habit.category})</h3>
                <button onclick="deleteHabit(${index})">Delete</button>
            `;
            habitsList.appendChild(habitElement);
        });
    }

    function addHabit(e) {
        e.preventDefault();
        const newHabit = {
            name: habitInput.value,
            category: habitCategory.value,
            createdAt: new Date().toISOString()
        };
        habits.push(newHabit);
        localStorage.setItem('habits', JSON.stringify(habits));
        habitInput.value = '';
        renderHabits();
    }

    function deleteHabit(index) {
        habits.splice(index, 1);
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    }

    habitForm.addEventListener('submit', addHabit);
    renderHabits();

    // Make deleteHabit function global so it can be called from inline event handlers
    window.deleteHabit = deleteHabit;
});