const RecipeApp = (function () {
    // -----------------------
    // 1. Recipe Data (enhanced)
    // -----------------------
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            category: "pasta",
            ingredients: [
                "Spaghetti",
                "Eggs",
                "Pancetta or bacon",
                "Parmesan cheese",
                "Black pepper"
            ],
            steps: [
                "Cook spaghetti in salted boiling water.",
                {
                    text: "Prepare the sauce",
                    substeps: [
                        "Whisk eggs with grated Parmesan.",
                        "Season with black pepper."
                    ]
                },
                "Crisp pancetta in a pan.",
                "Combine pasta, pancetta, and sauce off the heat."
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
            category: "curry",
            ingredients: [
                "Chicken",
                "Yogurt",
                "Garam masala",
                "Tomato puree",
                "Cream"
            ],
            steps: [
                "Marinate chicken in yogurt and spices.",
                "Grill or pan-fry the chicken until charred.",
                {
                    text: "Make the sauce",
                    substeps: [
                        "Sauté onions and spices.",
                        "Add tomato puree and simmer.",
                        {
                            text: "Finish the curry",
                            substeps: [
                                "Stir in cream.",
                                "Add cooked chicken and simmer briefly."
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            title: "Homemade Croissants",
            time: 180,
            difficulty: "hard",
            description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
            category: "baking",
            ingredients: [
                "Flour",
                "Butter",
                "Yeast",
                "Milk",
                "Sugar",
                "Salt"
            ],
            steps: [
                "Prepare the dough and let it rise.",
                "Laminate the dough with butter.",
                "Fold and roll multiple times, then shape croissants.",
                "Proof and bake until golden."
            ]
        },
        {
            id: 4,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
            category: "salad",
            ingredients: [
                "Cucumber",
                "Tomatoes",
                "Red onion",
                "Feta",
                "Olives",
                "Olive oil",
                "Oregano"
            ],
            steps: [
                "Chop all vegetables into bite-sized pieces.",
                "Toss with olives, feta, olive oil, and oregano."
            ]
        },
        {
            id: 5,
            title: "Beef Wellington",
            time: 120,
            difficulty: "hard",
            description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
            category: "meat",
            ingredients: [
                "Beef fillet",
                "Mushrooms",
                "Puff pastry",
                "Prosciutto",
                "Mustard"
            ],
            steps: [
                "Sear beef fillet and brush with mustard.",
                "Prepare mushroom duxelles.",
                "Wrap beef with duxelles and prosciutto in puff pastry.",
                "Bake until pastry is golden and beef is cooked."
            ]
        },
        {
            id: 6,
            title: "Vegetable Stir Fry",
            time: 20,
            difficulty: "easy",
            description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
            category: "vegetarian",
            ingredients: [
                "Mixed vegetables",
                "Soy sauce",
                "Garlic",
                "Ginger",
                "Oil"
            ],
            steps: [
                "Chop vegetables into even pieces.",
                "Stir-fry vegetables on high heat.",
                "Add sauce and toss to coat."
            ]
        },
        {
            id: 7,
            title: "Pad Thai",
            time: 30,
            difficulty: "medium",
            description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
            category: "noodles",
            ingredients: [
                "Rice noodles",
                "Shrimp or tofu",
                "Eggs",
                "Bean sprouts",
                "Peanuts",
                "Tamarind sauce"
            ],
            steps: [
                "Soak rice noodles until pliable.",
                "Stir-fry protein with aromatics.",
                "Add noodles and Pad Thai sauce.",
                "Toss with bean sprouts and top with peanuts."
            ]
        },
        {
            id: 8,
            title: "Margherita Pizza",
            time: 60,
            difficulty: "medium",
            description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
            category: "pizza",
            ingredients: [
                "Pizza dough",
                "Tomato sauce",
                "Mozzarella",
                "Basil leaves",
                "Olive oil"
            ],
            steps: [
                "Stretch pizza dough into a round.",
                "Spread tomato sauce and add mozzarella.",
                "Bake at high heat until bubbly.",
                "Top with fresh basil and olive oil."
            ]
        }
    ];

    // -----------------------
    // 2. DOM Selection
    // -----------------------
    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filters button');
    const sortButtons = document.querySelectorAll('.sorters button');

    // -----------------------
    // 3. State (filter + sort)
    // -----------------------
    let currentFilter = 'all';
    let currentSort = null;

    // -----------------------
    // 4. Recursive step renderer (pure)
    // -----------------------
    const renderStepsList = (steps) => {
        if (!steps || steps.length === 0) return '';

        const itemsHtml = steps.map((step) => {
            if (typeof step === 'string') {
                return `<li>${step}</li>`;
            }

            const text = step.text || '';
            const nested = step.substeps ? renderStepsList(step.substeps) : '';
            return `<li>${text}${nested}</li>`;
        }).join('');

        return `<ul>${itemsHtml}</ul>`;
    };

    // -----------------------
    // 5. Card template (pure)
    // -----------------------
    const createRecipeCard = (recipe) => {
        const ingredientsHtml = recipe.ingredients && recipe.ingredients.length
            ? `<ul>${recipe.ingredients.map((i) => `<li>${i}</li>`).join('')}</ul>`
            : '<p>No ingredients listed.</p>';

        const stepsHtml = renderStepsList(recipe.steps);

        return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>

            <div class="recipe-actions">
                <button class="toggle-steps" data-action="toggle-steps">Show Steps</button>
                <button class="toggle-ingredients" data-action="toggle-ingredients">Show Ingredients</button>
            </div>

            <div class="recipe-section recipe-steps hidden">
                <h4>Steps</h4>
                ${stepsHtml}
            </div>

            <div class="recipe-section recipe-ingredients hidden">
                <h4>Ingredients</h4>
                ${ingredientsHtml}
            </div>
        </div>
        `;
    };

    // -----------------------
    // 6. Pure filter + sort
    // -----------------------
    const applyFilter = (recipesList, filterMode) => {
        if (filterMode === 'all') return recipesList;

        if (filterMode === 'quick') {
            return recipesList.filter((recipe) => recipe.time < 30);
        }

        return recipesList.filter((recipe) => recipe.difficulty === filterMode);
    };

    const applySort = (recipesList, sortMode) => {
        if (!sortMode) return recipesList;

        const copy = [...recipesList];

        if (sortMode === 'name') {
            return copy.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (sortMode === 'time') {
            return copy.sort((a, b) => a.time - b.time);
        }

        return copy;
    };

    // -----------------------
    // 7. Render + updateDisplay
    // -----------------------
    const renderRecipes = (recipesToRender) => {
        const recipeCardsHTML = recipesToRender
            .map(createRecipeCard)
            .join('');

        recipeContainer.innerHTML = recipeCardsHTML;
    };

    const updateDisplay = () => {
        const filtered = applyFilter(recipes, currentFilter);
        const sorted = applySort(filtered, currentSort);
        renderRecipes(sorted);
    };

    // -----------------------
    // 8. UI helpers
    // -----------------------
    const setActiveButton = (buttons, attr, value) => {
        buttons.forEach((btn) => {
            if (value && btn.getAttribute(attr) === value) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // -----------------------
    // 9. Event wiring
    // -----------------------
    const bindFilterEvents = () => {
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedFilter = button.getAttribute('data-filter');
                currentFilter = selectedFilter;
                setActiveButton(filterButtons, 'data-filter', selectedFilter);
                updateDisplay();
            });
        });
    };

    const bindSortEvents = () => {
        sortButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedSort = button.getAttribute('data-sort');
                currentSort = currentSort === selectedSort ? null : selectedSort;
                setActiveButton(sortButtons, 'data-sort', currentSort);
                updateDisplay();
            });
        });
    };

    // Event delegation for steps/ingredients toggling
    const bindCardToggleEvents = () => {
        recipeContainer.addEventListener('click', (event) => {
            const action = event.target.getAttribute('data-action');
            if (!action) return;

            const card = event.target.closest('.recipe-card');
            if (!card) return;

            if (action === 'toggle-steps') {
                const section = card.querySelector('.recipe-steps');
                section.classList.toggle('hidden');
                event.target.textContent = section.classList.contains('hidden')
                    ? 'Show Steps'
                    : 'Hide Steps';
            }

            if (action === 'toggle-ingredients') {
                const section = card.querySelector('.recipe-ingredients');
                section.classList.toggle('hidden');
                event.target.textContent = section.classList.contains('hidden')
                    ? 'Show Ingredients'
                    : 'Hide Ingredients';
            }
        });
    };

    // -----------------------
    // 10. Public API
    // -----------------------
    const init = () => {
        bindFilterEvents();
        bindSortEvents();
        bindCardToggleEvents();
        updateDisplay();
    };

    return { init };
})();

// Initialize when script loads
RecipeApp.init();
