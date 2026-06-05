<><div class="filter-buttons">
    <button data-game="all" class="filter-btn active">Все</button>
    <button data-game="cs2" class="filter-btn">CS2</button>
    <button data-game="dota2" class="filter-btn">Dota 2</button>
</div><div class="players-grid" id="playersGrid">
        !-- карточки игроков с атрибутом data-game --{">"}
        <div class="player-card" data-game="dota2">...</div>
        <div class="player-card" data-game="cs2">...</div>
    </div><script>
        const filterBtns = document.querySelectorAll('.filter-btn');
        const players = document.querySelectorAll('.player-card');

        filterBtns.forEach(btn ={">"} {btn.addEventListener('click', () => {
            const game = btn.dataset.game;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            players.forEach(player => {
                if (game === 'all' || player.dataset.game === game) {
                    player.style.display = 'block';
                } else {
                    player.style.display = 'none';
                }
            });
        })};
        {"}"});
    </script></>