

(function() {
    'use strict';

    // ---- DOM refs ----
    const cards = document.querySelectorAll('.card img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const lbTitle = document.getElementById('lbTitle');
    const lbCategory = document.getElementById('lbCategory');

    const filterButtons = document.querySelectorAll('[data-filter]');
    const galleryItems = document.querySelectorAll('.card');

    let currentIndex = 0;

    // ---- Open lightbox ----
    function openLightbox(index) {
        const img = cards[index];
        if (!img) return;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Image';

        // Update caption
        const card = img.closest('.card');
        const overlaySpan = card ? card.querySelector('.overlay span') : null;
        const categoryText = overlaySpan ? overlaySpan.textContent.trim() : 'Category';
        lbTitle.textContent = img.alt || 'Untitled';
        lbCategory.textContent = categoryText;

        currentIndex = index;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // prevent scroll
    }

    // ---- Close lightbox ----
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    // ---- Navigate ----
    function navigate(direction) {
        const total = cards.length;
        if (total === 0) return;
        const newIndex = (currentIndex + direction + total) % total;
        openLightbox(newIndex);
    }

    // ---- Event listeners ----
    // Click on images
    cards.forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(idx));
    });

    // Close button
    closeBtn.addEventListener('click', closeLightbox);

    // Navigation buttons
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Click on lightbox background to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display !== 'flex') return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    // ---- Filter functionality ----
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            galleryItems.forEach(item => {
                const hasCategory = item.classList.contains(filterValue);
                if (filterValue === 'all' || hasCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    lightbox.style.display = 'none';

})();