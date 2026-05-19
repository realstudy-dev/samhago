// 서비스 카테고리 캐러셀 — 무한 루프 (클론 방식) + 자동 재생 + 수동 스와이프
  (function () {
    const carousel = document.getElementById('servicesCarousel');
    const track    = document.getElementById('servicesTrack');
    const prevBtn  = document.getElementById('srvPrev');
    const nextBtn  = document.getElementById('srvNext');
    const dots     = document.querySelectorAll('#srvDots .srv-dot');
    if (!carousel || !track) return;

    const originals = Array.from(track.querySelectorAll('.srv-card'));
    if (!originals.length) return;
    const total = originals.length; // 6

    // 1) 클론 추가 — 앞에 마지막 카드, 뒤에 첫 카드
    const firstClone = originals[0].cloneNode(true);
    const lastClone  = originals[total - 1].cloneNode(true);
    firstClone.dataset.clone = 'first';
    lastClone.dataset.clone = 'last';
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');
    track.insertBefore(lastClone, originals[0]);
    track.appendChild(firstClone);

    // 전체 카드(클론 포함) — 인덱스 0:lastClone, 1~total:originals, total+1:firstClone
    const allCards = Array.from(track.querySelectorAll('.srv-card'));
    const totalWithClones = allCards.length; // 8

    const INTERVAL = 5000;
    const SCROLL_SETTLE_MS = 420;
    let current = 1;
    let timer = null;
    let isProgrammaticScroll = false;
    let scrollSettleTimer = null;
    let isJumping = false;

    // 카드 좌표 계산 — 카드를 트랙 가운데에 위치시키는 scrollLeft 값
    const getCardLeft = (idx) => {
      const card = allCards[idx];
      if (!card) return 0;
      // 카드의 중심점 - 트랙 중심점 = scrollLeft 목표
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const trackCenter = track.clientWidth / 2;
      return cardCenter - trackCenter;
    };

    // 즉시 점프 (애니메이션 없이) — 클론 → 원본 위치로 순간이동
    const jumpInstant = (idx) => {
      isJumping = true;
      isProgrammaticScroll = true;
      track.scrollTo({ left: getCardLeft(idx), behavior: 'auto' });
      // 다음 프레임에 플래그 해제
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isJumping = false;
          isProgrammaticScroll = false;
        });
      });
    };

    // 부드러운 스크롤 + 도착 후 클론 점프 처리
    const slideTo = (targetIdx) => {
      // 인덱스를 클론 범위 안으로 정규화 (0 ~ totalWithClones-1)
      let safeIdx = targetIdx;
      // 만약 누군가 이상한 인덱스를 넘기면 안전하게 wrap
      if (safeIdx < 0) safeIdx = totalWithClones - 1;
      if (safeIdx >= totalWithClones) safeIdx = 0;

      current = safeIdx;
      isProgrammaticScroll = true;
      track.scrollTo({ left: getCardLeft(safeIdx), behavior: 'smooth' });

      // 활성 표시 — 클론이어도 시각적으로 매핑된 원본 도트 활성화
      const originalIdx = clonedToOriginal(safeIdx);
      setActiveDisplay(originalIdx, safeIdx);

      // 도착 후 클론에 멈춰있으면 즉시 점프
      clearTimeout(scrollSettleTimer);
      scrollSettleTimer = setTimeout(() => {
        if (current === 0) {
          // 시작 클론 → 진짜 마지막 카드로 점프
          current = total;
          jumpInstant(total);
          setActiveDisplay(total - 1, total);
        } else if (current === totalWithClones - 1) {
          // 끝 클론 → 진짜 첫 카드로 점프
          current = 1;
          jumpInstant(1);
          setActiveDisplay(0, 1);
        } else {
          isProgrammaticScroll = false;
        }
      }, SCROLL_SETTLE_MS);
    };

    // 클론 인덱스 → 원본 인덱스 매핑
    const clonedToOriginal = (idx) => {
      if (idx === 0) return total - 1;          // 시작 클론 = 마지막 원본
      if (idx === totalWithClones - 1) return 0; // 끝 클론 = 첫 원본
      return idx - 1;
    };

    // 시각적 활성 표시
    const setActiveDisplay = (originalIdx, currentClonedIdx) => {
      allCards.forEach((c, i) => c.classList.toggle('is-active', i === currentClonedIdx));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === originalIdx));
      const activeDot = dots[originalIdx];
      if (activeDot) {
        activeDot.style.animation = 'none';
        void activeDot.offsetWidth;
        activeDot.style.animation = '';
      }
    };

    // 다음/이전 — 안전한 다음 인덱스 계산
    const goNext = () => slideTo(current + 1);
    const goPrev = () => slideTo(current - 1);

    // 자동 재생
    const startAuto = () => {
      stopAuto();
      timer = setInterval(goNext, INTERVAL);
      carousel.classList.remove('is-paused');
    };
    const stopAuto = () => {
      if (timer) { clearInterval(timer); timer = null; }
      carousel.classList.add('is-paused');
    };

    // 컨트롤
    prevBtn?.addEventListener('click', () => {
      goPrev();
      startAuto();
    });
    nextBtn?.addEventListener('click', () => {
      goNext();
      startAuto();
    });
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const originalIdx = parseInt(dot.dataset.srvDot, 10);
        slideTo(originalIdx + 1); // 원본 인덱스 → 클론 포함 인덱스 (1~total)
        startAuto();
      });
    });

    // 사용자 직접 스와이프 감지 — 프로그램 스크롤은 무시
    track.addEventListener('scroll', () => {
      if (isProgrammaticScroll || isJumping) return;
      stopAuto();
      clearTimeout(scrollSettleTimer);
      scrollSettleTimer = setTimeout(() => {
        // 가장 가까운 카드 찾기 — 트랙 가운데에 가장 가까운 카드
        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;
        let nearestIdx = 0;
        let minDist = Infinity;
        allCards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(cardCenter - trackCenter);
          if (dist < minDist) {
            minDist = dist;
            nearestIdx = i;
          }
        });
        current = nearestIdx;

        // 클론에 멈췄으면 점프
        if (current === 0) {
          current = total;
          jumpInstant(total);
          setActiveDisplay(total - 1, total);
        } else if (current === totalWithClones - 1) {
          current = 1;
          jumpInstant(1);
          setActiveDisplay(0, 1);
        } else {
          setActiveDisplay(clonedToOriginal(current), current);
        }

        startAuto();
      }, 240);
    });

    // hover 시 자동재생 일시정지
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    // 화면에서 사라지면 자동재생 정지
    const visObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) startAuto();
        else stopAuto();
      });
    }, { threshold: 0.2 });
    visObserver.observe(carousel);

    // 초기 위치 — 원본 첫 카드(인덱스 1)로 즉시 점프
    requestAnimationFrame(() => {
      jumpInstant(1);
      current = 1;
      setActiveDisplay(0, 1);
    });

    // 리사이즈 시 현재 카드 위치 재정렬
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        jumpInstant(current);
      }, 150);
    });

    // 모션 줄이기 — 자동재생 비활성
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stopAuto();
    }
  })();

  // GNB 스크롤 스파이
  (function () {
    const navItems = document.querySelectorAll('.header-nav li');
    const sections = ['hero', 'product', 'services', 'pricing', 'faq']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const setActive = (id) => {
      navItems.forEach(li => {
        const link = li.querySelector('a');
        if (!link) return;
        li.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    sections.forEach(s => observer.observe(s));
  })();

  // Hero 슬라이더 (2슬라이드 페이드 + auto-play + 컨트롤)
  (function () {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const slides = hero.querySelectorAll('.hero-slide');
    const dots = hero.querySelectorAll('.hero-dot');
    const prevBtn = hero.querySelector('#heroPrev');
    const nextBtn = hero.querySelector('#heroNext');
    if (!slides.length) return;

    let idx = 0;
    let autoTimer = null;
    const total = slides.length;

    const goTo = (n) => {
      idx = ((n % total) + total) % total;
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      hero.dataset.active = String(idx);
    };

    const startAuto = () => {
  stopAuto();
  const tick = () => {
    const next = (idx + 1) % total;
    goTo(next);
    // 슬라이드 3(커스텀 빌더 시뮬레이션)은 사이클 한 번 보이도록 길게
    const dwell = idx === 2 ? 9000 : 7000;
    autoTimer = setTimeout(tick, dwell);
  };
  const initialDwell = idx === 2 ? 9000 : 7000;
  autoTimer = setTimeout(tick, initialDwell);
};
const stopAuto = () => {
  if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
};
 
 
// ───── [3-2] 커스텀 빌더 시뮬레이션 신규 추가 ─────
// Hero 슬라이더 IIFE 안에서 startAuto() 호출하는 부분 직후에 삽입.
// (즉, prefers-reduced-motion 체크 블록 다음, IIFE 닫는 })(); 직전)
 
// ===== 커스텀 빌더 시뮬레이션 =====
// 슬라이드 3이 활성화될 때 자동으로 칩/슬롯이 토글되는 데모 애니메이션
const builder = document.getElementById('customBuilder');
if (builder) {
  const chips = builder.querySelectorAll('.custom-chip[data-subject]');
  const slots = builder.querySelectorAll('.custom-slot[data-subject]');
  let demoTimer = null;
  let cycleStep = 0;
 
  // 시나리오: 0 = 국·영·수 ON, 1 = 영어 OFF, 2 = 수학도 OFF (국어만)
  const scenarios = [
    { off: [] },                    // 모두 ON
    { off: ['eng'] },               // 영어 OFF
    { off: ['eng', 'math'] },       // 영어·수학 OFF
  ];
 
  const applyScenario = (step) => {
    const off = scenarios[step].off;
    // 칩 상태 업데이트 (한자는 항상 is-soon이므로 건드리지 않음)
    chips.forEach(chip => {
      const subj = chip.dataset.subject;
      if (subj === 'hanja') return;
      chip.classList.toggle('is-on', !off.includes(subj));
    });
    // 슬롯 toggle: leaving → 사라짐
    slots.forEach(slot => {
      const subj = slot.dataset.subject;
      slot.classList.toggle('is-leaving', off.includes(subj));
    });
  };
 
  const startDemo = () => {
    stopDemo();
    // 처음에는 모두 ON 상태로 리셋
    cycleStep = 0;
    applyScenario(0);
    // 2.6초 간격으로 시나리오 순환
    demoTimer = setInterval(() => {
      cycleStep = (cycleStep + 1) % scenarios.length;
      applyScenario(cycleStep);
    }, 1600);
  };
  const stopDemo = () => {
    if (demoTimer) { clearInterval(demoTimer); demoTimer = null; }
    // 슬라이드 3 떠나면 모두 ON 상태로 복귀
    applyScenario(0);
  };
 
  // 슬라이드 변경 시 시뮬레이션 시작/종료
  const observer = new MutationObserver(() => {
    if (hero.dataset.active === '2') {
      startDemo();
    } else {
      stopDemo();
    }
  });
  observer.observe(hero, { attributes: true, attributeFilter: ['data-active'] });
 
  // 페이지 로드 시 슬라이드 3이 이미 활성 상태일 수 있음
  if (hero.dataset.active === '2') startDemo();
 
  // 모션 줄이기 설정 시 시뮬레이션 비활성
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    observer.disconnect();
  }
}

    prevBtn?.addEventListener('click', () => { goTo(idx - 1); startAuto(); });
    nextBtn?.addEventListener('click', () => { goTo(idx + 1); startAuto(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAuto(); });
    });

    // hover 시 일시정지
    hero.addEventListener('mouseenter', stopAuto);
    hero.addEventListener('mouseleave', startAuto);

    // 모션 줄이기 설정 시 자동 전환 비활성
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // 자동 전환 안 함, 수동 컨트롤만 동작
    } else {
      startAuto();
    }
  })();

  // 도입 문의 모달
  (function () {
    const modal       = document.getElementById('inquiryModal');
    const formScreen  = document.getElementById('modalForm');
    const successScreen = document.getElementById('modalSuccess');
    const form        = document.getElementById('inquiryForm');
    if (!modal || !form) return;

    const openModal = () => {
      formScreen.hidden = false;
      successScreen.hidden = true;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => document.getElementById('academy')?.focus(), 100);
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      form.reset();
      form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    };

    document.querySelectorAll('[data-form-trigger]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    document.querySelectorAll('[data-modal-close]').forEach(el => {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;
      const academy  = form.academy;
      const director = form.director;
      const region   = form.region;
      const contact  = form.contact;
      const subjects = form.querySelectorAll('input[name="subject"]:checked');

      [academy, director, region, contact].forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          valid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (subjects.length === 0) {
        alert('진행 과목을 1개 이상 선택해주세요.');
        valid = false;
      }

      if (!valid) return;

      document.getElementById('successAcademy').textContent = academy.value.trim();
      formScreen.hidden = true;
      successScreen.hidden = false;
    });
  })();

  // 학원장 인용 캐러셀
  (function () {
    const stage = document.getElementById('quoteStage');
    const dots  = document.getElementById('quoteDots');
    if (!stage || !dots) return;

    const slides = stage.querySelectorAll('.quote-slide');
    const dotEls = dots.querySelectorAll('.quote-dot');
    if (!slides.length) return;

    let current = 0;
    let timer = null;
    const INTERVAL = 6000;

    const wrapper = document.querySelector('.results-quote');
    let stampTimer = null;

    const show = (index) => {
      const next = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === next));
      dotEls.forEach((d, i) => d.classList.toggle('is-active', i === next));
      const activeDot = dotEls[next];
      if (activeDot) {
        activeDot.style.animation = 'none';
        void activeDot.offsetWidth;
        activeDot.style.animation = '';
      }
      // 인용부호 데코 — 살짝 reset 후 다시 stamp
      if (wrapper) {
        wrapper.classList.remove('is-stamped');
        if (stampTimer) clearTimeout(stampTimer);
        stampTimer = setTimeout(() => wrapper.classList.add('is-stamped'), 60);
      }
      current = next;
    };

    const start = () => {
      stop();
      timer = setInterval(() => show(current + 1), INTERVAL);
    };
    const stop = () => {
      if (timer) { clearInterval(timer); timer = null; }
    };

    dotEls.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.dataset.dot, 10);
        show(target);
        start();
      });
    });

    wrapper?.addEventListener('mouseenter', stop);
    wrapper?.addEventListener('mouseleave', start);

    const visObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 첫 진입 시 — 인용부호 데코 stamp
          if (wrapper && !wrapper.classList.contains('is-stamped')) {
            setTimeout(() => wrapper.classList.add('is-stamped'), 80);
          }
          start();
        } else {
          stop();
        }
      });
    }, { threshold: 0.3 });
    visObserver.observe(wrapper);
  })();

  // 스크롤 애니메이션
  (function () {
    const targets = [
      ...document.querySelectorAll('.sec-head'),
      ...document.querySelectorAll('.problem-insight'),
      ...document.querySelectorAll('.concept-title'),
      ...document.querySelectorAll('.results-positioning'),
      ...document.querySelectorAll('.results-grid'),
      ...document.querySelectorAll('.solo-cta'),
      ...document.querySelectorAll('.pricing-footnote'),
      ...document.querySelectorAll('.cta-block'),
    ];
    targets.forEach(el => el.classList.add('reveal'));

    const grids = [
      ...document.querySelectorAll('.problem-grid'),
      ...document.querySelectorAll('.product-grid'),
      ...document.querySelectorAll('.sol-grid'),
      ...document.querySelectorAll('.benefits-grid'),
      ...document.querySelectorAll('.pricing-grid'),
      ...document.querySelectorAll('.faq-list'),
    ];
    grids.forEach(el => el.classList.add('reveal-stagger'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    [...targets, ...grids].forEach(el => observer.observe(el));

    // HTML에서 직접 class="reveal*"이 붙은 요소들도 observe (모든 reveal 변종)
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur').forEach(el => {
      if (!targets.includes(el) && !grids.includes(el)) {
        observer.observe(el);
      }
    });
  })();

  // === 헤더 스크롤 상태 ===
  (function () {
    const header = document.querySelector('.header');
    if (!header) return;

    // 모바일 hide-on-scroll-down 설정
    const MOBILE_BREAKPOINT = 900;
    const DELTA = 8;  // 미세 떨림 무시
    const HIDE_AFTER = 100;  // 이 픽셀 이상 스크롤 다운한 후에만 헤더 숨김 시작
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 24);

      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        const diff = y - lastY;
        if (Math.abs(diff) > DELTA) {
          if (diff > 0 && y > HIDE_AFTER) {
            // 스크롤 다운 + 충분히 내려간 후 → 헤더 숨김
            header.classList.add('is-hidden');
          } else if (diff < 0) {
            // 스크롤 업 → 헤더 노출
            header.classList.remove('is-hidden');
          }
          lastY = y;
        }
      } else {
        // 데스크톱: is-hidden 제거, 항상 노출
        header.classList.remove('is-hidden');
        lastY = y;
      }

      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    // 리사이즈 시 데스크톱으로 전환되면 정리
    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        header.classList.remove('is-hidden');
      }
    });

    update();
  })();

  // === 스크롤 진행도 바 ===
  (function () {
    const bar = document.querySelector('.scroll-progress-bar');
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = progress + '%';
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  })();

  // === 플로팅 스티키 CTA - hero 지나면 노출, finalCTA 도달하면 숨김, 닫기 가능 ===
  (function () {
    const stickyEl = document.getElementById('stickyCta');
    if (!stickyEl) return;
    const heroEl = document.getElementById('hero');
    const finalCtaEl = document.querySelector('.final-cta');
    const closeBtn = stickyEl.querySelector('[data-sticky-close]');

    // 사용자가 닫았는지 sessionStorage가 안 되는 환경 대비 — 메모리 플래그만
    let dismissed = false;
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dismissed = true;
        stickyEl.classList.add('is-dismissed');
      });
    }

    if (!heroEl) return;
    let ticking = false;
    const update = () => {
      if (dismissed) { ticking = false; return; }
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      const finalCtaTop = finalCtaEl ? finalCtaEl.getBoundingClientRect().top : Infinity;
      const winH = window.innerHeight;
      // hero가 절반 정도 지나면 노출, finalCta 진입 직전이면 숨김
      const show = heroBottom < winH * 0.5 && finalCtaTop > winH * 0.7;
      stickyEl.classList.toggle('is-visible', show);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  // === 스크롤 페럴랙스 (lightweight) ===
  (function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;

    let ticking = false;
    const update = () => {
      const winH = window.innerHeight;
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        // viewport 중심을 0으로, 아래쪽으로 갈수록 양수
        const progress = (rect.top + rect.height / 2 - winH / 2) / winH;
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const y = progress * speed * 100;
        const rotate = el.dataset.parallaxRotate ? progress * parseFloat(el.dataset.parallaxRotate) : 0;
        el.style.transform = `translate3d(0, ${(-y).toFixed(2)}px, 0)` + (rotate ? ` rotate(${rotate.toFixed(2)}deg)` : '');
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  })();

  // === 마우스 이동에 따른 미세한 카드 틸트 (데스크탑 전용) ===
  (function () {
    if (window.matchMedia('(max-width: 720px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.plan');
    cards.forEach(card => {
      let rafId = null;
      card.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          const rotY = x * 4; // 좌우 기울기
          const rotX = -y * 4; // 상하 기울기
          card.style.transform = `translateY(-10px) perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
        });
      });
      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = '';
      });
    });

    // === 카드 글로우 트래킹 (problem-card 등) ===
    const glowCards = document.querySelectorAll('.problem-card');
    glowCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  })();

  // === 가격 카운트업 애니메이션 ===
  (function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const priceEls = document.querySelectorAll('.plan-price-hero-num');
    priceEls.forEach(el => {
      const target = parseInt(el.textContent.replace(/,/g, ''), 10);
      if (!target || isNaN(target)) return;
      const originalText = el.textContent;
      if (reduceMotion) return;
      el.textContent = '0';

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const start = performance.now();
            const duration = 1400;
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = easeOutCubic(p);
              const v = Math.round(target * eased);
              el.textContent = v.toLocaleString('ko-KR');
              if (p < 1) requestAnimationFrame(tick);
              else el.textContent = originalText;
            };
            requestAnimationFrame(tick);
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.4 });
      obs.observe(el);
    });
  })();

  // 카운트업 애니메이션 — 꾸준한 학습 습관 74% + 보조 stat 숫자
  (function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // easeOutCubic — 빠르게 시작해서 천천히 정착
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // 숫자 카운트업 함수
    // el: 대상 element
    // target: 최종 숫자 (소수점 가능)
    // suffix: 단위 (% / 분 / 일 등)
    // duration: ms
    const countUp = (el, target, suffix, duration, decimals = 0) => {
      if (reduceMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      const start = performance.now();
      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      };
      requestAnimationFrame(tick);
    };

    // 메인 figure (꾸준한 학습 74%)
    const figure = document.querySelector('.results-figure');
    if (figure) {
      // 초기 값 0% 표시
      figure.textContent = '0%';

      const figObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            figure.classList.add('is-counting');
            // entrance 애니메이션 후 카운트업
            setTimeout(() => {
              countUp(figure, 74, '%', 1800, 0);
              // 카운트 끝나고 펑 효과
              setTimeout(() => {
                figure.classList.add('is-popped');
                setTimeout(() => figure.classList.remove('is-popped'), 600);
              }, 1850);
            }, 200);
            figObserver.unobserve(figure);
          }
        });
      }, { threshold: 0.4 });
      figObserver.observe(figure);
    }

    // 보조 stat 숫자들 (20일+ / 84% / 15분) — 20일+ 는 카운트업 없이 표시
    const statTargets = [
      { selector: '.results-stats .results-stat:nth-child(1) .results-stat-num', value: 20, suffix: '일+', decimals: 0 },
      { selector: '.results-stats .results-stat:nth-child(2) .results-stat-num', value: 84, suffix: '%',   decimals: 0 },
      { selector: '.results-stats .results-stat:nth-child(3) .results-stat-num', value: 15, suffix: '분',  decimals: 0 },
    ];
    statTargets.forEach((cfg, i) => {
      const el = document.querySelector(cfg.selector);
      if (!el) return;
      el.textContent = '0' + cfg.suffix;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 메인 figure 다음 순서로 살짝 stagger
            setTimeout(() => {
              el.classList.add('is-counting');
              countUp(el, cfg.value, cfg.suffix, 1300, cfg.decimals);
            }, 500 + i * 180);
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.4 });
      obs.observe(el);
    });
  })();


// ============================================
// [NEW] 서비스 섹션 탭 전환 (이미지 3 스타일)
// ============================================
(function () {
  const tabs = document.querySelectorAll('.svc-tab');
  const panels = document.querySelectorAll('.svc-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-svc-tab');

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      panels.forEach((panel) => {
        const match = panel.getAttribute('data-svc-panel') === target;
        if (match) {
          panel.hidden = false;
          // 부드러운 페이드 인
          panel.style.opacity = '0';
          requestAnimationFrame(() => {
            panel.style.transition = 'opacity 0.25s ease';
            panel.style.opacity = '1';
          });
        } else {
          panel.hidden = true;
          panel.style.opacity = '';
          panel.style.transition = '';
        }
      });
    });
  });
})();


// ============================================
// [NEW] 서비스 섹션 자동 캐러셀
// 6개 패널 (Featured → 콘텐츠 → 데이터 → 알림 → 운영 → 연동) 좌→우 순환
// ============================================
(function () {
  const carousel = document.getElementById('svcCarousel');
  const track = document.getElementById('svcCarouselTrack');
  const prevBtn = document.getElementById('svcCarouselPrev');
  const nextBtn = document.getElementById('svcCarouselNext');
  const dots = document.querySelectorAll('#svcCarouselDots .svc-carousel-dot');
  if (!carousel || !track) return;

  const panels = track.querySelectorAll('.svc-panel');
  const total = panels.length;
  if (!total) return;

  const INTERVAL = 6000; // 자동 재생 6초 (CSS 프로그레스 바와 동일)
  let current = 0;
  let timer = null;
  let isPaused = false;

  function goTo(idx, restartProgress) {
    current = ((idx % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === current);
    });

    if (restartProgress !== false) {
      restartActiveDotAnimation();
    }
  }

  function restartActiveDotAnimation() {
    const activeDot = dots[current];
    if (!activeDot) return;
    // 프로그레스 바 애니메이션 재시작 (DOM 재계산 트릭)
    activeDot.classList.remove('is-active');
    void activeDot.offsetWidth; // reflow
    activeDot.classList.add('is-active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    stopAuto();
    if (isPaused) return;
    timer = setInterval(() => {
      goTo(current + 1);
    }, INTERVAL);
  }
  function stopAuto() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // 호버 시 일시정지
  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
    carousel.classList.add('is-paused');
    stopAuto();
  });
  carousel.addEventListener('mouseleave', () => {
    isPaused = false;
    carousel.classList.remove('is-paused');
    restartActiveDotAnimation();
    startAuto();
  });

  // 화살표 버튼
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      startAuto();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      startAuto();
    });
  }

  // 도트 클릭
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      startAuto();
    });
  });

  // 모바일 터치 스와이프
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAuto();
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    startAuto();
  }, { passive: true });

  // 화면에 보일 때만 자동 재생 (성능 + 사용자 인지 측면)
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!isPaused) startAuto();
      } else {
        stopAuto();
      }
    });
  }, { threshold: 0.3 });
  io.observe(carousel);

  // 초기 상태
  goTo(0, false);
  restartActiveDotAnimation();
})();


// ============================================
// [NEW] 모바일 햄버거 + 드로어 토글
// ============================================
(function () {
  const burger = document.getElementById('headerBurger');
  const drawer = document.getElementById('mobileDrawer');
  if (!burger || !drawer) return;

  const body = document.body;

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', '메뉴 닫기');
    body.classList.add('drawer-open');
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', '메뉴 열기');
    body.classList.remove('drawer-open');
  }

  function toggleDrawer() {
    if (drawer.classList.contains('is-open')) closeDrawer();
    else openDrawer();
  }

  // 햄버거 클릭으로 토글
  burger.addEventListener('click', toggleDrawer);

  // 닫기 트리거: 백드롭, X 버튼, 메뉴 아이템(이동 후 닫힘)
  drawer.querySelectorAll('[data-drawer-close]').forEach((el) => {
    el.addEventListener('click', closeDrawer);
  });

  // ESC로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // 데스크톱 사이즈로 늘리면 자동 닫기 (반응형 안전장치)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900 && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    }, 150);
  });
})();
