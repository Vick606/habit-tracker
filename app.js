document.addEventListener('DOMContentLoaded', () => {
    const habitCategory = document.getElementById('habit-category');
    const predefinedHabits = document.getElementById('predefined-habits');
    const customHabit = document.getElementById('custom-habit');
    const addHabitButton = document.getElementById('add-habit');
    const habitsList = document.getElementById('habits-list');
    const notification = document.getElementById('notification');
    const progressBar = document.getElementById('progress-bar');
    const aboutLink = document.getElementById('about-link');
    const privacyLink = document.getElementById('privacy-link');

    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    const predefinedHabitsList = {
        work: [
            "Daily standup/check-in with team",
            "Complete a certain number of tasks or story points",
            "Log work hours accurately",
            "Take regular breaks (e.g., Pomodoro technique)"
        ],
        development: [
            "Learn a new skill (e.g., 30 minutes of online course)",
            "Read industry-related articles or books",
            "Attend virtual networking events or webinars",
            "Contribute to open-source projects"
        ],
        health: [
            "Exercise (e.g., 30 minutes of physical activity)",
            "Meditate or practice mindfulness",
            "Maintain proper posture while working",
            "Stay hydrated (track water intake)"
        ],
        balance: [
            "Log off at a consistent time",
            "Dedicate time for hobbies or personal interests",
            "Engage in social interactions (virtual or in-person)",
            "Plan meals or cook at home"
        ],
        productivity: [
            "Create a daily to-do list",
            "Clear email inbox",
            "Avoid social media during work hours",
            "Complete deep work sessions"
        ],
        homeoffice: [
            "Keep workspace organized",
            "Perform equipment checks (e.g., test webcam, mic)",
            "Update software and security measures"
        ]
    };

    function updatePredefinedHabits() {
        const category = habitCategory.value;
        predefinedHabits.innerHTML = '<option value="">Select a predefined habit or add custom</option>';
        if (category && predefinedHabitsList[category]) {
            predefinedHabitsList[category].forEach(habit => {
                const option = document.createElement('option');
                option.value = habit;
                option.textContent = habit;
                predefinedHabits.appendChild(option);
            });
        }
    }

    function renderHabits() {
        habitsList.innerHTML = '';
        habits.forEach((habit, index) => {
            const habitElement = document.createElement('div');
            habitElement.className = 'habit-card';
            habitElement.innerHTML = `
                <h3>${habit.name}</h3>
                <p>Category: ${habit.category}</p>
                <p>Streak: ${habit.streak} days</p>
                <button onclick="trackHabit(${index})">Track</button>
                <button onclick="deleteHabit(${index})">Delete</button>
            `;
            habitsList.appendChild(habitElement);
        });
    }

    function addHabit() {
        const category = habitCategory.value;
        const habitName = predefinedHabits.value || customHabit.value;
        if (category && habitName) {
            const newHabit = {
                name: habitName,
                category: category,
                createdAt: new Date().toISOString(),
                streak: 0,
                lastTracked: null
            };
            habits.push(newHabit);
            localStorage.setItem('habits', JSON.stringify(habits));
            customHabit.value = '';
            predefinedHabits.value = '';
            renderHabits();
        }
    }

    function deleteHabit(index) {
        habits.splice(index, 1);
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    }

    function trackHabit(index) {
        const habit = habits[index];
        const today = new Date().toDateString();
        if (habit.lastTracked !== today) {
            habit.streak++;
            habit.lastTracked = today;
            localStorage.setItem('habits', JSON.stringify(habits));
            renderHabits();
        }
    }
        function showNotification(message) {
            notification.textContent = message;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    
        function updateProgressBar() {
            const totalHabits = habits.length;
            const completedHabits = habits.filter(habit => habit.lastTracked === new Date().toDateString()).length;
            const progress = (completedHabits / totalHabits) * 100 || 0;
            progressBar.style.width = `${progress}%`;
        }
    
        function renderHabits() {
            habitsList.innerHTML = '';
            habits.forEach((habit, index) => {
                const habitElement = document.createElement('div');
                habitElement.className = 'habit-card';
                habitElement.innerHTML = `
                    <h3>${habit.name}</h3>
                    <p>Category: ${habit.category}</p>
                    <p>Streak: ${habit.streak} days</p>
                    <button onclick="trackHabit(${index})">Track</button>
                    <button onclick="deleteHabit(${index})">Delete</button>
                `;
                habitsList.appendChild(habitElement);
                
                // Add animation for new habits
                if (habit.isNew) {
                    habitElement.classList.add('new');
                    delete habit.isNew;
                }
            });
            updateProgressBar();
        }
    
        function addHabit() {
            const category = habitCategory.value;
            const habitName = predefinedHabits.value || customHabit.value;
            if (category && habitName) {
                const newHabit = {
                    name: habitName,
                    category: category,
                    createdAt: new Date().toISOString(),
                    streak: 0,
                    lastTracked: null,
                    isNew: true // Flag for new habits
                };
                habits.push(newHabit);
                localStorage.setItem('habits', JSON.stringify(habits));
                customHabit.value = '';
                predefinedHabits.value = '';
                renderHabits();
                showNotification('New habit added successfully!');
            }
        }
    
        function deleteHabit(index) {
            habits.splice(index, 1);
            localStorage.setItem('habits', JSON.stringify(habits));
            renderHabits();
            showNotification('Habit deleted successfully!');
        }
    
        function trackHabit(index) {
            const habit = habits[index];
            const today = new Date().toDateString();
            if (habit.lastTracked !== today) {
                habit.streak++;
                habit.lastTracked = today;
                localStorage.setItem('habits', JSON.stringify(habits));
                renderHabits();
                showNotification(`Great job! You've maintained a ${habit.streak}-day streak!`);
                
                // Celebration animation
                const habitCard = habitsList.children[index];
                habitCard.classList.add('celebrate');
                setTimeout(() => {
                    habitCard.classList.remove('celebrate');
                }, 500);
            } else {
                showNotification('You have already tracked this habit today!');
            }
        }

    habitCategory.addEventListener('change', updatePredefinedHabits);
    addHabitButton.addEventListener('click', addHabit);

    updatePredefinedHabits();
    renderHabits();

    // Make functions global so they can be called from inline event handlers
    window.deleteHabit = deleteHabit;
    window.trackHabit = trackHabit;
});
aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Remote Work Habit Tracker Pro helps you build better remote work habits!');
});

privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('We respect your privacy. No personal data is collected or stored online.');
});
