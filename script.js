document.documentElement.classList.add('js');

/* =========================================================
   Chips gerados a partir de data-split
   ========================================================= */
document.querySelectorAll('[data-split]').forEach(function (el) {
    el.dataset.split.split(', ').forEach(function (name) {
        var span = document.createElement('span');
        span.textContent = name;
        el.appendChild(span);
    });
});

/* =========================================================
   Navegação
   ========================================================= */
const ids = ['glossario', 'times', 'recursos', 'evolucao', 'selos', 'modos'];

function show() {
    let h = (location.hash || '').slice(1);
    if (!ids.includes(h)) h = ids[0];

    ids.forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('on', id === h);
    });

    let activeTab = null;
    document.querySelectorAll('.nav a').forEach(function (a) {
        const on = a.getAttribute('href') === '#' + h;
        a.setAttribute('aria-current', on ? 'true' : 'false');
        if (on) activeTab = a;
    });

    if (activeTab && window.innerWidth < 1100) {
        const nav = document.querySelector('.nav');
        if (nav) {
            const scrollLeft = activeTab.offsetLeft - nav.offsetWidth / 2 + activeTab.offsetWidth / 2;
            nav.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }

    window.scrollTo({ top: 0, behavior: 'auto' });

    // Atualiza o Bento Grid após a troca de aba.
    // O setTimeout garante que o navegador renderizou o display:block antes de medir
    if (typeof updateBentoGrid === 'function') {
        setTimeout(updateBentoGrid, 50);
    }
}

window.addEventListener('hashchange', show);
show();

/* =========================================================
   Team Builder
   ========================================================= */
const heroesDB = [
    // VERMELHO
    { id: 'calisto_t', nome: 'CALISTO (T)', attr: 'vermelho', classe: 'tank' },
    { id: 'elesis_s', nome: 'ELESIS (S)', attr: 'vermelho', classe: 'assault', altClasse: 'dps' },
    { id: 'edel', nome: 'EDEL (SR)', attr: 'vermelho', classe: 'assault' },
    { id: 'neption', nome: 'NEPTION (SR)', attr: 'vermelho', classe: 'assault' },
    { id: 'myriel', nome: 'MYRIEL (SR)', attr: 'vermelho', classe: 'ranger' },
    { id: 'io', nome: 'IO (SR)', attr: 'vermelho', classe: 'ranger' },
    { id: 'lime_s', nome: 'LIME (S)', attr: 'vermelho', classe: 'mage' },
    { id: 'cindy_t', nome: 'CINDY (T)', attr: 'vermelho', classe: 'mage' },
    { id: 'ganymedes', nome: 'GANYMEDES (SR)', attr: 'vermelho', classe: 'mage' },
    { id: 'nellia_t', nome: 'NELLIA (T)', attr: 'vermelho', classe: 'healer' },
    { id: 'cindy', nome: 'CINDY (SR)', attr: 'vermelho', classe: 'healer' },

    // AZUL
    { id: 'ryan', nome: 'RYAN (SR)', attr: 'azul', classe: 'tank' },
    { id: 'jin', nome: 'JIN (SR)', attr: 'azul', classe: 'tank' },
    { id: 'lass', nome: 'LASS (SR)', attr: 'azul', classe: 'assault' },
    { id: 'kyle', nome: 'KYLE (SR)', attr: 'azul', classe: 'assault' },
    { id: 'karina', nome: 'KARINA (SR)', attr: 'azul', classe: 'assault' },
    { id: 'lire_t', nome: 'LIRE (T)', attr: 'azul', classe: 'assault' },
    { id: 'bastet_t', nome: 'BASTET (T)', attr: 'azul', classe: 'ranger' },
    { id: 'lupus', nome: 'LUPUS (SR) D10', attr: 'azul', classe: 'ranger' },
    { id: 'ganymedes_t', nome: 'GANYMEDES (T)', attr: 'azul', classe: 'ranger' },
    { id: 'arme_s', nome: 'ARME (S)', attr: 'azul', classe: 'mage' },
    { id: 'vice', nome: 'VICE (SR)', attr: 'azul', classe: 'mage' },
    { id: 'hwarin_t', nome: 'HWARIN (T)', attr: 'azul', classe: 'mage' },
    { id: 'ronan_t', nome: 'RONAN (T)', attr: 'azul', classe: 'mage' },
    { id: 'mayden_t', nome: 'MAYDEN (T)', attr: 'azul', classe: 'healer' },
    { id: 'amy', nome: 'AMY D5', attr: 'azul', classe: 'healer' },

    // VERDE
    { id: 'tia', nome: 'TIA (SR)', attr: 'verde', classe: 'tank' },
    { id: 'ai_t', nome: 'AI (T)', attr: 'verde', classe: 'tank' },
    { id: 'sieg_t', nome: 'SIEG (T)', attr: 'verde', classe: 'tank' },
    { id: 'elesis', nome: 'ELESIS (SR)', attr: 'verde', classe: 'assault' },
    { id: 'vanessa', nome: 'VANESSA (SR)', attr: 'verde', classe: 'assault' },
    { id: 'brahmashell', nome: 'BRAHMASHELL (SR)', attr: 'verde', classe: 'assault' },
    { id: 'lire', nome: 'LIRE (SR)', attr: 'verde', classe: 'ranger' },
    { id: 'shisamoo', nome: 'SHISAMOO (SR)', attr: 'verde', classe: 'ranger' },
    { id: 'lire_s', nome: 'LIRE (S)', attr: 'verde', classe: 'ranger' },
    { id: 'lapis', nome: 'LAPIS (SR)', attr: 'verde', classe: 'ranger' },
    { id: 'mari', nome: 'MARI (SR) D10', attr: 'verde', classe: 'mage' },
    { id: 'grandiel_t', nome: 'GRANDIEL (T)', attr: 'verde', classe: 'mage' },
    { id: 'myst_t', nome: 'MYST (T)', attr: 'verde', classe: 'mage' },
    { id: 'agnecia', nome: 'AGNECIA (SR)', attr: 'verde', classe: 'mage' },
    { id: 'rey', nome: 'REY (SR)', attr: 'verde', classe: 'mage' },
    { id: 'deia_t', nome: 'DEIA (T)', attr: 'verde', classe: 'healer' },
    { id: 'urara', nome: 'URARA (SR)', attr: 'verde', classe: 'healer' },
    { id: 'rey_t', nome: 'REY (T)', attr: 'verde', classe: 'healer' }
];

const ATRIBUTOS = [
    { id: 'vermelho', ico: 'imgs/vermelho.webp', nome: 'Vermelho' },
    { id: 'verde', ico: 'imgs/verde.webp', nome: 'Verde' },
    { id: 'azul', ico: 'imgs/azul.webp', nome: 'Azul' }
];

const CLASSES = [
    { id: 'tank', ico: 'imgs/tank.webp', nome: 'Guardião' },
    { id: 'assault', ico: 'imgs/assault.webp', nome: 'Guerreiro' },
    { id: 'dps', ico: 'imgs/ranger.webp', nome: 'DPS' },
    { id: 'healer', ico: 'imgs/healer.webp', nome: 'Sacerdote' }
];

let tbSelectedSlot = null;
let tbEquipped = {};
let tbBoard, tbPool;

function heroMatchesSlot(hero, slotClasse) {
    if (hero.classe === slotClasse) return true;
    if (hero.altClasse === slotClasse) return true;
    if (slotClasse === 'dps' && (hero.classe === 'ranger' || hero.classe === 'mage')) return true;
    return false;
}

function initTeamBuilder() {
    tbBoard = document.getElementById('tb-board');
    tbPool = document.getElementById('tb-pool');
    if (!tbBoard || !tbPool) return;

    const corner = document.createElement('div');
    corner.className = 'tb-col-head';
    corner.setAttribute('aria-hidden', 'true');
    tbBoard.appendChild(corner);

    CLASSES.forEach(cls => {
        const ch = document.createElement('div');
        ch.className = 'tb-col-head';
        ch.title = cls.nome;
        ch.innerHTML = '<img src="' + cls.ico + '" alt="' + cls.nome + '">';
        tbBoard.appendChild(ch);
    });

    ATRIBUTOS.forEach(attr => {
        const th = document.createElement('div');
        th.className = 'tb-col-head';
        th.title = attr.nome;
        th.innerHTML = '<img src="' + attr.ico + '" alt="' + attr.nome + '">';
        tbBoard.appendChild(th);

        CLASSES.forEach(cls => {
            const slot = document.createElement('div');
            slot.className = 'tb-slot';
            slot.dataset.attr = attr.id;
            slot.dataset.classe = cls.id;
            slot.setAttribute('role', 'button');
            slot.setAttribute('tabindex', '0');
            slot.setAttribute('aria-label', 'Vaga ' + attr.nome + ' / ' + cls.nome + '. Clique para selecionar ou remover.');
            slot.addEventListener('click', () => selectSlot(slot));
            slot.addEventListener('keydown', ev => {
                if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); selectSlot(slot); }
            });
            tbBoard.appendChild(slot);
        });
    });
    renderPool();
}

function renderPool() {
    if (!tbPool) return;
    tbPool.innerHTML = '';
    const sorted = heroesDB.slice().sort((a, b) => a.nome.localeCompare(b.nome));

    sorted.forEach(hero => {
        const pill = document.createElement('div');
        pill.className = 'tb-pill attr-' + hero.attr;
        pill.textContent = hero.nome;
        pill.dataset.id = hero.id;
        pill.setAttribute('role', 'button');
        pill.setAttribute('tabindex', '0');

        if (hero.altClasse) pill.title = 'Pode ser usada como Guerreiro ou DPS';

        if (tbEquipped[hero.id]) {
            pill.classList.add('used');
            pill.setAttribute('aria-disabled', 'true');
        } else if (tbSelectedSlot) {
            const matchAttr = tbSelectedSlot.dataset.attr === hero.attr;
            const matchClasse = heroMatchesSlot(hero, tbSelectedSlot.dataset.classe);
            if (matchAttr && matchClasse) {
                pill.classList.add('available');
            } else {
                pill.classList.add('disabled');
                pill.setAttribute('aria-disabled', 'true');
            }
        }

        pill.addEventListener('click', () => tryEquipHero(hero, pill));
        pill.addEventListener('keydown', ev => {
            if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); tryEquipHero(hero, pill); }
        });
        tbPool.appendChild(pill);
    });
}

function selectSlot(slot) {
    if (slot.firstChild) {
        delete tbEquipped[slot.firstChild.dataset.id];
        slot.innerHTML = '';
        slot.removeAttribute('aria-pressed');
        if (tbSelectedSlot === slot) {
            tbSelectedSlot.classList.remove('active');
            tbSelectedSlot = null;
        }
        renderPool();
        return;
    }

    if (tbSelectedSlot === slot) {
        slot.classList.remove('active');
        slot.removeAttribute('aria-pressed');
        tbSelectedSlot = null;
    } else {
        if (tbSelectedSlot) {
            tbSelectedSlot.classList.remove('active');
            tbSelectedSlot.removeAttribute('aria-pressed');
        }
        tbSelectedSlot = slot;
        slot.classList.add('active');
        slot.setAttribute('aria-pressed', 'true');
    }
    renderPool();
}

function tryEquipHero(hero, pillEl) {
    if (!tbSelectedSlot || pillEl.classList.contains('used') || pillEl.classList.contains('disabled')) return;

    const slotHero = document.createElement('div');
    slotHero.className = 'tb-pill in-slot attr-' + hero.attr;
    slotHero.textContent = hero.nome;
    slotHero.dataset.id = hero.id;

    tbSelectedSlot.appendChild(slotHero);
    tbEquipped[hero.id] = true;

    tbSelectedSlot.classList.remove('active');
    tbSelectedSlot.removeAttribute('aria-pressed');
    tbSelectedSlot = null;
    renderPool();
}

function clearTeam() {
    document.querySelectorAll('.tb-slot').forEach(s => {
        s.innerHTML = '';
        s.removeAttribute('aria-pressed');
    });
    tbEquipped = {};
    if (tbSelectedSlot) {
        tbSelectedSlot.classList.remove('active');
        tbSelectedSlot.removeAttribute('aria-pressed');
        tbSelectedSlot = null;
    }
    renderPool();
}

initTeamBuilder();
const clearBtn = document.getElementById('tb-clear-btn');
if (clearBtn) clearBtn.addEventListener('click', clearTeam);

/* =========================================================
   Carrossel de selos
   ========================================================= */
(function initCarousel() {
    const track = document.getElementById('selos-track');
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));

    if (!track || !prevBtn || !nextBtn || slides.length === 0) return;

    const slideWidth = () => slides[0].getBoundingClientRect().width;
    const goTo = index => track.scrollTo({ left: slideWidth() * index, behavior: 'smooth' });

    nextBtn.addEventListener('click', () => track.scrollBy({ left: slideWidth(), behavior: 'smooth' }));
    prevBtn.addEventListener('click', () => track.scrollBy({ left: -slideWidth(), behavior: 'smooth' }));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    let rafId = null;
    track.addEventListener('scroll', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const w = slideWidth();
            if (!w) return;
            const current = Math.round(track.scrollLeft / w);
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        });
    }, { passive: true });

    track.addEventListener('keydown', ev => {
        if (ev.key === 'ArrowRight') { ev.preventDefault(); nextBtn.click(); }
        if (ev.key === 'ArrowLeft') { ev.preventDefault(); prevBtn.click(); }
    });
    track.setAttribute('tabindex', '0');
})();

/* =========================================================
   FREE-FLOW ORPHAN DETECTOR (Bento Grid Banner)
   ========================================================= */
let isBentoUpdating = false;

function updateBentoGrid() {
    // 1. CADEADO: Previne loop infinito no ResizeObserver
    if (isBentoUpdating) return;
    isBentoUpdating = true;

    window.requestAnimationFrame(() => {
        document.querySelectorAll('.grid').forEach(grid => {
            const cards = Array.from(grid.querySelectorAll(':scope > .card'));
            if (cards.length < 2) return;

            const gridCols = window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
            if (gridCols === 1) { isBentoUpdating = false; return; } // Mobile não faz nada

            // 2. Limpa as classes antes de medir para pegar o tamanho real
            cards.forEach(card => {
                card.classList.remove('is-banner', 'art-vertical', 'art-horizontal');
            });

            // 3. Força o navegador a recalcular o layout antes de medir
            void grid.offsetHeight;

            const gridRect = grid.getBoundingClientRect();

            // 4. LOOP INVERSO: Do último card para o primeiro
            for (let i = cards.length - 1; i >= 0; i--) {
                const card = cards[i];
                if (card.classList.contains('block--full') || card.classList.contains('block--wide')) continue;

                const cardRect = card.getBoundingClientRect();

                // Arredonda os valores para evitar bugs de subpixels
                const nextCard = cards[i + 1];
                const isLastInRow = !nextCard || Math.abs(Math.round(nextCard.getBoundingClientRect().top) - Math.round(cardRect.top)) > 5;
                const isOrphan = Math.round(cardRect.right) < (Math.round(gridRect.right) - 20);

                if (isOrphan && isLastInRow) {
                    card.classList.add('is-banner');
                    // FORÇA O REFLOW: O navegador atualiza a posição na hora,
                    // empurrando os cards de baixo e liberando a linha para o próximo do loop!
                    void grid.offsetHeight;
                } else {
                    const content = card.querySelector('.card-content');
                    const cardHeight = card.offsetHeight;
                    const contentHeight = content ? content.offsetHeight : 0;

                    if (cardHeight - contentHeight > 30) {
                        card.classList.add('art-vertical');
                    } else {
                        card.classList.add('art-horizontal');
                    }
                }
            }
        });

        // Solta o cadeado após a renderização das classes
        window.requestAnimationFrame(() => { isBentoUpdating = false; });
    });
}

// Observa mudanças de tamanho da janela
const observer = new ResizeObserver(() => {
    window.requestAnimationFrame(updateBentoGrid);
});

document.querySelectorAll('.grid').forEach(grid => observer.observe(grid));

// Executa uma vez no carregamento inicial
setTimeout(updateBentoGrid, 100);
