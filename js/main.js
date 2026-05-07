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

    // ==================== V4 MOCKUP 3D ==================== //
    var scene4 = document.getElementById('v4Scene');
    var box4 = document.getElementById('v4Box');

    if (scene4 && box4) {
        var isDrag4 = false, sx4, sy4;
        var rx4 = 5, ry4 = -25, auto4 = null;

        function updateV4() {
            box4.style.transform = 'translateZ(-49px) rotateY(' + ry4 + 'deg) rotateX(' + rx4 + 'deg)';
        }
        function stopAuto4() { if (auto4) { clearInterval(auto4); auto4 = null; } }

        scene4.addEventListener('mousedown', function(e) {
            isDrag4 = true; sx4 = e.clientX; sy4 = e.clientY;
            stopAuto4(); box4.style.transition = 'none';
        });
        document.addEventListener('mousemove', function(e) {
            if (!isDrag4) return;
            ry4 += (e.clientX - sx4) * 0.5;
            rx4 -= (e.clientY - sy4) * 0.3;
            rx4 = Math.max(-30, Math.min(30, rx4));
            sx4 = e.clientX; sy4 = e.clientY;
            updateV4();
        });
        document.addEventListener('mouseup', function() {
            if (isDrag4) { isDrag4 = false; box4.style.transition = 'transform 0.3s ease'; }
        });

        scene4.addEventListener('touchstart', function(e) {
            isDrag4 = true; sx4 = e.touches[0].clientX; sy4 = e.touches[0].clientY;
            stopAuto4(); box4.style.transition = 'none';
        }, { passive: true });
        document.addEventListener('touchmove', function(e) {
            if (!isDrag4) return;
            ry4 += (e.touches[0].clientX - sx4) * 0.5;
            rx4 -= (e.touches[0].clientY - sy4) * 0.3;
            rx4 = Math.max(-30, Math.min(30, rx4));
            sx4 = e.touches[0].clientX; sy4 = e.touches[0].clientY;
            updateV4();
        }, { passive: true });
        document.addEventListener('touchend', function() {
            if (isDrag4) { isDrag4 = false; box4.style.transition = 'transform 0.3s ease'; }
        });

        window.resetV4 = function() { stopAuto4(); rx4=5; ry4=-25; box4.style.transition='transform 0.6s ease'; updateV4(); };
        window.autoRotateV4 = function() {
            if (auto4) { stopAuto4(); return; }
            box4.style.transition = 'none';
            auto4 = setInterval(function() { ry4 += 0.5; updateV4(); }, 16);
        };
        window.showFrontV4 = function() { stopAuto4(); rx4=0; ry4=0; box4.style.transition='transform 0.6s ease'; updateV4(); };
        window.showBackV4 = function() { stopAuto4(); rx4=0; ry4=180; box4.style.transition='transform 0.6s ease'; updateV4(); };
        window.showSideV4 = function() { stopAuto4(); rx4=0; ry4=-90; box4.style.transition='transform 0.6s ease'; updateV4(); };
    }

    // ==================== V5 MOCKUP 3D ==================== //
    var scene5 = document.getElementById('v5Scene');
    var box5 = document.getElementById('v5Box');

    if (scene5 && box5) {
        var isDrag5 = false, sx5, sy5;
        var rx5 = 5, ry5 = -25, auto5 = null;

        function updateV5() {
            box5.style.transform = 'translateZ(-49px) rotateY(' + ry5 + 'deg) rotateX(' + rx5 + 'deg)';
        }
        function stopAuto5() { if (auto5) { clearInterval(auto5); auto5 = null; } }

        scene5.addEventListener('mousedown', function(e) {
            isDrag5 = true; sx5 = e.clientX; sy5 = e.clientY;
            stopAuto5(); box5.style.transition = 'none';
        });
        document.addEventListener('mousemove', function(e) {
            if (!isDrag5) return;
            ry5 += (e.clientX - sx5) * 0.5;
            rx5 -= (e.clientY - sy5) * 0.3;
            rx5 = Math.max(-30, Math.min(30, rx5));
            sx5 = e.clientX; sy5 = e.clientY;
            updateV5();
        });
        document.addEventListener('mouseup', function() {
            if (isDrag5) { isDrag5 = false; box5.style.transition = 'transform 0.3s ease'; }
        });

        scene5.addEventListener('touchstart', function(e) {
            isDrag5 = true; sx5 = e.touches[0].clientX; sy5 = e.touches[0].clientY;
            stopAuto5(); box5.style.transition = 'none';
        }, { passive: true });
        document.addEventListener('touchmove', function(e) {
            if (!isDrag5) return;
            ry5 += (e.touches[0].clientX - sx5) * 0.5;
            rx5 -= (e.touches[0].clientY - sy5) * 0.3;
            rx5 = Math.max(-30, Math.min(30, rx5));
            sx5 = e.touches[0].clientX; sy5 = e.touches[0].clientY;
            updateV5();
        }, { passive: true });
        document.addEventListener('touchend', function() {
            if (isDrag5) { isDrag5 = false; box5.style.transition = 'transform 0.3s ease'; }
        });

        window.resetV5 = function() { stopAuto5(); rx5=5; ry5=-25; box5.style.transition='transform 0.6s ease'; updateV5(); };
        window.autoRotateV5 = function() {
            if (auto5) { stopAuto5(); return; }
            box5.style.transition = 'none';
            auto5 = setInterval(function() { ry5 += 0.5; updateV5(); }, 16);
        };
        window.showFrontV5 = function() { stopAuto5(); rx5=0; ry5=0; box5.style.transition='transform 0.6s ease'; updateV5(); };
        window.showBackV5 = function() { stopAuto5(); rx5=0; ry5=180; box5.style.transition='transform 0.6s ease'; updateV5(); };
        window.showSideV5 = function() { stopAuto5(); rx5=0; ry5=-90; box5.style.transition='transform 0.6s ease'; updateV5(); };
    }

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
