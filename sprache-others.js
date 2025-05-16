// sprache-others.js - Vollständig aktualisierte Version
document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        popup: document.getElementById('languagePopup'),
        icon: document.getElementById('languageIcon'),
        closeBtn: document.querySelector('.close-popup'),
        flags: document.querySelectorAll('.flag-option'),
        footer: document.getElementById('main-footer')
    };

    // Sprachwechsel-Logik
    const setLanguage = (lang) => {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');
        const fileName = pathParts.pop();
        const basePath = pathParts.join('/');

        // Sonderbehandlung für About-Seiten
        if(fileName === 'about.html' || fileName === 'about-eng.html') {
            const newFile = lang === 'de' ? 'about.html' : 'about-eng.html';
            window.location.href = basePath + '/' + newFile;
            return;
        }

        // Generelle URL-Verarbeitung
        const newFileName = fileName.includes('-eng.html') 
            ? fileName.replace('-eng.html', '.html')
            : fileName.replace('.html', '-eng.html');

        window.location.href = basePath + '/' + newFileName;
    };

    // Event-Handler
    const handleIconClick = () => elements.popup.style.display = 'flex';
    const handleCloseClick = () => elements.popup.style.display = 'none';
    const handlePopupClick = (e) => e.target === elements.popup && (elements.popup.style.display = 'none');

    const handleFlagClick = (flag) => {
        elements.flags.forEach(f => f.classList.remove('active'));
        flag.classList.add('active');
        setLanguage(flag.dataset.lang);
    };

    // Scroll-Listener für Icon
    const updateIconVisibility = () => {
        if(!elements.footer) return;
        const footerRect = elements.footer.getBoundingClientRect();
        elements.icon.style.display = footerRect.top < window.innerHeight ? 'none' : 'block';
    };

    // Event-Listener zuweisen
    elements.icon.addEventListener('click', handleIconClick);
    elements.closeBtn.addEventListener('click', handleCloseClick);
    elements.popup.addEventListener('click', handlePopupClick);
    elements.flags.forEach(flag => 
        flag.addEventListener('click', () => handleFlagClick(flag))
    );

    window.addEventListener('scroll', updateIconVisibility);
    window.addEventListener('resize', updateIconVisibility);
    
    // Initiale Ausführung
    updateIconVisibility();
});
  
  
  