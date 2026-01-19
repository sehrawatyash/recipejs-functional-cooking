// Recipe data - Foundation for all 4 parts
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza"
    }
];

// DOM Selection - Get the container where recipes will be displayed
const recipeContainer = document.querySelector('#recipe-container');

// Controls
const filterButtons = document.querySelectorAll('.filters button');
const sortButtons = document.querySelectorAll('.sorters button');

// State (filter + sort mode only, not mutating recipes)
let currentFilter = 'all';
let currentSort = null;

// Function to create HTML for a single recipe card (pure)
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>
        </div>
    `;
};

// Function to render recipes to the DOM (side-effect isolated here)
const renderRecipes = (recipesToRender) => {
    const recipeCardsHTML = recipesToRender
        .map(createRecipeCard)
        .join('');
    
    recipeContainer.innerHTML = recipeCardsHTML;
};

// Pure function: filter recipes based on mode
const applyFilter = (recipesList, filterMode) => {
    if (filterMode === 'all') return recipesList;

    if (filterMode === 'quick') {
        return recipesList.filter((recipe) => recipe.time < 30);
    }

    // difficulty filters: easy, medium, hard
    return recipesList.filter((recipe) => recipe.difficulty === filterMode);
};

// Pure function: sort recipes based on mode (works on a shallow copy)
const applySort = (recipesList, sortMode) => {
    if (!sortMode) return recipesList;

    const copy = [...recipesList];

    if (sortMode === 'name') {
        return copy.sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    if (sortMode === 'time') {
        return copy.sort((a, b) => a.time - b.time);
    }

    return copy;
};

// Central function: combines filter + sort then renders
const updateDisplay = () => {
    const filtered = applyFilter(recipes, currentFilter);
    const sorted = applySort(filtered, currentSort);
    renderRecipes(sorted);
};

// Helper: update active button styles
const setActiveButton = (buttons, activeAttr, value) => {
    buttons.forEach((btn) => {
        if (btn.getAttribute(activeAttr) === value) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

// Event listeners for filters
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedFilter = button.getAttribute('data-filter');
        currentFilter = selectedFilter;
        setActiveButton(filterButtons, 'data-filter', selectedFilter);
        updateDisplay();
    });
});

// Event listeners for sorters
sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedSort = button.getAttribute('data-sort');
        // toggle sort off if same button clicked again
        currentSort = currentSort === selectedSort ? null : selectedSort;
        setActiveButton(sortButtons, 'data-sort', currentSort);
        updateDisplay();
    });
});

// Initialize: default display (all recipes, no sort)
updateDisplay();
