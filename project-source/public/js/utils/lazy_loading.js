export default class LazyLoading {

    static lazyLoadImages = () => {
        const images = document.querySelectorAll('.lazy');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const src = image.getAttribute('data-src');
                    if (src) {
                        image.setAttribute('src', src);
                        image.classList.remove('lazy');
                        imageObserver.unobserve(image);
                    }
                }
            });
        }, options);
        images.forEach(image => {
            imageObserver.observe(image);
        });
    };

}