/**
 * Diana Fitness PWA - Additional Recipes Module
 * Contains recipes from Kostupplägg 1-5 PDFs not in main data.js
 * 
 * IMAGE STATUS:
 * All recipes in this file are tagged with needsImage: true
 * They use gradient placeholders (image: null) until unique images are generated.
 * 
 * TO GENERATE IMAGES:
 * Search for "needsImage: true" to find all items needing unique images.
 * Image filename should match the recipe id (e.g., 'breakfast-add-1.jpg')
 */

const DianaAdditionalRecipes = (function () {
    'use strict';

    // ============================================
    // Additional Breakfast Recipes
    // All need unique images (needsImage: true)
    // ============================================
    const additionalBreakfastRecipes = [
        {
            id: 'breakfast-add-1',
            name: 'Lönnsirap- och vaniljchiapudding med hallon',
            category: 'breakfast',
            prepTime: 15,
            cookTime: 25,
            kcal: 480,
            protein: 36,
            carbs: 48,
            fat: 15,
            image: 'IMG/breakfast_add_1.png',
            needsImage: false,
            imagePrompt: 'Chia pudding with maple syrup, vanilla and fresh raspberries in a glass jar, top view, food photography',
            ingredients: [
                { amount: '250ml', item: 'Havredryck' },
                { amount: '240g', item: 'Kvarg, naturell, laktosfri' },
                { amount: '45g', item: 'Hallon' },
                { amount: '45g', item: 'Chiafrön' },
                { amount: '30g', item: 'Lönnsirap' },
                { amount: '1-2 droppar', item: 'Vaniljextrakt' }
            ],
            instructions: [
                'Vispa ihop chiafrön med havremjölk, lönnsirap, vaniljextrakt och en nypa salt.',
                'Täck skålen och låt stå i kylen i 15-30 min eller över natten.',
                'Servera chiapuddingen med kvarg och toppa med hallon.'
            ],
            tips: 'Kan förberedas kvällen innan.'
        },
        {
            id: 'breakfast-add-2',
            name: 'Exotisk smoothie',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 0,
            kcal: 480,
            protein: 34,
            carbs: 47,
            fat: 17,
            image: 'IMG/breakfast_add_2.png',
            needsImage: false,
            imagePrompt: 'Tropical mango and banana smoothie in a tall glass with coconut milk, bright yellow color, food photography',
            ingredients: [
                { amount: '90g', item: 'Mango' },
                { amount: '280g', item: 'Kvarg, naturell, laktosfri' },
                { amount: '85ml', item: 'Kokosmjölk 18% fett' },
                { amount: '90g', item: 'Banan' }
            ],
            instructions: [
                'Skala och skär bananen och mangon i mindre bitar.',
                'Tillsätt alla ingredienser till en mixer och mixa tills slät.',
                'Servera smoothien i ett glas.'
            ],
            tips: 'Använd fryst frukt för en kallare smoothie.'
        },
        {
            id: 'breakfast-add-3',
            name: 'Shakshuka',
            category: 'breakfast',
            prepTime: 10,
            cookTime: 20,
            kcal: 480,
            protein: 34,
            carbs: 45,
            fat: 17,
            image: 'IMG/breakfast_add_3.png',
            needsImage: false,
            imagePrompt: 'Shakshuka with poached eggs in tomato sauce with feta cheese, red peppers in a cast iron skillet, food photography',
            ingredients: [
                { amount: '50g', item: 'Kalkonbacon' },
                { amount: '95g', item: 'Röd paprika' },
                { amount: '10g', item: 'Fetaost' },
                { amount: '115g', item: 'Ägg, 2 st.' },
                { amount: '95g', item: 'Zucchini' },
                { amount: '220g', item: 'Krossade tomater' },
                { amount: '45g', item: 'Gul lök' },
                { amount: '45g', item: 'Vitt bröd' },
                { amount: '1/2 tsk', item: 'Spiskummin' },
                { amount: '1/2 tsk', item: 'Paprikapulver' }
            ],
            instructions: [
                'Hacka lök, paprika och squash. Stek med kalkonbacon.',
                'Tillsätt kryddor och hackade tomater. Låt sjuda.',
                'Gör hål i såsen och kläck i äggen. Låt sjuda med lock i 10 min.',
                'Toppa med feta och servera med bröd.'
            ],
            tips: null
        },
        {
            id: 'breakfast-add-4',
            name: 'Vaniljkvarg med granola',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 0,
            kcal: 480,
            protein: 34,
            carbs: 47,
            fat: 17,
            image: 'IMG/breakfast_add_4.png',
            needsImage: false,
            imagePrompt: 'Bowl of vanilla quark with chocolate granola and peanut butter drizzle, breakfast food photography',
            ingredients: [
                { amount: '75g', item: 'Granola, Kakao & Hallon' },
                { amount: '10g', item: 'Jordnötssmör' },
                { amount: '210g', item: 'Kvarg, Vaniljsmak, laktosfri' }
            ],
            instructions: [
                'Tillsätt kvargen till en skål.',
                'Toppa med jordnötssmöret och granolan. Smaklig måltid!'
            ],
            tips: null
        },
        {
            id: 'breakfast-add-5',
            name: 'Chiapudding med agave och banan',
            category: 'breakfast',
            prepTime: 10,
            cookTime: 0,
            kcal: 480,
            protein: 35,
            carbs: 49,
            fat: 16,
            image: 'IMG/breakfast_add_5.png',
            needsImage: false,
            imagePrompt: 'Chia pudding topped with sliced banana and agave syrup in a glass jar, healthy breakfast food photography',
            ingredients: [
                { amount: '35g', item: 'Veganskt proteinpulver' },
                { amount: '120g', item: 'Banan' },
                { amount: '40g', item: 'Chiafrön' },
                { amount: '105ml', item: 'Mandeldryck' },
                { amount: '20g', item: 'Agavesirap' },
                { amount: '1-2 droppar', item: 'Vaniljextrakt' }
            ],
            instructions: [
                'Vispa ihop chiafrön med mandeldryck, proteinpulver och vaniljextrakt.',
                'Låt stå i kylen över natten (minst 4 timmar).',
                'Toppa med bananskivor och agavesirap.'
            ],
            tips: 'Förbered kvällen innan.'
        },
        {
            id: 'breakfast-add-6',
            name: 'Kvarg med fruktsallad',
            category: 'breakfast',
            prepTime: 10,
            cookTime: 0,
            kcal: 480,
            protein: 35,
            carbs: 47,
            fat: 16,
            image: 'IMG/breakfast_add_6.png',
            needsImage: false,
            imagePrompt: 'White quark bowl with fresh fruit salad - apple, pear, banana, grapes and dark chocolate pieces, breakfast photography',
            ingredients: [
                { amount: '295g', item: 'Kvarg, naturell, laktosfri' },
                { amount: '45g', item: 'Päron' },
                { amount: '30g', item: 'Vindruvor' },
                { amount: '30g', item: 'Choklad, 70%' },
                { amount: '45g', item: 'Banan' },
                { amount: '70g', item: 'Äpple' }
            ],
            instructions: [
                'Häll upp kvarg i en skål.',
                'Skölj och skär frukten i bitar. Tillsätt till kvargen.',
                'Hacka chokladen och strö över.'
            ],
            tips: null
        },
        {
            id: 'breakfast-add-7',
            name: 'Äggröra med grönsaker och svamp',
            category: 'breakfast',
            prepTime: 10,
            cookTime: 15,
            kcal: 480,
            protein: 34,
            carbs: 46,
            fat: 17,
            image: 'IMG/breakfast_add_7.png',
            needsImage: false,
            imagePrompt: 'Fluffy scrambled eggs with sauteed mushrooms, green peppers, corn and spring onions, served with rye bread, breakfast photography',
            ingredients: [
                { amount: '70g', item: 'Rågbröd, 2 skivor' },
                { amount: '5g', item: 'Olivolja' },
                { amount: '85g', item: 'Ägg, 2 st.' },
                { amount: '120g', item: 'Äggvita' },
                { amount: '35g', item: 'Salladslök' },
                { amount: '140g', item: 'Grön paprika' },
                { amount: '70g', item: 'Majs' },
                { amount: '150g', item: 'Champinjoner' }
            ],
            instructions: [
                'Skiva champinjonerna och hackagrönsaker.',
                'Stek champinjoner och grönsaker i olja.',
                'Vispa ägg med äggvita, tillsätt till pannan.',
                'Servera med bröd.'
            ],
            tips: null
        }
    ];

    // ============================================
    // Additional Lunch Recipes
    // All need unique images (needsImage: true)
    // ============================================
    const additionalLunchRecipes = [
        {
            id: 'lunch-add-1',
            name: 'Quinoasallad med stekta rotfrukter och kyckling',
            category: 'lunch',
            prepTime: 10,
            cookTime: 40,
            kcal: 554,
            protein: 40,
            carbs: 57,
            fat: 18,
            image: 'IMG/lunch_add_1.png',
            needsImage: false,
            imagePrompt: 'Quinoa salad bowl with roasted sweet potato, beetroot, grilled chicken and hummus, healthy lunch photography',
            ingredients: [
                { amount: '135g', item: 'Kycklingbröstfilé' },
                { amount: '115g', item: 'Sötpotatis' },
                { amount: '105g', item: 'Rödbeta' },
                { amount: '40g', item: 'Quinoa, okokt' },
                { amount: '20g', item: 'Bladspenat' },
                { amount: '50g', item: 'Hummus' }
            ],
            instructions: [
                'Sätt ugnen på 200°C.',
                'Skär rotfrukterna och baka i ugnen i 30 min.',
                'Koka quinoan enligt förpackningen.',
                'Stek kycklingen och skiva.',
                'Blanda allt och toppa med hummus.'
            ],
            tips: null
        },
        {
            id: 'lunch-add-2',
            name: 'Kyckling Stroganoff',
            category: 'lunch',
            prepTime: 10,
            cookTime: 20,
            kcal: 560,
            protein: 42,
            carbs: 55,
            fat: 18,
            image: 'IMG/lunch_add_2.png',
            needsImage: false,
            imagePrompt: 'Creamy chicken stroganoff with mushrooms and rice, Swedish comfort food photography',
            ingredients: [
                { amount: '55g', item: 'Gul lök' },
                { amount: '85g', item: 'Portabellosvamp' },
                { amount: '110g', item: 'Lätt crème fraiche, laktosfri' },
                { amount: '155g', item: 'Kycklingbröstfilé' },
                { amount: '50g', item: 'Basmatiris, okokt' },
                { amount: '1-2 tsk', item: 'Dijon senap' },
                { amount: '1-2 tsk', item: 'Vitlökspulver' }
            ],
            instructions: [
                'Skala och hacka lök och champinjoner.',
                'Koka riset enligt förpackningen.',
                'Stek kyckling med vitlökspulver, tillsätt lök och svamp.',
                'Tillsätt crème fraiche, buljong och senap.',
                'Låt sjuda och servera med ris.'
            ],
            tips: null
        },
        {
            id: 'lunch-add-3',
            name: 'Thaisallad med nötkött',
            category: 'lunch',
            prepTime: 10,
            cookTime: 15,
            kcal: 560,
            protein: 42,
            carbs: 55,
            fat: 19,
            image: 'IMG/lunch_add_3.png',
            needsImage: false,
            imagePrompt: 'Thai beef salad with mango, edamame, broccoli, red peppers and fried egg, Asian food photography',
            ingredients: [
                { amount: '85g', item: 'Edamamebönor' },
                { amount: '20g', item: 'Salladslök' },
                { amount: '140g', item: 'Röd paprika' },
                { amount: '100g', item: 'Mango' },
                { amount: '90g', item: 'Ägg, 2 st.' },
                { amount: '70g', item: 'Gurka' },
                { amount: '115g', item: 'Broccoli' },
                { amount: '70g', item: 'Oxfilé' },
                { amount: '25g', item: 'Agavesirap' },
                { amount: '1 msk', item: 'Sojasås' },
                { amount: '1 tsk', item: 'Limejuice' }
            ],
            instructions: [
                'Skär grönsaker och mango i skivor.',
                'Stek nötköttet på hög värme, krydda med salt och peppar.',
                'Stek ägget i köksfettet.',
                'Koka edamamebönor i 2 min.',
                'Blanda dressing av soja, agave, lime och ingefära.',
                'Lägg allt i en skål och toppa med ägg.'
            ],
            tips: null
        },
        {
            id: 'lunch-add-4',
            name: 'Caesarsallad med kyckling och rostad potatis',
            category: 'lunch',
            prepTime: 15,
            cookTime: 30,
            kcal: 560,
            protein: 42,
            carbs: 55,
            fat: 19,
            image: 'IMG/lunch_add_4.png',
            needsImage: false,
            imagePrompt: 'Caesar salad with grilled chicken, roasted potatoes, kale, romaine lettuce and parmesan, lunch photography',
            ingredients: [
                { amount: '30g', item: 'Grönkål' },
                { amount: '55g', item: 'Romansallad' },
                { amount: '295g', item: 'Potatis' },
                { amount: '50g', item: 'Parmesan' },
                { amount: '85g', item: 'Kycklingbröstfilé' },
                { amount: '10g', item: 'Ansjovis' },
                { amount: '1-2 tsk', item: 'Dijon senap' },
                { amount: '1-3 tsk', item: 'Citronsaft' }
            ],
            instructions: [
                'Sätt ugnen på 200°C. Skär potatis och baka 30 min.',
                'Gör dressing av ansjovis, vitlök, citron, senap.',
                'Stek kycklingen och skiva.',
                'Blanda grönsaker, potatis och dressing. Toppa med kyckling och parmesan.'
            ],
            tips: null
        },
        {
            id: 'lunch-add-5',
            name: 'Enkla empanadas med nötkött',
            category: 'lunch',
            prepTime: 15,
            cookTime: 20,
            kcal: 560,
            protein: 42,
            carbs: 55,
            fat: 19,
            image: 'IMG/lunch_add_5.png',
            needsImage: false,
            imagePrompt: 'Golden baked beef empanadas with crispy pastry, Latin American food photography',
            ingredients: [
                { amount: '50g', item: 'Röd paprika' },
                { amount: '10g', item: 'Olivolja' },
                { amount: '50g', item: 'Gul lök' },
                { amount: '110g', item: 'Pizzadeg, fullkorn' },
                { amount: '110g', item: 'Nötfärs' },
                { amount: '35g', item: 'Äggvita' },
                { amount: '1-2 tsk', item: 'Chilipulver' },
                { amount: '1-2 tsk', item: 'Spiskummin' }
            ],
            instructions: [
                'Sätt ugnen på 180°C.',
                'Stek lök, paprika och köttfärs med kryddor.',
                'Kavla ut degen och skär ut cirklar.',
                'Fyll med köttfärsblandning, vik ihop och tryck kanterna.',
                'Pensla med ägg och grädda 12-15 min.'
            ],
            tips: null
        },
        {
            id: 'lunch-add-6',
            name: 'Enchiladas med kyckling och salsa',
            category: 'lunch',
            prepTime: 10,
            cookTime: 30,
            kcal: 560,
            protein: 42,
            carbs: 55,
            fat: 19,
            image: 'IMG/lunch_add_6.png',
            needsImage: false,
            imagePrompt: 'Baked chicken enchiladas with melted cheese and tomato salsa, Mexican food photography',
            ingredients: [
                { amount: '75g', item: 'Tortillabröd, 2 st.' },
                { amount: '70g', item: 'Tomat' },
                { amount: '140g', item: 'Tomatsalsa' },
                { amount: '70g', item: 'Gurka' },
                { amount: '95g', item: 'Kycklingbröstfilé' },
                { amount: '55g', item: 'Ost' },
                { amount: '1-2 tsk', item: 'Tacokrydda' }
            ],
            instructions: [
                'Sätt ugnen på 225°C.',
                'Stek kycklingen, blanda med halva salsan.',
                'Fyll tortillabröd med kyckling och rulla ihop.',
                'Toppa med resten av salsa och ost.',
                'Baka i 20 min. Servera med gurka och tomat.'
            ],
            tips: null
        },
        {
            id: 'lunch-add-7',
            name: 'Big Mac Bowl',
            category: 'lunch',
            prepTime: 15,
            cookTime: 30,
            kcal: 560,
            protein: 44,
            carbs: 53,
            fat: 18,
            image: 'IMG/lunch_add_7.png',
            needsImage: false,
            imagePrompt: 'Big Mac inspired bowl with seasoned beef, potato wedges, lettuce, pickles, cheese and special sauce, food photography',
            ingredients: [
                { amount: '200g', item: 'Potatis' },
                { amount: '130g', item: 'Nötfärs' },
                { amount: '20g', item: 'Ost, mager riven' },
                { amount: '30g', item: 'Crème fraiche lätt' },
                { amount: '50g', item: 'Isbergssallad' },
                { amount: '50g', item: 'Gurka' },
                { amount: '50g', item: 'Tomat' },
                { amount: '1 tsk', item: 'Senap' },
                { amount: '1 msk', item: 'Ketchup' }
            ],
            instructions: [
                'Gör potatisklyftor, krydda och baka i ugn/airfryer.',
                'Stek köttfärs med kryddor, toppa med ost.',
                'Blanda sås av crème fraiche, senap, ketchup.',
                'Lägg potatis i skål, toppa med sallad, grönsaker, köttfärs och sås.'
            ],
            tips: 'Perfekt fredagsmys på nyttigt vis!'
        },
        {
            id: 'lunch-add-8',
            name: 'Tortillapizza Bianco med räkor',
            category: 'lunch',
            prepTime: 5,
            cookTime: 10,
            kcal: 560,
            protein: 39,
            carbs: 54,
            fat: 20,
            image: 'IMG/lunch_add_8.png',
            needsImage: false,
            imagePrompt: 'White sauce tortilla pizza with shrimp, dill, cream cheese and avocado slices, food photography',
            ingredients: [
                { amount: '95g', item: 'Tortillabröd, 2 st.' },
                { amount: '190g', item: 'Räkor, kokta' },
                { amount: '50g', item: 'Lätt crème fraiche' },
                { amount: '10g', item: 'Färskost Philadelphia' },
                { amount: '40g', item: 'Avokado' },
                { amount: '1 msk', item: 'Dill' },
                { amount: '1 msk', item: 'Citronsaft' }
            ],
            instructions: [
                'Sätt ugnen på 180°C.',
                'Blanda crème fraiche med färskost, dill och vitlök.',
                'Bred på tortillabröd och toppa med räkor.',
                'Baka i 10 min. Servera med avokado och citron.'
            ],
            tips: null
        },
        {
            id: 'lunch-add-9',
            name: 'Krämig saffranspasta med kyckling',
            category: 'lunch',
            prepTime: 10,
            cookTime: 20,
            kcal: 560,
            protein: 41,
            carbs: 55,
            fat: 19,
            image: 'IMG/lunch_add_9.png',
            needsImage: false,
            imagePrompt: 'Creamy saffron pasta with chicken, green beans and cherry tomatoes, Swedish food photography',
            ingredients: [
                { amount: '40g', item: 'Salladsmix' },
                { amount: '40g', item: 'Pasta, okokt' },
                { amount: '10g', item: 'Olivolja' },
                { amount: '140ml', item: 'Matlagningsgrädde 4%' },
                { amount: '60g', item: 'Gul lök' },
                { amount: '150g', item: 'Kycklingbröstfilé' },
                { amount: '60g', item: 'Gröna bönor' },
                { amount: '60g', item: 'Körsbärstomater' },
                { amount: '1/2 tsk', item: 'Saffran' }
            ],
            instructions: [
                'Koka pasta enligt förpackningen.',
                'Koka gröna bönor i 3 min.',
                'Stek kyckling i olja, tillsätt lök.',
                'Tillsätt tomatpuré, saffran och grädde.',
                'Servera med sallad på toppen.'
            ],
            tips: null
        },
        {
            id: 'lunch-add-10',
            name: 'Torskrisotto',
            category: 'lunch',
            prepTime: 10,
            cookTime: 20,
            kcal: 560,
            protein: 41,
            carbs: 55,
            fat: 19,
            image: 'IMG/lunch_add_10.png',
            needsImage: false,
            imagePrompt: 'Creamy cod risotto with green peas, cherry tomatoes, parmesan and arugula, Italian food photography',
            ingredients: [
                { amount: '85g', item: 'Körsbärstomater' },
                { amount: '20g', item: 'Ruccola' },
                { amount: '60g', item: 'Parmesan' },
                { amount: '85g', item: 'Gröna ärtor, frysta' },
                { amount: '65g', item: 'Torskfilé' },
                { amount: '55g', item: 'Risottoris' },
                { amount: '1 tsk', item: 'Citronsaft' },
                { amount: '1', item: 'Buljongtärning' }
            ],
            instructions: [
                'Stek torsken i matlagningsspray.',
                'Stek vitlök och tomater.',
                'Tillsätt ris, buljong och ärtor, låt sjuda 15 min.',
                'Rör ner ost och citron.',
                'Toppa med ruccola och torsk.'
            ],
            tips: null
        }
    ];

    // ============================================
    // Additional Dinner Recipes
    // All need unique images (needsImage: true)
    // ============================================
    const additionalDinnerRecipes = [
        {
            id: 'dinner-add-1',
            name: 'Stor tacosallad med nachos',
            category: 'dinner',
            prepTime: 10,
            cookTime: 10,
            kcal: 554,
            protein: 40,
            carbs: 52,
            fat: 20,
            image: 'IMG/dinner_add_1.png',
            needsImage: false,
            imagePrompt: 'Large taco salad bowl with seasoned beef, nachos, lettuce, corn, salsa and sour cream, Mexican food photography',
            ingredients: [
                { amount: '40g', item: 'Röd paprika' },
                { amount: '20g', item: 'Lätt Crème Fraiche, Paprika & Chili' },
                { amount: '50g', item: 'Tortillachips' },
                { amount: '5g', item: 'Rödlök' },
                { amount: '50g', item: 'Rödkål' },
                { amount: '100g', item: 'Isbergssallad' },
                { amount: '25g', item: 'Gurka' },
                { amount: '140g', item: 'Nötfärs' },
                { amount: '70g', item: 'Tacosås' },
                { amount: '30g', item: 'Majs' }
            ],
            instructions: [
                'Hacka grönsaker.',
                'Stek köttfärsen med tacokrydda.',
                'Blanda allt i en stor skål.',
                'Servera med chips vid sidan.'
            ],
            tips: null
        },
        {
            id: 'dinner-add-2',
            name: 'Fullkornsspaghetti bolognese',
            category: 'dinner',
            prepTime: 15,
            cookTime: 50,
            kcal: 566,
            protein: 42,
            carbs: 57,
            fat: 18,
            image: 'IMG/dinner_add_2.png',
            needsImage: false,
            imagePrompt: 'Classic spaghetti bolognese with whole grain pasta and rich meat sauce, Italian comfort food photography',
            ingredients: [
                { amount: '20g', item: 'Gul lök' },
                { amount: '65g', item: 'Spaghetti, fullkorn' },
                { amount: '10g', item: 'Olivolja' },
                { amount: '135g', item: 'Nötfärs' },
                { amount: '185g', item: 'Krossade tomater' },
                { amount: '50g', item: 'Morötter' },
                { amount: '1-2 tsk', item: 'Oregano' }
            ],
            instructions: [
                'Hacka lök och riv morötter.',
                'Stek köttfärsen, tillsätt lök och vitlök.',
                'Tillsätt tomater, buljong och örter, låt sjuda 30-40 min.',
                'Koka pasta och servera.'
            ],
            tips: null
        },
        {
            id: 'dinner-add-3',
            name: 'Tacogratäng',
            category: 'dinner',
            prepTime: 10,
            cookTime: 20,
            kcal: 566,
            protein: 38,
            carbs: 56,
            fat: 20,
            image: 'IMG/dinner_add_3.png',
            needsImage: false,
            imagePrompt: 'Taco casserole with pasta, seasoned beef, melted cheese, corn and tomato sauce, baked dish photography',
            ingredients: [
                { amount: '50g', item: 'Gul lök' },
                { amount: '55g', item: 'Fullkornspasta' },
                { amount: '55g', item: 'Majs' },
                { amount: '90g', item: 'Nötfärs' },
                { amount: '125g', item: 'Krossade tomater' },
                { amount: '40g', item: 'Lätt crème fraiche' },
                { amount: '20g', item: 'Cheddarost' },
                { amount: '1/2 påse', item: 'Tacokrydda' }
            ],
            instructions: [
                'Sätt ugnen på 200°C.',
                'Koka pasta. Stek lök och köttfärs.',
                'Tillsätt tacokrydda, tomater, crème fraiche och majs.',
                'Blanda med pasta i ugnsform, toppa med ost.',
                'Baka 10 min.'
            ],
            tips: null
        },
        {
            id: 'dinner-add-4',
            name: 'Rotfruktssoppa med äpple',
            category: 'dinner',
            prepTime: 10,
            cookTime: 35,
            kcal: 560,
            protein: 41,
            carbs: 55,
            fat: 19,
            image: 'IMG/dinner_add_4.png',
            needsImage: false,
            imagePrompt: 'Creamy root vegetable soup with beetroot, carrots, parsnip, apple and crispy bacon topping, autumn food photography',
            ingredients: [
                { amount: '200g', item: 'Kalkonbacon' },
                { amount: '105g', item: 'Potatis' },
                { amount: '85g', item: 'Palsternacka' },
                { amount: '105g', item: 'Morötter' },
                { amount: '15g', item: 'Smör' },
                { amount: '90g', item: 'Rödbeta' },
                { amount: '65g', item: 'Äpple' },
                { amount: '1 tsk', item: 'Gurkmeja' },
                { amount: '1 tsk', item: 'Currypulver' }
            ],
            instructions: [
                'Tärna alla grönsaker och frukt.',
                'Fräs i smör med curry och gurkmeja.',
                'Täck med vatten och buljong, koka 20-30 min.',
                'Mixa till slät soppa.',
                'Stek bacon och toppa soppan.'
            ],
            tips: null
        },
        {
            id: 'dinner-add-5',
            name: 'Nudelsallad med kyckling och sweet chilidressing',
            category: 'dinner',
            prepTime: 10,
            cookTime: 15,
            kcal: 560,
            protein: 42,
            carbs: 54,
            fat: 19,
            image: 'IMG/dinner_add_5.png',
            needsImage: false,
            imagePrompt: 'Asian noodle salad with chicken, rice noodles, vegetables and sweet chili dressing, food photography',
            ingredients: [
                { amount: '15g', item: 'Söt chilisås' },
                { amount: '15g', item: 'Sesamolja' },
                { amount: '40g', item: 'Risnudlar' },
                { amount: '55g', item: 'Spetskål' },
                { amount: '20g', item: 'Salladslök' },
                { amount: '70g', item: 'Gurka' },
                { amount: '185g', item: 'Kycklingbröstfilé' },
                { amount: '40g', item: 'Morötter' },
                { amount: '1 msk', item: 'Sojasås' },
                { amount: '1 msk', item: 'Limejuice' }
            ],
            instructions: [
                'Koka risnudlar enligt förpackningen.',
                'Strimla alla grönsaker.',
                'Stek kycklingen med sesamolja.',
                'Tillsätt kål och morötter.',
                'Blanda dressing av lime, ingefära, chilisås och soja.',
                'Blanda allt och toppa med salladslök.'
            ],
            tips: null
        },
        {
            id: 'dinner-add-6',
            name: 'Värmande grön linssoppa med grönkål',
            category: 'dinner',
            prepTime: 10,
            cookTime: 50,
            kcal: 560,
            protein: 41,
            carbs: 54,
            fat: 19,
            image: 'IMG/dinner_add_6.png',
            needsImage: false,
            imagePrompt: 'Warming green lentil soup with kale, carrots, tomatoes and diced chicken, healthy comfort food photography',
            ingredients: [
                { amount: '15g', item: 'Olivolja' },
                { amount: '55g', item: 'Gröna linser, okokta' },
                { amount: '100g', item: 'Kycklingbröstfilé' },
                { amount: '105g', item: 'Grönkål' },
                { amount: '70g', item: 'Gul lök' },
                { amount: '140g', item: 'Morötter' },
                { amount: '135g', item: 'Krossade tomater' },
                { amount: '1-2 tsk', item: 'Currypulver' },
                { amount: '1-2 tsk', item: 'Spiskummin' }
            ],
            instructions: [
                'Hacka lök och morötter, fräs i olja.',
                'Tillsätt vitlök, kryddor och tomater.',
                'Tillsätt linser och buljong, koka 20-30 min.',
                'Mixa halva soppan.',
                'Stek kycklingen och tärna.',
                'Tillsätt kyckling och grönkål, sjud 5 min.'
            ],
            tips: null
        },
        {
            id: 'dinner-add-7',
            name: 'Vietnamesisk Shaking Beef med ris',
            category: 'dinner',
            prepTime: 40,
            cookTime: 10,
            kcal: 560,
            protein: 42,
            carbs: 54,
            fat: 19,
            image: 'IMG/dinner_add_7.png',
            needsImage: false,
            imagePrompt: 'Vietnamese shaking beef (Bo Luc Lac) with rice, seared beef cubes, sesame oil and fresh coriander, Asian food photography',
            ingredients: [
                { amount: '15g', item: 'Sesamolja' },
                { amount: '160g', item: 'Nötkött, ytterlår' },
                { amount: '70g', item: 'Basmatiris, okokt' },
                { amount: '1 msk', item: 'Ostronsås' },
                { amount: '1 msk', item: 'Sojasås' },
                { amount: '1 tsk', item: 'Ingefära, riven' },
                { amount: '1', item: 'Koriander' }
            ],
            instructions: [
                'Skär köttet i bitar, marinera med soja, ostronsås och ingefära 30 min.',
                'Koka riset.',
                'Fräs vitlök i sesamolja, stek köttet på hög värme 1 min.',
                'Servera med ris och toppa med koriander.'
            ],
            tips: null
        },
        {
            id: 'dinner-add-8',
            name: 'Asiatisk salladswrap med kalkon',
            category: 'dinner',
            prepTime: 10,
            cookTime: 10,
            kcal: 564,
            protein: 44,
            carbs: 52,
            fat: 19,
            image: 'IMG/dinner_add_8.png',
            needsImage: false,
            imagePrompt: 'Asian lettuce wraps with turkey, shredded carrots, cabbage, avocado and mandarin oranges, healthy food photography',
            ingredients: [
                { amount: '180g', item: 'Kalkonpålägg' },
                { amount: '95g', item: 'Savojkål' },
                { amount: '70g', item: 'Romansallad' },
                { amount: '65g', item: 'Mandariner' },
                { amount: '20g', item: 'Torkade tranbär' },
                { amount: '150g', item: 'Morötter' },
                { amount: '90g', item: 'Avokado' },
                { amount: '1-2 msk', item: 'Sojasås' },
                { amount: '1-2 msk', item: 'Limejuice' }
            ],
            instructions: [
                'Skölj och strimla kål, riv morötter.',
                'Skär avokado i bitar.',
                'Hacka kalkonskivor.',
                'Blanda allt med fisksås, lime och soja.',
                'Fyll salladsblad och forma till wraps.'
            ],
            tips: null
        },
        {
            id: 'dinner-add-9',
            name: 'Snabb gnocchi med köttfärssås',
            category: 'dinner',
            prepTime: 10,
            cookTime: 20,
            kcal: 560,
            protein: 41,
            carbs: 56,
            fat: 19,
            image: 'IMG/dinner_add_9.png',
            needsImage: false,
            imagePrompt: 'Quick gnocchi with beef bolognese sauce, pine nuts and fresh herbs, Italian comfort food photography',
            ingredients: [
                { amount: '105g', item: 'Passerade tomater' },
                { amount: '155g', item: 'Potatisgnocchi' },
                { amount: '15g', item: 'Pinjenötter' },
                { amount: '145g', item: 'Nötfärs' },
                { amount: '1-2', item: 'Vitlöksklyfta' }
            ],
            instructions: [
                'Stek vitlök och köttfärs.',
                'Tillsätt passerade tomater, låt sjuda.',
                'Koka gnocchi enligt förpackningen.',
                'Servera med köttfärssåsen och pinjenötter.'
            ],
            tips: 'Snabb vardagsmat!'
        },
        {
            id: 'dinner-add-10',
            name: 'Grekisk salladswrap med kyckling och feta',
            category: 'dinner',
            prepTime: 10,
            cookTime: 0,
            kcal: 560,
            protein: 41,
            carbs: 55,
            fat: 19,
            image: 'IMG/dinner_add_10.png',
            needsImage: false,
            imagePrompt: 'Greek salad wrap with grilled chicken, feta cheese, olives, tomatoes, cucumber and spinach in tortilla, Mediterranean food photography',
            ingredients: [
                { amount: '70g', item: 'Tortillabröd large' },
                { amount: '90g', item: 'Tomat' },
                { amount: '40g', item: 'Bladspenat' },
                { amount: '40g', item: 'Rödlök' },
                { amount: '70g', item: 'Röd paprika' },
                { amount: '30g', item: 'Gurka' },
                { amount: '110g', item: 'Kycklingbröst, grillad' },
                { amount: '20g', item: 'Kalamataoliver' },
                { amount: '30g', item: 'Fetaost' }
            ],
            instructions: [
                'Skär alla grönsaker.',
                'Skär kyckling och feta i bitar.',
                'Blanda allt utom tortillan.',
                'Lägg på tortillan, vik ihop till wrap.'
            ],
            tips: null
        }
    ];

    // ============================================
    // Public API
    // ============================================
    return {
        additionalBreakfastRecipes: additionalBreakfastRecipes,
        additionalLunchRecipes: additionalLunchRecipes,
        additionalDinnerRecipes: additionalDinnerRecipes,

        getAllAdditionalRecipes: function () {
            return [
                ...additionalBreakfastRecipes,
                ...additionalLunchRecipes,
                ...additionalDinnerRecipes
            ];
        },

        // Helper for future AI to find items needing images
        getRecipesNeedingImages: function () {
            return this.getAllAdditionalRecipes().filter(r => r.needsImage === true);
        }
    };
})();
