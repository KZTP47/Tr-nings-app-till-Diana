/**
 * Diana Fitness PWA - Complete Data Module
 * Contains all recipes and training exercises with images
 * Images from Unsplash (free, royalty-free)
 */

const DianaData = (function () {
    'use strict';

    // ============================================
    // Image Helper - Local Images from IMG folder
    // ============================================

    function getLocalImageUrl(recipeId) {
        return `IMG/${recipeId}.jpg`;
    }

    // ============================================
    // Image Helper - Unsplash for Training Exercises
    // ============================================

    function getImageUrl(keywords, width = 400, height = 300) {
        return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(keywords)}`;
    }

    // ============================================
    // Nutrition Info
    // ============================================

    const nutritionInfo = {
        dailyCalories: 1600,
        macroSplit: {
            protein: 30,
            carbs: 40,
            fat: 30
        },
        dailyMacros: {
            protein: 117,
            carbs: 156,
            fat: 55
        },
        mealCalories: {
            breakfast: 480,
            lunch: 560,
            dinner: 560
        }
    };

    // ============================================
    // Breakfast Recipes
    // ============================================

    const breakfastRecipes = [
        {
            id: 'breakfast-1',
            name: 'Yoghurtkvarg med havregryn och bar',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 0,
            kcal: 480,
            protein: 34,
            carbs: 46,
            fat: 17,
            image: getLocalImageUrl('breakfast-1'),
            ingredients: [
                { amount: '380g', item: 'Yoghurtkvarg, laktosfri, Skanemejerier' },
                { amount: '10g (2 st.)', item: 'Torkade aprikoser' },
                { amount: '10g (~3 tsk)', item: 'Russin' },
                { amount: '30g', item: 'Rostade Kokoschips, Urtekram' },
                { amount: '10g (~2 msk)', item: 'Havregryn, glutenfri' },
                { amount: '45g', item: 'Blabar' }
            ],
            instructions: [
                'Hall yoghurtkvargen i en skal.',
                'Skolj blabaren. Toppa kvargen med havregryn, kokosflingor, aprikoser, russin och blabar. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'breakfast-2',
            name: 'Kvarg med choklad och rostade havregryn',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 5,
            kcal: 480,
            protein: 35,
            carbs: 47,
            fat: 16,
            image: getLocalImageUrl('breakfast-2'),
            ingredients: [
                { amount: '270g', item: 'Kvarg, naturell, 0.2% fett, laktosfri' },
                { amount: '30g', item: 'Havregryn, glutenfri' },
                { amount: '30g', item: 'Choklad, 70%' },
                { amount: '15g (~2.5 tsk)', item: 'Agavesirap' }
            ],
            instructions: [
                'Hall upp kvargen i en skal.',
                'Tillsatt havregrynen och sirapen i en stekpanna och stek i nagra minuter pa medelhog varme tills havregrynen ar gyllene och frasiga.',
                'Hacka chokladen. Servera havregrynen tillsammans med kvargen och chokladen. Alternativt kan havregrynen och sirapen serveras direkt pa kvargen. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'breakfast-3',
            name: 'Aggrora med bacon och toast',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 10,
            kcal: 480,
            protein: 36,
            carbs: 47,
            fat: 16,
            image: getLocalImageUrl('breakfast-3'),
            ingredients: [
                { amount: '115g (3 skivor)', item: 'Ragbrod' },
                { amount: '70g (1 st.)', item: 'Tomat' },
                { amount: '85g (2 st.)', item: 'Agg, hela' },
                { amount: '140g (5 st.)', item: 'Aggvita, pastoriserad' },
                { amount: '25g (1 skiva)', item: 'Bacon, skivor' }
            ],
            instructions: [
                'Stek bacon i en stekpanna pa medelvarm.',
                'Vispa agg och aggvita i en skal. Nar baconet ar klart, stek aggroran i samma panna pa lag varme. Ror om forsiktigt tills aggen har stelnat.',
                'Skiva tomaten. Servera aggroran med bacon, tomat och brod. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'breakfast-4',
            name: 'Overnight oats med smak av appelkaka',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 0,
            kcal: 480,
            protein: 34,
            carbs: 48,
            fat: 16,
            image: getLocalImageUrl('breakfast-4'),
            ingredients: [
                { amount: '270g', item: 'Kvarg, naturell, 0.2% fett, laktosfri' },
                { amount: '45g', item: 'Havregryn, glutenfri' },
                { amount: '60ml', item: 'Havremjolk' },
                { amount: '90g', item: 'Apple, surt, med skal' },
                { amount: '1 krm', item: 'Kanel' },
                { amount: '1 krm', item: 'Kardemumma' },
                { amount: '15g', item: 'Valnotter' }
            ],
            instructions: [
                'Blanda kvarg, havregryn, havremjolk och kryddor i en burk eller skal.',
                'Riv eller skiva applet och blanda i.',
                'Lat sta i kylen over natten (minst 4 timmar).',
                'Toppa med valnotter innan servering. Smaklig maltid!'
            ],
            tips: 'Kan forvaras i kylen i upp till 3 dagar.'
        },
        {
            id: 'breakfast-5',
            name: 'Toast med aggrora, avokado och bacon',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 10,
            kcal: 480,
            protein: 35,
            carbs: 32,
            fat: 25,
            image: getLocalImageUrl('breakfast-5'),
            ingredients: [
                { amount: '75g (2 skivor)', item: 'Ragbrod' },
                { amount: '85g (2 st.)', item: 'Agg, hela' },
                { amount: '100g (3-4 st.)', item: 'Aggvita, pastoriserad' },
                { amount: '50g', item: 'Avokado' },
                { amount: '25g (1 skiva)', item: 'Bacon, skivor' }
            ],
            instructions: [
                'Stek bacon i en stekpanna pa medelvarm.',
                'Vispa agg och aggvita. Stek aggroran i samma panna pa lag varme.',
                'Rosta brodet. Mosa avokado och bred pa brodet.',
                'Toppa med aggrora och bacon. Smaklig maltid!'
            ],
            tips: null
        }
    ];

    // ============================================
    // Lunch Recipes
    // ============================================

    const lunchRecipes = [
        {
            id: 'lunch-1',
            name: 'Fajitabowl',
            category: 'lunch',
            prepTime: 10,
            cookTime: 20,
            kcal: 566,
            protein: 44,
            carbs: 52,
            fat: 19,
            image: getLocalImageUrl('lunch-1'),
            ingredients: [
                { amount: '130g', item: 'Kycklingfile, ra' },
                { amount: '130g', item: 'Ris, basmati, okokt' },
                { amount: '50g', item: 'Paprika, gul' },
                { amount: '30g', item: 'Lok, gul' },
                { amount: '50g', item: 'Majs, konserverad' },
                { amount: '30g', item: 'Svarta bonor, konserverade' },
                { amount: '30g', item: 'Tomatsalsa' },
                { amount: '20g', item: 'Creme fraiche, laktosfri' },
                { amount: '1 tsk', item: 'Fajitakrydda' }
            ],
            instructions: [
                'Koka riset enligt anvisningarna pa forpackningen.',
                'Skiva kycklingen och paprika och lok.',
                'Stek kycklingen med fajitakrydda i en stekpanna pa hog varme tills den ar genomstekt.',
                'Tillsatt paprika och lok och stek nagra minuter till.',
                'Servera i en skal med ris, majs, bonor, salsa och creme fraiche. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'lunch-2',
            name: 'Lax med pasta, broccoli och fetaost',
            category: 'lunch',
            prepTime: 5,
            cookTime: 15,
            kcal: 560,
            protein: 41,
            carbs: 50,
            fat: 20,
            image: getLocalImageUrl('lunch-2'),
            ingredients: [
                { amount: '120g', item: 'Laxfile, ra' },
                { amount: '80g', item: 'Pasta, okokt' },
                { amount: '100g', item: 'Broccoli' },
                { amount: '30g', item: 'Fetaost' },
                { amount: '1 msk', item: 'Olivolja' },
                { amount: '1 klyfta', item: 'Vitlok' }
            ],
            instructions: [
                'Koka pastan enligt forpackningen. Tillsatt broccoli de sista 3 minuterna.',
                'Stek laxen i olivolja pa medelhog varme, ca 4 min per sida.',
                'Hacka vitloken och blanda med pastan och broccolin.',
                'Servera med lax och smulad fetaost. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'lunch-3',
            name: 'Lasagne',
            category: 'lunch',
            prepTime: 20,
            cookTime: 40,
            kcal: 554,
            protein: 38,
            carbs: 48,
            fat: 22,
            image: getLocalImageUrl('lunch-3'),
            ingredients: [
                { amount: '100g', item: 'Nötfärs, 10% fett' },
                { amount: '60g', item: 'Lasagneplattor' },
                { amount: '100g', item: 'Krossade tomater' },
                { amount: '50ml', item: 'Mjölk' },
                { amount: '30g', item: 'Riven ost' },
                { amount: '1 msk', item: 'Tomatpuré' },
                { amount: '1 tsk', item: 'Italienska örter' }
            ],
            instructions: [
                'Sätt ugnen på 200°C.',
                'Stek färsen och blanda med krossade tomater, tomatpuré och örter.',
                'Varva lasagneplattor, köttfärssås och mjölk i en ugnsform.',
                'Toppa med ost och baka i 35-40 minuter. Smaklig måltid!'
            ],
            tips: 'Låt vila 5 minuter innan servering.'
        },
        {
            id: 'lunch-4',
            name: 'Enkel Pastasallad med kyckling och gronsaker',
            category: 'lunch',
            prepTime: 10,
            cookTime: 10,
            kcal: 560,
            protein: 40,
            carbs: 52,
            fat: 20,
            image: getLocalImageUrl('lunch-4'),
            ingredients: [
                { amount: '120g', item: 'Kycklingfile, ra' },
                { amount: '80g', item: 'Pasta, okokt' },
                { amount: '50g', item: 'Gurka' },
                { amount: '50g', item: 'Tomat' },
                { amount: '30g', item: 'Paprika, rod' },
                { amount: '30g', item: 'Fetaost' },
                { amount: '1 msk', item: 'Olivolja' },
                { amount: '1 msk', item: 'Citronjuice' }
            ],
            instructions: [
                'Koka pastan enligt forpackningen. Lat svalna.',
                'Stek kycklingen och skiva.',
                'Hacka gronsakerna och blanda med pastan.',
                'Tillsatt kyckling, fetaost, olivolja och citron. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'lunch-5',
            name: 'Pad thai med tofu och rakor',
            category: 'lunch',
            prepTime: 10,
            cookTime: 20,
            kcal: 566,
            protein: 44,
            carbs: 52,
            fat: 19,
            image: getLocalImageUrl('lunch-5'),
            ingredients: [
                { amount: '100g', item: 'Tofu, fast' },
                { amount: '80g', item: 'Rakor, skalade' },
                { amount: '60g', item: 'Risnudlar, okokta' },
                { amount: '50g', item: 'Bongrodd' },
                { amount: '30g', item: 'Morotter, rivna' },
                { amount: '2 msk', item: 'Pad thai-sas' },
                { amount: '1 msk', item: 'Jordnotssmor' },
                { amount: '1 st.', item: 'Agg' },
                { amount: '10g', item: 'Jordnotter, rostade' }
            ],
            instructions: [
                'Blotlagg nudlarna enligt forpackningen.',
                'Stek tofu i en wok tills gyllene. Lagg at sidan.',
                'Stek rakor och agg. Tillsatt nudlar, grodd och morotter.',
                'Blanda i pad thai-sas och jordnotssmor.',
                'Toppa med tofu och jordnotter. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'lunch-6',
            name: 'Stekt ris med kyckling, soja och lime',
            category: 'lunch',
            prepTime: 5,
            cookTime: 20,
            kcal: 560,
            protein: 40,
            carbs: 55,
            fat: 18,
            image: getLocalImageUrl('lunch-6'),
            ingredients: [
                { amount: '130g', item: 'Kycklingfile, ra' },
                { amount: '150g', item: 'Ris, kokt (garna kall)' },
                { amount: '50g', item: 'Artor, frysta' },
                { amount: '50g', item: 'Morotter, tarnade' },
                { amount: '30g', item: 'Lok, hackad' },
                { amount: '1 st.', item: 'Agg' },
                { amount: '2 msk', item: 'Sojasas' },
                { amount: '1 st.', item: 'Lime' },
                { amount: '1 msk', item: 'Sesamolja' }
            ],
            instructions: [
                'Stek kycklingen i sesamolja. Lagg at sidan.',
                'Stek lok och morotter. Tillsatt riset och stek pa hog varme.',
                'Gor plats i mitten och stek agget. Blanda ihop allt.',
                'Tillsatt artor, soja och kyckling.',
                'Servera med limeklyftor. Smaklig maltid!'
            ],
            tips: 'Kallt ris fran dagen innan ger bast resultat.'
        }
    ];

    // ============================================
    // Dinner Recipes
    // ============================================

    const dinnerRecipes = [
        {
            id: 'dinner-1',
            name: 'Allt pa en plat - Ugnsbakade gronsaker och lax',
            category: 'dinner',
            prepTime: 10,
            cookTime: 25,
            kcal: 560,
            protein: 43,
            carbs: 35,
            fat: 27,
            image: getLocalImageUrl('dinner-1'),
            ingredients: [
                { amount: '150g', item: 'Laxfile, ra' },
                { amount: '150g', item: 'Potatis, fast' },
                { amount: '100g', item: 'Broccoli' },
                { amount: '80g', item: 'Sparris' },
                { amount: '1 msk', item: 'Olivolja' },
                { amount: '1 klyfta', item: 'Vitlok' },
                { amount: '1/2 st.', item: 'Citron' }
            ],
            instructions: [
                'Satt ugnen pa 220°C.',
                'Skiva potatisen och lagg pa en plat med broccoli och sparris.',
                'Ringla over olja och krydda med salt och peppar.',
                'Lagg laxen pa platen. Baka i 20-25 min.',
                'Servera med citron. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-2',
            name: 'Parmesan-fylld kyckling med rotfrukter',
            category: 'dinner',
            prepTime: 15,
            cookTime: 30,
            kcal: 560,
            protein: 41,
            carbs: 40,
            fat: 24,
            image: getLocalImageUrl('dinner-2'),
            ingredients: [
                { amount: '150g', item: 'Kycklingfile, ra' },
                { amount: '30g', item: 'Parmesanost, riven' },
                { amount: '20g', item: 'Soltorkade tomater' },
                { amount: '150g', item: 'Rotfrukter (morot, palsternacka, rotseleri)' },
                { amount: '1 msk', item: 'Olivolja' },
                { amount: '1 tsk', item: 'Rosmarin' }
            ],
            instructions: [
                'Satt ugnen pa 200°C.',
                'Skar en ficka i kycklingen och fyll med parmesan och tomater.',
                'Skiva rotfrukterna och lagg pa en plat med olja och rosmarin.',
                'Lagg kycklingen ovanpa och baka i 25-30 min.',
                'Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-3',
            name: 'Kyckling- och broccoliwok med potatis och majonnas',
            category: 'dinner',
            prepTime: 10,
            cookTime: 20,
            kcal: 560,
            protein: 40,
            carbs: 42,
            fat: 24,
            image: getLocalImageUrl('dinner-3'),
            ingredients: [
                { amount: '130g', item: 'Kycklingfile, ra' },
                { amount: '150g', item: 'Potatis, kokt' },
                { amount: '120g', item: 'Broccoli' },
                { amount: '50g', item: 'Paprika' },
                { amount: '30g', item: 'Majonnas' },
                { amount: '2 msk', item: 'Sojasas' },
                { amount: '1 msk', item: 'Sesamolja' }
            ],
            instructions: [
                'Koka potatisen. Skiva kycklingen.',
                'Stek kycklingen i sesamolja pa hog varme.',
                'Tillsatt broccoli och paprika. Woka nagra minuter.',
                'Tillsatt soja och servera med potatis och majonnas. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-4',
            name: 'Ugnsbakad kramig lax med potatis och morotter',
            category: 'dinner',
            prepTime: 10,
            cookTime: 30,
            kcal: 560,
            protein: 41,
            carbs: 38,
            fat: 26,
            image: getLocalImageUrl('dinner-4'),
            ingredients: [
                { amount: '150g', item: 'Laxfile, ra' },
                { amount: '150g', item: 'Potatis, fast' },
                { amount: '100g', item: 'Morotter' },
                { amount: '50ml', item: 'Matlagningsgradde' },
                { amount: '30g', item: 'Cream cheese' },
                { amount: '1 msk', item: 'Dill, hackad' }
            ],
            instructions: [
                'Satt ugnen pa 200°C.',
                'Skiva potatis och morotter. Lagg i en ugnsform.',
                'Blanda gradde, cream cheese och dill. Hall over gronsakerna.',
                'Lagg laxen ovanpa och baka i 25-30 min. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-5',
            name: 'Smashed Taco Burger',
            category: 'dinner',
            prepTime: 10,
            cookTime: 15,
            kcal: 566,
            protein: 43,
            carbs: 40,
            fat: 25,
            image: getLocalImageUrl('dinner-5'),
            ingredients: [
                { amount: '150g', item: 'Notfars, 10% fett' },
                { amount: '1 st.', item: 'Hamburgerbrod' },
                { amount: '30g', item: 'Cheddarost' },
                { amount: '30g', item: 'Tomatsalsa' },
                { amount: '20g', item: 'Jalapenos' },
                { amount: '20g', item: 'Sallad' },
                { amount: '1 tsk', item: 'Tacokrydda' }
            ],
            instructions: [
                'Blanda farsen med tacokrydda och forma till en boll.',
                'Pressa platt i en het stekpanna (smash).',
                'Stek 2-3 min per sida. Lagg pa ost sista minuten.',
                'Bygg burgaren med sallad, salsa och jalapenos. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-6',
            name: 'Smor- och honungsglaserad lax med gronsaker',
            category: 'dinner',
            prepTime: 5,
            cookTime: 20,
            kcal: 560,
            protein: 41,
            carbs: 32,
            fat: 28,
            image: getLocalImageUrl('dinner-6'),
            ingredients: [
                { amount: '150g', item: 'Laxfile, ra' },
                { amount: '150g', item: 'Gronsaker (haricots verts, sparris)' },
                { amount: '15g', item: 'Smor' },
                { amount: '1 msk', item: 'Honung' },
                { amount: '1 msk', item: 'Sojasas' },
                { amount: '1 klyfta', item: 'Vitlok, pressad' }
            ],
            instructions: [
                'Blanda smor, honung, soja och vitlok.',
                'Stek laxen i en panna. Pensla med glasyr.',
                'Anga eller koka gronsakerna.',
                'Servera laxen med gronsaker och extra glasyr. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-7',
            name: 'Laxpasta med lime',
            category: 'dinner',
            prepTime: 5,
            cookTime: 15,
            kcal: 560,
            protein: 42,
            carbs: 48,
            fat: 21,
            image: getLocalImageUrl('dinner-7'),
            ingredients: [
                { amount: '120g', item: 'Laxfile, ra' },
                { amount: '80g', item: 'Pasta, okokt' },
                { amount: '50ml', item: 'Matlagningsgradde' },
                { amount: '1 st.', item: 'Lime' },
                { amount: '1 msk', item: 'Kapris' },
                { amount: '1 msk', item: 'Dill' }
            ],
            instructions: [
                'Koka pastan.',
                'Stek laxen och dela i bitar.',
                'Blanda gradde, limejuice, zest, kapris och dill.',
                'Blanda pasta med sas och toppa med lax. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-8',
            name: 'Kyckling med pasta och ugnsbakade tomater och fetaost',
            category: 'dinner',
            prepTime: 10,
            cookTime: 30,
            kcal: 560,
            protein: 41,
            carbs: 50,
            fat: 20,
            image: getLocalImageUrl('dinner-8'),
            ingredients: [
                { amount: '130g', item: 'Kycklingfile, ra' },
                { amount: '80g', item: 'Pasta, okokt' },
                { amount: '200g', item: 'Korsbärstomater' },
                { amount: '60g', item: 'Fetaost' },
                { amount: '1 msk', item: 'Olivolja' },
                { amount: '2 klyftor', item: 'Vitlok' },
                { amount: '1 tsk', item: 'Oregano' }
            ],
            instructions: [
                'Satt ugnen pa 200°C.',
                'Lagg tomater och feta i en form. Ringla over olja och vitlok.',
                'Baka i 20 min. Koka pastan och stek kycklingen.',
                'Mosa tomat-feta-mixen och blanda med pasta och kyckling. Smaklig maltid!'
            ],
            tips: 'En viral TikTok-favorit!'
        },
        {
            id: 'dinner-9',
            name: 'Enkel och smakrik pastagratang med kyckling',
            category: 'dinner',
            prepTime: 15,
            cookTime: 25,
            kcal: 560,
            protein: 42,
            carbs: 48,
            fat: 22,
            image: getLocalImageUrl('dinner-9'),
            ingredients: [
                { amount: '130g', item: 'Kycklingfile, ra' },
                { amount: '80g', item: 'Pasta, okokt' },
                { amount: '100ml', item: 'Matlagningsgradde' },
                { amount: '50g', item: 'Champinjoner' },
                { amount: '30g', item: 'Spenat' },
                { amount: '30g', item: 'Riven ost' },
                { amount: '1 tsk', item: 'Dragon' }
            ],
            instructions: [
                'Satt ugnen pa 200°C.',
                'Koka pastan och stek kycklingen.',
                'Stek champinjoner. Tillsatt gradde, spenat och dragon.',
                'Blanda allt i en form, toppa med ost och gratinera 15 min. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-10',
            name: 'Flaskwok med risnudlar och sataysas',
            category: 'dinner',
            prepTime: 5,
            cookTime: 15,
            kcal: 560,
            protein: 41,
            carbs: 55,
            fat: 19,
            image: getLocalImageUrl('dinner-10'),
            ingredients: [
                { amount: '155g', item: 'Flaskfile, ra' },
                { amount: '45g', item: 'Risnudlar, okokta' },
                { amount: '105g', item: 'Wok-mix, fryst' },
                { amount: '10g', item: 'Jordnotssmor' },
                { amount: '15g', item: 'Honung' },
                { amount: '2 msk', item: 'Sojasas' },
                { amount: '1 msk', item: 'Limejuice' },
                { amount: '1 tsk', item: 'Sesamolja' }
            ],
            instructions: [
                'Blotlagg nudlarna.',
                'Stek fläskfile i sesamolja.',
                'Tillsatt wok-mix och stek.',
                'Blanda jordnotssmor, honung, soja och lime till en sas.',
                'Blanda allt och servera med limeklyftor. Smaklig maltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-11',
            name: 'FREDAGSKAK! Kycklingkebab i brod',
            category: 'dinner',
            prepTime: 0,
            cookTime: 20,
            kcal: 560,
            protein: 39,
            carbs: 55,
            fat: 20,
            image: getLocalImageUrl('dinner-11'),
            ingredients: [
                { amount: '210g', item: 'Kycklingkebab, fryst' },
                { amount: '1 st.', item: 'Tortillabrod, medium' },
                { amount: '30g', item: 'Tomatsalsa' },
                { amount: '30g', item: 'Philadelphia light' },
                { amount: '20g', item: 'Paprika' },
                { amount: '20g', item: 'Tomat' },
                { amount: '20g', item: 'Gurka' },
                { amount: '20g', item: 'Isbergssallad' },
                { amount: '20g', item: 'Majs' }
            ],
            instructions: [
                'Stek kycklingkebaben i en het panna.',
                'Hacka och skiva sallad och gronsaker.',
                'Bred Philadelphia pa tortillabrodet.',
                'Lagg pa sallad, kebab och toppa med salsa. Njut!'
            ],
            tips: 'Perfekt fredagsmys!'
        }
    ];

    // ============================================
    // Training Plans
    // ============================================

    const trainingPlans = [
        {
            id: 'plan-1',
            name: 'Traningsplan 1',
            description: 'Nybörjarvanlig plan - Gym och hemma',
            type: 'beginner',
            equipment: ['gym', 'home'],
            sessions: 4
        },
        {
            id: 'plan-2',
            name: 'Traningsplan 2',
            description: 'Hantlar och kettlebells - Hemma fokus',
            type: 'intermediate',
            equipment: ['home', 'dumbbells'],
            sessions: 4
        },
        {
            id: 'plan-3',
            name: 'Traningsplan 3',
            description: 'Avancerad med dropsets - Gym fokus',
            type: 'advanced',
            equipment: ['gym'],
            sessions: 4
        }
    ];

    // ============================================
    // Training Plan 1 Exercises
    // ============================================

    const plan1Exercises = {
        'pass-1-gym': {
            name: 'Underkropp Gym',
            type: 'legs',
            location: 'gym',
            duration: 45,
            exercises: [
                { name: 'Leg Press', sets: 3, reps: '15-18', image: getImageUrl('leg,press,gym,machine'), tip: 'Placera fotterna hoftbrett pa plattan. Boj knana och se till att kna och storta ar i linje, sa knana inte faller inat. I toppen ska benen vara latt bojda. Sank vikten kontrollerat tillbaka.' },
                { name: 'Barbell Hip Thrust', sets: 3, reps: '15-18', image: getImageUrl('hip,thrust,barbell,glutes'), tip: 'Hoftbred position med dina fotter, pressa knana utat igenom hela ovningen. Sank rumpan till golvet som ar startposition, och oppna upp magen. Dar efter skopa upp med rumpan och gor magen sa liten som mojligt.' },
                { name: 'Leg Extension', sets: 3, reps: '8-10', image: getImageUrl('leg,extension,machine,quads'), tip: 'Sitt ned med landryggen stadigt mot ryggstödet. Strack ut benen helt och sank dem sedan kontrollerat tillbaka.' },
                { name: 'Dumbbell Step Up', sets: 3, reps: '8-10', image: getImageUrl('step,up,dumbbell,legs'), tip: 'Hoftbrett isar med fotterna, ta ett kliv upp pa bradan och ga upp till rakt staende, spann magen hela tiden.' },
                { name: 'Machine Lying Leg Curl', sets: 3, reps: '8-10', image: getImageUrl('leg,curl,machine,hamstring'), tip: 'Ligg med ansiktet nerat i maskinen och placera vadarna bakom dynan. Boj knana och dra dynan upp mot rumpan genom att aktivera baksida lar.' },
                { name: 'Cable Glute Kickback', sets: 3, reps: '8-10', image: getImageUrl('cable,kickback,glutes,gym'), tip: 'Sta hoftbrett isar, tank att rorelsen sker i hoftled. Kicka bak kabeln med hjalp av att pressa halen bakat!' }
            ]
        },
        'pass-2-home': {
            name: 'Overkropp Hemma',
            type: 'upper',
            location: 'home',
            duration: 40,
            exercises: [
                { name: 'Bench Press, Dumbbell', sets: 5, reps: '5', image: getImageUrl('dumbbell,bench,press,chest'), tip: 'Sank axlarna och dra ihop skulderbladen sa de ligger stadigt mot banken eller golvet. Ta ett djupt andetag och sank hantlarna kontrollerat.' },
                { name: 'Dumbbell Fly', sets: 3, reps: '10', image: getImageUrl('dumbbell,fly,chest,exercise'), tip: 'Ligg pa en bank med en hantel i varje hand, fotterna stabilt pa golvet. Starta med hantlarna rakt over dig med latt bojda armar.' },
                { name: 'Seated Dumbbell Press', sets: 3, reps: '6-8', image: getImageUrl('shoulder,press,dumbbell,seated'), tip: 'Sanka axlar, stolt brost! Raka handleder! Hantlarna borjar i hakans hoj, pressa rakt uppat.' },
                { name: 'Dumbbell Lateral Raise', sets: 3, reps: '10', image: getImageUrl('lateral,raise,dumbbell,shoulders'), tip: 'Hantlarna gar rakt ut at sidan, upp till axelhojd med raka armar. Spann balen for att undvika att svinga med resten av kroppen.' },
                { name: 'Dumbbell Triceps Kickback', sets: 3, reps: '15-18', image: getImageUrl('triceps,kickback,dumbbell'), tip: 'Stall dig bredvid en bank, placera ena handen pa banken och lut framatkroppen parallellt med golvet.' },
                { name: 'Dumbbell Bicep Curl', sets: 3, reps: '15-18', image: getImageUrl('bicep,curl,dumbbell,arms'), tip: 'Sanka axlar, stolt brost! Las fast armbagarna vid sidan av kroppen och lat underarmen vara den enda delen som ror sig!' }
            ]
        },
        'pass-3-home': {
            name: 'Underkropp Hemma',
            type: 'legs',
            location: 'home',
            duration: 40,
            exercises: [
                { name: 'Butterfly Glute Bridge', sets: 3, reps: '15-18', image: getImageUrl('glute,bridge,butterfly,home'), tip: 'Placera fotsulorna mot varandra och pressa knana utat sidan. Squeeza rumpan och pressa upp hoften sa hogt du kan.' },
                { name: 'Single Leg Dumbbell Hip Thrust', sets: 3, reps: '15-18', image: getImageUrl('single,leg,hip,thrust'), tip: 'Hoftbredd position med dina fotter, lyft ena benet rakt ut i samband med att rumpan pressas upp.' },
                { name: 'Dumbbell Step Up', sets: 3, reps: '15-18', image: getImageUrl('step,up,dumbbell,exercise'), tip: 'Hoftbrett isar med fotterna, ta ett kliv upp pa bradan och ga upp till rakt staende.' },
                {
                    name: 'Superset',
                    type: 'superset',
                    rounds: 3,
                    exercises: [
                        { name: 'Banded Bodyweight Squat', reps: '15-18', image: getImageUrl('banded,squat,resistance') },
                        { name: 'Glute Bridge, Banded', reps: '15-18', image: getImageUrl('glute,bridge,band') },
                        { name: 'Banded Fire Hydrant', reps: '15-18', image: getImageUrl('fire,hydrant,band,glutes') }
                    ]
                }
            ]
        },
        'pass-4-gym': {
            name: 'Overkropp Gym',
            type: 'upper',
            location: 'gym',
            duration: 45,
            exercises: [
                { name: 'Wide Grip Pull Down', sets: 3, reps: '15-18', image: getImageUrl('lat,pulldown,wide,grip'), tip: 'Anvand ett brett grepp med handflatorna bort fran dig. Borja med armarna helt utstrakta, sank axlarna for att aktivera skulderbladen.' },
                { name: 'Band Pull Apart', sets: 3, reps: '15-18', image: getImageUrl('band,pull,apart,back'), tip: 'Sta stadigt, hall ett axelbrett avstand pa bandet och pressa bandet rakt utat at varje sida.' },
                { name: 'Incline Dumbbell Row', sets: 3, reps: '8-10', image: getImageUrl('incline,dumbbell,row,back'), tip: 'Dra upp hantlarna tills armarna ar i 90 graders vinkel.' },
                { name: 'Standing Barbell Bicep Curl', sets: 3, reps: '15-18', image: getImageUrl('barbell,bicep,curl'), tip: 'Las fast armbagarna vid sidan av kroppen och lat underarmen vara den enda delen som ror sig!' },
                { name: 'Renegade Row', sets: 3, reps: '8-10', image: getImageUrl('renegade,row,plank'), tip: 'Sta och hall balansen pa ett par hantlar eller KB, arbeta med ena sidan i taget genom att dra upp ena armen pa sidan av kroppen.' },
                { name: 'Sidoliggande magindrag', sets: 3, reps: '30 sek', image: getImageUrl('side,plank,core'), tip: 'Ligg pa sidan, knip och dra in nedre delen av magen likt ett blixtlas. Hall i 30 sek.' },
                { name: 'Floor Leg Raise', sets: 3, reps: '15-18', image: getImageUrl('leg,raise,floor,abs'), tip: 'Ligg pa rygg med handerna under landryggen. Sank ner fran 90 graders vinkel i hoften med raka ben hela vagen ner till golvet utan att slappa magen.' }
            ]
        }
    };

    // ============================================
    // Training Plan 2 Exercises
    // ============================================

    const plan2Exercises = {
        'pass-1-gym': {
            name: 'Underkropp Gym',
            type: 'legs',
            location: 'gym',
            duration: 50,
            exercises: [
                { name: 'Squat', sets: 5, reps: '5', image: getImageUrl('barbell,squat,gym,legs'), tip: 'Sta hoftbrett isar, sitt langt ner och bak. Spann din bal innan du gor lyftet och hall anspanningen genom hela rorelsen.' },
                { name: 'Barbell Hip Thrust', sets: 3, reps: '6-8', image: getImageUrl('hip,thrust,barbell,glutes'), tip: 'Hoftbred position med dina fotter, pressa knana utat igenom hela ovningen.' },
                {
                    name: 'Superset',
                    type: 'superset',
                    rounds: 3,
                    exercises: [
                        { name: 'Leg Press, Single Leg', reps: '10', image: getImageUrl('single,leg,press') },
                        { name: 'Bodyweight Lateral Lunge', reps: '12', image: getImageUrl('lateral,lunge,bodyweight') }
                    ]
                },
                { name: 'Seated Leg Curl', sets: 3, reps: '12', image: getImageUrl('seated,leg,curl,machine'), tip: 'Sitt ned med landryggen i kontakt med ryggstödet hela tiden. Spann magen och pressa ner vikten.' },
                { name: 'Machine Hip Abduction', sets: 3, reps: '12', image: getImageUrl('hip,abduction,machine'), tip: 'Pressa ut knana och forsok tanka pa att squeeza med rumpan i topplaget!' }
            ]
        },
        'pass-2-home': {
            name: 'Overkropp Hemma',
            type: 'upper',
            location: 'home',
            duration: 40,
            exercises: [
                { name: 'Bench Press, Dumbbell', sets: 5, reps: '5', image: getImageUrl('dumbbell,bench,press'), tip: 'Sank axlarna och dra ihop skulderbladen sa de ligger stadigt mot banken eller golvet.' },
                { name: 'Dumbbell Fly', sets: 3, reps: '10', image: getImageUrl('dumbbell,fly,chest'), tip: 'Ligg pa en bank med en hantel i varje hand, fotterna stabilt pa golvet.' },
                { name: 'Seated Dumbbell Press', sets: 3, reps: '6-8', image: getImageUrl('seated,dumbbell,press,shoulders'), tip: 'Sanka axlar, stolt brost! Raka handleder! Hantlarna borjar i hakans hoj, pressa rakt uppat.' },
                { name: 'Dumbbell Lateral Raise', sets: 3, reps: '10', image: getImageUrl('lateral,raise,shoulders'), tip: 'Hantlarna gar rakt ut at sidan, upp till axelhojd med raka armar.' },
                { name: 'Dumbbell Triceps Kickback', sets: 3, reps: '15-18', image: getImageUrl('triceps,kickback,dumbbell'), tip: 'Stall dig bredvid en bank, placera ena handen pa banken och lut framatkroppen.' },
                { name: 'Dumbbell Bicep Curl', sets: 3, reps: '15-18', image: getImageUrl('bicep,curl,dumbbell'), tip: 'Las fast armbagarna vid sidan av kroppen.' }
            ]
        },
        'pass-3-home': {
            name: 'Underkropp Hemma',
            type: 'legs',
            location: 'home',
            duration: 45,
            exercises: [
                { name: 'Barbell Hip Thrust', sets: 3, reps: '10', image: getImageUrl('hip,thrust,home,glutes'), tip: 'Hoftbred fotposition och skulderbladen pa en bank och pressa upp hoften.' },
                { name: 'Dumbbell Goblet Squat', sets: 3, reps: '6-8', image: getImageUrl('goblet,squat,dumbbell'), tip: 'Sitt ner och bak och hall i vikten vid ditt brost. Spann magen.' },
                { name: 'Dumbbell Reverse Lunge', sets: 3, reps: '6-8', image: getImageUrl('reverse,lunge,dumbbell'), tip: 'Hoftbred fotställning. Ta ett stort kliv bak och sank ner tills framre knaet ar i 90 graders vinkel.' },
                {
                    name: 'Superset',
                    type: 'superset',
                    rounds: 3,
                    exercises: [
                        { name: 'Banded Bodyweight Squat', reps: '12', image: getImageUrl('banded,squat') },
                        { name: 'Glute Bridge, Banded', reps: '12', image: getImageUrl('glute,bridge,resistance,band') },
                        { name: 'Banded Fire Hydrant', reps: '12', image: getImageUrl('fire,hydrant,exercise') }
                    ]
                },
                { name: 'Dumbbell Straight Leg Deadlift', sets: 3, reps: '15-18', image: getImageUrl('stiff,leg,deadlift,dumbbell'), tip: 'Hoftbrett eller lite bredare fotställning. Bojningen sker i hoften och rumpan gar rakt bakat.' }
            ]
        },
        'pass-4-gym': {
            name: 'Overkropp Gym',
            type: 'upper',
            location: 'gym',
            duration: 50,
            exercises: [
                { name: 'T-Bar Row', sets: 3, reps: '6-8', image: getImageUrl('t,bar,row,back'), tip: 'Boj i hoften men behall en stolt hallning. Dra stangen upp mot naveln, armbagarna gar langs med sidan av kroppen.' },
                { name: 'V-Bar Pull Down', sets: 3, reps: '6-8', image: getImageUrl('v,bar,pulldown,lats'), tip: 'V-grepp pa handtaget, sank ner axlarna forst darefter dra ner till mellan hakan och brosthojd.' },
                { name: 'Seated Wide Grip Cable Row', sets: 3, reps: '12', image: getImageUrl('cable,row,wide,grip'), tip: 'Sitt upprätt vid kabelroddmaskinen med fotterna mot fotstöden och ta tag i ett brett handtag.' },
                { name: 'Cable Rope Bent Over Row', sets: 3, reps: '12', image: getImageUrl('cable,rope,row'), tip: 'Sanka axlar, stolt brost! Las fast armbagarna vid sidan av kroppen.' },
                { name: 'Ez Bar Bicep Curl', sets: 3, reps: '10', image: getImageUrl('ez,bar,curl,biceps'), tip: 'Lat underarmen vara den enda delen som ror sig!' },
                { name: 'Mountain Climber', sets: 3, reps: '20 sek', image: getImageUrl('mountain,climber,cardio'), tip: 'Borja i hog plankposition, dra hoger kna mot brost - aterga till plankposition och dra vanster kna mot brost. Upprepa i tempo.' },
                { name: 'Exercise Ball Crunch', sets: 3, reps: '10', image: getImageUrl('exercise,ball,crunch,abs'), tip: 'Fotterna stadigt i golvet, spann rumpan sa du haller en rak hoft hela tiden. Darefter boj bak overkroppen over bollen och spann sen magens muskler.' }
            ]
        }
    };

    // ============================================
    // Training Plan 3 Exercises (with Dropsets)
    // ============================================

    const plan3Exercises = {
        'pass-1-home': {
            name: 'Ben Hemma',
            type: 'legs',
            location: 'home',
            duration: 50,
            exercises: [
                { name: 'Dumbbell Front Squat', sets: 4, reps: '4-6', image: getImageUrl('front,squat,dumbbell'), tip: 'Hall en hantel i varje hand vid axlarna, med armbagarna pekande framat och brostet upprätt.' },
                {
                    name: 'Barbell Hip Thrust (Dropset)',
                    type: 'dropset',
                    rounds: 3,
                    image: getImageUrl('hip,thrust,barbell,dropset'),
                    drops: [
                        { reps: '4-6', note: 'Tung vikt' },
                        { reps: '12', note: 'Lattare vikt' },
                        { reps: '18', note: 'Annu lattare' }
                    ],
                    tip: 'Hoftbredd position med dina fotter, pressa knana utat igenom hela ovningen.'
                },
                {
                    name: 'Dumbbell Sumo Squat (Dropset)',
                    type: 'dropset',
                    rounds: 3,
                    image: getImageUrl('sumo,squat,dumbbell'),
                    drops: [
                        { reps: '4-6', note: 'Tung vikt' },
                        { reps: '16', note: 'Lattare vikt' }
                    ],
                    tip: 'Sta med fotterna bredare an axelbrett och tarna latt pekande utat.'
                },
                {
                    name: 'Superset',
                    type: 'superset',
                    rounds: 3,
                    exercises: [
                        { name: 'Single Leg Dumbbell Hip Thrust', reps: '4-6', image: getImageUrl('single,leg,hip,thrust') },
                        { name: 'Glute Bridge, Banded', reps: '4-6', image: getImageUrl('glute,bridge,band') },
                        { name: 'Banded Hip Abduction', reps: '4-6', image: getImageUrl('hip,abduction,band') }
                    ]
                }
            ]
        },
        'pass-2-home': {
            name: 'Overkropp Hemma',
            type: 'upper',
            location: 'home',
            duration: 45,
            exercises: [
                { name: 'Seated Dumbbell Press', sets: 4, reps: '4-6', image: getImageUrl('seated,dumbbell,shoulder,press'), tip: 'Sanka axlar, stolt brost! Raka handleder! Hantlarna borjar i hakans hoj, pressa rakt uppat.' },
                { name: 'Dumbbell Lateral Raise', sets: 4, reps: '4-6', image: getImageUrl('dumbbell,lateral,raise'), tip: 'Hantlarna gar rakt ut at sidan, upp till axelhojd med raka armar.' },
                {
                    name: 'Superset',
                    type: 'superset',
                    rounds: 3,
                    exercises: [
                        { name: 'Wall Push Up', reps: '4', image: getImageUrl('wall,push,up') },
                        { name: 'Close Grip Bench Push Up', reps: '4', image: getImageUrl('close,grip,push,up') },
                        { name: 'Push Up', reps: '4', image: getImageUrl('push,up,exercise') }
                    ]
                },
                { name: 'Standing Bent Over Dumbbell Rear Delt Fly', sets: 4, reps: '4-6', image: getImageUrl('rear,delt,fly,dumbbell'), tip: 'En hantel i varje hand. Sta framatlutad. Pressa armarna rakt ut med hjalp av dina axlar.' }
            ]
        },
        'pass-3-gym': {
            name: 'Overkropp Gym',
            type: 'upper',
            location: 'gym',
            duration: 55,
            exercises: [
                { name: 'Seated Cable Row', sets: 4, reps: '4-6', image: getImageUrl('seated,cable,row,back'), tip: 'Sanka axlar, stolt brost! Sikta mot naveln, armbagarna gar rakt bakat nara kroppen.' },
                { name: 'Bench Press', sets: 4, reps: '4-6', image: getImageUrl('bench,press,barbell,chest'), tip: 'Sanka axlar, stolt brost! Sikta pa mitten av brostet.' },
                {
                    name: 'Wide Grip Pull Down (Dropset)',
                    type: 'dropset',
                    rounds: 3,
                    image: getImageUrl('lat,pulldown,dropset'),
                    drops: [
                        { reps: '4-6', note: 'Tung vikt' },
                        { reps: '8', note: 'Lattare vikt' },
                        { reps: 'MAX', note: 'Annu lattare' }
                    ],
                    tip: 'Brett grepp med handflatorna fran dig. Fran utstrakt lage, borja med att satta skulderbladen och axlarna pa plats.'
                },
                {
                    name: 'One Arm Dumbbell Bent Over Row (Dropset)',
                    type: 'dropset',
                    rounds: 3,
                    image: getImageUrl('one,arm,dumbbell,row'),
                    drops: [
                        { reps: '4-6', note: 'Tung vikt' },
                        { reps: '8', note: 'Lattare vikt' },
                        { reps: 'MAX', note: 'Annu lattare' }
                    ],
                    tip: 'Luta dig fram och spann magen. Dra upp ena armen nara kroppen och hall emot pa vagen tillbaka.'
                },
                { name: 'Crunch', sets: 4, reps: '4-6', image: getImageUrl('crunch,abs,exercise'), tip: 'Pressa overkroppen uppat med hjalp av magen. forsok att slappna av i nacken.' }
            ]
        },
        'pass-4-gym': {
            name: 'Ben Gym',
            type: 'legs',
            location: 'gym',
            duration: 55,
            exercises: [
                {
                    name: 'Leg Press (Dropset)',
                    type: 'dropset',
                    rounds: 2,
                    image: getImageUrl('leg,press,machine,dropset'),
                    drops: [
                        { reps: '18', note: 'Latt vikt' },
                        { reps: '15', note: 'Oka vikt' },
                        { reps: '12', note: 'Oka mer' },
                        { reps: '8', note: 'Oka mer' },
                        { reps: '6', note: 'Oka mer' },
                        { reps: '4', note: 'Tyngst' }
                    ],
                    tip: 'Placera fotterna hoftbrett. Har ar tanken att du ska oka vikten vid varje drop du gor.'
                },
                { name: 'Barbell Hip Thrust', sets: 4, reps: '4-6', image: getImageUrl('barbell,hip,thrust,glutes'), tip: 'Hoftbredd position med dina fotter, pressa knana utat igenom hela ovningen.' },
                {
                    name: 'Leg Extension (Dropset)',
                    type: 'dropset',
                    rounds: 3,
                    image: getImageUrl('leg,extension,dropset'),
                    drops: [
                        { reps: '4-6', note: 'Tung vikt' },
                        { reps: '8', note: 'Lattare vikt' },
                        { reps: 'MAX', note: 'Annu lattare' }
                    ],
                    tip: 'Sitt ned med landryggen i kontakt med ryggstödet hela tiden.'
                },
                { name: 'Dumbbell Goblet Squat', sets: 4, reps: '4-6', image: getImageUrl('goblet,squat,dumbbell,legs'), tip: 'Sitt ner och bak och hall i vikten vid ditt brost. Spann magen.' },
                {
                    name: 'Seated Leg Curl (Dropset)',
                    type: 'dropset',
                    rounds: 3,
                    image: getImageUrl('seated,leg,curl,dropset'),
                    drops: [
                        { reps: '4-6', note: 'Tung vikt' },
                        { reps: '8', note: 'Lattare vikt' },
                        { reps: 'MAX', note: 'Annu lattare' }
                    ],
                    tip: 'Sitt ned med landryggen i kontakt med ryggstödet hela tiden.'
                }
            ]
        }
    };

    // ============================================
    // Extra Workouts
    // ============================================

    const extraWorkouts = {
        'helkropp': {
            name: 'Extrapass Helkropp',
            type: 'fullbody',
            location: 'gym',
            sessions: [
                {
                    name: 'Helkropp Pass 1',
                    duration: 45,
                    exercises: [
                        { name: 'Squat', sets: 4, reps: '8-10', image: getImageUrl('squat,barbell,gym') },
                        { name: 'Romanian Deadlift', sets: 3, reps: '10-12', image: getImageUrl('romanian,deadlift') },
                        { name: 'Bench Press', sets: 4, reps: '8-10', image: getImageUrl('bench,press,gym') },
                        { name: 'Lat Pulldown', sets: 3, reps: '10-12', image: getImageUrl('lat,pulldown') },
                        { name: 'Shoulder Press', sets: 3, reps: '10-12', image: getImageUrl('shoulder,press') }
                    ]
                },
                {
                    name: 'Helkropp Pass 2',
                    duration: 45,
                    exercises: [
                        { name: 'Leg Press', sets: 4, reps: '10-12', image: getImageUrl('leg,press,gym') },
                        { name: 'Hip Thrust', sets: 3, reps: '12-15', image: getImageUrl('hip,thrust') },
                        { name: 'Dumbbell Row', sets: 3, reps: '10-12', image: getImageUrl('dumbbell,row') },
                        { name: 'Chest Fly', sets: 3, reps: '12-15', image: getImageUrl('chest,fly,machine') },
                        { name: 'Face Pull', sets: 3, reps: '15-18', image: getImageUrl('face,pull,cable') }
                    ]
                }
            ]
        },
        'gummiband': {
            name: 'Extrapass Gummiband',
            type: 'resistance',
            location: 'home',
            sessions: [
                {
                    name: 'Gummiband Underkropp',
                    duration: 30,
                    exercises: [
                        { name: 'Banded Squat', sets: 3, reps: '15-20', image: getImageUrl('banded,squat,resistance') },
                        { name: 'Banded Glute Bridge', sets: 3, reps: '15-20', image: getImageUrl('banded,glute,bridge') },
                        { name: 'Banded Clamshell', sets: 3, reps: '15-20', image: getImageUrl('clamshell,exercise,band') },
                        { name: 'Banded Kickback', sets: 3, reps: '15-20', image: getImageUrl('banded,kickback,glutes') }
                    ]
                },
                {
                    name: 'Gummiband Overkropp',
                    duration: 30,
                    exercises: [
                        { name: 'Banded Pull Apart', sets: 3, reps: '15-20', image: getImageUrl('band,pull,apart') },
                        { name: 'Banded Bicep Curl', sets: 3, reps: '15-20', image: getImageUrl('banded,bicep,curl') },
                        { name: 'Banded Tricep Extension', sets: 3, reps: '15-20', image: getImageUrl('banded,tricep,extension') },
                        { name: 'Banded Shoulder Press', sets: 3, reps: '15-20', image: getImageUrl('banded,shoulder,press') }
                    ]
                }
            ]
        }
    };

    // ============================================
    // Rest Time Guidelines
    // ============================================

    const restTimeGuidelines = [
        { reps: '4-6 reps', rest: '1-2 min vila' },
        { reps: '6-10 reps', rest: '1 min vila' },
        { reps: '10-15 reps', rest: '45-60 sek vila' },
        { reps: '15-20 reps', rest: '30 sek vila' }
    ];

    // ============================================
    // Warmup Options
    // ============================================

    const warmupOptions = [
        { name: 'Roddmaskin', value: '2 km minst' },
        { name: 'Crosstrainer', value: '10 min' },
        { name: 'Gang/Jogg', value: '2-4 km' },
        { name: 'Stairmaster', value: '10 min' },
        { name: 'Jumping jacks', value: '3 min' },
        { name: 'Jogga pa stallet', value: '5 min' }
    ];

    // ============================================
    // Public API
    // ============================================

    return {
        // Nutrition
        nutritionInfo: nutritionInfo,

        // Recipes
        breakfastRecipes: breakfastRecipes,
        lunchRecipes: lunchRecipes,
        dinnerRecipes: dinnerRecipes,

        getAllRecipes: function () {
            return [...breakfastRecipes, ...lunchRecipes, ...dinnerRecipes];
        },

        getRecipesByCategory: function (category) {
            switch (category) {
                case 'breakfast': return breakfastRecipes;
                case 'lunch': return lunchRecipes;
                case 'dinner': return dinnerRecipes;
                default: return this.getAllRecipes();
            }
        },

        getRecipeById: function (id) {
            return this.getAllRecipes().find(r => r.id === id);
        },

        // Training Plans
        trainingPlans: trainingPlans,
        plan1Exercises: plan1Exercises,
        plan2Exercises: plan2Exercises,
        plan3Exercises: plan3Exercises,

        getPlanExercises: function (planId) {
            switch (planId) {
                case 1: return plan1Exercises;
                case 2: return plan2Exercises;
                case 3: return plan3Exercises;
                default: return plan3Exercises;
            }
        },

        // Extra Workouts
        extraWorkouts: extraWorkouts,

        // Guidelines
        restTimeGuidelines: restTimeGuidelines,
        warmupOptions: warmupOptions,

        // Image helper
        getImageUrl: getImageUrl
    };

})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DianaData;
}
