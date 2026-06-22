
document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    const cards = document.querySelectorAll('.card img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

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

        // Update caption if elements exist
        if (lbTitle && lbCategory) {
            const card = img.closest('.card');
            const overlaySpan = card ? card.querySelector('.overlay span') : null;
            const categoryText = overlaySpan ? overlaySpan.textContent.trim() : 'Category';
            lbTitle.textContent = img.alt || 'Untitled';
            lbCategory.textContent = categoryText;
        }

        currentIndex = index;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
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
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(idx);
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navigate(-1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navigate(1);
        });
    }


    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display !== 'flex') return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            galleryItems.forEach(function(item) {
                const hasCategory = item.classList.contains(filterValue);
                if (filterValue === 'all' || hasCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    
    if (lightbox) {
        lightbox.style.display = 'none';
    }

    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) {
        allBtn.classList.add('active');
    }
    galleryItems.forEach(function(item) {
        item.style.display = 'block';
    });

});