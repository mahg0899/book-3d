/**
 * 3D Book Viewer — Carousel Edition
 * ==================================
 * Multiple books in a scrollable carousel.
 * Active book is draggable for 3D rotation.
 * Floating details button appears when back face is visible.
 */

(function () {
    'use strict';
    const books = [
        {
            title: "El Principito",
            author: "Antoine de Saint-Exupéry",
            year: 1943,
            genre: "Fábula",
            pages: 96,
            rating: 4.33,
            isbn: "978-0-15-601219-5",
            publisher: "Reynal & Hitchcock",
            spineColor: "#1a6b4a",
            coverColors: ["#1a6b4a", "#0d3b29"],
            coverImage: null,
            synopsis: "Un piloto que aterriza en el desierto del Sahara se encuentra con un pequeño príncipe proveniente de un diminuto asteroide. A través de sus conversaciones, el principito comparte las lecciones que aprendió visitando diferentes planetas y sus peculiares habitantes.",
            tags: ["Fábula", "Clásico", "Filosófico", "Infantil"],
            goodreadsUrl: "https://www.goodreads.com/book/show/157993.The_Little_Prince",
            amazonUrl: "https://www.amazon.com/El-principito-Spanish-Antoine-Saint-Exupery/dp/8498381495"
        },
        {
            title: "Cien Años\nde Soledad",
            author: "Gabriel García Márquez",
            year: 1967,
            genre: "Realismo Mágico",
            pages: 417,
            rating: 4.12,
            isbn: "978-0-06-088328-7",
            publisher: "Editorial Sudamericana",
            spineColor: "#7b2d8e",
            coverColors: ["#7b2d8e", "#4a1a56"],
            coverImage: null,
            synopsis: "La historia épica de siete generaciones de la familia Buendía en el pueblo ficticio de Macondo. Una obra maestra del realismo mágico que entrelaza lo extraordinario con lo cotidiano en una narrativa circular sobre el destino y la soledad humana.",
            tags: ["Realismo Mágico", "Novela", "Clásico", "Épica"],
            goodreadsUrl: "https://www.goodreads.com/book/show/320.One_Hundred_Years_of_Solitude",
            amazonUrl: "https://www.amazon.com/soledad-Edici%C3%B3n-Hundred-Solitude-Spanish/dp/B0CZX179S3"
        },
        {
            title: "1984",
            author: "George Orwell",
            year: 1949,
            genre: "Distopía",
            pages: 328,
            rating: 4.20,
            isbn: "978-0-452-28423-4",
            publisher: "Secker & Warburg",
            spineColor: "#c0392b",
            coverColors: ["#1a1a2e", "#0d0d1a"],
            coverImage: null,
            synopsis: "En un futuro totalitario, Winston Smith trabaja para el Partido reescribiendo la historia. Cuando comienza a cuestionar el régimen del omnipresente Gran Hermano y encuentra el amor prohibido, se embarca en un peligroso camino hacia la verdad.",
            tags: ["Distopía", "Política", "Ciencia Ficción", "Clásico"],
            goodreadsUrl: "https://www.goodreads.com/book/show/40961427-1984",
            amazonUrl: "https://www.amazon.com/1984-George-Orwell-ebook/dp/B0F1TDPVBY"
        },
        {
            title: "Don Quijote\nde la Mancha",
            author: "Miguel de Cervantes",
            year: 1605,
            genre: "Novela",
            pages: 863,
            rating: 3.91,
            isbn: "0142437239",
            publisher: "Juan de la Cuesta",
            spineColor: "#8b4513",
            coverColors: ["#8b4513", "#5c2d0e"],
            coverImage: null,
            synopsis: "Las aventuras de un hidalgo manchego que, enloquecido por la lectura de novelas de caballerías, se lanza a recorrer España como caballero andante junto a su escudero Sancho Panza, enfrentando molinos de viento y buscando el amor de Dulcinea.",
            tags: ["Novela", "Sátira", "Aventura", "Clásico"],
            goodreadsUrl: "https://www.goodreads.com/book/show/3836.Don_Quixote",
            amazonUrl: "https://www.amazon.com/Quijote-Edici%C3%B3n-conmemorativa-Quixote-Commemorative/dp/8491057536"
        },
        {
            title: "El Alquimista",
            author: "Paulo Coelho",
            year: 1988,
            genre: "Ficción",
            pages: 163,
            rating: 3.92,
            isbn: "978-0-06-112241-5",
            publisher: "Rocco",
            spineColor: "#b8860b",
            coverColors: ["#b8860b", "#8b6508"],
            coverImage: null,
            synopsis: "Santiago, un joven pastor andaluz, emprende un viaje hasta las pirámides de Egipto en busca de un tesoro soñado. En el camino descubre que el verdadero tesoro no es material, sino el conocimiento de uno mismo y la Leyenda Personal.",
            tags: ["Ficción", "Filosofía", "Aventura", "Espiritual"],
            goodreadsUrl: "https://www.goodreads.com/book/show/865.The_Alchemist",
            amazonUrl: "https://www.amazon.com/El-Alquimista-Edici%C3%B3n-Illustrada-Spanish/dp/0061351342"
        }
    ];

    // ===================== STATE =====================
    let activeIndex = 0;
    let rotX = -8, rotY = -18;
    let isDragging = false;
    let startX = 0, startY = 0;
    let velocityX = 0, velocityY = 0;
    let lastMoveTime = 0;
    let autoRotate = false;
    let scrollCooldown = false;
    const friction = 0.94;

    // ===================== DOM =====================
    const carouselTrack = document.getElementById('carouselTrack');
    const bookInfoTitle = document.getElementById('bookInfoTitle');
    const bookInfoAuthor = document.getElementById('bookInfoAuthor');
    const floatingAction = document.getElementById('floatingAction');
    const fabBtn = document.getElementById('fabBtn');
    const detailsOverlay = document.getElementById('detailsOverlay');
    const detailsBackdrop = document.getElementById('detailsBackdrop');
    const closeBtn = document.getElementById('closeBtn');
    const detailsPanelContent = document.getElementById('detailsPanelContent');
    const resetBtn = document.getElementById('resetBtn');
    const autoRotateBtn = document.getElementById('autoRotateBtn');
    const flipBtn = document.getElementById('flipBtn');
    const prevBook = document.getElementById('prevBook');
    const nextBook = document.getElementById('nextBook');
    const navDots = document.getElementById('navDots');
    const toast = document.getElementById('toast');

    let bookWrappers = [];

    // ===================== INIT =====================
    function init() {
        createBooks();
        createNavDots();
        updateCarousel();
        updateBookInfo();
        setupEvents();
        showToast();
    }

    // ===================== CREATE BOOKS =====================
    function createBooks() {
        books.forEach((book, i) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'book-wrapper';
            wrapper.dataset.index = i;

            const bookEl = document.createElement('div');
            bookEl.className = 'book';

            // Front face
            const front = document.createElement('div');
            front.className = 'face front';
            front.style.background = `linear-gradient(135deg, ${book.coverColors[0]}, ${book.coverColors[1]})`;

            if (book.coverImage) {
                const img = document.createElement('img');
                img.className = 'cover-image';
                img.src = book.coverImage;
                img.alt = book.title;
                img.draggable = false;
                front.appendChild(img);
            }

            const placeholder = document.createElement('div');
            placeholder.className = 'cover-placeholder';
            placeholder.innerHTML = `
                <div class="cover-ornament-top"></div>
                <h3 class="cover-title">${book.title}</h3>
                <p class="cover-author">${book.author}</p>
                <div class="cover-ornament-bottom"></div>
                <span class="cover-year">${book.year}</span>
            `;
            if (book.coverImage) placeholder.style.display = 'none';
            front.appendChild(placeholder);

            const shine = document.createElement('div');
            shine.className = 'cover-shine';
            front.appendChild(shine);

            // Back face
            const back = document.createElement('div');
            back.className = 'face back';
            back.style.background = `linear-gradient(170deg, ${book.coverColors[0]}dd, ${book.coverColors[1]})`;
            back.innerHTML = `
                <div class="back-content">
                    <span class="back-genre">${book.genre}</span>
                    <p class="back-synopsis">${book.synopsis}</p>
                    <div class="back-meta">
                        <span class="back-isbn">${book.isbn}</span>
                        <div class="back-barcode"></div>
                    </div>
                </div>
            `;

            // Spine
            const spine = document.createElement('div');
            spine.className = 'face spine';
            spine.style.background = `linear-gradient(180deg, ${book.spineColor}, ${book.coverColors[1]})`;
            spine.innerHTML = `
                <div class="spine-inner">
                    <span class="spine-author-text">${book.author.split(' ').pop()}</span>
                    <span class="spine-title-text">${book.title.replace('\n', ' ')}</span>
                    <span class="spine-publisher">◆</span>
                </div>
            `;

            // Pages edge
            const pages = document.createElement('div');
            pages.className = 'face pages';

            // Top edge
            const topEdge = document.createElement('div');
            topEdge.className = 'face top-edge';

            // Bottom edge
            const bottomEdge = document.createElement('div');
            bottomEdge.className = 'face bottom-edge';

            bookEl.append(front, back, spine, pages, topEdge, bottomEdge);
            wrapper.appendChild(bookEl);
            carouselTrack.appendChild(wrapper);
            bookWrappers.push(wrapper);
        });
    }

    // ===================== NAV DOTS =====================
    function createNavDots() {
        books.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'nav-dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => goToBook(i));
            navDots.appendChild(dot);
        });
    }

    function updateNavDots() {
        navDots.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }

    // ===================== CAROUSEL =====================
    function updateCarousel() {
        bookWrappers.forEach((wrapper, i) => {
            const offset = i - activeIndex;
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            // Position
            const spacing = 280;
            const tx = offset * spacing;
            const scale = isActive ? 1 : Math.max(0.55, 0.75 - absOffset * 0.1);
            const tz = isActive ? 0 : -150 - absOffset * 50;
            const ry = isActive ? 0 : offset * -15;
            const op = isActive ? 1 : Math.max(0, 0.6 - (absOffset - 1) * 0.25);

            wrapper.style.transform = `translateX(${tx}px) translateZ(${tz}px) scale(${scale})`;
            wrapper.style.opacity = op;
            wrapper.style.filter = isActive ? 'none' : `brightness(0.6)`;
            wrapper.classList.toggle('active', isActive);
            wrapper.classList.toggle('hidden', absOffset > 2);

            // Reset non-active books to default angle
            const bookEl = wrapper.querySelector('.book');
            if (!isActive) {
                bookEl.classList.add('smooth');
                bookEl.style.transform = `rotateX(-5deg) rotateY(${ry - 20}deg)`;
                setTimeout(() => bookEl.classList.remove('smooth'), 700);
            }
        });

        updateNavDots();
        prevBook.disabled = activeIndex === 0;
        nextBook.disabled = activeIndex === books.length - 1;
    }

    function goToBook(index) {
        if (index < 0 || index >= books.length || index === activeIndex) return;

        // Stop active book interactions
        autoRotate = false;
        autoRotateBtn.classList.remove('active');
        velocityX = 0;
        velocityY = 0;

        activeIndex = index;
        rotX = -8;
        rotY = -18;

        // Apply reset rotation to newly active book
        const activeWrapper = bookWrappers[activeIndex];
        const bookEl = activeWrapper.querySelector('.book');
        bookEl.classList.add('smooth');
        bookEl.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        setTimeout(() => bookEl.classList.remove('smooth'), 700);

        updateCarousel();
        updateBookInfo();
        checkBackFace();
    }

    function updateBookInfo() {
        const book = books[activeIndex];
        bookInfoTitle.textContent = book.title.replace('\n', ' ');
        bookInfoAuthor.textContent = book.author;
    }

    // ===================== ACTIVE BOOK ROTATION =====================
    function getActiveBook() {
        return bookWrappers[activeIndex]?.querySelector('.book');
    }

    function updateActiveBook() {
        const bookEl = getActiveBook();
        if (bookEl) {
            bookEl.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }
        checkBackFace();
    }

    function checkBackFace() {
        const normalizedY = ((rotY % 360) + 360) % 360;
        const isBackVisible = normalizedY > 90 && normalizedY < 270;
        floatingAction.classList.toggle('visible', isBackVisible);
    }

    // ===================== DRAG EVENTS =====================
    function onPointerDown(e) {
        if (e.target.closest('.fab') || e.target.closest('.ctrl-btn') ||
            e.target.closest('.nav-arrow') || e.target.closest('.nav-dot') ||
            e.target.closest('.close-btn') || e.target.closest('.details-panel')) return;

        // If clicking a non-active book, switch to it
        const wrapper = e.target.closest('.book-wrapper');
        if (wrapper && !wrapper.classList.contains('active')) {
            goToBook(parseInt(wrapper.dataset.index));
            return;
        }

        if (!wrapper?.classList.contains('active')) return;

        isDragging = true;
        autoRotate = false;
        autoRotateBtn.classList.remove('active');
        velocityX = 0;
        velocityY = 0;

        const point = e.touches ? e.touches[0] : e;
        startX = point.clientX;
        startY = point.clientY;

        const bookEl = getActiveBook();
        if (bookEl) bookEl.classList.remove('smooth');

        e.preventDefault();
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const point = e.touches ? e.touches[0] : e;
        const dx = point.clientX - startX;
        const dy = point.clientY - startY;

        rotY += dx * 0.4;
        rotX -= dy * 0.4;
        rotX = Math.max(-70, Math.min(70, rotX));

        velocityX = dx * 0.4;
        velocityY = -dy * 0.4;
        lastMoveTime = performance.now();

        startX = point.clientX;
        startY = point.clientY;
        updateActiveBook();
        e.preventDefault();
    }

    function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        startInertia();
    }

    // ===================== INERTIA =====================
    function startInertia() {
        function animate() {
            if (autoRotate || isDragging) return;
            if (Math.abs(velocityX) > 0.02 || Math.abs(velocityY) > 0.02) {
                rotY += velocityX;
                rotX += velocityY;
                rotX = Math.max(-70, Math.min(70, rotX));
                velocityX *= friction;
                velocityY *= friction;
                updateActiveBook();
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }

    // ===================== CONTROLS =====================
    function resetView() {
        autoRotate = false;
        autoRotateBtn.classList.remove('active');
        velocityX = 0;
        velocityY = 0;
        rotX = -8;
        rotY = -18;
        const bookEl = getActiveBook();
        if (bookEl) {
            bookEl.classList.add('smooth');
            updateActiveBook();
            setTimeout(() => bookEl.classList.remove('smooth'), 600);
        }
    }

    function toggleAutoRotate() {
        autoRotate = !autoRotate;
        autoRotateBtn.classList.toggle('active', autoRotate);
        if (autoRotate) {
            (function spin() {
                if (!autoRotate) return;
                rotY += 0.3;
                updateActiveBook();
                requestAnimationFrame(spin);
            })();
        }
    }

    function flipToBack() {
        autoRotate = false;
        autoRotateBtn.classList.remove('active');
        velocityX = 0;
        velocityY = 0;
        const curr = ((rotY % 360) + 360) % 360;
        let diff = 180 - curr;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        rotY += diff;
        rotX = -5;
        const bookEl = getActiveBook();
        if (bookEl) {
            bookEl.classList.add('smooth');
            updateActiveBook();
            setTimeout(() => bookEl.classList.remove('smooth'), 600);
        }
    }

    // ===================== DETAILS PANEL =====================
    function openDetails() {
        const book = books[activeIndex];
        const stars = Array.from({ length: 5 }, (_, i) =>
            `<span class="details-star${i >= Math.floor(book.rating) ? ' dim' : ''}">★</span>`
        ).join('');
        const tags = book.tags.map(t => `<span class="details-tag">${t}</span>`).join('');

        const coverHtml = book.coverImage
            ? `<img src="${book.coverImage}" alt="${book.title}" style="width:100%;height:100%;object-fit:cover;">`
            : `<div class="cover-placeholder-mini" style="background:linear-gradient(135deg,${book.coverColors[0]},${book.coverColors[1]})">${book.title.replace('\n', ' ')}</div>`;

        detailsPanelContent.innerHTML = `
            <div class="details-header-row">
                <div class="details-cover-mini">${coverHtml}</div>
                <div class="details-title-block">
                    <span class="details-genre-label">${book.genre}</span>
                    <h2 class="details-book-title">${book.title.replace('\n', ' ')}</h2>
                    <p class="details-book-author">${book.author}</p>
                    <div class="details-rating">
                        ${stars}
                        <span class="details-rating-num">${book.rating} / 5.0</span>
                    </div>
                </div>
            </div>
            <div class="details-divider"></div>
            <div class="details-grid">
                <div class="detail-item"><span class="detail-label">Autor</span><span class="detail-value">${book.author}</span></div>
                <div class="detail-item"><span class="detail-label">Publicador</span><span class="detail-value">${book.publisher}</span></div>
                <div class="detail-item"><span class="detail-label">Año</span><span class="detail-value">${book.year}</span></div>
                <div class="detail-item"><span class="detail-label">Género</span><span class="detail-value">${book.genre}</span></div>
                <div class="detail-item"><span class="detail-label">Páginas</span><span class="detail-value">${book.pages}</span></div>
                <div class="detail-item"><span class="detail-label">ISBN</span><span class="detail-value">${book.isbn}</span></div>
            </div>
            <div class="details-divider"></div>
            <h3 class="details-synopsis-title">Sinopsis</h3>
            <p class="details-synopsis-text">${book.synopsis}</p>
            <div class="details-tags">${tags}</div>
            <div class="details-divider"></div>
            <div class="details-links">
                <a href="${book.goodreadsUrl}" target="_blank" rel="noopener noreferrer" class="details-link">
                    <svg class="link-icon-gr" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="rgb(255, 255, 255)" d="M170.8 467.3L173.6 467.3C186.3 467.3 199.1 467.3 211.8 467.4C213.4 467.4 214.9 467 215.4 469.5C222.5 504.4 245.4 524.1 278.3 533.4C305.2 541 332.4 541.2 359.6 535.2C393.4 527.8 415.6 506.9 427.6 474.8C435.6 453.3 438.3 431 438.6 408.3C438.7 402.5 438.9 361.3 438.4 355.5L437.5 355.2C436.7 356.7 435.8 358.1 435 359.6C412.9 402.7 373.7 427 329.6 428.7C226.6 432.7 160.2 371.7 157.6 252.5C157.1 228.8 159.4 205.6 165.9 182.8C186.5 111.7 240.5 64.6 319.8 64C381.1 63.6 421.3 102.7 436 134.3C436.5 135.4 437.3 136.6 438.4 136.2L438.4 74.6L482.7 74.6C482.7 354.9 482.8 406.8 482.8 406.8C482.7 485.3 456.1 550.5 379.8 569C310.3 585.9 220.8 573.8 183.8 511.8C175.8 498.3 172 483.5 170.8 467.3zM317.1 100.5C264.6 100 208.6 141.2 202.1 234.3C198 293.3 216.9 356.5 273.6 382.9C301.2 395.8 347.9 397.9 381.9 374.2C429.5 341 444.6 277.2 436.7 220.2C427 149.1 388.9 100.2 317.1 100.5z"/></svg>
                    <span>Goodreads</span>
                </a>
                <a href="${book.amazonUrl}" target="_blank" rel="noopener noreferrer" class="details-link">
                    <svg class="link-icon-az" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="rgb(255, 255, 255)" d="M353.7 226.7C305 228.5 184.2 242.2 184.2 344.2C184.2 453.7 322.5 458.2 367.7 387.4C374.2 397.6 403.1 424.9 413 434.2L469.8 378.2C469.8 378.2 437.5 352.9 437.5 325.4L437.5 178.3C437.5 153 413 96 325.2 96C237.2 96 190.5 151 190.5 200.3L264 207.1C280.3 157.6 318.2 157.6 318.2 157.6C358.9 157.5 353.7 187.4 353.7 226.7zM353.7 313.5C353.7 393.5 269.5 381.5 269.5 330.7C269.5 283.5 320 274 353.7 272.9L353.7 313.5zM489.7 477C482 487 419.7 544 315.2 544C210.7 544 130.7 472.5 106.2 443C99.4 435.3 107.2 431.7 111.7 434.7C185 479.2 299.5 552.5 484.2 465C491.7 461.3 497.5 467 489.7 477zM529.5 479.2C523 495 513.5 506 508.3 510.2C502.8 514.7 498.8 512.9 501.8 506.4C504.8 499.9 521.1 459.9 514.5 451.4C508 443.1 477.5 447.1 466.5 448.2C455.7 449.2 453.5 450.2 452.5 447.9C450.2 442.2 474.2 432.4 490 430.4C505.7 428.6 531 429.6 536 436.1C539.7 441.2 536 463.2 529.5 479.2z"/></svg>
                    <span>Amazon</span>
                </a>
            </div>
        `;
        detailsOverlay.classList.add('open');
    }

    function closeDetails() {
        detailsOverlay.classList.remove('open');
    }

    // ===================== SCROLL NAV =====================
    function onWheel(e) {
        if (detailsOverlay.classList.contains('open')) return;
        if (scrollCooldown) return;

        e.preventDefault();
        scrollCooldown = true;

        if (e.deltaY > 0) goToBook(activeIndex + 1);
        else if (e.deltaY < 0) goToBook(activeIndex - 1);

        setTimeout(() => { scrollCooldown = false; }, 500);
    }

    // ===================== TOAST =====================
    function showToast() {
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        }, 800);
    }

    // ===================== EVENTS =====================
    function setupEvents() {
        // Drag
        carouselTrack.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);
        carouselTrack.addEventListener('touchstart', onPointerDown, { passive: false });
        window.addEventListener('touchmove', onPointerMove, { passive: false });
        window.addEventListener('touchend', onPointerUp);
        carouselTrack.addEventListener('contextmenu', e => e.preventDefault());

        // Scroll
        window.addEventListener('wheel', onWheel, { passive: false });

        // Controls
        resetBtn.addEventListener('click', resetView);
        autoRotateBtn.addEventListener('click', toggleAutoRotate);
        flipBtn.addEventListener('click', flipToBack);
        prevBook.addEventListener('click', () => goToBook(activeIndex - 1));
        nextBook.addEventListener('click', () => goToBook(activeIndex + 1));

        // Details
        fabBtn.addEventListener('click', openDetails);
        closeBtn.addEventListener('click', closeDetails);
        detailsBackdrop.addEventListener('click', closeDetails);

        // Keyboard
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeDetails();
            if (e.key === 'r' || e.key === 'R') resetView();
            if (e.key === 'f' || e.key === 'F') flipToBack();
            if (e.key === ' ') { e.preventDefault(); toggleAutoRotate(); }
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToBook(activeIndex + 1);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToBook(activeIndex - 1);
        });

        // Zoom
        carouselTrack.addEventListener('wheel', e => {
            // handled by global wheel
        }, { passive: true });
    }

    // ===================== START =====================
    init();
})();
