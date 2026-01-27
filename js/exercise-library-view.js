/**
 * Diana Fitness PWA - Exercise Library View Module
 * Handles the "Visa alla övningar" screen
 */

const ExerciseLibraryView = (function () {
    'use strict';

    // State
    const state = {
        allExercises: [],
        initialized: false
    };

    // DOM Elements
    const elements = {
        grid: null,
        screen: null
    };

    function init() {
        if (state.initialized) return;

        console.log('Initializing Exercise Library View...');

        // Create Screen HTML if not exists (though better to have it in index.html, but we can check)
        // For modularity, let's assume index.html has the container, or we inject it?
        // The plan said we'd add it to index.html.

        elements.screen = document.getElementById('screen-exercises');
        elements.grid = document.getElementById('exercise-library-grid');

        if (!elements.screen || !elements.grid) {
            console.warn('Exercise Library screen elements not found');
            return;
        }

        // Close button handler is likely generic navigation, but let's ensure it works
        const closeBtn = elements.screen.querySelector('.header-action-back');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                // Navigate back to workout start screen
                if (typeof navigateToScreen === 'function') {
                    navigateToScreen('workout');
                } else {
                    // Fallback if global not avail (should be though)
                    elements.screen.classList.remove('active');
                    document.getElementById('screen-workout').classList.add('active');
                }
            });
        }

        state.initialized = true;
    }

    function collectAllExercises() {
        const uniqueExercises = new Map();

        // Helper to add exercises
        const addExercises = (exerciseList) => {
            if (!exerciseList) return;
            exerciseList.forEach(ex => {
                if (!uniqueExercises.has(ex.name)) {
                    uniqueExercises.set(ex.name, ex);
                } else {
                    // Update if we find one with an image and the stored one doesn't have one
                    const existing = uniqueExercises.get(ex.name);
                    if (!existing.image && ex.image) {
                        uniqueExercises.set(ex.name, ex);
                    }
                }
            });
        };

        // 1. Get from all Plans
        // Plan 1, 2, 3
        [1, 2, 3].forEach(planId => {
            const plan = DianaData.getPlanExercises(planId);
            Object.values(plan).forEach(pass => {
                addExercises(pass.exercises);
            });
        });

        // 2. Get from Extra Workouts
        const extraWorkouts = DianaData.getExtraWorkouts();
        Object.values(extraWorkouts).forEach(workout => {
            addExercises(workout.exercises);
        });

        // 3. Convert to array and sort
        return Array.from(uniqueExercises.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    function render() {
        if (!elements.grid) return;

        const exercises = collectAllExercises();
        state.allExercises = exercises;

        elements.grid.innerHTML = '';

        exercises.forEach(exercise => {
            const card = createExerciseCard(exercise);
            elements.grid.appendChild(card);
        });

        // Update count
        const countEl = document.getElementById('exercise-library-count');
        if (countEl) {
            countEl.textContent = `${exercises.length} övningar`;
        }
    }

    function createExerciseCard(exercise) {
        const card = document.createElement('article');
        card.className = 'exercise-lib-card';

        // Use img element with onerror fallback or div with bg
        // Using div with bg to match existing style, but ensuring fallback
        const imageStyle = exercise.image
            ? `background-image: url('${exercise.image}');`
            : '';

        const imageClass = exercise.image ? 'has-image' : 'no-image';

        card.innerHTML = `
            <div class="exercise-lib-image ${imageClass}" style="${imageStyle}">
                ${!exercise.image ? '<span class="exercise-lib-icon">💪</span>' : ''}
            </div>
            <div class="exercise-lib-content">
                <h4 class="exercise-lib-name">${exercise.name}</h4>
                <div class="exercise-lib-tags">
                    ${exercise.reps ? `<span class="exercise-lib-tag">${exercise.reps}</span>` : ''}
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            // Open image modal if image exists
            if (exercise.image && typeof window.openImageModal === 'function') {
                window.openImageModal(exercise.image);
            }
        });

        return card;
    }

    function show() {
        if (!state.initialized) init();

        // Render every time to ensure fresh data
        render();

        // Navigate
        // We can use the global navigateToScreen if exposed, or manually toggle
        // Ideally we added 'exercises' to the screens list in app.js, but for modularity
        // we might just piggyback on manual class toggling if app.js doesn't know about this screen
        // BUT, the plan was to add a proper screen.

        if (typeof navigateToScreen === 'function') {
            navigateToScreen('exercises');
        } else {
            // Fallback
            const screens = document.querySelectorAll('.screen');
            screens.forEach(s => s.classList.remove('active'));
            elements.screen.classList.add('active');
        }

        window.scrollTo(0, 0);
    }

    return {
        init: init,
        show: show
    };

})();
