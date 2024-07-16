document.addEventListener("DOMContentLoaded", () => {
    // Initial fetch to display a random cocktail on page load
    fetchRandomCocktail();

    const cocktailButton = document.getElementById('get_cocktail');
    const cocktailContainer = document.getElementById('cocktail');
    const relatedCocktails = document.querySelectorAll('.related-cocktails a');

    cocktailButton.addEventListener('click', fetchRandomCocktail);

    relatedCocktails.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const cocktailName = link.textContent.trim();
            fetchCocktailByName(cocktailName);
        });
    });

    function fetchRandomCocktail() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(res => {
                createCocktail(res.drinks[0]);
            });
    }

    function fetchCocktailByName(cocktailName) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(cocktailName)}`)
            .then(res => res.json())
            .then(res => {
                createCocktail(res.drinks[0]);
            });
    }

    function createCocktail(cocktail) {
        const ingredients = [];
        // Get all ingredients from the object. Up to 15
        for(let i = 1; i <= 15; i++) {
            if(cocktail[`strIngredient${i}`]) {
                ingredients.push(`${cocktail[`strIngredient${i}`]} - ${cocktail[`strMeasure${i}`]}`)
            } else {
                // Stop if no more ingredients
                break;
            }
        }
        
        const newInnerHTML = `
            <div class="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold">${cocktail.strDrink}</h2>
                    <div class="likes">
                        <button id="likeButton" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            <i class="fa fa-thumbs-up"></i>
                        </button>
                        <input type="number" id="inputLike" value="0" class="ml-2 w-16 bg-gray-700 text-center text-white rounded" disabled>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-1">
                        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" class="w-full h-auto rounded">
                    </div>
                    <div class="md:col-span-1">
                        <p><strong>Category:</strong> ${cocktail.strCategory}</p>
                        <p><strong>Glass type:</strong> ${cocktail.strGlass}</p>
                        <p><strong>Type:</strong> ${cocktail.strAlcoholic}</p>
                        <h3 class="mt-4 mb-2 text-lg font-semibold">Ingredients:</h3>
                        <ul>
                            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                        <h3 class="mt-4 mb-2 text-lg font-semibold">Instructions:</h3>
                        <p>${cocktail.strInstructions}</p>
                    </div>
                </div>
            </div>
        `;

        cocktailContainer.innerHTML = newInnerHTML;

        const likeButton = document.getElementById('likeButton');
        const inputLike = document.getElementById('inputLike');

        likeButton.addEventListener('click', () => {
            inputLike.value = parseInt(inputLike.value) + 1;
        });
    }
});
















document.addEventListener("DOMContentLoaded", () => {
    // Initial fetch to display a random cocktail on page load
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createCocktail(res.drinks[0]);
        });

    const cocktailButton = document.getElementById('get_cocktail');
    const cocktailContainer = document.getElementById('cocktail');

    cocktailButton.addEventListener('click', () => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(res => {
                createCocktail(res.drinks[0]);
            });
    });

    const createCocktail = (cocktail) => {
        const ingredients = [];
        // Get all ingredients from the object. Up to 15
        for(let i = 1; i <= 15; i++) {
            if(cocktail[`strIngredient${i}`]) {
                ingredients.push(`${cocktail[`strIngredient${i}`]} - ${cocktail[`strMeasure${i}`]}`)
            } else {
                // Stop if no more ingredients
                break;
            }
        }
        
        const newInnerHTML = `
            <div class="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold">${cocktail.strDrink}</h2>
                    <div class="likes">
                        <button id="likeButton" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            <i class="fa fa-thumbs-up"></i>
                        </button>
                        <input type="number" id="inputLike" value="0" class="ml-2 w-16 bg-gray-700 text-center text-white rounded" disabled>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-1">
                        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" class="w-full h-auto rounded">
                    </div>
                    <div class="md:col-span-1">
                        <p><strong>Category:</strong> ${cocktail.strCategory}</p>
                        <p><strong>Glass type:</strong> ${cocktail.strGlass}</p>
                        <p><strong>Type:</strong> ${cocktail.strAlcoholic}</p>
                        <h3 class="mt-4 mb-2 text-lg font-semibold">Ingredients:</h3>
                        <ul>
                            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                        <h3 class="mt-4 mb-2 text-lg font-semibold">Instructions:</h3>
                        <p>${cocktail.strInstructions}</p>
                    </div>
                </div>
            </div>
        `;

        cocktailContainer.innerHTML = newInnerHTML;

        const likeButton = document.getElementById('likeButton');
        const inputLike = document.getElementById('inputLike');

        likeButton.addEventListener('click', () => {
            inputLike.value = parseInt(inputLike.value) + 1;
        });
    };
});
