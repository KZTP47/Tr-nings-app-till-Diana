/**
 * Diana Fitness PWA - Additional Exercises Module
 * Contains exercises from PDFs not in main data.js
 * 
 * IMAGE STATUS:
 * Exercises with needsImage: true use gradient placeholders.
 * Search for "needsImage: true" to find all items needing unique images.
 * 
 * TO GENERATE IMAGES:
 * Use the imagePrompt field to generate appropriate exercise images.
 * Image filename should match exercise name in lowercase with underscores.
 */

const DianaAdditionalExercises = (function () {
    'use strict';

    // ============================================
    // Missing exercises from Träningsplan 1
    // All need unique images (needsImage: true)
    // ============================================
    const missingPlan1Exercises = {
        'Dead Bug': {
            name: 'Dead Bug',
            sets: 3,
            reps: '15-18',
            image: 'IMG/dead_bug.png',
            needsImage: false,
            imagePrompt: 'Person doing dead bug exercise lying on back with opposite arm and leg extended, fitness photography',
            tip: 'Fokusera på att ryggen ska ha kontakt i marken. Sänk kontrollerat höger ben samtidigt som du sänker vänster arm mot marken.'
        },
        'Plate Front Raise': {
            name: 'Plate Front Raise',
            sets: 3,
            reps: '8-10',
            image: 'IMG/plate_front_raise.png',
            needsImage: false,
            imagePrompt: 'Person doing front raise with weight plate held with both hands, shoulder exercise photography',
            tip: 'Lyft vikten med raka armar framför dig. Håll magen spänd och se till att inte svinga för mycket med kroppen.'
        },
        'Weighted Crunch': {
            name: 'Weighted Crunch',
            sets: 3,
            reps: '15-18',
            image: 'IMG/weighted_crunch.png',
            needsImage: false,
            imagePrompt: 'Person doing weighted crunch holding weight plate above chest, ab exercise photography',
            tip: 'Håll en viktplatta med hjälp av båda händerna liggandes ovanför din kropp. Fötterna i 90 grader. Pressa sedan kroppen uppåt med hjälp av magen.'
        },
        'Banded Lateral Raise': {
            name: 'Banded Lateral Raise',
            sets: 3,
            reps: '8-10',
            image: 'IMG/banded_lateral_raise.png',
            needsImage: false,
            imagePrompt: 'Person doing lateral raise with resistance band, arms extended sideways, shoulder exercise photography',
            tip: 'Stå stadigt med lika långt avstånd på bandet på vardera sida. Med raka armar gå från att ha händerna längs med sidan av kroppen till att gå rakt ut från dig sidledes.'
        }
    };

    // ============================================
    // Expanded Extrapass Gummiband - Full Version
    // (from Extrapass gummiband.pdf)
    // All exercises need unique images
    // ============================================
    const expandedGummibandWorkouts = {
        'gummiband-full': {
            name: 'Extrapass Gummiband (Komplett)',
            type: 'resistance',
            location: 'home',
            sessions: [
                {
                    name: 'Gummiband Session 1 - Helkropp',
                    duration: 35,
                    exercises: [
                        {
                            name: 'Superset',
                            type: 'superset',
                            rounds: 3,
                            exercises: [
                                { name: 'Banded Bodyweight Squat', reps: '10-12', image: 'IMG/banded_bodyweight_squat.jpg' },
                                { name: 'Diagonal Band Walk', reps: '10-12', image: 'IMG/diagonal_band_walk.png', needsImage: false, imagePrompt: 'Person doing diagonal band walk with resistance band around thighs, glute exercise' }
                            ]
                        },
                        { name: 'Standing Banded Row', sets: 3, reps: '10-12', image: 'IMG/standing_banded_row.png', needsImage: false, imagePrompt: 'Person doing standing row with resistance band anchored in front, back exercise', tip: 'Stå framåtlutad och dra händerna med handtaget upp längs kroppen. Knip mellan skulderbladen.' },
                        {
                            name: 'Superset',
                            type: 'superset',
                            rounds: 3,
                            exercises: [
                                { name: 'Standing Banded Shoulder Press', reps: '10-12', image: 'IMG/standing_banded_shoulder_press.png', needsImage: false, imagePrompt: 'Person doing overhead press with resistance band under feet' },
                                { name: 'Banded Lateral Raise', reps: '10-12', image: null, needsImage: true, imagePrompt: 'Person doing lateral raise with resistance band' }
                            ]
                        },
                        {
                            name: 'Superset',
                            type: 'superset',
                            rounds: 3,
                            exercises: [
                                { name: 'Plank', reps: '30 sek', image: 'IMG/plank.png', needsImage: false, imagePrompt: 'Person holding plank position on forearms, core exercise' },
                                { name: 'Banded Alphabet', reps: '10-12', image: 'IMG/banded_alphabet.png', needsImage: false, imagePrompt: 'Person doing band alphabet exercise with arms extended' }
                            ]
                        }
                    ]
                },
                {
                    name: 'Gummiband Session 2 - Underkropp & Core',
                    duration: 35,
                    exercises: [
                        { name: 'Bodyweight Sumo Squat', sets: 3, reps: '10-12', image: 'IMG/bodyweight_sumo_squat.png', needsImage: false, imagePrompt: 'Person doing wide stance sumo squat bodyweight exercise', tip: 'Lite bredare position, sätt dig ner och bibehåll en stolt hållning.' },
                        { name: 'Seated Banded Close Grip Row', sets: 3, reps: '10-12', image: 'IMG/seated_banded_close_grip_row.png', needsImage: false, imagePrompt: 'Person seated doing close grip row with resistance band around feet', tip: 'Sitt med rak rygg och gummibandet runt fötterna. Dra armarna bakåt och ha armbågarna längs kroppens sida.' },
                        { name: 'Band Pull Apart', sets: 3, reps: '10-12', image: 'IMG/band_pull_apart.jpg', tip: 'Stå stadigt, håll ett axelbrett avstånd på bandet och pressa bandet rakt utåt åt varje sida.' },
                        { name: 'Half Kneeling Banded Face Pull', sets: 3, reps: '10-12', image: 'IMG/half_kneeling_banded_face_pull.png', needsImage: false, imagePrompt: 'Person in half kneeling position doing face pull with resistance band', tip: 'Stå på ett knä och dra bandet mot ansiktet med armbågarna högt.' },
                        {
                            name: 'Superset',
                            type: 'superset',
                            rounds: 3,
                            exercises: [
                                { name: 'Glute Bridge, Banded', reps: '10-12', image: 'IMG/banded_glute_bridge.jpg' },
                                { name: 'Banded Fire Hydrant', reps: '10-12', image: 'IMG/banded_fire_hydrant.jpg' }
                            ]
                        },
                        { name: 'Burpee', sets: 3, reps: '10-12', image: 'IMG/burpee.png', needsImage: false, imagePrompt: 'Person doing burpee exercise in motion, full body cardio', tip: 'Börja stående, sänk dig i knäböj, hoppa bakåt till plank, sänk kroppen, pressa upp och hoppa explosivt.' }
                    ]
                },
                {
                    name: 'Gummiband Session 3 - Helkropp Mix',
                    duration: 35,
                    exercises: [
                        { name: 'Banded Bodyweight Squat', sets: 3, reps: '10-12', image: 'IMG/banded_bodyweight_squat.jpg', tip: 'Stå höftbrett isär och gå ner i en knäböj, pressa ut knäna hela tiden.' },
                        { name: 'Banded Walking Lunge', sets: 3, reps: '10-12', image: 'IMG/banded_walking_lunge.png', needsImage: false, imagePrompt: 'Person doing walking lunges with resistance band around thighs', tip: 'Höftbred position med fötterna, ta ett kliv fram med ena benet så att du hamnar i 90 graders vinkel i främre knäet.' },
                        {
                            name: 'Superset',
                            type: 'superset',
                            rounds: 3,
                            exercises: [
                                { name: 'Standing Banded Shoulder Press', reps: '10-12', image: null, needsImage: true, imagePrompt: 'Person doing overhead press with resistance band' },
                                { name: 'Seated Banded Close Grip Row', reps: '10-12', image: null, needsImage: true, imagePrompt: 'Person seated doing row with resistance band' },
                                { name: 'Hyperextension', reps: '10-12', image: 'IMG/hyperextension.png', needsImage: false, imagePrompt: 'Person doing back hyperextension on floor or bench' }
                            ]
                        },
                        { name: 'Banded Bent Over Rear Delt Fly', sets: 3, reps: '10-12', image: 'IMG/banded_bent_over_rear_delt_fly.png', needsImage: false, imagePrompt: 'Person bent over doing rear delt fly with resistance band', tip: 'Stå framåtlutad med band under fötterna. Pressa armarna ut åt sidorna.' },
                        { name: 'Banded Upright Row', sets: 3, reps: '10-12', image: 'IMG/banded_upright_row.png', needsImage: false, imagePrompt: 'Person doing upright row with resistance band under feet', tip: 'Stå på bandet och dra rakt uppåt med armbågarna utåt. Armbågarna går aldrig över axlarna.' },
                        { name: 'Floor Leg Raise', sets: 3, reps: '10-12', image: 'IMG/floor_leg_raise.jpg', tip: 'Ligg på rygg med händerna under ländryggen. Sänk benen rakt ner utan att släppa magen.' }
                    ]
                }
            ]
        }
    };

    // ============================================
    // Expanded Extrapass Helkropp - Full Version
    // (from Extrapass helkropp.pdf)
    // ============================================
    const expandedHelkroppWorkouts = {
        'helkropp-full': {
            name: 'Extrapass Helkropp (Komplett)',
            type: 'fullbody',
            location: 'gym',
            sessions: [
                {
                    name: 'Helkropp Träning 1',
                    duration: 45,
                    exercises: [
                        { name: 'Leg Press', sets: 3, reps: '15-18', image: 'IMG/leg_press.jpg', tip: 'Placera fötterna höftbrett på plattan. Böj knäna och se till att knä och stortå är i linje.' },
                        { name: 'Wide Grip Pull Down', sets: 3, reps: '15-18', image: 'IMG/wide_grip_pull_down.jpg', tip: 'Brett grepp med handflatorna från dig. Dra ner stången till hakans höjd.' },
                        {
                            name: 'Superset',
                            type: 'superset',
                            rounds: 3,
                            exercises: [
                                { name: 'Bench Press, Dumbbell', reps: '15-18', image: 'IMG/dumbbell_bench_press.jpg' },
                                { name: 'Seated Bent Over Rear Delt Fly', reps: '15-18', image: 'IMG/seated_bent_over_rear_delt_fly.png', needsImage: false, imagePrompt: 'Person seated bent over doing rear delt fly with dumbbells' }
                            ]
                        },
                        { name: 'Seated Dumbbell Press', sets: 3, reps: '15-18', image: 'IMG/seated_dumbbell_press.jpg', tip: 'Sänka axlar, stolt bröst! Raka handleder!' },
                        { name: 'Crunch', sets: 3, reps: '15-18', image: 'IMG/crunch.jpg', tip: 'Pressa överkroppen uppåt med hjälp av magen. Försök att slappna av i nacken.' }
                    ]
                },
                {
                    name: 'Helkropp Träning 2',
                    duration: 45,
                    exercises: [
                        { name: 'Leg Press', sets: 4, reps: '10-12', image: 'IMG/leg_press.jpg', tip: 'Placera fötterna höftbrett på plattan.' },
                        {
                            name: 'Superset',
                            type: 'superset',
                            rounds: 3,
                            exercises: [
                                { name: 'Leg Extension', reps: '10-12', image: 'IMG/leg_extension.jpg' },
                                { name: 'Bodyweight Jump Squat', reps: '10-12', image: 'IMG/bodyweight_jump_squat.png', needsImage: false, imagePrompt: 'Person doing explosive jump squat, catching air, leg exercise' }
                            ]
                        },
                        {
                            name: 'Superset',
                            type: 'superset',
                            rounds: 3,
                            exercises: [
                                { name: 'Machine Chest Press', reps: '8', image: 'IMG/machine_chest_press.png', needsImage: false, imagePrompt: 'Person using chest press machine in gym, chest exercise' },
                                { name: 'Incline Push Up', reps: '8', image: 'IMG/incline_push_up.png', needsImage: false, imagePrompt: 'Person doing incline push up with hands on bench, chest exercise' }
                            ]
                        },
                        { name: 'Seated Cable Row', sets: 3, reps: '10-12', image: 'IMG/seated_cable_row.jpg', tip: 'Smalt grepp, håll stolt bröst, dra med armarna nära kroppen.' },
                        { name: 'Russian Twist', sets: 3, reps: '12', image: 'IMG/russian_twist.png', needsImage: false, imagePrompt: 'Person doing Russian twist with weight, rotating torso side to side, ab exercise', tip: 'Stolt bröst, axlarna sänkta. Pendla med hela överkroppen från höger till vänster sida.' }
                    ]
                }
            ]
        }
    };

    // ============================================
    // Additional standalone exercises library
    // All need unique images (needsImage: true)
    // ============================================
    const additionalExerciseLibrary = {
        'Diagonal Band Walk': {
            name: 'Diagonal Band Walk',
            image: 'IMG/diagonal_band_walk.png',
            needsImage: false,
            imagePrompt: 'Person doing diagonal band walk with resistance band around thighs',
            tip: 'Höftbred fotposition, ta ett djupt andetag och sätt dig ner samtidigt som du tar steg diagonalt.'
        },
        'Standing Banded Row': {
            name: 'Standing Banded Row',
            image: 'IMG/standing_banded_row.png',
            needsImage: false,
            imagePrompt: 'Person doing standing row with resistance band anchored in front',
            tip: 'Stå framåtlutad och dra händerna med handtaget upp längs kroppen. Knip mellan skulderbladen.'
        },
        'Standing Banded Shoulder Press': {
            name: 'Standing Banded Shoulder Press',
            image: 'IMG/standing_banded_shoulder_press.png',
            needsImage: false,
            imagePrompt: 'Person doing overhead shoulder press standing on resistance band',
            tip: 'Stå stadigt med lika långt avstånd på bandet på vardera sida. Pressa banden uppåt från hakans höjd.'
        },
        'Plank': {
            name: 'Plank',
            image: 'IMG/plank.png',
            needsImage: false,
            imagePrompt: 'Person holding forearm plank position with straight body line',
            tip: 'Stå på armbågar och tår. Spänn hela kroppen så du är helt rak. Håll höften rak genom att spänna rumpa och bål.'
        },
        'Banded Alphabet': {
            name: 'Banded Alphabet',
            image: 'IMG/banded_alphabet.png',
            needsImage: false,
            imagePrompt: 'Person doing banded alphabet exercise with arms extended holding resistance band',
            tip: 'Stå med ett band i händerna. Pressa ut bandet från magen. Du får anstränga dig för att inte följa med bandet.'
        },
        'Bodyweight Sumo Squat': {
            name: 'Bodyweight Sumo Squat',
            image: 'IMG/bodyweight_sumo_squat.png',
            needsImage: false,
            imagePrompt: 'Person doing wide stance sumo squat bodyweight exercise',
            tip: 'Lite bredare position, sätt dig ner och bibehåll en stolt hållning.'
        },
        'Seated Banded Close Grip Row': {
            name: 'Seated Banded Close Grip Row',
            image: 'IMG/seated_banded_close_grip_row.png',
            needsImage: false,
            imagePrompt: 'Person seated on floor doing row with resistance band around feet',
            tip: 'Sitt med rak rygg och gummibandet runt fötterna. Dra armarna bakåt.'
        },
        'Half Kneeling Banded Face Pull': {
            name: 'Half Kneeling Banded Face Pull',
            image: 'IMG/half_kneeling_banded_face_pull.png',
            needsImage: false,
            imagePrompt: 'Person in half kneeling position doing face pull with resistance band',
            tip: 'Stå på ett knä och dra bandet mot ansiktet med höga armbågar.'
        },
        'Burpee': {
            name: 'Burpee',
            image: 'IMG/burpee.png',
            needsImage: false,
            imagePrompt: 'Person in mid-burpee motion showing the jumping phase',
            tip: 'Börja stående, sänk dig i knäböj, hoppa till plank, sänk kroppen, pressa upp och hoppa explosivt.'
        },
        'Banded Walking Lunge': {
            name: 'Banded Walking Lunge',
            image: 'IMG/banded_walking_lunge.png',
            needsImage: false,
            imagePrompt: 'Person doing walking lunge with resistance band around thighs',
            tip: 'Höftbred position, ta ett kliv fram med ena benet till 90 graders vinkel.'
        },
        'Hyperextension': {
            name: 'Hyperextension',
            image: 'IMG/hyperextension.png',
            needsImage: false,
            imagePrompt: 'Person doing back hyperextension exercise on floor or bench',
            tip: 'Händerna pekar mot öronen. Lyft upp överkroppen och spänn hela kroppen.'
        },
        'Banded Bent Over Rear Delt Fly': {
            name: 'Banded Bent Over Rear Delt Fly',
            image: 'IMG/banded_bent_over_rear_delt_fly.png',
            needsImage: false,
            imagePrompt: 'Person bent over doing rear deltoid fly with resistance band under feet',
            tip: 'Stå framåtlutad med band under fötterna. Pressa armarna ut åt sidorna.'
        },
        'Banded Upright Row': {
            name: 'Banded Upright Row',
            image: 'IMG/banded_upright_row.png',
            needsImage: false,
            imagePrompt: 'Person standing on resistance band doing upright row',
            tip: 'Stå på bandet. Dra rakt uppåt med armbågarna utåt.'
        },
        'Bodyweight Jump Squat': {
            name: 'Bodyweight Jump Squat',
            image: 'IMG/bodyweight_jump_squat.png',
            needsImage: false,
            imagePrompt: 'Person in air during explosive jump squat exercise',
            tip: 'Gå ner i knäböj och explodera uppåt. Land mjukt med böjda knän.'
        },
        'Machine Chest Press': {
            name: 'Machine Chest Press',
            image: 'IMG/machine_chest_press.png',
            needsImage: false,
            imagePrompt: 'Person using chest press machine in gym, pushing handles forward',
            tip: 'Ha handtagen i brösthöjd, sänk axlarna och upp bröstet.'
        },
        'Incline Push Up': {
            name: 'Incline Push Up',
            image: 'IMG/incline_push_up.png',
            needsImage: false,
            imagePrompt: 'Person doing incline push up with hands elevated on bench',
            tip: 'Utför mot en upphöjning som en bänk. Ju lägre lutning, desto mer utmanande.'
        },
        'Russian Twist': {
            name: 'Russian Twist',
            image: 'IMG/russian_twist.png',
            needsImage: false,
            imagePrompt: 'Person doing Russian twist with weight, rotating torso on floor',
            tip: 'Stolt bröst, benen böjda. Pendla med hela överkroppen från höger till vänster.'
        },
        'Seated Bent Over Rear Delt Fly': {
            name: 'Seated Bent Over Rear Delt Fly',
            image: 'IMG/seated_bent_over_rear_delt_fly.png',
            needsImage: false,
            imagePrompt: 'Person seated on bench bent forward doing rear delt fly with dumbbells',
            tip: 'Sitt framåtlutad och pressa armarna ut åt sidorna med lätta vikter.'
        }
    };

    // ============================================
    // Public API
    // ============================================
    return {
        missingPlan1Exercises: missingPlan1Exercises,
        expandedGummibandWorkouts: expandedGummibandWorkouts,
        expandedHelkroppWorkouts: expandedHelkroppWorkouts,
        additionalExerciseLibrary: additionalExerciseLibrary,

        // Get all expanded extra workouts
        getAllExpandedWorkouts: function () {
            return {
                ...expandedGummibandWorkouts,
                ...expandedHelkroppWorkouts
            };
        },

        // Helper for future AI to find exercises needing images
        getExercisesNeedingImages: function () {
            const needsImages = [];

            // Check standalone library
            for (const [key, ex] of Object.entries(additionalExerciseLibrary)) {
                if (ex.needsImage) {
                    needsImages.push({ name: ex.name, imagePrompt: ex.imagePrompt });
                }
            }

            // Check plan 1 exercises
            for (const [key, ex] of Object.entries(missingPlan1Exercises)) {
                if (ex.needsImage) {
                    needsImages.push({ name: ex.name, imagePrompt: ex.imagePrompt });
                }
            }

            return needsImages;
        }
    };
})();
