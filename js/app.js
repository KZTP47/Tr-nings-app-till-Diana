/**
 * Diana Fitness PWA - Main Application Logic
 * Phase 5: Calendar and Progress with Dynamic Statistics
 * Integrates with DianaData module for recipes and training plans
 */

(function () {
    'use strict';

    // ============================================
    // App State
    // ============================================

    const state = {
        currentScreen: 'recipes',
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        selectedDate: null,
        activePlan: 3,
        currentWeek: 1,
        workoutHistory: [],
        nutritionHistory: [],
        activeModal: null,
        activeWorkout: null,
        restTimer: null,
        shoppingList: [],      // Combined ingredients list
        shoppingRecipes: []    // Recipes added to shopping list with portions
    };

    // ============================================
    // DOM Elements
    // ============================================

    const elements = {
        app: document.getElementById('app'),
        pageTitle: document.getElementById('page-title'),
        screens: document.querySelectorAll('.screen'),
        navItems: document.querySelectorAll('.nav-item'),
        calendarGrid: document.getElementById('calendar-grid'),
        calendarMonth: document.getElementById('calendar-month'),
        calendarPrev: document.querySelector('.calendar-nav.prev'),
        calendarNext: document.querySelector('.calendar-nav.next'),
        planOptions: document.querySelectorAll('.plan-option'),
        mealCards: document.querySelectorAll('.meal-card'),
        recipeGrid: document.querySelector('.recipe-grid'),
        workoutList: document.querySelector('.workout-list'),
        extraWorkoutList: document.querySelector('.extra-workout-list'),
        quickStartBtns: document.querySelectorAll('.quick-start-btn'),
        headerActionBtn: document.getElementById('header-action-btn'),
        sectionActions: document.querySelectorAll('.section-action'),
        trainingHero: document.querySelector('.training-hero .hero-title'),
        trainingHeroSubtitle: document.querySelector('.training-hero .hero-subtitle'),
        // Shopping list elements
        shoppingEmpty: document.getElementById('shopping-empty'),
        shoppingContent: document.getElementById('shopping-content'),
        shoppingRecipes: document.getElementById('shopping-recipes'),
        shoppingList: document.getElementById('shopping-list'),
        shoppingCount: document.getElementById('shopping-count'),
        shoppingClearBtn: document.getElementById('shopping-clear-btn'),
        shoppingBadge: document.getElementById('shopping-badge')
    };

    // ============================================
    // Screen Titles
    // ============================================

    const screenTitles = {
        recipes: 'Recept',
        training: 'Träning',
        workout: 'Starta Pass',
        calendar: 'Kalender',
        shopping: 'Inköpslista'
    };

    // ============================================
    // Swedish Month Names
    // ============================================

    const monthNames = [
        'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
        'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
    ];

    // ============================================
    // Category Names in Swedish
    // ============================================

    const categoryNames = {
        breakfast: 'Frukost',
        lunch: 'Lunch',
        dinner: 'Middag'
    };

    // ============================================
    // Navigation Functions
    // ============================================

    function navigateToScreen(screenName) {
        if (screenName === state.currentScreen) return;

        state.currentScreen = screenName;

        elements.screens.forEach(screen => {
            screen.classList.remove('active');
            if (screen.dataset.screen === screenName) {
                screen.classList.add('active');
            }
        });

        elements.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.screen === screenName) {
                item.classList.add('active');
            }
        });

        elements.pageTitle.textContent = screenTitles[screenName] || screenName;

        // Render screen-specific content
        if (screenName === 'shopping') {
            renderShoppingScreen();
        }

        triggerHaptic('light');
        saveToStorage('currentScreen', screenName);
    }

    // ============================================
    // Recipe Rendering Functions
    // ============================================

    function renderMealCards() {
        const meals = ['breakfast', 'lunch', 'dinner'];

        meals.forEach(mealType => {
            const card = document.querySelector(`.meal-card[data-meal="${mealType}"]`);
            if (!card) return;

            const recipes = DianaData.getRecipesByCategory(mealType);
            if (recipes.length === 0) return;

            const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

            const nameEl = card.querySelector('.meal-name');
            const kcalEl = card.querySelector('.meal-kcal');
            const timeEl = card.querySelector('.meal-time');

            if (nameEl) nameEl.textContent = randomRecipe.name;
            if (kcalEl) kcalEl.textContent = `${randomRecipe.kcal} kcal`;
            if (timeEl) timeEl.textContent = `${randomRecipe.prepTime + randomRecipe.cookTime} min`;

            card.dataset.recipeId = randomRecipe.id;
        });
    }

    function renderRecipeGrid() {
        if (!elements.recipeGrid) return;

        const allRecipes = DianaData.getAllRecipes();
        elements.recipeGrid.innerHTML = '';

        allRecipes.forEach(recipe => {
            const card = createRecipeCard(recipe);
            elements.recipeGrid.appendChild(card);
        });
    }

    function createRecipeCard(recipe) {
        const card = document.createElement('article');
        card.className = 'recipe-card';
        card.dataset.recipeId = recipe.id;

        const gradientClass = `${recipe.category}-gradient`;

        // Use img element with onerror fallback
        const imageHTML = recipe.image
            ? `<img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-img" onerror="this.style.display='none'">`
            : '';

        card.innerHTML = `
            <div class="recipe-card-image ${gradientClass}">
                ${imageHTML}
                <span class="recipe-kcal-badge">${recipe.kcal} kcal</span>
            </div>
            <div class="recipe-card-content">
                <span class="recipe-category">${categoryNames[recipe.category]}</span>
                <h4 class="recipe-name">${recipe.name}</h4>
                <div class="recipe-macros">
                    <span>P: ${recipe.protein}g</span>
                    <span>K: ${recipe.carbs}g</span>
                    <span>F: ${recipe.fat}g</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            openRecipeModal(recipe);
            triggerHaptic('light');
        });

        return card;
    }

    function openRecipeModal(recipe) {
        closeAllModals();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'recipe-modal';

        // Helper function to parse and multiply ingredient amounts
        function multiplyAmount(amountStr, multiplier) {
            if (multiplier === 1) return amountStr;

            // Helper to multiply a single number string
            function multiplyNumber(numStr) {
                const num = parseFloat(numStr.replace(',', '.'));
                if (isNaN(num)) return numStr;
                return formatNumber(num * multiplier);
            }

            // Helper to handle Swedish singular/plural
            function pluralize(num, word) {
                const singularToPlural = {
                    'skiva': 'skivor',
                    'st': 'st',
                    'st.': 'st.',
                    'msk': 'msk',
                    'tsk': 'tsk',
                    'dl': 'dl',
                    'krm': 'krm'
                };
                const pluralToSingular = {
                    'skivor': 'skiva'
                };

                const numVal = parseFloat(num);
                if (numVal === 1 && pluralToSingular[word]) {
                    return pluralToSingular[word];
                } else if (numVal !== 1 && singularToPlural[word]) {
                    return singularToPlural[word];
                }
                return word;
            }

            // Handle amounts with parentheses like "375 g (2 skivor)"
            const parenMatch = amountStr.match(/^([\d,\.]+)\s*([a-zA-Z]*)\s*\((\d+)\s*([^)]+)\)$/);
            if (parenMatch) {
                const mainNum = multiplyNumber(parenMatch[1]);
                const mainUnit = parenMatch[2];
                const parenNum = multiplyNumber(parenMatch[3]);
                const parenUnit = pluralize(parenNum, parenMatch[4].trim());
                return `${mainNum} ${mainUnit} (${parenNum} ${parenUnit})`.replace(/\s+/g, ' ').trim();
            }

            // Handle ranges like "500-20" (though this seems like data issue, handle it)
            if (amountStr.includes('-') && !amountStr.includes('(')) {
                const parts = amountStr.split('-');
                const part1 = parseFloat(parts[0].replace(',', '.'));
                const part2 = parseFloat(parts[1].replace(',', '.'));
                if (!isNaN(part1) && !isNaN(part2)) {
                    const newPart1 = formatNumber(part1 * multiplier);
                    const newPart2 = formatNumber(part2 * multiplier);
                    return `${newPart1}-${newPart2}`;
                }
            }

            // Handle fractions like "1/2" or "½"
            const fractionMap = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 0.333, '⅔': 0.667 };
            for (const [frac, val] of Object.entries(fractionMap)) {
                if (amountStr.includes(frac)) {
                    const numPart = amountStr.replace(frac, '').trim();
                    const baseNum = numPart ? parseFloat(numPart.replace(',', '.')) : 0;
                    const total = (baseNum + val) * multiplier;
                    return formatNumber(total);
                }
            }

            // Handle simple numbers with possible units like "250 g"
            const match = amountStr.match(/^([\d,\.]+)\s*(.*)$/);
            if (match) {
                const num = parseFloat(match[1].replace(',', '.'));
                const unit = match[2];
                if (!isNaN(num)) {
                    return formatNumber(num * multiplier) + (unit ? ' ' + unit : '');
                }
            }

            return amountStr;
        }

        function formatNumber(num) {
            // Format nicely - use integers when possible, otherwise one decimal
            if (Number.isInteger(num)) return num.toString();
            const rounded = Math.round(num * 10) / 10;
            return rounded.toString().replace('.', ',');
        }

        function renderIngredients(portions) {
            return recipe.ingredients.map(ing => {
                const adjustedAmount = multiplyAmount(ing.amount, portions);
                return `<li><span class="ingredient-amount">${adjustedAmount}</span> ${ing.item}</li>`;
            }).join('');
        }

        const instructionsList = recipe.instructions.map((inst, idx) =>
            `<li><span class="step-number">${idx + 1}</span><span class="step-text">${inst}</span></li>`
        ).join('');

        const gradientClass = `${recipe.category}-gradient`;
        const imageStyle = recipe.image ? `background-image: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('${recipe.image}'); background-size: cover; background-position: center;` : '';

        modal.innerHTML = `
            <div class="modal-content recipe-modal">
                <div class="modal-header modal-header-image ${gradientClass}" style="${imageStyle}">
                    <button class="modal-close" aria-label="Stäng">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <span class="modal-category">${categoryNames[recipe.category]}</span>
                    <h2 class="modal-title">${recipe.name}</h2>
                    <div class="modal-meta">
                        <span class="modal-time">${recipe.prepTime + recipe.cookTime} min</span>
                        <span class="modal-kcal">${recipe.kcal} kcal</span>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="macro-badges">
                        <div class="macro-badge protein">
                            <span class="macro-badge-value">${recipe.protein}g</span>
                            <span class="macro-badge-label">Protein</span>
                        </div>
                        <div class="macro-badge carbs">
                            <span class="macro-badge-value">${recipe.carbs}g</span>
                            <span class="macro-badge-label">Kolhydrater</span>
                        </div>
                        <div class="macro-badge fat">
                            <span class="macro-badge-value">${recipe.fat}g</span>
                            <span class="macro-badge-label">Fett</span>
                        </div>
                    </div>
                    <p class="macro-note">Näringsvärden visas per portion</p>

                    <section class="modal-section">
                        <div class="ingredients-header">
                            <h3 class="modal-section-title">Ingredienser</h3>
                            <div class="portion-selector">
                                <button class="portion-btn minus" aria-label="Minska portioner">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                                <span class="portion-count" id="portion-count">1</span>
                                <span class="portion-label">portion</span>
                                <button class="portion-btn plus" aria-label="Öka portioner">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <ul class="ingredients-list" id="ingredients-list">
                            ${renderIngredients(1)}
                        </ul>
                    </section>

                    <section class="modal-section">
                        <h3 class="modal-section-title">Instruktioner</h3>
                        <ol class="instructions-list">
                            ${instructionsList}
                        </ol>
                    </section>

                    ${recipe.tips ? `
                    <section class="modal-section tips-section">
                        <h3 class="modal-section-title">Tips</h3>
                        <p class="tips-text">${recipe.tips}</p>
                    </section>
                    ` : ''}
                </div>
                <div class="modal-footer">
                    <button class="add-to-shopping-btn" id="add-to-shopping-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Lägg till i inköpslista
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        state.activeModal = modal;

        // Portion selector logic
        let currentPortions = 1;
        const portionCountEl = modal.querySelector('#portion-count');
        const portionLabelEl = modal.querySelector('.portion-label');
        const ingredientsListEl = modal.querySelector('#ingredients-list');
        const minusBtn = modal.querySelector('.portion-btn.minus');
        const plusBtn = modal.querySelector('.portion-btn.plus');

        function updatePortions(newValue) {
            currentPortions = Math.max(1, Math.min(10, newValue));
            portionCountEl.textContent = currentPortions;
            portionLabelEl.textContent = currentPortions === 1 ? 'portion' : 'portioner';
            ingredientsListEl.innerHTML = renderIngredients(currentPortions);
            minusBtn.disabled = currentPortions <= 1;
            plusBtn.disabled = currentPortions >= 10;
            triggerHaptic('light');
        }

        minusBtn.addEventListener('click', () => updatePortions(currentPortions - 1));
        plusBtn.addEventListener('click', () => updatePortions(currentPortions + 1));
        updatePortions(1); // Initialize state

        // Add to shopping list button
        modal.querySelector('#add-to-shopping-btn').addEventListener('click', () => {
            handleAddToShoppingList(recipe, currentPortions);
        });

        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        modal.querySelector('.modal-close').addEventListener('click', closeAllModals);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAllModals();
        });
    }

    // ============================================
    // Training Rendering Functions
    // ============================================

    function renderWorkoutList() {
        if (!elements.workoutList) return;

        const planExercises = DianaData.getPlanExercises(state.activePlan);
        elements.workoutList.innerHTML = '';

        let passNumber = 1;
        Object.keys(planExercises).forEach(passKey => {
            const pass = planExercises[passKey];
            const card = createWorkoutCard(pass, passNumber, passKey);
            elements.workoutList.appendChild(card);
            passNumber++;
        });
    }

    function createWorkoutCard(pass, number, passKey) {
        const card = document.createElement('article');
        card.className = 'workout-card';
        card.dataset.workout = passKey;

        const exerciseCount = pass.exercises.length;
        const tags = generateWorkoutTags(pass);

        card.innerHTML = `
            <div class="workout-card-number">${number}</div>
            <div class="workout-card-content">
                <h4 class="workout-name">${pass.name}</h4>
                <div class="workout-meta">
                    <span class="workout-exercises">${exerciseCount} övningar</span>
                    <span class="workout-duration">~${pass.duration} min</span>
                </div>
                <div class="workout-tags">
                    ${tags}
                </div>
            </div>
            <div class="workout-card-status">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </div>
        `;

        card.addEventListener('click', () => {
            openWorkoutModal(pass, passKey);
            triggerHaptic('light');
        });

        return card;
    }

    function generateWorkoutTags(pass) {
        const tags = [];

        if (pass.location === 'gym') {
            tags.push('<span class="workout-tag">Gym</span>');
        } else {
            tags.push('<span class="workout-tag">Hemma</span>');
        }

        if (pass.type === 'legs') {
            tags.push('<span class="workout-tag">Ben</span>');
        } else if (pass.type === 'upper') {
            tags.push('<span class="workout-tag">Överkropp</span>');
        }

        const hasDropsets = pass.exercises.some(ex => ex.type === 'dropset');
        const hasSupersets = pass.exercises.some(ex => ex.type === 'superset');

        if (hasDropsets) {
            tags.push('<span class="workout-tag dropset">Dropset</span>');
        }
        if (hasSupersets) {
            tags.push('<span class="workout-tag superset">Superset</span>');
        }

        return tags.join('');
    }

    function openWorkoutModal(pass, passKey) {
        closeAllModals();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'workout-modal';

        const exercisesHTML = pass.exercises.map((exercise, idx) => {
            if (exercise.type === 'superset') {
                return createSupersetHTML(exercise, idx);
            } else if (exercise.type === 'dropset') {
                return createDropsetHTML(exercise, idx);
            } else {
                return createExerciseHTML(exercise, idx);
            }
        }).join('');

        modal.innerHTML = `
            <div class="modal-content workout-modal">
                <div class="modal-header workout-header">
                    <button class="modal-close" aria-label="Stäng">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <span class="modal-category">${pass.location === 'gym' ? 'Gym' : 'Hemma'}</span>
                    <h2 class="modal-title">${pass.name}</h2>
                    <div class="modal-meta">
                        <span class="modal-time">~${pass.duration} min</span>
                        <span class="modal-exercises">${pass.exercises.length} övningar</span>
                    </div>
                </div>
                <div class="modal-body">
                    <section class="modal-section">
                        <h3 class="modal-section-title">Övningar</h3>
                        <div class="exercises-list">
                            ${exercisesHTML}
                        </div>
                    </section>

                    <section class="modal-section rest-guidelines">
                        <h3 class="modal-section-title">Vilotider</h3>
                        <div class="rest-info">
                            ${DianaData.restTimeGuidelines.map(r =>
            `<div class="rest-item"><span class="rest-reps">${r.reps}</span><span class="rest-time">${r.rest}</span></div>`
        ).join('')}
                        </div>
                    </section>
                </div>
                <div class="modal-footer">
                    <button class="start-workout-btn" data-pass="${passKey}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Starta Pass
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        state.activeModal = modal;

        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        modal.querySelector('.modal-close').addEventListener('click', closeAllModals);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAllModals();
        });

        modal.querySelector('.start-workout-btn').addEventListener('click', () => {
            closeAllModals();
            startActiveWorkout(pass, passKey);
        });
    }

    function createExerciseHTML(exercise, idx) {
        const imageHTML = exercise.image ? `<div class="exercise-image" style="background-image: url('${exercise.image}')"></div>` : '';
        return `
            <div class="exercise-item ${exercise.image ? 'has-image' : ''}">
                ${imageHTML}
                <div class="exercise-number">${idx + 1}</div>
                <div class="exercise-content">
                    <h4 class="exercise-name">${exercise.name}</h4>
                    <div class="exercise-details">
                        <span class="exercise-sets">${exercise.sets} set</span>
                        <span class="exercise-reps">${exercise.reps} reps</span>
                    </div>
                    ${exercise.tip ? `<p class="exercise-tip">${exercise.tip}</p>` : ''}
                </div>
            </div>
        `;
    }

    function createSupersetHTML(superset, idx) {
        const exercisesInSuperset = superset.exercises.map((ex, i) => `
            <div class="superset-exercise">
                ${ex.image ? `<div class="superset-ex-image" style="background-image: url('${ex.image}')"></div>` : `<span class="superset-letter">${String.fromCharCode(65 + i)}</span>`}
                <span class="superset-name">${ex.name}</span>
                <span class="superset-reps">${ex.reps} reps</span>
            </div>
        `).join('');

        return `
            <div class="exercise-item superset-item">
                <div class="exercise-number superset-badge">SS</div>
                <div class="exercise-content">
                    <h4 class="exercise-name">Superset</h4>
                    <div class="superset-rounds">${superset.rounds} rundor</div>
                    <div class="superset-exercises">
                        ${exercisesInSuperset}
                    </div>
                </div>
            </div>
        `;
    }

    function createDropsetHTML(dropset, idx) {
        const imageHTML = dropset.image ? `<div class="exercise-image" style="background-image: url('${dropset.image}')"></div>` : '';
        const dropsHTML = dropset.drops.map((drop, i) => `
            <div class="drop-item">
                <span class="drop-number">${i + 1}</span>
                <span class="drop-reps">${drop.reps} reps</span>
                <span class="drop-note">${drop.note}</span>
            </div>
        `).join('');

        return `
            <div class="exercise-item dropset-item ${dropset.image ? 'has-image' : ''}">
                ${imageHTML}
                <div class="exercise-number dropset-badge">DS</div>
                <div class="exercise-content">
                    <h4 class="exercise-name">${dropset.name}</h4>
                    <div class="dropset-rounds">${dropset.rounds} rundor</div>
                    <div class="dropset-drops">
                        ${dropsHTML}
                    </div>
                    ${dropset.tip ? `<p class="exercise-tip">${dropset.tip}</p>` : ''}
                </div>
            </div>
        `;
    }

    function updateTrainingHero() {
        const plan = DianaData.trainingPlans.find(p => p.id === `plan-${state.activePlan}`);
        if (!plan) return;

        if (elements.trainingHero) {
            elements.trainingHero.textContent = plan.name;
        }
        if (elements.trainingHeroSubtitle) {
            elements.trainingHeroSubtitle.textContent = plan.description;
        }
    }

    // ============================================
    // Active Workout Session (Phase 3)
    // ============================================

    function startActiveWorkout(pass, passKey) {
        // Check if WorkoutListView module is available and list mode is selected
        if (typeof WorkoutListView !== 'undefined' && WorkoutListView.getViewMode() === 'list') {
            WorkoutListView.startListWorkout(pass, passKey, {
                onComplete: (summary) => {
                    // Save workout to history
                    const workout = {
                        date: summary.date,
                        passKey: summary.passKey,
                        passName: summary.passName,
                        duration: summary.duration,
                        completedSets: summary.completedSets,
                        totalSets: summary.totalSets
                    };
                    state.workoutHistory.push(workout);
                    saveToStorage('workoutHistory', state.workoutHistory);
                    updateCalendarStats();
                },
                onClose: (switchToDetailed) => {
                    // If user switched to detailed view, restart with detailed
                    if (switchToDetailed && pass && passKey) {
                        startDetailedWorkout(pass, passKey);
                    }
                }
            });
            triggerHaptic('medium');
            return;
        }

        // Use original detailed workout view
        startDetailedWorkout(pass, passKey);
    }

    function startDetailedWorkout(pass, passKey) {
        const flattenedExercises = flattenExercises(pass.exercises);

        state.activeWorkout = {
            passKey: passKey,
            passName: pass.name,
            startTime: Date.now(),
            currentExerciseIndex: 0,
            exercises: flattenedExercises,
            completedSets: {},
            isResting: false
        };

        flattenedExercises.forEach((ex, idx) => {
            state.activeWorkout.completedSets[idx] = [];
        });

        renderActiveWorkoutView();
        triggerHaptic('medium');
    }

    function flattenExercises(exercises) {
        const flattened = [];

        exercises.forEach(ex => {
            if (ex.type === 'superset') {
                flattened.push({
                    type: 'superset',
                    name: 'Superset',
                    rounds: ex.rounds,
                    exercises: ex.exercises,
                    totalSets: ex.rounds
                });
            } else if (ex.type === 'dropset') {
                flattened.push({
                    type: 'dropset',
                    name: ex.name,
                    rounds: ex.rounds,
                    drops: ex.drops,
                    tip: ex.tip,
                    totalSets: ex.rounds
                });
            } else {
                flattened.push({
                    type: 'normal',
                    name: ex.name,
                    sets: ex.sets,
                    reps: ex.reps,
                    tip: ex.tip,
                    totalSets: ex.sets
                });
            }
        });

        return flattened;
    }

    function renderActiveWorkoutView() {
        const workout = state.activeWorkout;
        if (!workout) return;

        const existing = document.getElementById('active-workout-view');
        if (existing) existing.remove();

        const currentEx = workout.exercises[workout.currentExerciseIndex];
        const completedSets = workout.completedSets[workout.currentExerciseIndex] || [];
        const totalSets = currentEx.totalSets;
        const progress = ((workout.currentExerciseIndex) / workout.exercises.length) * 100;

        const view = document.createElement('div');
        view.className = 'active-workout-view';
        view.id = 'active-workout-view';

        view.innerHTML = `
            <div class="active-workout-header">
                <button class="active-workout-close" aria-label="Avbryt pass">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="active-workout-title">
                    <span class="active-workout-name">${workout.passName}</span>
                    <span class="active-workout-progress-text">Övning ${workout.currentExerciseIndex + 1} av ${workout.exercises.length}</span>
                </div>
                <div class="active-workout-timer" id="workout-timer">
                    ${formatTime(Math.floor((Date.now() - workout.startTime) / 1000))}
                </div>
            </div>

            <div class="active-workout-progress-bar">
                <div class="active-workout-progress-fill" style="width: ${progress}%"></div>
            </div>

            <div class="active-workout-content">
                ${renderCurrentExercise(currentEx, completedSets, totalSets)}
            </div>

            <div class="rest-timer-overlay" id="rest-timer-overlay">
                <div class="rest-timer-content">
                    <span class="rest-timer-label">Vila</span>
                    <span class="rest-timer-value" id="rest-timer-value">60</span>
                    <span class="rest-timer-unit">sekunder</span>
                    <button class="skip-rest-btn" id="skip-rest-btn">Hoppa över</button>
                </div>
            </div>

            <div class="active-workout-footer">
                <button class="workout-nav-btn prev" ${workout.currentExerciseIndex === 0 ? 'disabled' : ''}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Föregående
                </button>
                
                ${workout.currentExerciseIndex === workout.exercises.length - 1 ? `
                    <button class="workout-complete-btn" id="complete-workout-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Avsluta Pass
                    </button>
                ` : `
                    <button class="workout-nav-btn next">
                        Nästa
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                `}
            </div>
        `;

        document.body.appendChild(view);

        requestAnimationFrame(() => {
            view.classList.add('active');
        });

        initActiveWorkoutEvents(view);
        startWorkoutTimer();
    }

    function renderCurrentExercise(exercise, completedSets, totalSets) {
        if (exercise.type === 'superset') {
            return renderSupersetExercise(exercise, completedSets);
        } else if (exercise.type === 'dropset') {
            return renderDropsetExercise(exercise, completedSets);
        } else {
            return renderNormalExercise(exercise, completedSets, totalSets);
        }
    }

    function renderNormalExercise(exercise, completedSets, totalSets) {
        const setsHTML = [];

        for (let i = 0; i < totalSets; i++) {
            const completed = completedSets[i];
            const isCompleted = completed !== undefined;

            setsHTML.push(`
                <div class="set-row ${isCompleted ? 'completed' : ''}" data-set-index="${i}">
                    <span class="set-number">Set ${i + 1}</span>
                    <div class="set-inputs">
                        <div class="set-input-group">
                            <input type="number" 
                                   class="set-input weight-input" 
                                   placeholder="kg" 
                                   value="${isCompleted ? completed.weight : ''}"
                                   ${isCompleted ? 'readonly' : ''}>
                            <span class="set-input-label">kg</span>
                        </div>
                        <span class="set-input-separator">x</span>
                        <div class="set-input-group">
                            <input type="number" 
                                   class="set-input reps-input" 
                                   placeholder="${exercise.reps}" 
                                   value="${isCompleted ? completed.reps : ''}"
                                   ${isCompleted ? 'readonly' : ''}>
                            <span class="set-input-label">reps</span>
                        </div>
                    </div>
                    <button class="set-complete-btn ${isCompleted ? 'done' : ''}" data-set-index="${i}">
                        ${isCompleted ? `
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        ` : 'Klar'}
                    </button>
                </div>
            `);
        }

        return `
            <div class="current-exercise normal-exercise">
                <h2 class="current-exercise-name">${exercise.name}</h2>
                <div class="current-exercise-target">
                    <span class="target-sets">${totalSets} set</span>
                    <span class="target-reps">${exercise.reps} reps</span>
                </div>
                ${exercise.tip ? `<p class="current-exercise-tip">${exercise.tip}</p>` : ''}
                <div class="sets-tracker">
                    ${setsHTML.join('')}
                </div>
            </div>
        `;
    }

    function renderSupersetExercise(superset, completedSets) {
        const roundsHTML = [];

        for (let round = 0; round < superset.rounds; round++) {
            const completed = completedSets[round];
            const isCompleted = completed !== undefined;

            const exercisesHTML = superset.exercises.map((ex, idx) => `
                <div class="superset-ex-row">
                    <span class="superset-ex-letter">${String.fromCharCode(65 + idx)}</span>
                    <span class="superset-ex-name">${ex.name}</span>
                    <span class="superset-ex-reps">${ex.reps} reps</span>
                </div>
            `).join('');

            roundsHTML.push(`
                <div class="superset-round ${isCompleted ? 'completed' : ''}" data-set-index="${round}">
                    <div class="superset-round-header">
                        <span class="round-number">Runda ${round + 1}</span>
                        <button class="set-complete-btn ${isCompleted ? 'done' : ''}" data-set-index="${round}">
                            ${isCompleted ? `
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ` : 'Klar'}
                        </button>
                    </div>
                    <div class="superset-exercises-list">
                        ${exercisesHTML}
                    </div>
                </div>
            `);
        }

        return `
            <div class="current-exercise superset-exercise">
                <div class="superset-badge-large">SUPERSET</div>
                <h2 class="current-exercise-name">${superset.rounds} rundor</h2>
                <div class="superset-rounds-tracker">
                    ${roundsHTML.join('')}
                </div>
            </div>
        `;
    }

    function renderDropsetExercise(dropset, completedSets) {
        const roundsHTML = [];

        for (let round = 0; round < dropset.rounds; round++) {
            const completed = completedSets[round];
            const isCompleted = completed !== undefined;

            const dropsHTML = dropset.drops.map((drop, idx) => `
                <div class="dropset-drop-row">
                    <span class="drop-num">${idx + 1}</span>
                    <span class="drop-reps-target">${drop.reps} reps</span>
                    <span class="drop-weight-note">${drop.note}</span>
                </div>
            `).join('');

            roundsHTML.push(`
                <div class="dropset-round ${isCompleted ? 'completed' : ''}" data-set-index="${round}">
                    <div class="dropset-round-header">
                        <span class="round-number">Runda ${round + 1}</span>
                        <button class="set-complete-btn ${isCompleted ? 'done' : ''}" data-set-index="${round}">
                            ${isCompleted ? `
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ` : 'Klar'}
                        </button>
                    </div>
                    <div class="dropset-drops-list">
                        ${dropsHTML}
                    </div>
                </div>
            `);
        }

        return `
            <div class="current-exercise dropset-exercise">
                <div class="dropset-badge-large">DROPSET</div>
                <h2 class="current-exercise-name">${dropset.name}</h2>
                ${dropset.tip ? `<p class="current-exercise-tip">${dropset.tip}</p>` : ''}
                <div class="dropset-rounds-tracker">
                    ${roundsHTML.join('')}
                </div>
            </div>
        `;
    }

    function initActiveWorkoutEvents(view) {
        view.querySelector('.active-workout-close').addEventListener('click', () => {
            if (confirm('Vill du avbryta detta pass? Dina framsteg sparas inte.')) {
                closeActiveWorkout();
            }
        });

        const prevBtn = view.querySelector('.workout-nav-btn.prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (state.activeWorkout.currentExerciseIndex > 0) {
                    state.activeWorkout.currentExerciseIndex--;
                    renderActiveWorkoutView();
                    triggerHaptic('light');
                }
            });
        }

        const nextBtn = view.querySelector('.workout-nav-btn.next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (state.activeWorkout.currentExerciseIndex < state.activeWorkout.exercises.length - 1) {
                    state.activeWorkout.currentExerciseIndex++;
                    renderActiveWorkoutView();
                    triggerHaptic('light');
                }
            });
        }

        const completeBtn = view.querySelector('#complete-workout-btn');
        if (completeBtn) {
            completeBtn.addEventListener('click', completeWorkout);
        }

        view.querySelectorAll('.set-complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const setIndex = parseInt(e.currentTarget.dataset.setIndex);
                completeSet(setIndex, view);
            });
        });

        const skipRestBtn = view.querySelector('#skip-rest-btn');
        if (skipRestBtn) {
            skipRestBtn.addEventListener('click', skipRest);
        }
    }

    function completeSet(setIndex, view) {
        const workout = state.activeWorkout;
        const exerciseIdx = workout.currentExerciseIndex;
        const exercise = workout.exercises[exerciseIdx];

        if (workout.completedSets[exerciseIdx][setIndex] !== undefined) {
            return;
        }

        let setData = { completedAt: Date.now() };

        if (exercise.type === 'normal') {
            const setRow = view.querySelector(`.set-row[data-set-index="${setIndex}"]`);
            const weightInput = setRow.querySelector('.weight-input');
            const repsInput = setRow.querySelector('.reps-input');

            setData.weight = weightInput.value || 0;
            setData.reps = repsInput.value || exercise.reps;
        }

        workout.completedSets[exerciseIdx][setIndex] = setData;

        triggerHaptic('medium');

        const allSetsComplete = Object.keys(workout.completedSets[exerciseIdx]).length >= exercise.totalSets;

        if (!allSetsComplete) {
            startRestTimer();
        }

        renderActiveWorkoutView();
    }

    function startRestTimer(duration = 60) {
        const overlay = document.getElementById('rest-timer-overlay');
        const timerValue = document.getElementById('rest-timer-value');

        if (!overlay || !timerValue) return;

        state.activeWorkout.isResting = true;
        overlay.classList.add('active');

        let remaining = duration;
        timerValue.textContent = remaining;

        triggerHaptic('light');

        state.restTimer = setInterval(() => {
            remaining--;
            timerValue.textContent = remaining;

            if (remaining <= 3 && remaining > 0) {
                triggerHaptic('light');
            }

            if (remaining <= 0) {
                clearInterval(state.restTimer);
                state.restTimer = null;
                state.activeWorkout.isResting = false;
                overlay.classList.remove('active');
                triggerHaptic('medium');
            }
        }, 1000);
    }

    function skipRest() {
        if (state.restTimer) {
            clearInterval(state.restTimer);
            state.restTimer = null;
        }

        const overlay = document.getElementById('rest-timer-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }

        if (state.activeWorkout) {
            state.activeWorkout.isResting = false;
        }

        triggerHaptic('light');
    }

    let workoutTimerInterval = null;

    function startWorkoutTimer() {
        if (workoutTimerInterval) {
            clearInterval(workoutTimerInterval);
        }

        workoutTimerInterval = setInterval(() => {
            const timerEl = document.getElementById('workout-timer');
            if (timerEl && state.activeWorkout) {
                const elapsed = Math.floor((Date.now() - state.activeWorkout.startTime) / 1000);
                timerEl.textContent = formatTime(elapsed);
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function completeWorkout() {
        if (!state.activeWorkout) return;

        const workout = state.activeWorkout;
        const duration = Math.floor((Date.now() - workout.startTime) / 1000);

        const workoutRecord = {
            id: `workout-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            passKey: workout.passKey,
            passName: workout.passName,
            duration: duration,
            exercises: workout.exercises.length,
            completedSets: workout.completedSets,
            completedAt: Date.now()
        };

        saveWorkoutToHistory(workoutRecord);

        triggerHaptic('heavy');
        closeActiveWorkout();

        showWorkoutCompleteModal(workoutRecord);
    }

    function showWorkoutCompleteModal(record) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'workout-complete-modal';

        const totalSets = Object.values(record.completedSets).reduce((sum, sets) => sum + Object.keys(sets).length, 0);

        modal.innerHTML = `
            <div class="modal-content workout-complete-modal">
                <div class="workout-complete-header">
                    <div class="complete-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h2 class="complete-title">Bra jobbat!</h2>
                    <p class="complete-subtitle">${record.passName} avklarat</p>
                </div>
                <div class="workout-complete-stats">
                    <div class="complete-stat">
                        <span class="complete-stat-value">${formatTime(record.duration)}</span>
                        <span class="complete-stat-label">Total tid</span>
                    </div>
                    <div class="complete-stat">
                        <span class="complete-stat-value">${record.exercises}</span>
                        <span class="complete-stat-label">Övningar</span>
                    </div>
                    <div class="complete-stat">
                        <span class="complete-stat-value">${totalSets}</span>
                        <span class="complete-stat-label">Set</span>
                    </div>
                </div>
                <div class="workout-complete-footer">
                    <button class="complete-done-btn">Stäng</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        modal.querySelector('.complete-done-btn').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
            navigateToScreen('calendar');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    function closeActiveWorkout() {
        if (workoutTimerInterval) {
            clearInterval(workoutTimerInterval);
            workoutTimerInterval = null;
        }

        if (state.restTimer) {
            clearInterval(state.restTimer);
            state.restTimer = null;
        }

        const view = document.getElementById('active-workout-view');
        if (view) {
            view.classList.remove('active');
            setTimeout(() => view.remove(), 300);
        }

        state.activeWorkout = null;
    }

    function saveWorkoutToHistory(record) {
        const history = loadFromStorage('workoutHistory', []);
        history.unshift(record);

        if (history.length > 100) {
            history.pop();
        }

        saveToStorage('workoutHistory', history);
        state.workoutHistory = history;
    }

    function loadWorkoutHistory() {
        state.workoutHistory = loadFromStorage('workoutHistory', []);
    }

    // ============================================
    // Plan Selection
    // ============================================

    function selectPlan(planNumber) {
        if (planNumber === state.activePlan) return;

        state.activePlan = planNumber;

        elements.planOptions.forEach(option => {
            option.classList.remove('active');
            const badge = option.querySelector('.plan-active-badge');
            if (badge) badge.remove();

            if (parseInt(option.dataset.plan) === planNumber) {
                option.classList.add('active');
                const newBadge = document.createElement('span');
                newBadge.className = 'plan-active-badge';
                newBadge.textContent = 'Aktiv';
                option.appendChild(newBadge);
            }
        });

        updateTrainingHero();
        renderWorkoutList();

        saveToStorage('activePlan', planNumber);
        triggerHaptic('medium');
        showToast(`Träningsplan ${planNumber} vald`);
    }

    // ============================================
    // Modal Management
    // ============================================

    function closeAllModals() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
        state.activeModal = null;
    }

    // ============================================
    // Calendar Functions
    // ============================================

    function generateCalendar() {
        const grid = elements.calendarGrid;
        if (!grid) return;

        grid.innerHTML = '';

        const year = state.currentYear;
        const month = state.currentMonth;

        if (elements.calendarMonth) {
            elements.calendarMonth.textContent = `${monthNames[month]} ${year}`;
        }

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();

        let startingDay = firstDay.getDay();
        startingDay = startingDay === 0 ? 6 : startingDay - 1;

        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        const todayDate = today.getDate();

        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            grid.appendChild(emptyDay);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('button');
            dayElement.className = 'calendar-day';
            dayElement.setAttribute('aria-label', `${day} ${monthNames[month]}`);

            if (isCurrentMonth && day === todayDate) {
                dayElement.classList.add('today');
            }

            const dayNumber = document.createElement('span');
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);

            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const workoutsOnDay = state.workoutHistory.filter(w => w.date === dateString);

            if (workoutsOnDay.length > 0) {
                const indicators = document.createElement('div');
                indicators.className = 'calendar-day-indicators';

                const workoutDot = document.createElement('span');
                workoutDot.className = 'calendar-day-dot workout';
                indicators.appendChild(workoutDot);

                dayElement.appendChild(indicators);
                dayElement.classList.add('has-workout');
            }

            dayElement.addEventListener('click', () => handleDayClick(day, dateString));

            grid.appendChild(dayElement);
        }

        updateCalendarStats();
    }

    function updateCalendarStats() {
        const year = state.currentYear;
        const month = state.currentMonth;

        // Filter workouts for the selected month
        const monthWorkouts = state.workoutHistory.filter(w => {
            const date = new Date(w.date);
            return date.getMonth() === month && date.getFullYear() === year;
        });

        // Update period label
        const periodLabel = document.getElementById('stats-period');
        if (periodLabel) {
            periodLabel.textContent = monthNames[month];
        }

        // Calculate statistics
        const workoutCount = monthWorkouts.length;
        const totalSeconds = monthWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
        const totalHours = (totalSeconds / 3600).toFixed(1);
        const avgMinutes = workoutCount > 0 ? Math.round(totalSeconds / 60 / workoutCount) : 0;
        const streak = calculateCurrentStreak();

        // Update stat cards
        updateStatCard('stat-workouts', workoutCount, calculateTrend('workouts', month, year));
        updateStatCard('stat-hours', totalHours, calculateTrend('hours', month, year));
        updateStatCard('stat-streak', streak, null);
        updateStatCard('stat-average', avgMinutes, null);

        // Render activity list
        renderRecentActivity();
    }

    function updateStatCard(id, value, trend) {
        const card = document.getElementById(id);
        if (!card) return;

        const valueEl = card.querySelector('.stat-value');
        if (valueEl) {
            valueEl.textContent = value;
        }

        const trendEl = card.querySelector('.stat-trend');
        if (trendEl && trend !== null) {
            trendEl.innerHTML = '';
            if (trend.value !== 0) {
                trendEl.className = `stat-trend ${trend.positive ? 'positive' : 'negative'}`;
                trendEl.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${trend.positive
                        ? '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>'
                        : '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>'
                    }
                    </svg>
                    <span>${trend.positive ? '+' : ''}${trend.label}</span>
                `;
            }
        }
    }

    function calculateTrend(type, month, year) {
        // Get previous month
        let prevMonth = month - 1;
        let prevYear = year;
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear = year - 1;
        }

        const currentWorkouts = state.workoutHistory.filter(w => {
            const date = new Date(w.date);
            return date.getMonth() === month && date.getFullYear() === year;
        });

        const prevWorkouts = state.workoutHistory.filter(w => {
            const date = new Date(w.date);
            return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
        });

        if (type === 'workouts') {
            const diff = currentWorkouts.length - prevWorkouts.length;
            return {
                value: diff,
                positive: diff >= 0,
                label: String(Math.abs(diff))
            };
        } else if (type === 'hours') {
            const currentHours = currentWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / 3600;
            const prevHours = prevWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / 3600;
            const diff = currentHours - prevHours;
            return {
                value: diff,
                positive: diff >= 0,
                label: `${Math.abs(diff).toFixed(1)}h`
            };
        }

        return { value: 0, positive: true, label: '0' };
    }

    function calculateCurrentStreak() {
        if (state.workoutHistory.length === 0) return 0;

        // Get unique workout dates sorted descending
        const workoutDates = [...new Set(state.workoutHistory.map(w => w.date))].sort().reverse();

        if (workoutDates.length === 0) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const mostRecentWorkout = new Date(workoutDates[0]);
        mostRecentWorkout.setHours(0, 0, 0, 0);

        // Check if streak is still active (workout today or yesterday)
        const daysSinceLastWorkout = Math.floor((today - mostRecentWorkout) / (1000 * 60 * 60 * 24));
        if (daysSinceLastWorkout > 1) {
            return 0; // Streak broken
        }

        // Count consecutive days
        let streak = 1;
        let currentDate = new Date(workoutDates[0]);

        for (let i = 1; i < workoutDates.length; i++) {
            const prevDate = new Date(workoutDates[i]);
            const diffDays = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                streak++;
                currentDate = prevDate;
            } else if (diffDays > 1) {
                break; // Gap found, streak ends
            }
            // If diffDays === 0, multiple workouts same day, continue
        }

        return streak;
    }

    function renderRecentActivity() {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;

        // Get recent workouts (last 5)
        const recentWorkouts = state.workoutHistory.slice(0, 5);

        if (recentWorkouts.length === 0) {
            activityList.innerHTML = `
                <div class="activity-empty">
                    <p>Inga träningspass registrerade ännu.</p>
                    <p class="activity-empty-hint">Börja träna för att se din aktivitet här!</p>
                </div>
            `;
            return;
        }

        const activityHTML = recentWorkouts.map(workout => {
            const date = new Date(workout.date);
            const day = date.getDate();
            const monthShort = monthNames[date.getMonth()].substring(0, 3);
            const durationMinutes = Math.round((workout.duration || 0) / 60);

            return `
                <article class="activity-item">
                    <div class="activity-date">
                        <span class="activity-day">${day}</span>
                        <span class="activity-month">${monthShort}</span>
                    </div>
                    <div class="activity-content">
                        <h4 class="activity-title">${workout.passName || 'Träningspass'}</h4>
                        <div class="activity-meta">
                            <span>${durationMinutes} min</span>
                            <span>${workout.exercises || 0} övningar</span>
                        </div>
                    </div>
                    <div class="activity-indicator workout"></div>
                </article>
            `;
        }).join('');

        activityList.innerHTML = activityHTML;
    }

    function handleDayClick(day, dateString) {
        const previousSelected = elements.calendarGrid.querySelector('.calendar-day.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        const days = elements.calendarGrid.querySelectorAll('.calendar-day:not(.empty)');
        days.forEach(dayEl => {
            if (dayEl.querySelector('span').textContent === String(day)) {
                dayEl.classList.add('selected');
            }
        });

        state.selectedDate = dateString;
        triggerHaptic('light');

        const workoutsOnDay = state.workoutHistory.filter(w => w.date === dateString);
        if (workoutsOnDay.length > 0) {
            showDayWorkouts(dateString, workoutsOnDay);
        }
    }

    function showDayWorkouts(dateString, workouts) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'day-workouts-modal';

        const date = new Date(dateString);
        const dateFormatted = `${date.getDate()} ${monthNames[date.getMonth()]}`;

        const workoutsHTML = workouts.map(w => `
            <div class="day-workout-item">
                <div class="day-workout-info">
                    <span class="day-workout-name">${w.passName}</span>
                    <span class="day-workout-meta">${formatTime(w.duration)} - ${w.exercises} övningar</span>
                </div>
                <div class="day-workout-check">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
            </div>
        `).join('');

        modal.innerHTML = `
            <div class="modal-content day-workouts-modal">
                <div class="modal-header">
                    <button class="modal-close" aria-label="Stäng">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <h2 class="modal-title">${dateFormatted}</h2>
                    <span class="modal-subtitle">${workouts.length} träningspass</span>
                </div>
                <div class="modal-body">
                    <div class="day-workouts-list">
                        ${workoutsHTML}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    function navigateMonth(direction) {
        if (direction === 'prev') {
            state.currentMonth--;
            if (state.currentMonth < 0) {
                state.currentMonth = 11;
                state.currentYear--;
            }
        } else {
            state.currentMonth++;
            if (state.currentMonth > 11) {
                state.currentMonth = 0;
                state.currentYear++;
            }
        }

        generateCalendar();
        triggerHaptic('light');
    }

    // ============================================
    // Storage Functions
    // ============================================

    function saveToStorage(key, value) {
        try {
            localStorage.setItem(`diana-fitness-${key}`, JSON.stringify(value));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    }

    function loadFromStorage(key, defaultValue) {
        try {
            const stored = localStorage.getItem(`diana-fitness-${key}`);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch (e) {
            console.warn('Failed to load from localStorage:', e);
            return defaultValue;
        }
    }

    function loadSavedState() {
        const savedScreen = loadFromStorage('currentScreen', 'recipes');
        const savedPlan = loadFromStorage('activePlan', 3);

        state.activePlan = savedPlan;
        loadWorkoutHistory();

        if (savedScreen !== 'recipes') {
            navigateToScreen(savedScreen);
        }
    }

    // ============================================
    // Haptic Feedback
    // ============================================

    function triggerHaptic(style) {
        if ('vibrate' in navigator) {
            switch (style) {
                case 'light':
                    navigator.vibrate(10);
                    break;
                case 'medium':
                    navigator.vibrate(20);
                    break;
                case 'heavy':
                    navigator.vibrate([30, 10, 30]);
                    break;
                default:
                    navigator.vibrate(10);
            }
        }
    }

    // ============================================
    // Toast Notifications
    // ============================================

    function showToast(message, duration = 3000) {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: calc(var(--nav-height) + var(--safe-area-bottom) + 20px);
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-text-primary);
            color: var(--color-background);
            padding: 12px 24px;
            border-radius: var(--radius-full);
            font-size: var(--font-size-sm);
            font-weight: 500;
            z-index: 1000;
            animation: slideUp 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // ============================================
    // Event Listeners
    // ============================================

    function initEventListeners() {
        elements.navItems.forEach(item => {
            item.addEventListener('click', () => {
                navigateToScreen(item.dataset.screen);
            });
        });

        if (elements.calendarPrev) {
            elements.calendarPrev.addEventListener('click', () => navigateMonth('prev'));
        }
        if (elements.calendarNext) {
            elements.calendarNext.addEventListener('click', () => navigateMonth('next'));
        }

        elements.planOptions.forEach(option => {
            option.addEventListener('click', () => {
                selectPlan(parseInt(option.dataset.plan));
            });
        });

        elements.mealCards.forEach(card => {
            card.addEventListener('click', () => {
                const recipeId = card.dataset.recipeId;
                if (recipeId) {
                    const recipe = DianaData.getRecipeById(recipeId);
                    if (recipe) {
                        openRecipeModal(recipe);
                    }
                }
                triggerHaptic('light');
            });
        });

        elements.quickStartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                handleQuickStart(action);
            });
        });

        if (elements.headerActionBtn) {
            elements.headerActionBtn.addEventListener('click', () => {
                openSettings();
            });
        }

        elements.sectionActions.forEach(btn => {
            btn.addEventListener('click', () => {
                showToast('Filter kommer snart...');
                triggerHaptic('light');
            });
        });

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && state.currentScreen === 'calendar') {
                generateCalendar();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (state.activeWorkout) {
                    return;
                }
                if (state.activeModal) {
                    closeAllModals();
                }
            }
        });
    }

    // ============================================
    // Quick Start Actions
    // ============================================

    function handleQuickStart(action) {
        triggerHaptic('medium');

        const planExercises = DianaData.getPlanExercises(state.activePlan);
        const passKeys = Object.keys(planExercises);

        switch (action) {
            case 'last-workout':
                if (state.workoutHistory.length > 0) {
                    const lastWorkout = state.workoutHistory[0];
                    const pass = planExercises[lastWorkout.passKey];
                    if (pass) {
                        startActiveWorkout(pass, lastWorkout.passKey);
                    } else {
                        showToast('Senaste pass finns inte i nuvarande plan');
                    }
                } else {
                    showToast('Inget tidigare pass hittat');
                }
                break;
            case 'next-workout':
                if (passKeys.length > 0) {
                    let nextPassKey = passKeys[0];

                    if (state.workoutHistory.length > 0) {
                        const lastPassKey = state.workoutHistory[0].passKey;
                        const lastIndex = passKeys.indexOf(lastPassKey);
                        if (lastIndex !== -1 && lastIndex < passKeys.length - 1) {
                            nextPassKey = passKeys[lastIndex + 1];
                        } else {
                            nextPassKey = passKeys[0];
                        }
                    }

                    const pass = planExercises[nextPassKey];
                    startActiveWorkout(pass, nextPassKey);
                }
                break;
            case 'free-workout':
                showToast('Fritt pass kommer snart...');
                break;
            default:
                break;
        }
    }

    // ============================================
    // Service Worker Registration
    // ============================================

    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registration successful:', registration.scope);
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed:', error);
                    });
            });
        }
    }

    // ============================================
    // Standalone Mode Detection
    // ============================================

    function isStandalone() {
        return (window.matchMedia('(display-mode: standalone)').matches) ||
            (window.navigator.standalone === true);
    }

    // ============================================
    // Settings Functions (Phase 6)
    // ============================================

    function openSettings() {
        const modal = document.getElementById('settings-modal');
        if (modal) {
            modal.classList.add('active');
            state.activeModal = 'settings';
            loadThemePreference();
            triggerHaptic('light');
        }
    }

    function closeSettings() {
        const modal = document.getElementById('settings-modal');
        if (modal) {
            modal.classList.remove('active');
            state.activeModal = null;
        }
    }

    function loadThemePreference() {
        const savedTheme = loadFromStorage('theme', 'auto');
        const themeBtns = document.querySelectorAll('.theme-btn');
        themeBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === savedTheme) {
                btn.classList.add('active');
            }
        });
    }

    function setTheme(theme) {
        saveToStorage('theme', theme);

        // Update button states
        const themeBtns = document.querySelectorAll('.theme-btn');
        themeBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
            }
        });

        // Apply theme
        if (theme === 'auto') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }

        triggerHaptic('light');
        showToast(`Tema ändrat till ${theme === 'auto' ? 'automatiskt' : theme === 'light' ? 'ljust' : 'mörkt'}`);
    }

    function exportData() {
        const data = {
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            workoutHistory: state.workoutHistory,
            activePlan: state.activePlan,
            theme: loadFromStorage('theme', 'auto')
        };

        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `diana-fitness-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        triggerHaptic('medium');
        showToast('Data exporterad!');
    }

    function importData() {
        const fileInput = document.getElementById('import-file-input');
        if (fileInput) {
            fileInput.click();
        }
    }

    function handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // Validate data structure
                if (!data.version || !data.workoutHistory) {
                    showToast('Ogiltig backup-fil');
                    return;
                }

                // Import data
                if (data.workoutHistory && Array.isArray(data.workoutHistory)) {
                    state.workoutHistory = data.workoutHistory;
                    saveToStorage('workoutHistory', data.workoutHistory);
                }

                if (data.activePlan) {
                    state.activePlan = data.activePlan;
                    saveToStorage('activePlan', data.activePlan);
                }

                if (data.theme) {
                    setTheme(data.theme);
                }

                // Refresh UI
                generateCalendar();
                updateTrainingHero();
                renderWorkoutList();

                triggerHaptic('heavy');
                showToast(`Import klar! ${data.workoutHistory.length} träningspass återställda.`);
                closeSettings();
            } catch (error) {
                console.error('Import error:', error);
                showToast('Fel vid import av fil');
            }
        };
        reader.readAsText(file);

        // Reset input
        event.target.value = '';
    }

    function clearAllData() {
        if (!confirm('Är du säker på att du vill ta bort all data? Detta kan inte ångras.')) {
            return;
        }

        // Clear state
        state.workoutHistory = [];
        state.nutritionHistory = [];
        state.activePlan = 3;

        // Clear storage
        localStorage.removeItem('diana-fitness-workoutHistory');
        localStorage.removeItem('diana-fitness-nutritionHistory');
        localStorage.removeItem('diana-fitness-activePlan');
        localStorage.removeItem('diana-fitness-currentScreen');

        // Refresh UI
        generateCalendar();
        updateTrainingHero();
        renderWorkoutList();

        triggerHaptic('heavy');
        showToast('All data har rensats');
        closeSettings();
    }

    function initSettingsEvents() {
        // Close button
        const closeBtn = document.getElementById('settings-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeSettings);
        }

        // Modal overlay click to close
        const modal = document.getElementById('settings-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeSettings();
                }
            });
        }

        // Theme selector
        const themeSelector = document.getElementById('theme-selector');
        if (themeSelector) {
            themeSelector.addEventListener('click', (e) => {
                const btn = e.target.closest('.theme-btn');
                if (btn) {
                    setTheme(btn.dataset.theme);
                }
            });
        }

        // Export button
        const exportBtn = document.getElementById('export-data-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportData);
        }

        // Import button
        const importBtn = document.getElementById('import-data-btn');
        if (importBtn) {
            importBtn.addEventListener('click', importData);
        }

        // File input handler
        const fileInput = document.getElementById('import-file-input');
        if (fileInput) {
            fileInput.addEventListener('change', handleFileImport);
        }

        // Clear data button
        const clearBtn = document.getElementById('clear-data-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', clearAllData);
        }
    }

    function applySavedTheme() {
        const savedTheme = loadFromStorage('theme', 'auto');
        if (savedTheme !== 'auto') {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    // ============================================
    // Shopping List Functions
    // ============================================

    function handleAddToShoppingList(recipe, portions) {
        // Check if recipe already exists in shopping list
        const existingRecipe = state.shoppingRecipes.find(r => r.id === recipe.id);

        if (existingRecipe) {
            // Show confirmation modal
            showConfirmModal(
                'Receptet finns redan',
                `"${recipe.name}" finns redan i din inköpslista med ${existingRecipe.portions} ${existingRecipe.portions === 1 ? 'portion' : 'portioner'}. Vad vill du göra?`,
                [
                    {
                        text: 'Ersätt',
                        type: 'primary',
                        action: () => {
                            existingRecipe.portions = portions;
                            rebuildShoppingList();
                            saveShoppingList();
                            closeAllModals();
                            showToast(`Uppdaterade till ${portions} ${portions === 1 ? 'portion' : 'portioner'}`);
                        }
                    },
                    {
                        text: 'Lägg till fler',
                        type: 'secondary',
                        action: () => {
                            addRecipeToShoppingList(recipe, portions);
                            closeAllModals();
                            showToast('Tillagd i inköpslistan');
                        }
                    },
                    {
                        text: 'Avbryt',
                        type: 'tertiary',
                        action: () => { }
                    }
                ]
            );
        } else {
            addRecipeToShoppingList(recipe, portions);
            closeAllModals();
            showToast('Tillagd i inköpslistan');
        }
    }

    function addRecipeToShoppingList(recipe, portions) {
        state.shoppingRecipes.push({
            id: recipe.id,
            name: recipe.name,
            portions: portions,
            ingredients: recipe.ingredients.map(ing => ({ ...ing })),
            category: recipe.category
        });
        rebuildShoppingList();
        saveShoppingList();
        triggerHaptic('medium');
    }

    function removeRecipeFromShoppingList(recipeId) {
        state.shoppingRecipes = state.shoppingRecipes.filter(r => r.id !== recipeId);
        rebuildShoppingList();
        saveShoppingList();
        renderShoppingScreen();
        triggerHaptic('light');
    }

    function rebuildShoppingList() {
        // Combine all ingredients from all recipes
        const combinedIngredients = {};

        state.shoppingRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ing => {
                const parsed = parseIngredientForShopping(ing.amount, recipe.portions);
                const key = normalizeIngredientName(ing.item);

                if (combinedIngredients[key]) {
                    // Try to combine amounts
                    if (parsed.unit === combinedIngredients[key].unit ||
                        (parsed.unit === '' && combinedIngredients[key].unit === '') ||
                        parsed.amount === 0) {
                        combinedIngredients[key].amount += parsed.amount;
                        combinedIngredients[key].sources.push({
                            recipeName: recipe.name,
                            portions: recipe.portions,
                            originalAmount: ing.amount
                        });
                    } else {
                        // Different units, add as separate entry
                        const altKey = key + '_' + parsed.unit;
                        if (combinedIngredients[altKey]) {
                            combinedIngredients[altKey].amount += parsed.amount;
                            combinedIngredients[altKey].sources.push({
                                recipeName: recipe.name,
                                portions: recipe.portions,
                                originalAmount: ing.amount
                            });
                        } else {
                            combinedIngredients[altKey] = {
                                item: ing.item,
                                amount: parsed.amount,
                                unit: parsed.unit,
                                checked: false,
                                sources: [{
                                    recipeName: recipe.name,
                                    portions: recipe.portions,
                                    originalAmount: ing.amount
                                }]
                            };
                        }
                    }
                } else {
                    combinedIngredients[key] = {
                        item: ing.item,
                        amount: parsed.amount,
                        unit: parsed.unit,
                        checked: false,
                        sources: [{
                            recipeName: recipe.name,
                            portions: recipe.portions,
                            originalAmount: ing.amount
                        }]
                    };
                }
            });
        });

        // Preserve checked state from previous list
        const previousChecked = {};
        state.shoppingList.forEach(item => {
            previousChecked[item.item] = item.checked;
        });

        // Convert to array and restore checked state
        state.shoppingList = Object.values(combinedIngredients).map(item => ({
            ...item,
            id: generateId(),
            checked: previousChecked[item.item] || false
        }));

        updateShoppingBadge();
    }

    function normalizeIngredientName(name) {
        return name.toLowerCase().trim();
    }

    function parseIngredientForShopping(amountStr, multiplier) {
        // Extract number and unit from amount string
        let amount = 0;
        let unit = '';

        // Handle parenthetical amounts like "375 g (2 skivor)"
        const parenMatch = amountStr.match(/^([\d,\.]+)\s*([a-zA-Z]*)/);
        if (parenMatch) {
            amount = parseFloat(parenMatch[1].replace(',', '.')) || 0;
            unit = parenMatch[2].trim();
        } else {
            // Try simple number
            const numMatch = amountStr.match(/([\d,\.]+)/);
            if (numMatch) {
                amount = parseFloat(numMatch[1].replace(',', '.')) || 0;
            }
            // Extract unit
            const unitMatch = amountStr.match(/[\d,\.]+\s*([a-zA-Z]+)/);
            if (unitMatch) {
                unit = unitMatch[1];
            }
        }

        return {
            amount: amount * multiplier,
            unit: unit
        };
    }

    function formatShoppingAmount(amount, unit) {
        if (amount === 0) return '';

        // Format the number nicely
        let formattedAmount;
        if (Number.isInteger(amount)) {
            formattedAmount = amount.toString();
        } else {
            formattedAmount = (Math.round(amount * 10) / 10).toString().replace('.', ',');
        }

        return unit ? `${formattedAmount} ${unit}` : formattedAmount;
    }

    function renderShoppingScreen() {
        if (!elements.shoppingEmpty || !elements.shoppingContent) return;

        if (state.shoppingRecipes.length === 0) {
            elements.shoppingEmpty.style.display = 'flex';
            elements.shoppingContent.style.display = 'none';
            return;
        }

        elements.shoppingEmpty.style.display = 'none';
        elements.shoppingContent.style.display = 'block';

        // Render recipe chips
        if (elements.shoppingRecipes) {
            elements.shoppingRecipes.innerHTML = state.shoppingRecipes.map(recipe => `
                <div class="recipe-chip" data-recipe-id="${recipe.id}">
                    <span class="recipe-chip-portion">${recipe.portions}x</span>
                    <span class="recipe-chip-name">${recipe.name}</span>
                    <button class="recipe-chip-remove" aria-label="Ta bort ${recipe.name}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            `).join('');

            // Add remove listeners
            elements.shoppingRecipes.querySelectorAll('.recipe-chip-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const chip = e.target.closest('.recipe-chip');
                    if (chip) {
                        removeRecipeFromShoppingList(chip.dataset.recipeId);
                    }
                });
            });
        }

        // Update count
        const uncheckedCount = state.shoppingList.filter(i => !i.checked).length;
        if (elements.shoppingCount) {
            elements.shoppingCount.textContent = `${uncheckedCount} ${uncheckedCount === 1 ? 'vara' : 'varor'} kvar`;
        }

        // Render shopping items (unchecked first, then checked)
        const sortedItems = [...state.shoppingList].sort((a, b) => {
            if (a.checked === b.checked) return 0;
            return a.checked ? 1 : -1;
        });

        if (elements.shoppingList) {
            elements.shoppingList.innerHTML = sortedItems.map(item => `
                <div class="shopping-item ${item.checked ? 'checked' : ''}" data-item-id="${item.id}">
                    <button class="shopping-checkbox" aria-label="Markera som ${item.checked ? 'ej köpt' : 'köpt'}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </button>
                    <div class="shopping-item-content">
                        <span class="shopping-item-text">
                            <span class="shopping-item-amount">${formatShoppingAmount(item.amount, item.unit)}</span>
                            ${item.item}
                        </span>
                        ${item.sources.length > 1 ? `
                            <div class="shopping-item-sources">${item.sources.map(s => s.recipeName).join(', ')}</div>
                        ` : ''}
                    </div>
                </div>
            `).join('');

            // Add toggle listeners
            elements.shoppingList.querySelectorAll('.shopping-item').forEach(itemEl => {
                itemEl.addEventListener('click', () => {
                    toggleShoppingItem(itemEl.dataset.itemId);
                });
            });
        }
    }

    function toggleShoppingItem(itemId) {
        const item = state.shoppingList.find(i => i.id === itemId);
        if (item) {
            item.checked = !item.checked;
            saveShoppingList();
            renderShoppingScreen();
            triggerHaptic('light');
        }
    }

    function clearShoppingList() {
        showConfirmModal(
            'Rensa inköpslistan?',
            'Är du säker på att du vill ta bort alla varor och recept från inköpslistan?',
            [
                {
                    text: 'Rensa',
                    type: 'primary',
                    action: () => {
                        state.shoppingRecipes = [];
                        state.shoppingList = [];
                        saveShoppingList();
                        renderShoppingScreen();
                        triggerHaptic('medium');
                    }
                },
                {
                    text: 'Avbryt',
                    type: 'tertiary',
                    action: () => { }
                }
            ]
        );
    }

    function saveShoppingList() {
        saveToStorage('shoppingRecipes', state.shoppingRecipes);
        saveToStorage('shoppingList', state.shoppingList);
        updateShoppingBadge();
    }

    function loadShoppingList() {
        state.shoppingRecipes = loadFromStorage('shoppingRecipes', []);
        state.shoppingList = loadFromStorage('shoppingList', []);
        updateShoppingBadge();
    }

    function updateShoppingBadge() {
        if (!elements.shoppingBadge) return;

        const count = state.shoppingList.filter(i => !i.checked).length;
        if (count > 0) {
            elements.shoppingBadge.textContent = count > 99 ? '99+' : count;
            elements.shoppingBadge.style.display = 'flex';
        } else {
            elements.shoppingBadge.style.display = 'none';
        }
    }

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Toast notification
    function showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('active');
        });

        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // Confirmation modal
    function showConfirmModal(title, text, buttons) {
        const modal = document.createElement('div');
        modal.className = 'confirm-modal-overlay';
        modal.innerHTML = `
            <div class="confirm-modal">
                <h3 class="confirm-modal-title">${title}</h3>
                <p class="confirm-modal-text">${text}</p>
                <div class="confirm-modal-buttons">
                    ${buttons.map((btn, idx) => `
                        <button class="confirm-modal-btn ${btn.type}" data-btn-idx="${idx}">${btn.text}</button>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        modal.querySelectorAll('.confirm-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.btnIdx);
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                    if (buttons[idx] && buttons[idx].action) {
                        buttons[idx].action();
                    }
                }, 200);
            });
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 200);
            }
        });
    }

    function initShoppingListEvents() {
        // Clear button
        if (elements.shoppingClearBtn) {
            elements.shoppingClearBtn.addEventListener('click', clearShoppingList);
        }
    }

    // ============================================
    // Initialize App
    // ============================================

    function init() {
        console.log('Diana Fitness PWA initializing (Phase 6)...');

        registerServiceWorker();
        applySavedTheme();
        loadSavedState();
        loadShoppingList();

        renderMealCards();
        renderRecipeGrid();
        updateTrainingHero();
        renderWorkoutList();
        renderShoppingScreen();

        initEventListeners();
        initSettingsEvents();
        initShoppingListEvents();
        generateCalendar();

        if (isStandalone()) {
            console.log('Running in standalone mode');
            document.body.classList.add('standalone');
        }

        console.log('Diana Fitness PWA initialized successfully');
    }

    // ============================================
    // Start App
    // ============================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
