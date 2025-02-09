

window.addEventListener('load', () => {
    const minDisplayTime = 1000;
    
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const startTime = Date.now();

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Show content
        content.classList.add('visible');
        
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, remainingTime);
});

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.price-counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const price = parseInt(target.dataset.price);
                let current = 0;
                const increment = price / 100;
                
                target.textContent = current.toLocaleString('cs-CZ') + ' Kč';
                target.parentElement.parentElement.classList.add('card-visible');

                const updateCounter = () => {
                    current += increment;
                    if (current < price) {
                        target.textContent = Math.ceil(current).toLocaleString('cs-CZ') + ' Kč';
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = price.toLocaleString('cs-CZ') + ' Kč';
                    }
                };

                requestAnimationFrame(updateCounter);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});

