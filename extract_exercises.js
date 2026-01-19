
const fs = require('fs');
const path = require('path');

// Mock content or read file? I'll read the file I just viewed.
// Since I can't easily require the file because it's a module pattern not a node module,
// I'll just read the file content and use regex to find "name: '...'" inside the exercises arrays.

const filePath = String.raw`C:\Users\karok\Desktop\HTML games\Tränings och hälso app till Diana\New folder (10)\diana-fitness-pwa\js\data.js`;
const content = fs.readFileSync(filePath, 'utf8');

const exerciseNames = new Set();
const regex = /name:\s*'([^']+)'/g;
let match;

// We need to be careful not to pick up recipe names or plan names.
// Recipes are in breakfastRecipes, lunchRecipes, dinnerRecipes.
// Training plans are in plan1Exercises, plan2Exercises, plan3Exercises, extraWorkouts.

// Let's rely on the structure a bit more.
// Everything after line 720 (roughly) is exercises.
// But recipes also use "name: ...".

// Find the start of training plans
const exercisesStartIndex = content.indexOf('const plan1Exercises');
const exercisesContent = content.substring(exercisesStartIndex);

while ((match = regex.exec(exercisesContent)) !== null) {
    const name = match[1];
    // Filter out "Superset" and plan names if checks are needed
    if (name === 'Superset' || name.includes('Pass') || name.includes('Traningsplan') || name.includes('Extrapass') || name.includes('Underkropp') || name.includes('Overkropp') || name.includes('Ben Hemma') || name.includes('Ben Gym') || name.includes('Gummiband')) {
        continue;
    }
    exerciseNames.add(name);
}

const sortedNames = Array.from(exerciseNames).sort();
console.log(JSON.stringify(sortedNames, null, 2));
