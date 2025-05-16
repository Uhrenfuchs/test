document.addEventListener('DOMContentLoaded', () => {
    const faqElements = document.querySelectorAll('.custom-faq-element');
    
    const handleFaqInteraction = (element) => {
        const wasActive = element.classList.contains('is-active');
        
        faqElements.forEach(otherElement => {
            otherElement.classList.remove('is-active');
        });

        if (!wasActive) {
            element.classList.add('is-active');
            if (window.innerWidth <= 786) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    faqElements.forEach(element => {
        const question = element.querySelector('.custom-faq-question');
        
        // Click Event
        question.addEventListener('click', (e) => {
            e.stopPropagation();
            handleFaqInteraction(element);
        });

        // Keyboard Event
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFaqInteraction(element);
            }
        });
    });
});