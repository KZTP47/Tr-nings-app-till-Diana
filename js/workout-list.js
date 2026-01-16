/**
 * Diana Fitness PWA - Workout List View Module
 * Provides a list-based workout view with checkable sets and editable weights
 */

const WorkoutListView = (function () {
    'use strict';

    // ============================================
    // Storage Keys
    // ============================================
    const STORAGE_KEY_WEIGHTS = 'diana_workout_weights';
    const STORAGE_KEY_VIEW_MODE = 'diana_workout_view_mode';

    // ============================================
    // State
    // ============================================
    let currentWorkout = null;
    let setData = {}; // { exerciseId: { setIndex: { reps, kg, completed } } }
    let savedWeights = {}; // Persistent weight data by exercise name
    let viewMode = 'list'; // 'list' or 'detailed'
    let onCompleteCallback = null;
    let onCloseCallback = null;

    // ============================================
    // Initialization
    // ============================================

    function init() {
        loadSavedWeights();
        loadViewMode();
    }

    function loadSavedWeights() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_WEIGHTS);
            if (saved) {
                savedWeights = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load saved weights:', e);
            savedWeights = {};
        }
    }

    function saveWeights() {
        try {
            localStorage.setItem(STORAGE_KEY_WEIGHTS, JSON.stringify(savedWeights));
        } catch (e) {
            console.error('Failed to save weights:', e);
        }
    }

    function loadViewMode() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_VIEW_MODE);
            if (saved) {
                viewMode = saved;
            }
        } catch (e) {
            viewMode = 'list';
        }
    }

    function saveViewMode() {
        try {
            localStorage.setItem(STORAGE_KEY_VIEW_MODE, viewMode);
        } catch (e) {
            console.error('Failed to save view mode:', e);
        }
    }

    // ============================================
    // Public API
    // ============================================

    function getViewMode() {
        return viewMode;
    }

    function setViewMode(mode) {
        viewMode = mode;
        saveViewMode();
    }

    function startListWorkout(pass, passKey, callbacks) {
        currentWorkout = {
            passKey: passKey,
            passName: pass.name,
            exercises: pass.exercises,
            startTime: Date.now()
        };

        onCompleteCallback = callbacks?.onComplete;
        onCloseCallback = callbacks?.onClose;

        // Initialize set data
        initializeSetData(pass.exercises);

        // Render the view
        renderListView();
    }

    function initializeSetData(exercises) {
        setData = {};

        exercises.forEach((exercise, exIdx) => {
            const exerciseKey = getExerciseKey(exercise, exIdx);
            setData[exerciseKey] = {};

            const sets = getExerciseSets(exercise);
            sets.forEach((set, setIdx) => {
                // Load saved weight for this exercise
                const savedWeight = getSavedWeight(exercise.name || 'Superset', setIdx);

                setData[exerciseKey][setIdx] = {
                    reps: set.reps,
                    kg: savedWeight || set.suggestedKg || '',
                    completed: false,
                    setLabel: set.label,
                    note: set.note || ''
                };
            });
        });
    }

    function getExerciseKey(exercise, index) {
        return `ex_${index}_${(exercise.name || 'superset').replace(/\s+/g, '_')}`;
    }

    function getExerciseSets(exercise) {
        const sets = [];

        if (exercise.type === 'dropset') {
            // Ensure drops array exists
            const drops = exercise.drops || [];
            const rounds = exercise.rounds || 1;

            if (drops.length > 0) {
                // Add start set
                sets.push({
                    label: 'S',
                    reps: drops[0]?.reps || 18,
                    note: 'Startset'
                });
                // Add drop sets
                drops.forEach((drop, idx) => {
                    sets.push({
                        label: String(idx + 1),
                        reps: drop.reps || 10,
                        note: drop.note || ''
                    });
                });
                // Multiply by rounds
                const baseSets = [...sets];
                for (let r = 1; r < rounds; r++) {
                    baseSets.forEach(s => sets.push({ ...s }));
                }
            }
        } else if (exercise.type === 'superset') {
            // Ensure exercises array exists
            const subExercises = exercise.exercises || [];
            const rounds = exercise.rounds || 1;

            // For supersets, create sets for each round
            for (let r = 0; r < rounds; r++) {
                subExercises.forEach((ex, exIdx) => {
                    sets.push({
                        label: String(r * subExercises.length + exIdx + 1),
                        reps: ex.reps || '10',
                        note: ex.name || ''
                    });
                });
            }
        } else {
            // Normal exercise
            const exerciseSets = exercise.sets || 3;
            const exerciseReps = exercise.reps || '8-12';

            // Add start set
            sets.push({
                label: 'S',
                reps: typeof exerciseReps === 'string' ? (exerciseReps.split('-')[1] || exerciseReps) : exerciseReps,
                note: 'Uppvärmning'
            });
            // Add working sets
            for (let i = 0; i < exerciseSets; i++) {
                sets.push({
                    label: String(i + 1),
                    reps: exerciseReps,
                    note: ''
                });
            }
        }

        return sets;
    }

    function getTotalSets() {
        let total = 0;
        Object.values(setData).forEach(exSets => {
            total += Object.keys(exSets).length;
        });
        return total;
    }

    function getCompletedSets() {
        let completed = 0;
        Object.values(setData).forEach(exSets => {
            Object.values(exSets).forEach(set => {
                if (set.completed) completed++;
            });
        });
        return completed;
    }

    function getSavedWeight(exerciseName, setIndex) {
        const key = `${exerciseName}_${setIndex}`;
        return savedWeights[key] || '';
    }

    function updateSavedWeight(exerciseName, setIndex, weight) {
        const key = `${exerciseName}_${setIndex}`;
        savedWeights[key] = weight;
        saveWeights();
    }

    // ============================================
    // Rendering
    // ============================================

    function renderListView() {
        // Remove existing view
        const existing = document.getElementById('workout-list-view');
        if (existing) existing.remove();

        const totalSets = getTotalSets();
        const completedSets = getCompletedSets();
        const progressPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

        const view = document.createElement('div');
        view.className = 'workout-list-view';
        view.id = 'workout-list-view';

        view.innerHTML = `
            <div class="wl-header">
                <button class="wl-close-btn" aria-label="Stäng">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="wl-title-section">
                    <h2 class="wl-title">${currentWorkout.passName}</h2>
                    <span class="wl-progress-text">${progressPercent}% Genomförda sets</span>
                </div>
                <button class="wl-settings-btn" aria-label="Inställningar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                </button>
            </div>

            <div class="wl-progress-bar">
                <div class="wl-progress-fill" style="width: ${progressPercent}%"></div>
            </div>

            <div class="wl-summary">
                ${currentWorkout.exercises.length} övningar / ${totalSets} set
            </div>

            <div class="wl-exercises-container">
                ${renderExercisesList()}
            </div>

            <div class="wl-footer">
                <button class="wl-complete-btn" id="wl-complete-btn">
                    Slutför
                </button>
            </div>
        `;

        document.body.appendChild(view);

        // Add event listeners
        setupListViewEventListeners(view);

        // Animate in
        requestAnimationFrame(() => {
            view.classList.add('active');
        });
    }

    function renderExercisesList() {
        return currentWorkout.exercises.map((exercise, exIdx) => {
            const exerciseKey = getExerciseKey(exercise, exIdx);
            const exSetData = setData[exerciseKey] || {};
            const sets = Object.values(exSetData);
            const completedCount = sets.filter(s => s.completed).length;
            const totalCount = sets.length;

            const exerciseName = exercise.name || 'Superset';
            const exerciseType = getExerciseTypeLabel(exercise);
            const repsDisplay = getExerciseRepsDisplay(exercise);

            return `
                <div class="wl-exercise-section" data-exercise-key="${exerciseKey}">
                    <div class="wl-exercise-header">
                        <div class="wl-exercise-info">
                            <h3 class="wl-exercise-name">${exerciseName}</h3>
                            <span class="wl-exercise-reps">Tilldelad: ${repsDisplay}</span>
                        </div>
                        ${exercise.image ? `<img src="${exercise.image}" alt="${exerciseName}" class="wl-exercise-thumb">` : ''}
                    </div>
                    
                    <div class="wl-sets-container">
                        <div class="wl-sets-header">
                            <span class="wl-sets-type">${exerciseType}</span>
                            <span class="wl-sets-count">${completedCount} / ${totalCount}</span>
                        </div>
                        
                        <div class="wl-sets-list">
                            ${renderSetRows(exercise, exerciseKey, exSetData)}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function getExerciseTypeLabel(exercise) {
        if (exercise.type === 'dropset') return 'Dropset';
        if (exercise.type === 'superset') return 'Superset';
        return 'Normalt set';
    }

    function getExerciseRepsDisplay(exercise) {
        if (exercise.type === 'dropset') {
            if (!exercise.drops || exercise.drops.length === 0) {
                return '8 - 12 reps';
            }
            const reps = exercise.drops
                .map(d => d.reps)
                .filter(r => r !== undefined && r !== null && !isNaN(r));
            if (reps.length === 0) return '8 - 12 reps';
            return `${Math.min(...reps)} - ${Math.max(...reps)} reps`;
        }
        if (exercise.type === 'superset') {
            if (!exercise.exercises || exercise.exercises.length === 0) {
                return '8 - 12 reps';
            }
            const reps = exercise.exercises
                .map(e => e.reps)
                .filter(r => r !== undefined && r !== null);
            if (reps.length === 0) return '8 - 12 reps';
            return reps.join(' / ') + ' reps';
        }
        return exercise.reps ? `${exercise.reps} reps` : '8 - 12 reps';
    }

    function renderSetRows(exercise, exerciseKey, exSetData) {
        return Object.entries(exSetData).map(([setIdx, set]) => {
            const isCompleted = set.completed;
            const exerciseName = exercise.name || 'Superset';

            return `
                <div class="wl-set-row ${isCompleted ? 'completed' : ''}" 
                     data-exercise-key="${exerciseKey}" 
                     data-set-idx="${setIdx}">
                    <span class="wl-set-number">${set.setLabel}</span>
                    <span class="wl-set-reps">${set.reps} reps</span>
                    <input type="number" 
                           class="wl-set-kg" 
                           value="${set.kg}" 
                           placeholder="kg"
                           data-exercise-name="${exerciseName}"
                           data-set-idx="${setIdx}"
                           inputmode="decimal">
                    <span class="wl-set-kg-label">kg</span>
                    <button class="wl-set-checkbox ${isCompleted ? 'checked' : ''}" 
                            aria-label="${isCompleted ? 'Avmarkera set' : 'Markera set som klart'}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </button>
                </div>
            `;
        }).join('');
    }

    function setupListViewEventListeners(view) {
        // Close button
        view.querySelector('.wl-close-btn').addEventListener('click', () => {
            closeListView();
        });

        // Settings button
        view.querySelector('.wl-settings-btn').addEventListener('click', () => {
            showViewModeModal();
        });

        // Complete button
        view.querySelector('#wl-complete-btn').addEventListener('click', () => {
            completeWorkout();
        });

        // Set checkboxes
        view.querySelectorAll('.wl-set-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                const row = checkbox.closest('.wl-set-row');
                toggleSetComplete(row);
            });
        });

        // Set rows (click anywhere to toggle)
        view.querySelectorAll('.wl-set-row').forEach(row => {
            row.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT' && !e.target.classList.contains('wl-set-checkbox')) {
                    toggleSetComplete(row);
                }
            });
        });

        // Weight inputs
        view.querySelectorAll('.wl-set-kg').forEach(input => {
            input.addEventListener('change', (e) => {
                const exerciseName = e.target.dataset.exerciseName;
                const setIdx = e.target.dataset.setIdx;
                const weight = e.target.value;

                // Update in setData
                const row = e.target.closest('.wl-set-row');
                const exerciseKey = row.dataset.exerciseKey;
                if (setData[exerciseKey] && setData[exerciseKey][setIdx]) {
                    setData[exerciseKey][setIdx].kg = weight;
                }

                // Save to persistent storage
                updateSavedWeight(exerciseName, setIdx, weight);
            });

            // Prevent row click when focusing input
            input.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    function toggleSetComplete(row) {
        const exerciseKey = row.dataset.exerciseKey;
        const setIdx = row.dataset.setIdx;

        if (setData[exerciseKey] && setData[exerciseKey][setIdx]) {
            setData[exerciseKey][setIdx].completed = !setData[exerciseKey][setIdx].completed;

            // Update UI
            row.classList.toggle('completed');
            const checkbox = row.querySelector('.wl-set-checkbox');
            checkbox.classList.toggle('checked');

            // Update progress
            updateProgress();

            // Haptic feedback
            if (typeof triggerHaptic === 'function') {
                triggerHaptic('light');
            }
        }
    }

    function updateProgress() {
        const totalSets = getTotalSets();
        const completedSets = getCompletedSets();
        const progressPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

        const view = document.getElementById('workout-list-view');
        if (!view) return;

        // Update progress bar
        const progressFill = view.querySelector('.wl-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }

        // Update progress text
        const progressText = view.querySelector('.wl-progress-text');
        if (progressText) {
            progressText.textContent = `${progressPercent}% Genomförda sets`;
        }

        // Update exercise section counts
        currentWorkout.exercises.forEach((exercise, exIdx) => {
            const exerciseKey = getExerciseKey(exercise, exIdx);
            const section = view.querySelector(`[data-exercise-key="${exerciseKey}"]`);
            if (section) {
                const exSetData = setData[exerciseKey] || {};
                const sets = Object.values(exSetData);
                const completedCount = sets.filter(s => s.completed).length;
                const totalCount = sets.length;

                const countEl = section.querySelector('.wl-sets-count');
                if (countEl) {
                    countEl.textContent = `${completedCount} / ${totalCount}`;
                }
            }
        });
    }

    function showViewModeModal() {
        const modal = document.createElement('div');
        modal.className = 'wl-modal-overlay';
        modal.id = 'view-mode-modal';

        modal.innerHTML = `
            <div class="wl-modal">
                <h3 class="wl-modal-title">Välj vy</h3>
                <p class="wl-modal-text">Välj mellan en detaljerad vy för varje övning och set, eller en listvy över alla övningar och set</p>
                
                <div class="wl-view-options">
                    <button class="wl-view-option ${viewMode === 'detailed' ? 'selected' : ''}" data-mode="detailed">
                        <div class="wl-view-option-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                            </svg>
                        </div>
                        <span>Detaljerad</span>
                    </button>
                    
                    <button class="wl-view-option ${viewMode === 'list' ? 'selected' : ''}" data-mode="list">
                        <div class="wl-view-option-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                <line x1="3" y1="18" x2="3.01" y2="18"></line>
                            </svg>
                        </div>
                        <span>Lista</span>
                    </button>
                </div>

                <div class="wl-modal-remember">
                    <label class="wl-remember-label">
                        <input type="checkbox" id="remember-view-mode" checked>
                        <span>Kom ihåg mitt val</span>
                    </label>
                    <p class="wl-remember-note">När den är aktiverad kommer appen inte att be dig att välja mellan olika vyer. Istället använder den din standardinställning.</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        // Event listeners
        modal.querySelectorAll('.wl-view-option').forEach(option => {
            option.addEventListener('click', () => {
                const newMode = option.dataset.mode;
                setViewMode(newMode);

                // Close modal
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 200);

                // If switching to detailed, close list view and use original
                if (newMode === 'detailed') {
                    closeListView(true); // true = switch to detailed
                }
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

    function closeListView(switchToDetailed = false) {
        const view = document.getElementById('workout-list-view');
        if (view) {
            view.classList.remove('active');
            setTimeout(() => view.remove(), 300);
        }

        currentWorkout = null;

        if (onCloseCallback) {
            onCloseCallback(switchToDetailed);
        }
    }

    function completeWorkout() {
        const totalSets = getTotalSets();
        const completedSets = getCompletedSets();
        const duration = Math.floor((Date.now() - currentWorkout.startTime) / 1000 / 60);

        // Create workout summary
        const summary = {
            passKey: currentWorkout.passKey,
            passName: currentWorkout.passName,
            date: new Date().toISOString(),
            duration: duration,
            totalSets: totalSets,
            completedSets: completedSets,
            completionPercent: totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0
        };

        // Show completion modal
        showCompletionModal(summary);
    }

    function showCompletionModal(summary) {
        const modal = document.createElement('div');
        modal.className = 'wl-modal-overlay';
        modal.id = 'completion-modal';

        modal.innerHTML = `
            <div class="wl-modal wl-completion-modal">
                <div class="wl-completion-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3 class="wl-modal-title">Bra jobbat!</h3>
                <p class="wl-completion-stats">
                    Du genomförde ${summary.completedSets} av ${summary.totalSets} set (${summary.completionPercent}%)<br>
                    Tid: ${summary.duration} minuter
                </p>
                <button class="wl-complete-confirm-btn">Stäng</button>
            </div>
        `;

        document.body.appendChild(modal);

        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        modal.querySelector('.wl-complete-confirm-btn').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                closeListView();

                if (onCompleteCallback) {
                    onCompleteCallback(summary);
                }
            }, 200);
        });
    }

    // Initialize on load
    init();

    // Public API
    return {
        getViewMode,
        setViewMode,
        startListWorkout,
        closeListView,
        renderListView
    };

})();
