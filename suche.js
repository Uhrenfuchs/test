document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const searchInput = document.getElementById('search-input');
    const searchExamples = document.querySelector('.search-examples');
    const languageIcon = document.getElementById('languageIcon');
    let searchIndex = [];

    // Suchindex laden
    fetch('/search-index-eng.json')
        .then(response => response.json())
        .then(data => searchIndex = data)
        .catch(console.error);

    // Overlay-Steuerung
    const openSearchOverlay = () => {
        searchOverlay.classList.add('active');
        searchToggle.style.display = 'none';
        languageIcon.style.display = 'none'; // Icon ausblenden
        searchInput.focus();
    };

    const closeSearchOverlay = () => {
        searchOverlay.classList.remove('active');
        searchToggle.style.display = 'flex';
        languageIcon.style.display = 'block'; // Icon wieder anzeigen
        searchInput.value = '';
        searchExamples.style.display = 'block';
        document.querySelector('.search-results').innerHTML = '';
        
        // Scroll-Logik neu berechnen
        setTimeout(() => {
            handleScroll();
            window.dispatchEvent(new Event('scroll'));
        }, 10);
    };

    // Event-Listener
    searchToggle.addEventListener('click', openSearchOverlay);
    closeBtn.addEventListener('click', closeSearchOverlay);

    // Klick außerhalb schließen
    document.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 768;
        const clickedOutside = !searchOverlay.contains(e.target) && e.target !== searchToggle;
        
        if (clickedOutside && (!isMobile || searchOverlay.classList.contains('active'))) {
            closeSearchOverlay();
        }
    });

    // Beispielbegriffe
    document.querySelectorAll('.example-list li').forEach(item => {
        item.addEventListener('click', () => {
            const searchTerm = item.textContent.replace('🔍', '').trim();
            searchInput.value = searchTerm;
            triggerSearch(searchTerm);
        });
    });

    // Tastatur-Shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
    });

    // Live-Suche
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim();
        searchExamples.style.display = term ? 'none' : 'block';
        
        if (term.length > 2) {
            triggerSearch(term);
        } else {
            document.querySelector('.search-results').innerHTML = '';
        }
    });

    // Suchlogik
    function triggerSearch(term) {
        const results = searchIndex.filter(item => 
            `${item.title} ${item.content}`.toLowerCase().includes(term.toLowerCase())
        );
        displayResults(results);
    }

    // Ergebnisanzeige
    function displayResults(results) {
        const container = document.querySelector('.search-results');
        container.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result-item">
                <h4>${result.title}</h4>
                <p>${result.content.slice(0, 150)}...</p>
            </a>
        `).join('') || '<p class="no-results">Keine Ergebnisse gefunden</p>';
    }

    // Scroll-Handler
    function handleScroll() {
        const footer = document.getElementById('main-footer');
        const searchButton = document.querySelector('.search-toggle');
        
        if (!footer || !searchButton) return;

        const footerRect = footer.getBoundingClientRect();
        const buttonRect = searchButton.getBoundingClientRect();
        const buffer = 100;

        // Berechnung der Überlappung
        const shouldHide = buttonRect.bottom + buffer > footerRect.top;
        
        searchButton.classList.toggle('hidden', shouldHide);
    }

    // Optimierte Event-Listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 50);
    });

    window.addEventListener('resize', handleScroll);
    window.addEventListener('load', handleScroll);
    handleScroll();
});