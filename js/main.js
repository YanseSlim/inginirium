// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', function () {

  // ========== ТЕНЬ ШАПКИ ПРИ СКРОЛЛЕ ==========
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.pageYOffset > 50);
  });

  // ========== СЛАЙДЕР НА ГЛАВНОЙ ==========
  var slider = document.querySelector('.hero__slider');
  if (slider) {
    var track = slider.querySelector('.hero__track');
    var slides = slider.querySelectorAll('.hero__slide');
    var dots = slider.querySelectorAll('.hero__dot');
    var prev = slider.querySelector('.hero__arrow--prev');
    var next = slider.querySelector('.hero__arrow--next');
    var current = 0;           // текущий слайд
    var total = slides.length; // всего слайдов
    var interval;              // таймер автопроигрывания

    // Переключиться на слайд с индексом index
    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    function start() { interval = setInterval(nextSlide, 5000); }  // авто 5 сек
    function stop()  { clearInterval(interval); }

    // Клик по точкам
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { stop(); goTo(i); start(); });
    });

    // Стрелки
    if (prev) prev.addEventListener('click', function () { stop(); prevSlide(); start(); });
    if (next) next.addEventListener('click', function () { stop(); nextSlide(); start(); });

    // Пауза при наведении
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);

    goTo(0);
    start();
  }

  // ========== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (IntersectionObserver) ==========
  var revealTargets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealTargets.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');  // показываем элемент
          obs.unobserve(e.target);            // больше не следим
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealTargets.forEach(function (el) { obs.observe(el); });
  } else {
    // Если браузер не поддерживает — показываем всё сразу
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  // ========== АНИМИРОВАННЫЕ СЧЁТЧИКИ (цифры) ==========
  var counters = document.querySelectorAll('.stats__number');
  counters.forEach(function (el) {
    var raw = el.getAttribute('data-target');
    if (!raw) return;
    var target = parseInt(raw.replace(/\s/g, '').replace(/[^0-9]/g, ''));
    if (isNaN(target)) return;
    var suffix = raw.replace(/[0-9\s]/g, '');  // сохраняем "+" или другие символы
    var duration = 2000;  // анимация 2 секунды
    var started = false;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !started) {
          started = true;
          obs.unobserve(el);
          var startTime = performance.now();

          function tick(now) {
            var p = Math.min((now - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);  // cubic-out — плавное замедление
            var val = Math.round(eased * target);
            el.textContent = (target >= 1000 ? val.toLocaleString('ru-RU') : val) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  // ========== ПОЭТАПНАЯ АНИМАЦИЯ СТУПЕНЕЙ ==========
  var steps = document.querySelectorAll('.steps__item');
  if (steps.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          steps.forEach(function (s, i) {
            setTimeout(function () { s.classList.add('active'); }, i * 200);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(steps[0].closest('.steps'));
  }

  // ========== КАРТОЧКИ КУРСОВ: ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ==========
  // Функция запускается после того, как данные отрендерены в HTML
  function initCourseCards() {
    var cards = document.querySelectorAll('.course-card');
    if (!cards.length) { setTimeout(initCourseCards, 100); return; }  // ждём рендер

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(function (c) {
      c.style.opacity = '0';
      c.style.transform = 'translateY(30px)';
      c.style.transition = 'all 0.5s ease';
      obs.observe(c);
    });
  }
  initCourseCards();

  //FAQ:
  document.querySelectorAll('.faq__question').forEach(function (q) {
    q.addEventListener('click', function () { this.classList.toggle('open'); });
  });

  // ========== НАКЛОН ИКОНОК ПРИ НАВЕДЕНИИ (блок "Почему мы") ==========
  document.querySelectorAll('.why-us__item').forEach(function (item) {
    item.addEventListener('mousemove', function (e) {
      var r = this.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      var icon = this.querySelector('.why-us__icon');
      if (icon) icon.style.transform =
        'rotateX(' + ((y - r.height / 2) / 15) + 'deg) rotateY(' + ((r.width / 2 - x) / 15) + 'deg)';
    });

    item.addEventListener('mouseleave', function () {
      var icon = this.querySelector('.why-us__icon');
      if (icon) icon.style.transform = 'rotateX(0) rotateY(0)';
    });
  });

  // ========== ФИЛЬТР КУРСОВ (страница курсов) ==========
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        var filter = this.getAttribute('data-filter');
        var allCards = document.querySelectorAll('.course-card');

        allCards.forEach(function (card) {
          var cats = (card.getAttribute('data-category') || '').split(' ');
          if (filter === 'all' || cats.indexOf(filter) !== -1) {
            // Показываем: ставим display:block, но opacity=0,
            // затем на следующем кадре плавно показываем — никакой вспышки
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(function () {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            // Скрываем: сначала исчезаем, потом убираем из потока
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function () { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ========== ОТПРАВКА ФОРМ (предотвращаем перезагрузку) ==========
  function handleFormSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var btn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (btn) {
      var orig = btn.value || btn.textContent;
      btn.disabled = true;
      btn.value = 'Отправлено ✓';
      btn.textContent = 'Отправлено ✓';
      setTimeout(function () {
        btn.disabled = false;
        btn.value = orig;
        btn.textContent = orig;
      }, 2000);
    }
  }

  document.querySelectorAll('.cta__form, .cta-section__form form').forEach(function (f) {
    f.addEventListener('submit', handleFormSubmit);
  });
});
