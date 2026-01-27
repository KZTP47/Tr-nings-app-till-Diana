/**
 * Diana Fitness PWA - Nutrition Tracker Module
 * Handles food logging and daily nutrition statistics
 */

const NutritionTracker = (function () {
    'use strict';

    const STORAGE_KEY = 'diana-fitness-nutritionHistory';
    const EVENT_UPDATED = 'nutrition-updated';

    // State
    let history = [];

    // Initialize
    function init() {
        loadHistory();
        console.log('Nutrition Tracker initialized');
    }

    // Load from local storage
    function loadHistory() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            history = stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.warn('Failed to load nutrition history:', e);
            history = [];
        }
    }

    // Save to local storage
    function saveHistory() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
            notifyListeners();
        } catch (e) {
            console.warn('Failed to save nutrition history:', e);
        }
    }

    // Add a meal log
    function addMeal(recipe, portions, date = new Date()) {
        const dateString = typeof date === 'string' ? date : date.toISOString().split('T')[0];

        // Parse macros to ensure they are numbers
        // Recipe object has top-level properties: protein, carbs, fat, kcal
        const macros = {
            protein: parseMacro(recipe.protein || 0) * portions,
            carbs: parseMacro(recipe.carbs || 0) * portions,
            fat: parseMacro(recipe.fat || 0) * portions,
            calories: parseMacro(recipe.kcal || 0) * portions
        };

        // If macros are missing from recipe object but present in text form, we might need a parser helper
        // But for now assuming the standard recipe format used in data.js

        const logEntry = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            date: dateString,
            timestamp: new Date().toISOString(),
            recipeId: recipe.id,
            recipeName: recipe.name,
            portions: portions,
            macros: macros
        };

        history.push(logEntry);
        saveHistory();

        return logEntry;
    }

    function parseMacro(val) {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') {
            return parseFloat(val.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
        }
        return 0;
    }

    // Get stats for a specific day
    function getDailyStats(dateString) {
        // Defaults if no date provided = today
        if (!dateString) {
            dateString = new Date().toISOString().split('T')[0];
        }

        const daysLogs = history.filter(h => h.date === dateString);

        return daysLogs.reduce((acc, log) => {
            acc.protein += log.macros.protein;
            acc.carbs += log.macros.carbs;
            acc.fat += log.macros.fat;
            acc.calories += log.macros.calories;
            return acc;
        }, { protein: 0, carbs: 0, fat: 0, calories: 0 });
    }

    // Check if a day has any logs (for calendar dots)
    function hasLog(dateString) {
        return history.some(h => h.date === dateString);
    }

    // Dispatch event for UI updates
    function notifyListeners() {
        window.dispatchEvent(new CustomEvent(EVENT_UPDATED, {
            detail: {
                today: getDailyStats(),
                history: history
            }
        }));
    }

    return {
        init,
        addMeal,
        getDailyStats,
        hasLog,
        getHistory: () => [...history]
    };

})();
