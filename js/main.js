// ==================== COPY HEX ==================== //
function copyHex(card) {
    const hex = card.dataset.hex;
    navigator.clipboard.writeText(hex).then(() => {
        card.classList.add('copied');
        setTimeout(() => card.classList.remove('copied'), 1500);
    });
}

// ==================== INIT ==================== //
document.addEventListener('DOMContentLoaded', () => {

    // ==================== NAV SCROLL ==================== //
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ==================== SCROLL REVEAL ==================== //
    const reveals = document.querySelectorAll('.section-header, .color-card, .type-card, .logo-variant, .element-card, .app-card, .v3-layout, .type-hierarchy, .color-proportion');
    reveals.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // ==================== 3D MOCKUP ==================== //
    const scene = document.getElementById('v3Scene');
    const box = document.getElementById('v3Box');

    if (!scene || !box) return;

    let isDragging = false;
    let startX, startY;
    let currentRotateX = 5;
    let currentRotateY = -25;
    let autoId = null;

    function updateTransform() {
        box.style.transform = 'translateZ(-49px) rotateY(' + currentRotateY + 'deg) rotateX(' + currentRotateX + 'deg)';
    }

    function stopAuto() {
        if (autoId) { clearInterval(autoId); autoId = null; }
    }

    // Mouse drag
    scene.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        stopAuto();
        box.style.transition = 'none';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        currentRotateY += (e.clientX - startX) * 0.5;
        currentRotateX -= (e.clientY - startY) * 0.3;
        currentRotateX = Math.max(-30, Math.min(30, currentRotateX));
        startX = e.clientX;
        startY = e.clientY;
        updateTransform();
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            box.style.transition = 'transform 0.3s ease';
        }
    });

    // Touch drag
    scene.addEventListener('touchstart', function(e) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        stopAuto();
        box.style.transition = 'none';
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        currentRotateY += (e.touches[0].clientX - startX) * 0.5;
        currentRotateX -= (e.touches[0].clientY - startY) * 0.3;
        currentRotateX = Math.max(-30, Math.min(30, currentRotateX));
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        updateTransform();
    }, { passive: true });

    document.addEventListener('touchend', function() {
        if (isDragging) {
            isDragging = false;
            box.style.transition = 'transform 0.3s ease';
        }
    });

    // Control buttons - expose globally
    window.resetMockup = function() {
        stopAuto();
        currentRotateX = 5;
        currentRotateY = -25;
        box.style.transition = 'transform 0.6s ease';
        updateTransform();
    };

    window.autoRotate = function() {
        if (autoId) { stopAuto(); return; }
        box.style.transition = 'none';
        autoId = setInterval(function() {
            currentRotateY += 0.5;
            updateTransform();
        }, 16);
    };

    window.showFront = function() {
        stopAuto();
        currentRotateX = 0;
        currentRotateY = 0;
        box.style.transition = 'transform 0.6s ease';
        updateTransform();
    };

    window.showBack = function() {
        stopAuto();
        currentRotateX = 0;
        currentRotateY = 180;
        box.style.transition = 'transform 0.6s ease';
        updateTransform();
    };

    window.showSide = function() {
        stopAuto();
        currentRotateX = 0;
        currentRotateY = -90;
        box.style.transition = 'transform 0.6s ease';
        updateTransform();
    };

    // ==================== LIVE UPDATE ==================== //
    function updateMockupData() {
        var model = document.getElementById('v3Model').value.toUpperCase() || 'PHANTOM';
        var type = document.getElementById('v3Type').value.toUpperCase() || 'JERKBAIT';
        var series = document.getElementById('v3Series').value.toUpperCase() || 'PRO SERIES';
        var size = document.getElementById('v3Size').value || '120';
        var weight = document.getElementById('v3Weight').value || '18';
        var depth = document.getElementById('v3Depth').value || '1.5-1.8';
        var hooks = document.getElementById('v3Hooks').value || '#6 x3';
        var water = document.getElementById('v3Water').value;
        var code = document.getElementById('v3Code').value.toUpperCase() || '120SP';
        var fullModel = model + ' ' + code;
        var maxDepth = depth.indexOf('-') !== -1 ? depth.split('-').pop() : depth;

        // Front card
        document.getElementById('v3FrontSeries').textContent = series;
        document.getElementById('v3FrontModel').textContent = model;
        document.getElementById('v3FrontType').textContent = type;
        document.getElementById('v3FrontWater').textContent = water;
        document.getElementById('v3FrontSpecs').textContent = size + 'mm | ' + weight + 'g';
        document.getElementById('v3FrontDepth').textContent = depth + 'm';

        // Front PVC info
        document.getElementById('v3FrontInfoModel').textContent = fullModel;
        document.getElementById('v3FrontInfoCategory').textContent = type;
        document.getElementById('v3FrontInfoSpecs').textContent = size + 'mm / ' + weight + 'g / ' + maxDepth + 'm';

        // Back
        document.getElementById('v3BackModel').textContent = fullModel;
        document.getElementById('v3BackSize').textContent = size + 'mm';
        document.getElementById('v3BackWeight').textContent = weight + 'g';
        document.getElementById('v3BackDepth').textContent = depth + 'm';
        document.getElementById('v3BackWater').textContent = water === 'MEIA AGUA' ? 'Meia Agua' : water === 'SUPERFICIE' ? 'Superficie' : 'Fundo';
        document.getElementById('v3BackHooks').textContent = hooks;

        // Sides
        document.getElementById('v3LeftSize').textContent = size + 'mm';
        document.getElementById('v3LeftWeight').textContent = weight + 'g';
        document.getElementById('v3LeftDepth').textContent = maxDepth + 'm';
        document.getElementById('v3RightModel').textContent = model;
        document.getElementById('v3RightType').textContent = type;
        document.getElementById('v3RightSize').textContent = size + 'mm';
        document.getElementById('v3RightWeight').textContent = weight + 'g';
        document.getElementById('v3RightWater').textContent = water;
    }

    document.querySelectorAll('#embalagem .v3-input').forEach(function(input) {
        input.addEventListener('input', updateMockupData);
        input.addEventListener('change', updateMockupData);
    });

    // ==================== SMOOTH SCROLL ==================== //
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
