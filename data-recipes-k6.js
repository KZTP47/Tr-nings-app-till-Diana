/**
 * Diana Fitness PWA - Kostupplägg 6 Recipes Module
 * Contains all recipes from the Kostupplägg 6 PDF
 * 
 * IMAGE STATUS:
 * All recipes in this file are tagged with needsImage: true
 * They use gradient placeholders (image: null) until unique images are generated.
 * 
 * TO GENERATE IMAGES:
 * Search for "needsImage: true" to find all items needing unique images.
 * Image filename should match the recipe id (e.g., 'breakfast-k6-1.jpg')
 */

const DianaRecipesK6 = (function () {
    'use strict';

    // ============================================
    // Kostupplägg 6 - Breakfast Recipes (480 kcal)
    // ============================================
    const k6BreakfastRecipes = [
        {
            id: 'breakfast-k6-1',
            name: 'Chiamousse med blåbär och vanilj',
            category: 'breakfast',
            prepTime: 10,
            cookTime: 0,
            kcal: 480,
            protein: 34,
            carbs: 47,
            fat: 17,
            image: 'IMG3/breakfast-k6-1.png',
            needsImage: false,
            imagePrompt: 'Blueberry chia mousse with coconut cream topping in a glass bowl, purple and white layers, breakfast food photography',
            ingredients: [
                { amount: '150g', item: 'Blåbär' },
                { amount: '40g (1 skopa)', item: 'Veganskt proteinpulver, med smak' },
                { amount: '5g (~1.5 msk)', item: 'Kokosflingor (riven kokos)' },
                { amount: '10g (~2.5 tsk)', item: 'Kokosmjölk 18% fett' },
                { amount: '15g (~1 msk)', item: 'Chiafrön' },
                { amount: '210g (~210 ml)', item: 'Mandeldryck, naturell, osötad' },
                { amount: '30g (~1.5 msk)', item: 'Agavesirap' }
            ],
            instructions: [
                'Blanda ihop chiafrön med mandelmjölk, agavesirap och proteinpulver i en mixer eller matberedare. Mixa i cirka 30 sekunder eller tills slät. Tillsätt eventuellt lite vatten för en tunnare konsistens. Täck skålen och ställ i kylen i minst 4 timmar, eller över natten.',
                'Tillsätt sedan hälften av blåbären till chiagröten.',
                'Vispa den krämiga delen av kokosmjölken tills den är fluffig. Spara den flytande delen av kokosmjölken till toppingen.',
                'Vänd försiktigt ner den vispade kokosgrädden i chia-blandningen.',
                'Toppa chiagröten med resten av blåbären och kokosmjölken. Smaklig måltid!'
            ],
            tips: 'Chiamoussen ska vila i kylen i minst 4 timmar eller över natten!'
        },
        {
            id: 'breakfast-k6-2',
            name: 'Kvarg med mandlar, hallon och blåbär',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 0,
            kcal: 480,
            protein: 35,
            carbs: 46,
            fat: 17,
            image: 'IMG3/breakfast-k6-2.png',
            needsImage: false,
            imagePrompt: 'Bowl of vanilla quark topped with fresh raspberries, blueberries and whole almonds, bright and colorful breakfast photography',
            ingredients: [
                { amount: '285g', item: 'Kvarg, Vanilj, Arla' },
                { amount: '175g', item: 'Hallon, frysta' },
                { amount: '200g', item: 'Blåbär, frysta' },
                { amount: '25g', item: 'Hela mandlar, naturella' }
            ],
            instructions: [
                'Tillsätt kvargen till en skål. Grovhacka mandlarna.',
                'Toppa kvargen med hallon, blåbär och hackade mandlar.'
            ],
            tips: null
        },
        {
            id: 'breakfast-k6-3',
            name: 'Filmjölk och ägg',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 5,
            kcal: 480,
            protein: 35,
            carbs: 46,
            fat: 17,
            image: 'IMG3/breakfast-k6-3.png',
            needsImage: false,
            imagePrompt: 'Glass of filmjölk with fresh strawberries and banana slices, with boiled eggs on the side, Swedish breakfast photography',
            ingredients: [
                { amount: '65g', item: 'Jordgubbar' },
                { amount: '80g (1 st.)', item: 'Banan' },
                { amount: '145g (3 st.)', item: 'Ägg, hela' },
                { amount: '470g (~470 ml)', item: 'Filmjölk, 0.5% fett' }
            ],
            instructions: [
                'Servera filmjölken med frukten.',
                'Koka och ät ägget bredvid.'
            ],
            tips: 'Gott att toppa med lite extra kanel på!'
        },
        {
            id: 'breakfast-k6-4',
            name: 'Frukt med kvarg, vanilj och choklad',
            category: 'breakfast',
            prepTime: 10,
            cookTime: 0,
            kcal: 485,
            protein: 36,
            carbs: 44,
            fat: 17,
            image: 'IMG3/breakfast-k6-4.png',
            needsImage: false,
            imagePrompt: 'Kvarg bowl with fresh raspberries, honeydew melon, apricots and dark chocolate shavings, vibrant breakfast photography',
            ingredients: [
                { amount: '100g', item: 'Hallon' },
                { amount: '275g', item: 'Kvarg, naturell, 0.2% fett' },
                { amount: '130g (~1 st.)', item: 'Honungsmelon' },
                { amount: '35g', item: 'Choklad, 70%' },
                { amount: '130g (4 st.)', item: 'Aprikoser' },
                { amount: '2-3 droppar', item: 'Citronsaft' },
                { amount: '1-2 droppar', item: 'Vaniljextrakt' }
            ],
            instructions: [
                'Skölj hallon och aprikoser. Skär aprikoserna på mitten och ta bort kärnan. Dela melonen på mitten, ta bort kärnorna med en sked och skär bort skalet med en kniv. Skär aprikoserna och melonen i bitar. Hacka chokladen.',
                'Lägg kvargen i en skål och blanda med lite vaniljextrakt och citronsaft. Blanda ner melon, aprikoser, hallon och hackad choklad och servera.'
            ],
            tips: null
        },
        {
            id: 'breakfast-k6-5',
            name: 'Chiamousse med choklad och banan',
            category: 'breakfast',
            prepTime: 10,
            cookTime: 0,
            kcal: 480,
            protein: 36,
            carbs: 47,
            fat: 16,
            image: 'IMG3/breakfast-k6-5.png',
            needsImage: false,
            imagePrompt: 'Chocolate chia mousse topped with sliced banana in a glass jar, dark rich color with banana contrasts, healthy dessert photography',
            ingredients: [
                { amount: '95g (~95 ml)', item: 'Minimjölk, 0.1% fett' },
                { amount: '30g (1 1/3 skopa)', item: 'Optimal Vibe Nutrition Whey proteinpulver, med smak' },
                { amount: '115g (1 st.)', item: 'Banan' },
                { amount: '45g', item: 'Chiafrön' },
                { amount: '15g (~2.5 tsk)', item: 'Lönnsirap/Ahornsirap' },
                { amount: '1-2 droppar', item: 'Vaniljextrakt' },
                { amount: '2-5 tsk', item: 'Kakaopulver' }
            ],
            instructions: [
                'Skala och skiva bananen. Spara hälften av bananskivorna till senare.',
                'Tillsätt alla ingredienser till en mixer och mixa i cirka 30 sekunder tills du får en slät och krämig konsistens. Tillsätt eventuellt lite vatten för att uppnå önskad konsistens.',
                'För över moussen till en skål, täck med plastfolie och ställ in i kylskåpet i minst 4 timmar.',
                'Servera chiamoussen och toppa med de resterande bananskivorna. Smaklig måltid!'
            ],
            tips: 'Tänk på att chiamoussen behöver vila i kylskåpet i minst 4 timmar eller helst över natten.'
        },
        {
            id: 'breakfast-k6-6',
            name: 'Weetabix bowl med kvarg och blåbär',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 0,
            kcal: 480,
            protein: 36,
            carbs: 46,
            fat: 17,
            image: 'IMG3/breakfast-k6-6.png',
            needsImage: false,
            imagePrompt: 'Weetabix cereal bowl soaked in almond milk with vanilla quark, walnuts and fresh blueberries, cozy breakfast photography',
            ingredients: [
                { amount: '15g (2/3 skopa)', item: 'Optimal Vibe Nutrition Whey proteinpulver, med smak' },
                { amount: '20g (~3 msk)', item: 'Valnötter, naturella' },
                { amount: '120g', item: 'Kvarg, naturell, 0.2% fett' },
                { amount: '45g (2 st.)', item: 'Weetabix, Original' },
                { amount: '85g', item: 'Blåbär' },
                { amount: '180g (~180 ml)', item: 'Mandeldryck, naturell, osötad' },
                { amount: '1-2 tsk', item: 'Vaniljextrakt' },
                { amount: '1-2 tsk', item: 'Kanel' },
                { amount: '1-4 tsk', item: 'Sötningsmedel, sockerfritt, flytande' }
            ],
            instructions: [
                'Blanda Weetabix med mandeldrycken och vaniljextrakt i en skål. Tillsätt tillräckligt med mandeldryck så att Weetabixen är fuktig och mjuk. Om du har någon mandeldryck över kan du dricka den vid sidan om.',
                'Tillsätt kvargen och proteinpulvret till en separat skål och blanda ihop till en slät kräm. Smaksätt med sötningsmedel och kanel.',
                'Skölj blåbären. Toppa Weetabixen med kvargblandningen, valnötterna och bären. Smaklig måltid!'
            ],
            tips: 'Det här receptet är perfekt för att förbereda flera måltider och kan förvaras i kylskåpet i några dagar.'
        },
        {
            id: 'breakfast-k6-7',
            name: 'Bröd med avokado och stekt ägg',
            category: 'breakfast',
            prepTime: 5,
            cookTime: 5,
            kcal: 475,
            protein: 33,
            carbs: 46,
            fat: 17,
            image: 'IMG3/breakfast-k6-7.png',
            needsImage: false,
            imagePrompt: 'Rye bread topped with sliced avocado and fried eggs, turkey cold cuts on the side, Scandinavian breakfast photography',
            ingredients: [
                { amount: '95g (2 st.)', item: 'Ägg, hela' },
                { amount: '70g (5 skivor)', item: 'Kycklingpålägg' },
                { amount: '120g (3 skivor)', item: 'Rågbröd' },
                { amount: '25g (~½ st.)', item: 'Avokado, färsk' }
            ],
            instructions: [
                'Värm upp en stekpanna på medelvärme och knäck äggen ned i pannan. Stek dem i några minuter tills äggvitan stelnat. Vänd sedan på äggen om du vill ha dem vändstekta och stek i någon minut till. Alternativt kan du lägga ett lock på stekpannan och steka dem med locket på i någon minut. Krydda med salt och peppar.',
                'Dela avokadon, ta ur kärnan och skala den. Skiva den sedan.',
                'Fördela kalkonpålägg och avokado på brödet och toppa med stekta ägg.'
            ],
            tips: null
        }
    ];

    // ============================================
    // Kostupplägg 6 - Lunch Recipes (560 kcal)
    // ============================================
    const k6LunchRecipes = [
        {
            id: 'lunch-k6-1',
            name: 'Krämig pasta med kyckling och kronärtskocka',
            category: 'lunch',
            prepTime: 5,
            cookTime: 25,
            kcal: 560,
            protein: 41,
            carbs: 56,
            fat: 19,
            image: 'IMG3/lunch-k6-1.png',
            needsImage: false,
            imagePrompt: 'Creamy pasta with chicken and artichoke hearts, parmesan and fresh parsley, Italian comfort food photography',
            ingredients: [
                { amount: '20g (~2.5 msk)', item: 'Parmesan, 28-30% fett' },
                { amount: '5g (~1.5 tsk)', item: 'Olivolja' },
                { amount: '125g', item: 'Kycklingbröstfilé, rå' },
                { amount: '65g (~65 ml)', item: 'Matlagningsgrädde, 4% fett' },
                { amount: '65g', item: 'Pasta, okokt' },
                { amount: '70g', item: 'Kronärtskockshjärtan, i vatten' },
                { amount: '1-2 handfull', item: 'Persilja, hackad' },
                { amount: '1-2 st.', item: 'Vitlöksklyfta, hel' }
            ],
            instructions: [
                'Koka pastan i en kastrull med saltat vatten tills strax innan den är al dente. Häll av pastan och spara pastavattnet.',
                'Häll av vätskan från kronärtskockan och skär i mindre bitar. Skär kycklingen i mindre bitar och krydda med salt och peppar. Värm upp en stekpanna med oljan på medelhög värme och stek kycklingen i cirka 5-7 minuter tills köttet inte längre är rosa i mitten. För över kycklingen till en tallrik och sätt åt sidan.',
                'Tillsätt kronärtskockan till stekpannan och stek tills gyllene. Stek vitlöken i 30-60 sekunder. Blanda i grädden, sänk värmen till medelvärme och tillaga i cirka 1 minut.',
                'Hyvla i parmesanen och tillsätt kycklingen, pastan och persiljan. Häll i lite pastavatten och låt sjuda i cirka 2 minuter till. Smaka av med peppar. Tillsätt eventuellt mer pastavatten om såsen är för tjock. Smaklig måltid!'
            ],
            tips: null
        },
        {
            id: 'lunch-k6-2',
            name: 'Krämig tortellinisoppa med spenat och cannellinibönor',
            category: 'lunch',
            prepTime: 10,
            cookTime: 25,
            kcal: 560,
            protein: 42,
            carbs: 56,
            fat: 18,
            image: 'IMG3/lunch-k6-2.png',
            needsImage: false,
            imagePrompt: 'Creamy tortellini soup with fresh spinach, white cannellini beans and basil, rustic Italian soup photography',
            ingredients: [
                { amount: '70g', item: 'Bladspenat' },
                { amount: '95g', item: 'Tortellini, Ricotta & Spenat' },
                { amount: '55g (1 st.)', item: 'Gul lök' },
                { amount: '105g (~1 burk)', item: 'Cannellinibönor, konserverade' },
                { amount: '170g', item: 'Keso, 4%' },
                { amount: '55g (2 stjälkar)', item: 'Stjälkselleri' },
                { amount: '2-4 löv', item: 'Basilika, färsk' },
                { amount: '1-2 stam/kvist', item: 'Timjan, färsk' },
                { amount: '250-500 ml', item: 'Buljong (blandat med vatten)' },
                { amount: '1-2 st.', item: 'Vitlöksklyfta, pressad' },
                { amount: '1-2 tsk', item: 'Citronsaft' }
            ],
            instructions: [
                'Skölj grönsakerna. Tärna sellerin och löken. Häll av vattnet från bönorna.',
                'Värm en stor gryta på medelhög värme och stek löken i 3-4 minuter. Tillsätt sellerin och vitlöken och stek tills sellerin är mör.',
                'Koka upp grönsaksbuljongen och krydda med salt, peppar och timjan. Tillsätt tortellinin när vattnet kokar och koka enligt anvisningen på förpackningen. Tillsätt bönorna och småkoka i ett par minuter tills de är genomvarma.',
                'Stäng av värmen och tillsätt spenat och basilika och rör om. Tillsätt en skvätt citronsaft om du vill.',
                'Servera soppan och ät keson vid sidan.'
            ],
            tips: null
        },
        {
            id: 'lunch-k6-3',
            name: 'Storkok – pestogryta med kyckling och gnocchi',
            category: 'lunch',
            prepTime: 10,
            cookTime: 15,
            kcal: 560,
            protein: 42,
            carbs: 53,
            fat: 19,
            image: 'IMG3/lunch-k6-3.png',
            needsImage: false,
            imagePrompt: 'Pesto chicken stew with potato gnocchi, cherry tomatoes and fresh thyme, Italian stew food photography',
            ingredients: [
                { amount: '125g', item: 'Potatisgnocchi' },
                { amount: '30g (~2 msk)', item: 'Pesto Picante, Paprika & Chili' },
                { amount: '125g (~125 ml)', item: 'Matlagningsgrädde, 4% fett' },
                { amount: '175g', item: 'Kycklingbröstfilé, rå' },
                { amount: '70g (5 st.)', item: 'Körsbärstomater' },
                { amount: '1-2 st.', item: 'Vitlöksklyfta, pressad' },
                { amount: '1-3 nyp', item: 'Timjan, torkad' }
            ],
            instructions: [
                'Koka gnocchin i en kastrull enligt anvisningarna på förpackningen.',
                'Skär kycklingen i strimlor. Värm upp en non-stick stekpanna på medelhög värme och stek kycklingen tills köttet inte längre är rosa i mitten. Krydda med lite salt, peppar och timjan.',
                'Tillsätt vitlök, matlagningsgrädde och pesto. Låt sjuda under lock i några minuter.',
                'Skölj och halvera tomaterna. Krydda dem med lite salt och peppar.',
                'Servera kycklinggrytan tillsammans med gnocchin och tomaterna. Smaklig måltid!'
            ],
            tips: null
        },
        {
            id: 'lunch-k6-4',
            name: 'Gnocchi med persilja och citron',
            category: 'lunch',
            prepTime: 10,
            cookTime: 10,
            kcal: 560,
            protein: 42,
            carbs: 55,
            fat: 18,
            image: 'IMG3/lunch-k6-4.png',
            needsImage: false,
            imagePrompt: 'Pan-fried gnocchi with smoked ham, fresh parsley, lemon juice and shaved parmesan, light Italian lunch photography',
            ingredients: [
                { amount: '170g', item: 'Potatisgnocchi' },
                { amount: '35g', item: 'Parmesan, 28-30% fett' },
                { amount: '135g (7 skivor)', item: 'Rökt skinka, pålägg' },
                { amount: '1/2-1 handfull', item: 'Persilja, hackad' },
                { amount: '1-2 msk', item: 'Citronsaft' },
                { amount: '1/4-1/2 tsk', item: 'Röd chilifrukt, rå, hackad' },
                { amount: '1-2 st.', item: 'Vitlöksklyfta, pressad' }
            ],
            instructions: [
                'Koka gnocchi i en kastrull med kokande lättsaltat vatten enligt anvisningen på förpackningen. När de flesta flutit upp till ytan är gnocchin klara. Detta tar ungefär 2 minuter.',
                'Tärna skinkan. Tillsätt vitlök, chili och skinka till en stekpanna och stek under omrörning tills skinkan fått lite färg.',
                'Tillsätt sedan gnocchi, citronsaft och persilja till stekpannan. Stek i någon minut till och tillsätt sedan allt till en skål. Smaka av med salt och peppar och toppa med riven parmesan.'
            ],
            tips: null
        },
        {
            id: 'lunch-k6-5',
            name: 'Snabb ramen med kyckling',
            category: 'lunch',
            prepTime: 10,
            cookTime: 15,
            kcal: 560,
            protein: 40,
            carbs: 54,
            fat: 20,
            image: 'IMG3/lunch-k6-5.png',
            needsImage: false,
            imagePrompt: 'Quick chicken ramen bowl with shiitake mushrooms, napa cabbage, rice noodles in miso broth with fresh coriander, Asian food photography',
            ingredients: [
                { amount: '55g (3 st.)', item: 'Shiitakesvamp' },
                { amount: '15g (~3 tsk)', item: 'Sesamolja' },
                { amount: '70g (~1 huvud)', item: 'Kinakål' },
                { amount: '55g', item: 'Risnudlar, okokt' },
                { amount: '150g', item: 'Kycklingbröstfilé, grillad/stekt' },
                { amount: '1/2-1 tsk', item: 'Röd chilifrukt, rå, hackad' },
                { amount: '300-600 ml', item: 'Buljong (blandat med vatten)' },
                { amount: '1/2-1 handfull', item: 'Koriander, färsk' },
                { amount: '1-2 msk', item: 'Misopasta' },
                { amount: '1-2 msk', item: 'Sojasås' }
            ],
            instructions: [
                'Skölj och finhacka koriandern. Värm upp en stor kastrull på medelvärme och tillsätt chilin, misopastan och sesamoljan och stek i cirka en minut.',
                'Tillsätt buljongen till kastrullen. Koka upp och tillsätt korianderstjälkarna (spara några blad till senare). Sänk sedan värmen och låt sjuda i cirka 5 minuter.',
                'Skölj och skär svampen. Skär svampen och kycklingen i mindre bitar.',
                'Tillsätt nudlarna, kycklingen, kålen, svampen och sojasåsen till kastrullen och låt sjuda tills nudlarna är klara.',
                'Servera din ramen i en skål och toppa med den resterande koriandern. Smaklig måltid!'
            ],
            tips: null
        },
        {
            id: 'lunch-k6-6',
            name: 'Kycklingwok med paprika och jordnötter',
            category: 'lunch',
            prepTime: 10,
            cookTime: 20,
            kcal: 560,
            protein: 40,
            carbs: 55,
            fat: 19,
            image: 'IMG3/lunch-k6-6.png',
            needsImage: false,
            imagePrompt: 'Chicken stir-fry wok with red bell pepper, egg noodles, roasted peanuts and curry seasoning, Asian wok food photography',
            ingredients: [
                { amount: '180g (1 st.)', item: 'Röd paprika' },
                { amount: '140g', item: 'Kycklingbröstfilé, rå' },
                { amount: '55g', item: 'Äggnudlar' },
                { amount: '30g (~1 st.)', item: 'Gul lök' },
                { amount: '10g (~1 msk)', item: 'Torrostade jordnötter' },
                { amount: '10g (~2 tsk)', item: 'Olivolja' },
                { amount: '1-2 tsk', item: 'Currypulver' },
                { amount: '1-2 st.', item: 'Vitlöksklyfta, pressad' },
                { amount: '1-2 tsk', item: 'Chilipulver' }
            ],
            instructions: [
                'Skölj och skiva paprikan.',
                'Skala och finhacka löken.',
                'Skiva kycklingen och krydda med chili- och currypulver.',
                'Värm upp oljan i en stek- eller wokpanna. Tillsätt kyckling, lök, jordnötter och paprika och stek i 7-10 minuter. Rör om då och då.',
                'Koka nudlarna i en kastrull med lättsaltat vatten enligt anvisningarna på förpackningen.',
                'Tillsätt nudlarna till woken och blanda ingredienserna.',
                'Serva woken varm och njut!'
            ],
            tips: null
        },
        {
            id: 'lunch-k6-7',
            name: 'Stekt ris med ananas, lax och räkor',
            category: 'lunch',
            prepTime: 10,
            cookTime: 70,
            kcal: 560,
            protein: 41,
            carbs: 57,
            fat: 18,
            image: 'IMG3/lunch-k6-7.png',
            needsImage: false,
            imagePrompt: 'Fried rice with grilled salmon, shrimp, pineapple chunks, fresh coriander and lime, tropical Asian food photography',
            ingredients: [
                { amount: '45g', item: 'Fullkornsris, okokt' },
                { amount: '125g', item: 'Lax, atlantisk, odlad, färsk' },
                { amount: '70g', item: 'Djuphavsräkor, rå, skalad och tinad' },
                { amount: '85g', item: 'Ananas, konserverad' },
                { amount: '10g (~1.5 tsk)', item: 'Honung' },
                { amount: '105g (1 st.)', item: 'Gurka' },
                { amount: '1/2-1 handfull', item: 'Koriander, hackad' },
                { amount: '1-2 st.', item: 'Vitlöksklyfta, pressad' },
                { amount: '1/2-1 msk', item: 'Ingefära, färsk, riven' },
                { amount: '1/2-1 msk', item: 'Sojasås' },
                { amount: '1/2-1 msk', item: 'Limejuice' }
            ],
            instructions: [
                'Blanda ihop honung, limesaft, sojasås, ingefära och vitlök. Lägg laxen och räkorna i en ugnsform och häll marinaden över. Marinera i minst 1 timme i kylskåp.',
                'Under tiden sköljer du riset innan det kokas. Lägg i en kastrull med lättsaltat vatten och koka enligt anvisningarna på förpackningen. När riset är kokat, fördela det på en tallrik för att svalna.',
                'Låt ananasens vätska rinna av och skölj och hacka gurkan i små bitar. Lägg ananas och gurka i en skål och krydda med en nypa salt och limesaft. Tillsätt lite koriander och blanda ihop.',
                'Hetta upp en stekpanna på medelhög värme och tillsätt laxen och räkorna. Stek laxen i några minuter på varje sida tills mitten av fisken är ogenomskinlig och lätt flagnar och stek räkorna tills de blir rosa och inte längre är genomskinliga.',
                'Tillsätt det kokta riset till pannan, krydda med sojasås efter smak och blanda ihop.',
                'Servera det stekta ananasriset toppat med ananas och gurka, garnera med mer koriander och njut!'
            ],
            tips: 'Använd överblivet ris eller koka riset tidigare i veckan för att spara tid.'
        }
    ];

    // ============================================
    // Kostupplägg 6 - Dinner Recipes (560 kcal)
    // ============================================
    const k6DinnerRecipes = [
        {
            id: 'dinner-k6-1',
            name: 'Bakad gnocchi med kyckling',
            category: 'dinner',
            prepTime: 10,
            cookTime: 30,
            kcal: 560,
            protein: 41,
            carbs: 55,
            fat: 19,
            image: 'IMG3/dinner-k6-1.png',
            needsImage: false,
            imagePrompt: 'Baked gnocchi casserole with chicken, broccoli, cream sauce, rosemary and mustard, golden and bubbly, comfort food photography',
            ingredients: [
                { amount: '55g (1 st.)', item: 'Gul lök' },
                { amount: '125g', item: 'Potatisgnocchi' },
                { amount: '100g (~100 ml)', item: 'Matlagningsgrädde, 15% fett' },
                { amount: '140g', item: 'Kycklingbröstfilé, rå' },
                { amount: '150g (1 huvud)', item: 'Broccoli' },
                { amount: '1/4-1/2 tsk', item: 'Muskotnöt, malen' },
                { amount: '1-2 tsk', item: 'Dijon senap' },
                { amount: '1-2 stam/kvist', item: 'Rosmarin, färsk' },
                { amount: '1/4-1/2 handfull', item: 'Persilja, hackad' },
                { amount: '1/2-1 tsk', item: 'Vitlöksklyfta, pressad' },
                { amount: '300 ml', item: 'Buljong (blandat med vatten)' }
            ],
            instructions: [
                'Sätt ugnen på 200°C (vanlig ugn) eller 180°C (varmluft).',
                'Skölj broccolin och skär den i mindre buketter och stammen i mindre bitar. Skala och tärna löken.',
                'Krydda kycklingen med salt och peppar och skär den i mindre bitar. Värm upp en stekpanna med en skvätt vatten på medelhög värme och stek kycklingen tills den inte längre är rosa i mitten.',
                'Häll grädden och buljongen i en gryta. Blanda med senap, muskotnöt, salt, peppar och vitlök. Tillsätt kycklingen, broccolin, löken, gnocchin och rosmarin och rör om ordentligt. Baka i ugnen i 25 minuter.',
                'Toppa med persilja och servera. Smaklig måltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-k6-2',
            name: 'Tortillapizza med crème fraiche, sötpotatis och kyckling',
            category: 'dinner',
            prepTime: 10,
            cookTime: 20,
            kcal: 554,
            protein: 44,
            carbs: 53,
            fat: 18,
            image: 'IMG3/dinner-k6-2.png',
            needsImage: false,
            imagePrompt: 'Tortilla pizza with crème fraiche, sliced sweet potato, chicken, oregano, basil and melted cheese, flatbread pizza photography',
            ingredients: [
                { amount: '65g (2 st.)', item: 'Tortillabröd, medium' },
                { amount: '80g (1 st.)', item: 'Sötpotatis' },
                { amount: '65g', item: 'Lätt crème fraiche, 8-9% fett' },
                { amount: '60g (3 skivor)', item: 'Mager ost, 11% fett, valfri' },
                { amount: '85g', item: 'Kycklingbröstfilé, rå' },
                { amount: '1 nyp', item: 'Oregano, torkad' },
                { amount: '1 blad', item: 'Basilika, färsk' }
            ],
            instructions: [
                'Sätt ugnen på 180°C.',
                'Skär kycklingen i mindre bitar och krydda med salt och peppar. Värm upp en stekpanna med en skvätt vatten på medelhög värme och stek kycklingen i cirka 5-7 minuter tills köttet inte längre är rosa i mitten.',
                'Fördela crème fraichen på tortillabrödet.',
                'Skala och skär sötpotatis i tunna skivor. Riv osten.',
                'Fördela sötpotatisen och kycklingen på tortillabrödet. Krydda med salt, peppar, oregano och basilika och toppa med osten.',
                'Grädda tortillapizzan i cirka 10 minuter i ugnen. Smaklig måltid!'
            ],
            tips: null
        },
        {
            id: 'dinner-k6-3',
            name: 'Asiatisk fiskgryta',
            category: 'dinner',
            prepTime: 5,
            cookTime: 15,
            kcal: 560,
            protein: 42,
            carbs: 53,
            fat: 20,
            image: 'IMG3/dinner-k6-3.png',
            needsImage: false,
            imagePrompt: 'Thai-style fish curry with cod, salmon, shrimp in coconut milk and red curry sauce, jasmine rice on the side, Asian seafood photography',
            ingredients: [
                { amount: '70g (1 st.)', item: 'Röd paprika' },
                { amount: '5g (~1.5 tsk)', item: 'Röd Currypaste, Santa Maria' },
                { amount: '55g', item: 'Stora räkor, råa, frysta' },
                { amount: '60g', item: 'Lax, odlad i Norge, färsk' },
                { amount: '55g', item: 'Jasminris, okokt' },
                { amount: '70g', item: 'Minifraiche, Arla' },
                { amount: '70g', item: 'Torskfilé, utan skinn, rå' },
                { amount: '70g (~70 ml)', item: 'Kokosmjölk, 7-8% fett' },
                { amount: '1 tsk', item: 'Sojasås' },
                { amount: '1 msk', item: 'Koriander, färsk' },
                { amount: '1 tsk', item: 'Vitlöksklyfta, pressad' },
                { amount: '1 nyp', item: 'Chiliflingor' }
            ],
            instructions: [
                'Koka ris i en kastrull med kokande lättsaltat vatten enligt anvisningen på förpackningen.',
                'Tina räkorna, skär lax och torsk i kuber och salta och peppra dem.',
                'Skala och riv vitlöksklyftan. Skölj och skiva paprikan.',
                'Fräs vitlök, currypasta och paprika på medelvärme i en gryta. Tillsätt crème fraiche, kokosmjölk och sojasås till grytan och låt sjuda upp. Lägg ned fiskbitarna i grytan och låt sjuda på låg värme i 5 minuter.',
                'Tillsätt räkorna och låt sjuda i ytterligare 2 minuter tills räkorna är rosa. Ha inte i räkorna för länge för då blir de sega. Smaka av med salt, pepper och chiliflingor.',
                'Servera jasminris tillsammans med den asiatiska fiskgrytan och toppa med koriander.'
            ],
            tips: null
        },
        {
            id: 'dinner-k6-4',
            name: 'Mustig kycklinggryta med smak av äpple och dragon',
            category: 'dinner',
            prepTime: 10,
            cookTime: 25,
            kcal: 560,
            protein: 41,
            carbs: 54,
            fat: 19,
            image: 'IMG3/dinner-k6-4.png',
            needsImage: false,
            imagePrompt: 'Creamy chicken stew with apple slices and tarragon herb, served with jasmine rice, French-inspired comfort food photography',
            ingredients: [
                { amount: '180g', item: 'Kycklingbröstfilé, rå' },
                { amount: '120g (~120 ml)', item: 'Matlagningsgrädde, 4% fett' },
                { amount: '95g (1 st.)', item: 'Äpple' },
                { amount: '35g', item: 'Jasminris, okokt' },
                { amount: '35g (1 st.)', item: 'Gul lök' },
                { amount: '10g (~2 tsk)', item: 'Rapsolja' },
                { amount: '5g (~3 tsk)', item: 'Majsstärkelse' },
                { amount: '1-2 msk', item: 'Dragon, torkad' },
                { amount: '100-200 ml', item: 'Vatten' },
                { amount: '1-2 st.', item: 'Vitlöksklyfta, hel' },
                { amount: '1-2 msk', item: 'Fond, flytande' }
            ],
            instructions: [
                'Tina eventuellt fryst kyckling.',
                'Skala och finhacka lök och vitlök. Dela, kärna ur och klyfta äpplena.',
                'Skär kycklingen i mindre bitar.',
                'Fräs lök, vitlök och äpple i olja tills löken mjuknar. Tillsätt kyckling och dragon och fräs ytterligare några minuter. Krydda med salt och peppar.',
                'Häll på vatten och kycklingfond och låt koka under lock på svag värme ca 15 minuter.',
                'Tillsätt grädden och koka ytterligare några minuter. Red grytan med majsstärkelse utrörd i kallt vatten.'
            ],
            tips: 'Tänk på att fryst kyckling har lång hållbarhet och ofta är billigare än färsk.'
        },
        {
            id: 'dinner-k6-5',
            name: 'Långkokt nötkött med pumpa- och kokoscurry',
            category: 'dinner',
            prepTime: 15,
            cookTime: 360,
            kcal: 560,
            protein: 40,
            carbs: 55,
            fat: 20,
            image: 'IMG3/dinner-k6-5.png',
            needsImage: false,
            imagePrompt: 'Slow-cooked beef curry with pumpkin chunks in coconut sauce, served with jasmine rice, rich golden curry food photography',
            ingredients: [
                { amount: '165g', item: 'Pumpa, rå' },
                { amount: '45g', item: 'Jasminris, okokt' },
                { amount: '140g (~1 burk)', item: 'Krossade tomater, konserverade' },
                { amount: '5g (~3 tsk)', item: 'Majsstärkelse' },
                { amount: '130g (~130 ml)', item: 'Kokosmjölk, 7-8% fett' },
                { amount: '150g', item: 'Högrev, i bitar, rå' },
                { amount: '1/2-1 msk', item: 'Currypulver' },
                { amount: '1/2-1 msk', item: 'Ingefära, färsk, riven' },
                { amount: '1-2 sekund', item: 'Matlagningsspray' },
                { amount: '100-250 ml', item: 'Buljong (blandat med vatten)' }
            ],
            instructions: [
                'Värm upp en stekpanna med matlagningsspray på hög värme och stek ingefäran med currypulver under omrörning i cirka 1 minut.',
                'Tillsätt nötköttet och stek i cirka 5 minuter under omrörning.',
                'För över köttet till slökokaren. Tillsätt grönsaksbuljongen och de krossade tomaterna och blanda väl. Täck med lock och tillaga på hög effekt i 5 timmar eller tills nötköttet är mört. Se över nötköttet då och då och tillsätt lite vatten vid behov.',
                'När nötköttet är nästintill mört, skala och skär pumpan i mindre bitar. Lägg pumpan i slökokaren och tillaga i 1 timma eller tills pumpan har mjuknat.',
                'Tillsätt majsstärkelsen till en liten skål tillsammans med kokosmjölken och blanda ihop. För över till slökokaren och tillaga utan locket i cirka 10 minuter eller tills blandningen har tjocknat.',
                'Under tiden, skölj riset och koka det sedan i en kastrull med lättsaltat vatten enligt anvisningarna på förpackningen.',
                'Servera riset och toppa med curryn. Smaklig måltid!'
            ],
            tips: 'Du behöver en slökokare/långsamkokare till det här receptet. Grönsakbuljong rekommenderas.'
        },
        {
            id: 'dinner-k6-6',
            name: 'Kalkon Stroganoff',
            category: 'dinner',
            prepTime: 15,
            cookTime: 15,
            kcal: 560,
            protein: 40,
            carbs: 54,
            fat: 20,
            image: 'IMG3/dinner-k6-6.png',
            needsImage: false,
            imagePrompt: 'Turkey stroganoff with tomato cream sauce, served with basmati rice and fresh parsley, Swedish comfort food photography',
            ingredients: [
                { amount: '15g (~2.5 tsk)', item: 'Tomatpuré' },
                { amount: '15g (~2.5 tsk)', item: 'Smör, saltat' },
                { amount: '150g', item: 'Kalkonbröstfilé, rå' },
                { amount: '55g (1 st.)', item: 'Gul lök' },
                { amount: '55g', item: 'Lätt crème fraiche, 8-9% fett' },
                { amount: '55g', item: 'Basmatiris, okokt' }
            ],
            instructions: [
                'Koka riset i en kastrull med kokande lättsaltat vatten enligt anvisningen på förpackningen.',
                'Skala och hacka löken.',
                'Skär köttet i centimetertjocka strimlor. Stek köttet och löken i smör i en stekpanna på medelhög värme i 5-7 minuter. Krydda med salt och peppar.',
                'Tillsätt tomatpuré, crème fraiche och tillräckligt vatten för att få en sås. Låt sjuda under lock på svag värme cirka 5 minuter.',
                'Servera kalkon stroganoff med ris och toppa med persilja.'
            ],
            tips: 'Ta och krydda upp med vitlök-, paprika och cayennepulver för extra smak!'
        },
        {
            id: 'dinner-k6-7',
            name: 'Mustig nötköttsgryta med ris',
            category: 'dinner',
            prepTime: 15,
            cookTime: 60,
            kcal: 560,
            protein: 41,
            carbs: 53,
            fat: 20,
            image: 'IMG3/dinner-k6-7.png',
            needsImage: false,
            imagePrompt: 'Rich beef stew with tomato cream sauce, served with fluffy basmati rice and chopped parsley, hearty Swedish food photography',
            ingredients: [
                { amount: '55g (~55 ml)', item: 'Matlagningsgrädde, 4% fett' },
                { amount: '90g', item: 'Lätt crème fraiche, 15% fett' },
                { amount: '55g', item: 'Basmatiris, okokt' },
                { amount: '25g (~1.5 msk)', item: 'Tomatpuré' },
                { amount: '145g', item: 'Nötkött, ytterlår/innanlår, rå' },
                { amount: '1-3 msk', item: 'Fond, flytande' },
                { amount: '1/2-1 handfull', item: 'Persilja, hackad' },
                { amount: '1-2 msk', item: 'Sojasås' }
            ],
            instructions: [
                'Skär köttet i strimlor. Värm upp en non-stick stekpanna eller kastrull på medelhög värme och stek köttet tills det börjar få färg.',
                'Rör ner tomatpurén och stek ytterligare i några sekunder. Tillsätt sedan vatten så att det precis täcker köttet. Låt sjuda under lock i cirka 1 timme eller tills nästan allt vatten har avdunstat.',
                'Skölj och koka sedan riset i en kastrull enligt anvisningarna på förpackningen.',
                'Tillsätt oxfond, soja, matlagningsgrädde, crème fraiche till grytan och låt det sjuda i några minuter. Smaka av med salt, peppar och eventuellt andra valfria kryddor eller örter.',
                'Servera grytan tillsammans med riset och toppa med hackad persilja. Smaklig måltid!'
            ],
            tips: 'Oxfond och kinesisk soja rekommenderas. Använd gärna lövbiff till detta recept.'
        }
    ];

    // ============================================
    // Public API
    // ============================================
    return {
        k6BreakfastRecipes: k6BreakfastRecipes,
        k6LunchRecipes: k6LunchRecipes,
        k6DinnerRecipes: k6DinnerRecipes,

        getAllK6Recipes: function () {
            return [
                ...k6BreakfastRecipes,
                ...k6LunchRecipes,
                ...k6DinnerRecipes
            ];
        },

        // Helper for future AI to find items needing images
        getRecipesNeedingImages: function () {
            return this.getAllK6Recipes().filter(r => r.needsImage === true);
        }
    };
})();
