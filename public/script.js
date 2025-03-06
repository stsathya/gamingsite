document.addEventListener('DOMContentLoaded', () => {
    const gamesGrid = document.getElementById('games-grid');
    const modal = document.getElementById('game-modal');
    const gameIframe = document.getElementById('game-iframe');
    const closeModal = document.getElementById('close-modal');
    const categories = document.getElementById('categories');

    const games = [
        {
            name: "Rocket Shooting",
            url: "https://stsathya.github.io/rocketshooting/",
            thumbnail: "https://img.itch.zone/aW1nLzEyMjE2NjcucG5n/original/GUNxqD.png",
            description: "Navigate through space and shoot down enemy rockets in this exciting arcade shooter!",
            categories: ["arcade", "shooting", "action"]
        }
        // Add more games here with their categories
    ];

    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.name}" class="game-thumbnail">
            <div class="game-info">
                <h2>${game.name}</h2>
                <p>${game.description}</p>
                <div class="game-tags">
                    ${game.categories.map(cat => `<span class="game-tag">${cat}</span>`).join('')}
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            gameIframe.src = game.url;
            modal.style.display = 'block';
        });

        return card;
    }

    function filterGames(category) {
        gamesGrid.innerHTML = '';
        const filteredGames = category === 'all' 
            ? games 
            : games.filter(game => game.categories.includes(category));
        
        filteredGames.forEach(game => {
            gamesGrid.appendChild(createGameCard(game));
        });
    }

    // Initial load of all games
    filterGames('all');

    // Category filtering
    categories.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            e.target.classList.add('active');
            // Filter games
            filterGames(e.target.dataset.category);
        }
    });

    // Modal close functionality
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        gameIframe.src = '';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            gameIframe.src = '';
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            gameIframe.src = '';
        }
    });
});