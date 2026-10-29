/**
 * The Tea House - Interactive 5D & 3D Cinematic Showcase Engine
 * Orchestrates:
 * - 3D Multi-Layer Tilt & Dynamic Specular Light physics
 * - Interactive Mouse Spotlight Tracking for all cards
 * - Bento Grid Interactive Widgets & Micro-Interactions
 * - 3D Testimonial Perspective Deck Stack
 * - Interactive Journal Reader Drawer & Article Modal
 * - Virtual Tea Brewing Simulator with animated water wave & bubbles
 * - Interactive Tasting Modal & Cart Drawer with Leaf Confetti
 * - Smooth Magnetic Cursor & Magnetic Button Physics
 * - Procedural 5D Sound Controls & Hover Audio Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Product Database ---
    const PRODUCTS = {
        'milk-tea': {
            id: 'milk-tea',
            name: 'Hokkaido Cream Velvet',
            category: 'Milk Tea',
            tag: 'Award Winner 2026',
            price: '$18.50',
            image: './images/tea-1.png',
            desc: 'A luxurious pairing of high-mountain Assam black tea with rich Hokkaido fresh cream and subtle Madagascar bourbon vanilla notes.',
            origin: 'Mount Ali, Taiwan & Hokkaido, Japan',
            temp: '90°C / 194°F',
            steepTime: '4 min',
            caffeine: 'Medium-High',
            caffeinePercent: 75,
            aroma: 'Sweet Malt & Madagascar Vanilla',
            notes: ['Madagascar Vanilla', 'Caramelized Malt', 'Silky Hokkaido Cream', 'Wild Clover Honey'],
            color: 'from-amber-700/30 to-orange-950/20'
        },
        'black-tea': {
            id: 'black-tea',
            name: 'Imperial Golden Yunnan',
            category: 'Black Tea',
            tag: 'Single Estate Reserve',
            price: '$24.00',
            image: './images/tea-2.png',
            desc: 'Hand-plucked tender golden tips from 300-year-old wild tea arbors. Delivers an intoxicating fragrance of smoked plum and raw mountain honey.',
            origin: 'Fengqing, Yunnan Province',
            temp: '95°C / 203°F',
            steepTime: '3.5 min',
            caffeine: 'High',
            caffeinePercent: 90,
            aroma: 'Wild Honey & Smoked Plum',
            notes: ['Smoked Plum', 'Dark Chocolate', 'Wild Mountain Honey', 'Orchid Finish'],
            color: 'from-red-900/30 to-amber-950/20'
        },
        'green-tea': {
            id: 'green-tea',
            name: 'Ceremonial Uji Jade',
            category: 'Green Tea',
            tag: 'First Flush Spring',
            price: '$28.00',
            image: './images/tea-3.png',
            desc: 'Shade-grown for 21 days beneath bamboo screens to maximize theanine and umami. Stone-milled slowly for an ethereal emerald liquor.',
            origin: 'Uji, Kyoto, Japan',
            temp: '75°C / 167°F',
            steepTime: '2 min',
            caffeine: 'Medium',
            caffeinePercent: 55,
            aroma: 'Sweet Grass & Toasted Umami',
            notes: ['Fresh Spring Grass', 'Toasted Chestnut', 'Marine Umami', 'Pistachio Cream'],
            color: 'from-emerald-900/30 to-teal-950/20'
        },
        'lemon-tea': {
            id: 'lemon-tea',
            name: 'Sicilia Bergamot Sunburst',
            category: 'Lemon Tea',
            tag: 'Botanical Infusion',
            price: '$16.50',
            image: './images/tea-4.png',
            desc: 'Sun-drenched Mediterranean lemons cold-pressed with premium Ceylon orange pekoe and aromatic bergamot blossoms for invigorating vibrancy.',
            origin: 'Dimbula, Sri Lanka & Sicily, Italy',
            temp: '85°C / 185°F',
            steepTime: '3 min',
            caffeine: 'Low',
            caffeinePercent: 35,
            aroma: 'Zesty Citrus & Crisp Bergamot',
            notes: ['Sicilian Lemon Peel', 'Bergamot Bloom', 'Crisp Amber Tea', 'Cinnamon Bark'],
            color: 'from-yellow-900/30 to-orange-950/20'
        }
    };

    // Journal Database for Quick-Read Drawer
    const ARTICLES = {
        'article-1': {
            title: 'The 7 Pillars of Traditional Gongfu Ceremony: Stillness in Every Pour',
            category: 'Rituals',
            date: 'Feb 14, 2026 • 5 min read',
            image: './images/news-1.png',
            tagColor: 'text-orange-400',
            content: `
                <p class="text-neutral-300 leading-relaxed mb-4 text-sm sm:text-base">
                    In the sacred rhythm of the Gongfu tea ceremony, the brewing vessel is not merely an instrument—it is an altar of mindful attention. Originating in the Chaozhou region of Guangdong during the Song Dynasty, Gongfu translates literally to "making tea with consummate skill and patience."
                </p>
                <blockquote class="p-4 my-4 rounded-xl border-l-4 border-orange-500 bg-white/5 text-orange-200 italic text-sm">
                    "Water heated to the precise sound of 'fish eyes' bubbling whispers the soul of the mountain directly to the leaves."
                </blockquote>
                <h4 class="font-bold text-white text-base mt-4 mb-2">The Seven Sacred Movements</h4>
                <p class="text-neutral-300 leading-relaxed mb-3 text-sm">
                    1. <strong>Warming the Vessel:</strong> Purifying clay with boiling glacier spring water.<br>
                    2. <strong>Appreciating the Dry Leaf:</strong> Inhaling volatile aromatics from the heated gaiwan.<br>
                    3. <strong>The Awakening Rinse:</strong> A flash 3-second infusion to unfurl delicate leaf veins.<br>
                    4. <strong>High Pour for Aeration:</strong> Pouring from height to awaken dissolved oxygen.<br>
                    5. <strong>Low Pour for Fragrance Retention:</strong> Serving close to the rim to lock in volatile esters.<br>
                    6. <strong>Fair Cup Distribution:</strong> Ensuring every guest receives identical liquor density.<br>
                    7. <strong>Empty Cup Contemplation:</strong> Reading the lingering honeyed resonance on cool porcelain.
                </p>
            `
        },
        'article-2': {
            title: 'Spring High-Mountain Expedition: Foraging Wild Camellia in Alishan',
            category: 'Harvest 2026',
            date: 'Mar 02, 2026 • 7 min read',
            image: './images/news-2.png',
            tagColor: 'text-emerald-400',
            content: `
                <p class="text-neutral-300 leading-relaxed mb-4 text-sm sm:text-base">
                    At 2,200 meters above the sea in the misty canopies of Taiwan’s central mountain range, dawn breaks through heavy sea-fog. Here, ancient wild Camellia sinensis varieties grow untamed amidst native bamboo forests and cedar groves.
                </p>
                <blockquote class="p-4 my-4 rounded-xl border-l-4 border-emerald-500 bg-white/5 text-emerald-200 italic text-sm">
                    "The diurnal swing of twenty degrees between noon sunlight and freezing twilight forces the tea bud to synthesize rich, protective amino acids."
                </blockquote>
                <h4 class="font-bold text-white text-base mt-4 mb-2">Why High Altitude Matters</h4>
                <p class="text-neutral-300 leading-relaxed mb-3 text-sm">
                    High mountain UV radiation triggers the biosynthesis of catechins and soothing theanine. When handpicked exclusively during the two-week spring flush window, the buds contain three times the essential volatile oils of lowland agricultural harvests.
                </p>
            `
        },
        'article-3': {
            title: 'The Neuroscience of L-Theanine: Why Green Tea Sharpens Cognitive Flow',
            category: 'Wellness',
            date: 'Mar 10, 2026 • 4 min read',
            image: './images/news-3.png',
            tagColor: 'text-amber-400',
            content: `
                <p class="text-neutral-300 leading-relaxed mb-4 text-sm sm:text-base">
                    Modern neuroimaging studies confirm what Zen Buddhist monks discovered centuries ago: ceremonial green tea uniquely promotes a state of "alert calmness"—sustained cognitive focus devoid of jitteriness or anxiety.
                </p>
                <blockquote class="p-4 my-4 rounded-xl border-l-4 border-amber-500 bg-white/5 text-amber-200 italic text-sm">
                    "L-Theanine crosses the blood-brain barrier to trigger synchronous Alpha brainwave activity (8–12 Hz), typical of deep meditative absorption."
                </blockquote>
                <h4 class="font-bold text-white text-base mt-4 mb-2">The Golden Ratio with Natural Caffeine</h4>
                <p class="text-neutral-300 leading-relaxed mb-3 text-sm">
                    Unlike synthetic energy drinks or coffee that cause abrupt spikes in cortisol and subsequent crashes, the 1:2 ratio of natural caffeine to L-Theanine in shaded gyokuro and matcha creates a steady, 4-to-6 hour cognitive flow state.
                </p>
            `
        }
    };

    // State
    const cart = [];

    // --- 2. Custom Magnetic Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        if (cursorFollower) {
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, .tilt-card, .tab-btn, .bento-card, .journal-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // --- 3. 3D Multi-Layer Tilt & Dynamic Specular Physics ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    let lastAudioHoverTime = 0;

    tiltCards.forEach(card => {
        const glare = card.querySelector('.card-glare');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Update CSS variables for spotlight tracking
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Compute 3D rotation angles with smooth clamp
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;

            if (glare) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 70%)`;
                glare.style.opacity = '1';
            }
        });

        card.addEventListener('mouseenter', () => {
            // Tactile subtle audio feedback on card entry (throttled)
            const now = Date.now();
            if (now - lastAudioHoverTime > 250 && window.teaAudio && window.teaAudio.isPlaying) {
                window.teaAudio.playChime(659.25);
                lastAudioHoverTime = now;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            if (glare) glare.style.opacity = '0';
        });
    });

    // Spotlight tracking for all Bento cards & Spotlight elements
    const spotlightCards = document.querySelectorAll('.card-spotlight, .bento-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 4. Scroll Progress & Sticky Frosted Header ---
    const scrollProgress = document.getElementById('scroll-progress');
    const headerNav = document.getElementById('main-navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    const progressCircle = document.getElementById('progress-circle');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        // Header Blur intensification
        if (headerNav) {
            if (scrollTop > 50) {
                headerNav.classList.add('bg-black/75', 'backdrop-blur-2xl', 'border-b', 'border-white/10', 'py-3');
                headerNav.classList.remove('bg-transparent', 'py-5');
            } else {
                headerNav.classList.remove('bg-black/75', 'backdrop-blur-2xl', 'border-b', 'border-white/10', 'py-3');
                headerNav.classList.add('bg-transparent', 'py-5');
            }
        }

        // Back to top visibility & SVG circle update
        if (backToTopBtn) {
            if (scrollTop > 350) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
            }
        }

        if (progressCircle) {
            const circumference = 2 * Math.PI * 18; // r=18
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.teaAudio) window.teaAudio.playChime(659.25);
        });
    }

    // --- 5. 5D Audio Ambience Controls ---
    const audioToggleBtns = document.querySelectorAll('.audio-toggle-btn');
    const audioVolumeSlider = document.getElementById('ambience-volume');
    const audioEqualizers = document.querySelectorAll('.audio-equalizer');

    function updateAudioUI(isPlaying) {
        audioToggleBtns.forEach(btn => {
            const label = btn.querySelector('.audio-label');
            const icon = btn.querySelector('.audio-icon');
            if (isPlaying) {
                btn.classList.add('text-orange-400', 'border-orange-500/40');
                if (label) label.textContent = '5D Zen: Active';
                if (icon) icon.className = 'fa-solid fa-volume-high audio-icon';
            } else {
                btn.classList.remove('text-orange-400', 'border-orange-500/40');
                if (label) label.textContent = '5D Zen: Off';
                if (icon) icon.className = 'fa-solid fa-volume-xmark audio-icon';
            }
        });

        audioEqualizers.forEach(eq => {
            if (isPlaying) {
                eq.classList.add('audio-active');
            } else {
                eq.classList.remove('audio-active');
            }
        });
    }

    audioToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.teaAudio) {
                const state = window.teaAudio.toggleAmbience();
                updateAudioUI(state);
                showToast(
                    state ? '5D Audio Activated' : 'Audio Sanctuary Paused',
                    state ? 'Immersing in procedural mountain wind & singing bowl.' : 'Soundscape has been muted.',
                    state ? 'fa-music' : 'fa-volume-xmark'
                );
            }
        });
    });

    if (audioVolumeSlider) {
        audioVolumeSlider.addEventListener('input', (e) => {
            if (window.teaAudio) {
                window.teaAudio.setVolume(parseFloat(e.target.value));
            }
        });
    }

    // --- 6. Toast Notification Engine ---
    const toastContainer = document.getElementById('toast-container');
    function showToast(title, message, iconClass = 'fa-leaf') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <i class="fa-solid ${iconClass}"></i>
            </div>
            <div>
                <h4 class="font-bold text-sm text-white">${title}</h4>
                <p class="text-xs text-neutral-300">${message}</p>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 350);
        }, 3600);
    }
    window.showToast = showToast;

    // --- 7. Tea Confetti Burst Generator ---
    function spawnTeaConfetti(originX, originY) {
        const count = 18;
        const colors = ['#4ade80', '#22c55e', '#f59e0b', '#fb923c', '#e2e8f0'];

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'tea-confetti';
            confetti.style.left = `${originX}px`;
            confetti.style.top = `${originY}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 90;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const rot = (Math.random() - 0.5) * 540;

            confetti.style.setProperty('--tx', `${tx}px`);
            confetti.style.setProperty('--ty', `${ty}px`);
            confetti.style.setProperty('--rot', `${rot}deg`);

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 950);
        }
    }

    // --- 8. Product Filter Tabs with Smooth Animation ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-item-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('bg-gradient-to-r', 'from-[#ff8938]', 'to-[#ff0000]', 'text-white', 'border-transparent');
                b.classList.add('bg-white/5', 'text-neutral-300', 'border-white/10');
            });

            btn.classList.add('bg-gradient-to-r', 'from-[#ff8938]', 'to-[#ff0000]', 'text-white', 'border-transparent');
            btn.classList.remove('bg-white/5', 'text-neutral-300', 'border-white/10');

            if (window.teaAudio) window.teaAudio.playChime(523.25);

            const filter = btn.getAttribute('data-filter');
            productCards.forEach((card, index) => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.96)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 40 + 20);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 9. Tasting Box (Cart) Drawer & Management ---
    const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartBadge = document.getElementById('cart-badge');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');

    function toggleCart(open) {
        if (!cartDrawer) return;
        if (open) {
            cartDrawer.classList.remove('translate-x-full');
            if (cartBackdrop) cartBackdrop.classList.remove('hidden', 'opacity-0');
            if (window.teaAudio) window.teaAudio.playChime(587.33);
        } else {
            cartDrawer.classList.add('translate-x-full');
            if (cartBackdrop) {
                cartBackdrop.classList.add('opacity-0');
                setTimeout(() => cartBackdrop.classList.add('hidden'), 300);
            }
        }
    }

    cartToggleBtns.forEach(btn => btn.addEventListener('click', () => toggleCart(true)));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCart(false));
    if (cartBackdrop) cartBackdrop.addEventListener('click', () => toggleCart(false));

    function updateCartUI() {
        if (!cartBadge || !cartItemsList || !cartSubtotal) return;

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        if (totalItems > 0) {
            cartBadge.classList.remove('hidden');
        } else {
            cartBadge.classList.add('hidden');
        }

        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="py-16 text-center space-y-4">
                    <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-neutral-400">
                        <i class="fa-solid fa-mug-hot text-2xl"></i>
                    </div>
                    <p class="text-neutral-400 text-sm">Your tasting box is empty.<br>Select a blend to begin tasting.</p>
                </div>
            `;
            cartSubtotal.textContent = '$0.00';
            return;
        }

        let subtotalVal = 0;
        cartItemsList.innerHTML = cart.map((item, index) => {
            const priceNum = parseFloat(item.price.replace('$', ''));
            subtotalVal += priceNum * item.quantity;
            return `
                <div class="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all">
                    <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-contain rounded-lg bg-black/40 p-1">
                    <div class="flex-1">
                        <h4 class="font-bold text-sm text-white">${item.name}</h4>
                        <p class="text-xs text-orange-400">${item.price}</p>
                        <div class="flex items-center gap-3 mt-2">
                            <button class="cart-qty-btn w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-xs flex items-center justify-center text-white" data-action="decrease" data-index="${index}">-</button>
                            <span class="text-xs font-semibold">${item.quantity}</span>
                            <button class="cart-qty-btn w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-xs flex items-center justify-center text-white" data-action="increase" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="cart-remove-btn text-neutral-400 hover:text-red-400 text-sm p-2" data-index="${index}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        }).join('');

        cartSubtotal.textContent = `$${subtotalVal.toFixed(2)}`;

        // Attach listeners for qty & remove
        cartItemsList.querySelectorAll('.cart-qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const idx = parseInt(btn.getAttribute('data-index'));
                if (action === 'increase') {
                    cart[idx].quantity += 1;
                } else if (action === 'decrease') {
                    cart[idx].quantity -= 1;
                    if (cart[idx].quantity <= 0) cart.splice(idx, 1);
                }
                updateCartUI();
            });
        });

        cartItemsList.querySelectorAll('.cart-remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                cart.splice(idx, 1);
                updateCartUI();
                showToast('Removed Blend', 'Item removed from your tasting box.', 'fa-trash-can');
            });
        });
    }

    function addToCart(productId, event) {
        const prod = PRODUCTS[productId];
        if (!prod) return;

        const existing = cart.find(i => i.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: prod.id,
                name: prod.name,
                price: prod.price,
                image: prod.image,
                quantity: 1
            });
        }

        updateCartUI();

        // Audio & Confetti
        if (window.teaAudio) {
            window.teaAudio.playChime(698.46);
            window.teaAudio.playPourSound(0.8);
        }

        if (event) {
            spawnTeaConfetti(event.clientX, event.clientY);
        }

        showToast('Added to Tasting Box', `${prod.name} has been added.`, 'fa-circle-check');
    }

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-product-id');
            addToCart(id, e);
        });
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            if (cart.length === 0) {
                showToast('Empty Box', 'Please add artisanal teas before checkout.', 'fa-circle-exclamation');
                return;
            }
            if (window.teaAudio) window.teaAudio.playChime(880);
            spawnTeaConfetti(e.clientX, e.clientY);
            showToast('Order Prepared!', 'Thank you! Your artisanal tea selection is ready to brew.', 'fa-box-open');
            cart.length = 0;
            updateCartUI();
            toggleCart(false);
        });
    }

    // --- 10. Quick Tasting Modal ---
    const productModal = document.getElementById('product-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalImage = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');
    const modalTag = document.getElementById('modal-tag');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const modalOrigin = document.getElementById('modal-origin');
    const modalTemp = document.getElementById('modal-temp');
    const modalSteep = document.getElementById('modal-steep');
    const modalCaffeineBar = document.getElementById('modal-caffeine-bar');
    const modalCaffeineText = document.getElementById('modal-caffeine-text');
    const modalNotesList = document.getElementById('modal-notes-list');
    const modalAddBtn = document.getElementById('modal-add-btn');
    const modalBrewBtn = document.getElementById('modal-brew-btn');

    let currentModalProductId = null;

    function openProductModal(productId) {
        const prod = PRODUCTS[productId];
        if (!prod || !productModal) return;

        currentModalProductId = productId;
        modalImage.src = prod.image;
        modalName.textContent = prod.name;
        modalTag.textContent = prod.tag;
        modalPrice.textContent = prod.price;
        modalDesc.textContent = prod.desc;
        modalOrigin.textContent = prod.origin;
        modalTemp.textContent = prod.temp;
        modalSteep.textContent = prod.steepTime;
        modalCaffeineText.textContent = prod.caffeine;
        modalCaffeineBar.style.width = `${prod.caffeinePercent}%`;

        modalNotesList.innerHTML = prod.notes.map(note => `
            <span class="px-3 py-1 rounded-full bg-white/10 text-xs border border-white/15 text-orange-200">
                ${note}
            </span>
        `).join('');

        productModal.classList.remove('hidden');
        setTimeout(() => {
            productModal.classList.remove('opacity-0');
            productModal.querySelector('.modal-content').classList.remove('scale-95');
        }, 20);

        if (window.teaAudio) window.teaAudio.playChime(659.25);
    }

    function closeProductModal() {
        if (!productModal) return;
        productModal.classList.add('opacity-0');
        productModal.querySelector('.modal-content').classList.add('scale-95');
        setTimeout(() => {
            productModal.classList.add('hidden');
        }, 300);
    }

    document.querySelectorAll('.open-tasting-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-product-id');
            openProductModal(id);
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProductModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProductModal);

    if (modalAddBtn) {
        modalAddBtn.addEventListener('click', (e) => {
            if (currentModalProductId) {
                addToCart(currentModalProductId, e);
                closeProductModal();
            }
        });
    }

    if (modalBrewBtn) {
        modalBrewBtn.addEventListener('click', () => {
            closeProductModal();
            const brewSection = document.getElementById('brewing-ritual-section');
            if (brewSection) {
                brewSection.scrollIntoView({ behavior: 'smooth' });
                selectBrewBlend(currentModalProductId);
            }
        });
    }

    // --- 11. 5D Interactive Tea Brewing Ritual Simulator ---
    const brewBlendBtns = document.querySelectorAll('.brew-blend-btn');
    const brewTempSlider = document.getElementById('brew-temp-slider');
    const brewTempDisplay = document.getElementById('brew-temp-display');
    const brewTimeSlider = document.getElementById('brew-time-slider');
    const brewTimeDisplay = document.getElementById('brew-time-display');
    const startBrewBtn = document.getElementById('start-brew-btn');
    const brewKettleGlow = document.getElementById('brew-kettle-glow');
    const brewCupLiquid = document.getElementById('brew-cup-liquid');
    const brewTimerDisplay = document.getElementById('brew-timer-display');
    const brewStatusText = document.getElementById('brew-status-text');
    const brewAromaTag = document.getElementById('brew-aroma-tag');

    let isBrewing = false;
    let brewInterval = null;
    let selectedBrewId = 'green-tea';

    function selectBrewBlend(id) {
        selectedBrewId = id;
        const prod = PRODUCTS[id];
        if (!prod) return;

        brewBlendBtns.forEach(b => {
            if (b.getAttribute('data-blend') === id) {
                b.classList.add('border-orange-500', 'bg-orange-500/20');
                b.classList.remove('border-white/10', 'bg-white/5');
            } else {
                b.classList.remove('border-orange-500', 'bg-orange-500/20');
                b.classList.add('border-white/10', 'bg-white/5');
            }
        });

        if (brewAromaTag) {
            brewAromaTag.textContent = `Aroma: ${prod.aroma}`;
        }
    }

    brewBlendBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectBrewBlend(btn.getAttribute('data-blend'));
            if (window.teaAudio) window.teaAudio.playChime(523.25);
        });
    });

    if (brewTempSlider && brewTempDisplay) {
        brewTempSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            brewTempDisplay.textContent = `${val}°C`;
            if (brewKettleGlow) {
                const intensity = (val - 60) / 40;
                brewKettleGlow.style.opacity = `${0.2 + intensity * 0.7}`;
            }
        });
    }

    if (brewTimeSlider && brewTimeDisplay) {
        brewTimeSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            brewTimeDisplay.textContent = `${val}s`;
        });
    }

    if (startBrewBtn) {
        startBrewBtn.addEventListener('click', () => {
            if (isBrewing) return;
            isBrewing = true;
            startBrewBtn.disabled = true;
            startBrewBtn.classList.add('opacity-50');

            const prod = PRODUCTS[selectedBrewId];
            const steepSeconds = parseInt(brewTimeSlider ? brewTimeSlider.value : 10);
            let remaining = steepSeconds;

            if (brewStatusText) brewStatusText.textContent = `Infusing ${prod.name}...`;
            if (brewTimerDisplay) brewTimerDisplay.textContent = `${remaining}s`;

            // Audio: kettle pour & boiling water
            if (window.teaAudio) {
                window.teaAudio.playPourSound(2.5);
                window.teaAudio.playChime(440);
            }

            // Liquid fills up
            if (brewCupLiquid) {
                brewCupLiquid.style.height = '85%';
                if (selectedBrewId === 'green-tea') {
                    brewCupLiquid.style.background = 'linear-gradient(to top, #15803d, #84cc16)';
                } else if (selectedBrewId === 'milk-tea') {
                    brewCupLiquid.style.background = 'linear-gradient(to top, #d97706, #fed7aa)';
                } else if (selectedBrewId === 'black-tea') {
                    brewCupLiquid.style.background = 'linear-gradient(to top, #78350f, #b45309)';
                } else if (selectedBrewId === 'lemon-tea') {
                    brewCupLiquid.style.background = 'linear-gradient(to top, #ca8a04, #fef08a)';
                }
            }

            brewInterval = setInterval(() => {
                remaining -= 1;
                if (brewTimerDisplay) brewTimerDisplay.textContent = `${remaining}s`;

                if (remaining <= 0) {
                    clearInterval(brewInterval);
                    isBrewing = false;
                    startBrewBtn.disabled = false;
                    startBrewBtn.classList.remove('opacity-50');
                    if (brewStatusText) brewStatusText.textContent = `✨ Master Steep Perfected! (${prod.notes[0]} & ${prod.notes[1]})`;
                    
                    // Triumph chime
                    if (window.teaAudio) {
                        window.teaAudio.playChime(880);
                        setTimeout(() => window.teaAudio.playChime(1046.5), 180);
                    }

                    const rect = startBrewBtn.getBoundingClientRect();
                    spawnTeaConfetti(rect.left + rect.width / 2, rect.top);

                    showToast(
                        'Cup of Zen Ready',
                        `${prod.name} has finished infusing at optimal golden ratio.`,
                        'fa-mug-hot'
                    );
                }
            }, 1000);
        });
    }

    // --- 12. 3D Perspective Testimonial Stack Carousel ---
    const testimonialCards = document.querySelectorAll('.testimonial-card-item');
    let activeTestimonialIdx = 0;
    const prevTestBtn = document.getElementById('prev-testimonial-btn');
    const nextTestBtn = document.getElementById('next-testimonial-btn');

    function updateTestimonialStack(newIdx) {
        if (!testimonialCards || testimonialCards.length === 0) return;
        activeTestimonialIdx = (newIdx + testimonialCards.length) % testimonialCards.length;

        testimonialCards.forEach((card, i) => {
            card.classList.remove('active', 'next', 'prev');
            if (i === activeTestimonialIdx) {
                card.classList.add('active');
            } else if (i === (activeTestimonialIdx + 1) % testimonialCards.length) {
                card.classList.add('next');
            } else {
                card.classList.add('prev');
            }
        });
    }

    if (prevTestBtn) {
        prevTestBtn.addEventListener('click', () => {
            updateTestimonialStack(activeTestimonialIdx - 1);
            if (window.teaAudio) window.teaAudio.playChime(523.25);
        });
    }

    if (nextTestBtn) {
        nextTestBtn.addEventListener('click', () => {
            updateTestimonialStack(activeTestimonialIdx + 1);
            if (window.teaAudio) window.teaAudio.playChime(587.33);
        });
    }

    // --- 13. Interactive Gazette / Article Quick-Read Modal ---
    const articleModal = document.getElementById('article-modal');
    const articleModalBackdrop = document.getElementById('article-modal-backdrop');
    const closeArticleModalBtn = document.getElementById('close-article-modal-btn');
    const articleModalTitle = document.getElementById('article-modal-title');
    const articleModalCategory = document.getElementById('article-modal-category');
    const articleModalDate = document.getElementById('article-modal-date');
    const articleModalImage = document.getElementById('article-modal-image');
    const articleModalContent = document.getElementById('article-modal-content');

    function openArticleModal(articleId) {
        const article = ARTICLES[articleId];
        if (!article || !articleModal) return;

        articleModalTitle.textContent = article.title;
        articleModalCategory.textContent = article.category;
        articleModalDate.textContent = article.date;
        articleModalImage.src = article.image;
        articleModalContent.innerHTML = article.content;

        articleModal.classList.remove('hidden');
        setTimeout(() => {
            articleModal.classList.remove('opacity-0');
            articleModal.querySelector('.modal-content').classList.remove('scale-95');
        }, 20);

        if (window.teaAudio) window.teaAudio.playChime(659.25);
    }

    function closeArticleModal() {
        if (!articleModal) return;
        articleModal.classList.add('opacity-0');
        articleModal.querySelector('.modal-content').classList.add('scale-95');
        setTimeout(() => {
            articleModal.classList.add('hidden');
        }, 300);
    }

    document.querySelectorAll('.open-article-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-article-id');
            openArticleModal(id);
        });
    });

    if (closeArticleModalBtn) closeArticleModalBtn.addEventListener('click', closeArticleModal);
    if (articleModalBackdrop) articleModalBackdrop.addEventListener('click', closeArticleModal);

    // Bookmark / Favorite buttons on articles
    document.querySelectorAll('.bookmark-article-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i');
            const isBookmarked = icon.classList.contains('fa-solid');

            if (isBookmarked) {
                icon.className = 'fa-regular fa-bookmark text-neutral-400';
                showToast('Removed from Reading List', 'Article removed from your saved dispatches.', 'fa-bookmark');
            } else {
                icon.className = 'fa-solid fa-bookmark text-orange-400';
                if (window.teaAudio) window.teaAudio.playChime(784);
                showToast('Saved to Reading List', 'Article bookmarked in your tea sanctuary.', 'fa-bookmark');
            }
        });
    });

    // --- 14. Interactive Bento Grid Micro-Interactions ---
    const bentoAltitudeBtn = document.getElementById('bento-altitude-toggle');
    if (bentoAltitudeBtn) {
        bentoAltitudeBtn.addEventListener('click', () => {
            const meter = document.getElementById('bento-altitude-val');
            if (meter) {
                const current = parseInt(meter.textContent);
                const next = current === 2200 ? 2600 : 2200;
                meter.textContent = `${next}m`;
                showToast('Altitude Shift', `Simulating micro-climate at ${next}m peak canopy.`, 'fa-mountain');
                if (window.teaAudio) window.teaAudio.playChime(587.33);
            }
        });
    }

    // --- 15. Newsletter Form Interactive Submission ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                const val = emailInput.value.trim();
                const btn = newsletterForm.querySelector('button');
                const rect = btn.getBoundingClientRect();
                spawnTeaConfetti(rect.left + rect.width / 2, rect.top);
                
                if (window.teaAudio) window.teaAudio.playChime(784);
                showToast(
                    'Welcome to the Tea Guild',
                    `Exclusive single-origin reserve invitations dispatched to ${val}.`,
                    'fa-envelope-open-text'
                );
                emailInput.value = '';
            }
        });
    }

    // --- 16. Live Kyoto Time & Status Ticker ---
    const kyotoTimeEl = document.getElementById('kyoto-time-ticker');
    function updateKyotoClock() {
        if (!kyotoTimeEl) return;
        try {
            const now = new Date();
            const options = { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
            kyotoTimeEl.textContent = `KYOTO SANCTUARY: ${timeStr} JST • INFUSING FRESH`;
        } catch (e) {
            kyotoTimeEl.textContent = 'KYOTO SANCTUARY: BREWING LIVE';
        }
    }
    updateKyotoClock();
    setInterval(updateKyotoClock, 1000);

    // --- 17. Scroll Reveal Animation Trigger ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('revealed'));
    }
});
