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
            thumbnail: `data:image/svg+xml,${encodeURIComponent(`
                <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#0a1128;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#1a237e;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#ff3e6f;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ff6b45;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grad)"/>
                    <!-- Stars -->
                    ${Array.from({length: 50}, () => {
                        const x = Math.random() * 800;
                        const y = Math.random() * 400;
                        return `<circle cx="${x}" cy="${y}" r="1" fill="white" />`;
                    }).join('')}
                    <!-- Rocket -->
                    <g transform="translate(400,200) rotate(-45)">
                        <path d="M0,-50 L20,50 L-20,50 Z" fill="url(#rocketGrad)"/>
                        <circle cx="0" cy="0" r="15" fill="#00ff88"/>
                        <path d="M-15,50 L0,70 L15,50" fill="#ffd700"/>
                    </g>
                    <text x="50%" y="350" font-family="Arial" font-size="32" fill="#00ff88" text-anchor="middle">Rocket Shooting</text>
                </svg>
            `)}`,
            description: "Navigate through space and shoot down enemy rockets in this exciting arcade shooter!",
            categories: ["arcade", "shooting", "action"]
        }
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
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
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
        document.body.style.overflow = ''; // Restore scrolling when modal is closed
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            gameIframe.src = '';
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            gameIframe.src = '';
            document.body.style.overflow = '';
        }
    });
}); 