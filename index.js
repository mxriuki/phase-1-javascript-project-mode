document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const cocktailButton = document.getElementById('get_cocktail');
    const cocktailContainer = document.getElementById('cocktail');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    // Event listener for the "Get Cocktail" button
    cocktailButton.addEventListener('click', () => {
        fetchRandomCocktail();
    });

    // Event listener for the search form
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            fetchCocktailByName(searchTerm);
        }
    });

    // Function to fetch a random cocktail from the API
    function fetchRandomCocktail() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => {
                const cocktail = data.drinks[0];
                renderCocktail(cocktail);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Function to fetch cocktail by name from the API
    function fetchCocktailByName(name) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
            .then(response => response.json())
            .then(data => {
                const cocktail = data.drinks ? data.drinks[0] : null;
                if (cocktail) {
                    renderCocktail(cocktail);
                } else {
                    console.log(`Cocktail "${name}" not found`);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Function to render cocktail details
    const renderCocktail = (cocktail) => {
        const ingredients = [];

        // Collect ingredients and measurements
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];

            if (ingredient && measure) {
                ingredients.push(`${ingredient} - ${measure}`);
            } else if (ingredient) {
                ingredients.push(ingredient);
            }
        }

        // Construct HTML for cocktail details
        const cocktailHTML = `
            <div class="bg-gray-800 rounded-lg shadow-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" class="w-full rounded-lg mb-4">
                        <div class="likes">
                            <button id="likeButton" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                <i class="fas fa-thumbs-up"></i>
                            </button>
                            <input type="number" id="inputLike" value="0" class="ml-2 bg-gray-800 text-white border-none w-16 text-center">
                        </div>
                    </div>
                    <div class="text-white">
                        <h2 class="text-2xl font-bold mb-4">${cocktail.strDrink}</h2>
                        <p><strong>Category:</strong> ${cocktail.strCategory}</p>
                        <p><strong>Glass type:</strong> ${cocktail.strGlass}</p>
                        <p><strong>Type:</strong> ${cocktail.strAlcoholic}</p>
                        <h3 class="text-xl font-bold mt-4 mb-2">Ingredients</h3>
                        <ul>
                            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                        <h3 class="text-xl font-bold mt-4 mb-2">Instructions</h3>
                        <p>${cocktail.strInstructions}</p>
                    </div>
                </div>
            </div>
        `;

        // Insert cocktail HTML into the container
        cocktailContainer.innerHTML = cocktailHTML;

        // Like button functionality
        const likeButton = document.getElementById('likeButton');
        const likeCount = document.getElementById('inputLike');

        likeButton.addEventListener('click', () => {
            likeCount.value = parseInt(likeCount.value) + 1;
        });
    };
});
