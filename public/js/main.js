document.addEventListener("DOMContentLoaded", () => {
    /* ===== INVERTER RECTANGLE (observer) ===== */
    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = "calc(100% + 200px)";
            } else {
                entry.target.style.width = "0";
            }
        });
    };

    const observer = new IntersectionObserver(callback, {
        threshold: 0.1
    });

    const element = document.getElementById("inverterRectangle");
    observer.observe(element);

 /* ===== SCROLL STEP LOGIC ===== */
    const reasons = document.querySelectorAll(".reasons");
    const items = document.querySelectorAll(".item");
    const wrapper = document.getElementById("content");

    if (!wrapper || reasons.length === 0) return;

    let lastIndex = -1;

    const STEP_SIZE = 1;   // controls speed (lower = faster)
    const OFFSET = 0.8;      // trigger position (0 = top, 0.5 = center)

    function handleScroll() {
        const rect = wrapper.getBoundingClientRect();

        // run only when visible (clean bounds)
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const triggerHeight = window.innerHeight * STEP_SIZE;
        const scrollProgress = -(rect.top - window.innerHeight * OFFSET);

        const step = Math.floor(scrollProgress / triggerHeight);
        const index = Math.max(0, Math.min(step, reasons.length - 1));

        // prevent unnecessary updates
        if (index === lastIndex) return;
        lastIndex = index;

        /* ===== TEXT SWITCH ===== */
        reasons.forEach(el => {
            el.classList.remove("activeReason");
            el.querySelector(".pointRectangle")?.classList.remove("activePointRectangle");
            el.querySelector(".paragraphs")?.classList.remove("activeParagraph");
        });

        const current = reasons[index];
        current.classList.add("activeReason");
        current.querySelector(".pointRectangle")?.classList.add("activePointRectangle");
        current.querySelector(".paragraphs")?.classList.add("activeParagraph");


        /* ===== IMAGE ROTATION + ANIMATION ===== */
        items.forEach((item, i) => {
            let pos = ((i - index) % items.length + items.length) % items.length + 1;
            item.style.setProperty("--position", pos);

            item.classList.remove("active", "inactive");

            if (pos === 1) {
                void item.offsetWidth; // restart animation
                item.classList.add("active");
            } else {
                item.classList.add("inactive");
            }
        });
    }

    // ==== IMAGE AND RECTANGLE SIZE STUFF ====
    const imageBlock2 = document.getElementById("image")
    const rectangleBlock2 = document.querySelector(".white-recBG");
    
    function syncSize() {
        const rect = imageBlock2.getBoundingClientRect();
        
        rectangleBlock2.style.width = rect.width + "px";
        rectangleBlock2.style.height = rect.height + "px";
    }
    
    // run after image loads
    if (imageBlock2.complete) {
        syncSize();
    } else {
        imageBlock2.onload = syncSize;
    }
    
    // update on resize
    window.addEventListener("resize", syncSize);
    /* ===== OPTIMIZED SCROLL (no lag) ===== */
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    const elementsCards = document.querySelectorAll(".card");

    const observerCards = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                entry.target.classList.remove("inactive");
            } else {
                entry.target.classList.add("inactive");
                entry.target.classList.remove("active");
            }
        });
    }, {
        threshold: 0
    });

    elementsCards.forEach(el => {
        observerCards.observe(el);
    });
});
