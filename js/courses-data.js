// ============================================================
// Данные всех курсов.
// Чтобы добавить новый курс — просто допиши объект в массив.
// ============================================================
var coursesData = [
  {
    id: 'young-engineer-preschool',
    title: 'Курс Молодого Инженера',
    grades: 'Дошкольники',        // строка с классом
    price: '2470',                 // цена (только число)
    currency: '₽/занятие',        // валюта (пусто, если бесплатно)
    image: 'img/courses/young-engineer.png',
    badge: null,                   // null или 'Новый', 'Онлайн', 'Бесплатно'
    color: '#FFF0EE',             // цвет фона картинки
    category: ['preschool'],      // категории для фильтра
    link: '/courses/young-engineer-preschool',
    featured: false               // true = показывать на главной
  },
  {
    id: 'young-engineer-1-4',
    title: 'Курс Молодого Инженера (1-4 класс)',
    grades: '1 - 4 классы',
    price: '2470',
    currency: '₽/занятие',
    image: 'img/courses/young-engineer.png',
    badge: null,
    color: '#E8F5E9',
    category: ['1-4'],
    link: '/courses/young-engineer-course-1-4',
    featured: true
  },
  {
    id: 'robotics-spike',
    title: 'Робототехника на наборах Spike',
    grades: '1 - 4 классы',
    price: '2470',
    currency: '₽/занятие',
    image: 'img/courses/robotics.png',
    badge: null,
    color: '#E3F2FD',
    category: ['1-4'],
    link: '/courses/SPIKEPrime',
    featured: true
  },
  {
    id: 'ai-basics',
    title: 'Основы искусственного интеллекта',
    grades: '5 - 8 классы',
    price: '2870',
    currency: '₽/занятие',
    image: 'img/courses/ai-course.png',
    badge: 'Новый',
    color: '#F3E5F5',
    category: ['5-8'],
    link: '/courses/osn_ai',
    featured: true
  },
  {
    id: 'python-basics',
    title: 'Программирование на языке Python',
    grades: '5 - 8 классы',
    price: '2470',
    currency: '₽/занятие',
    image: 'img/courses/python.svg',
    badge: null,
    color: '#FFF3E0',
    category: ['5-8'],
    link: '/courses/python-programming-5-8',
    featured: true
  },
  {
    id: 'python-3d-online',
    title: 'Python 3D. Онлайн-интенсив',
    grades: '8 - 11 классы',
    price: '990',
    currency: '₽/занятие',
    image: 'img/courses/python-online.svg',
    badge: 'Онлайн',
    color: '#E8F5E9',
    category: ['5-8', '9-11', 'online'],
    link: '/courses/python-3d-8-11-intensive-online',
    featured: false
  },
  {
    id: 'ar-development',
    title: 'Разработка приложений доп. реальности',
    grades: '9 - 11 классы',
    price: '990',
    currency: '₽/занятие',
    image: 'img/courses/ar-dev.svg',
    badge: 'Онлайн',
    color: '#FCE4EC',
    category: ['9-11', 'online'],
    link: '/courses/AR-development-9-11-intensive-online',
    featured: false
  },
  {
    id: 'java-dev',
    title: 'Java разработчик 1 уровень',
    grades: '5 - 8 классы',
    price: '5940',
    currency: '₽/занятие',
    image: 'img/courses/online.png',
    badge: 'Онлайн',
    color: '#E0F7FA',
    category: ['5-8', 'online'],
    link: '/courses/java-5-8-intensive-online',
    featured: false
  },
  {
    id: 'ai-2035',
    title: 'Введение в системы искусственного интеллекта',
    grades: '9 - 11 классы',
    price: 'Бесплатно',
    currency: '',
    image: 'img/courses/ai-badge.png',
    badge: 'Бесплатно',
    color: '#E8F5E9',
    category: ['9-11'],
    link: '/courses/ai-2035',
    featured: false
  },
  {
    id: 'cpp-2035',
    title: 'Разработка на C++. Начальный уровень',
    grades: '9 - 11 классы',
    price: 'Бесплатно',
    currency: '',
    image: 'img/courses/python-online.svg',
    badge: 'Бесплатно',
    color: '#FFF8E1',
    category: ['9-11'],
    link: '/courses/cpp-2035',
    featured: false
  },
  {
    id: 'python-2035',
    title: 'Разработка на Python. Начальный уровень',
    grades: '9 - 11 классы',
    price: 'Бесплатно',
    currency: '',
    image: 'img/courses/python-online.svg',
    badge: 'Бесплатно',
    color: '#E3F2FD',
    category: ['9-11'],
    link: '/courses/up-2035',
    featured: false
  },
  {
    id: 'young-engineer-9-11',
    title: 'Курс Молодого Инженера (9-11 класс)',
    grades: '9 - 11 классы',
    price: '2870',
    currency: '₽/занятие',
    image: 'img/courses/young-engineer.png',
    badge: null,
    color: '#F3E5F5',
    category: ['9-11'],
    link: '/courses/young-engineer-course-9-11',
    featured: false
  }
];

// ============================================================
// Вспомогательные функции для рендеринга карточек
// ============================================================

// Соответствие текста бейджа CSS-классу
var BADGE_CLASSES = {
  'Бесплатно': 'course-card__badge--free',
  'Онлайн':    'course-card__badge--online',
  'Новый':     'course-card__badge--new'
};

// Возвращает CSS-класс для бейджа
function getBadgeClass(text) {
  return BADGE_CLASSES[text] || '';
}

// Собирает HTML одной карточки курса
function getCourseCardHTML(course) {
  var badgeHtml = course.badge
    ? '<span class="course-card__badge ' + getBadgeClass(course.badge) + '">' + course.badge + '</span>'
    : '';

  var priceHtml = course.currency
    ? course.price + ' ' + course.currency
    : course.price;

  return '<a href="' + course.link + '" class="course-card" data-category="' + course.category.join(' ') + '">'
    + badgeHtml
    + '<div class="course-card__image" style="background-color: ' + course.color + ';">'
    + '<img src="' + course.image + '" alt="' + course.title + '" loading="lazy">'
    + '</div>'
    + '<div class="course-card__body">'
    + '<div class="course-card__title">' + course.title + '</div>'
    + '<div class="course-card__meta">'
    + '<span class="course-card__grade">' + course.grades + '</span>'
    + '<span class="course-card__price">' + priceHtml + '</span>'
    + '</div>'
    + '</div>'
    + '</a>';
}

// Вставляет отрендеренные карточки в указанный контейнер
function renderCourses(selector, list) {
  var container = document.querySelector(selector);
  if (!container) return;
  var html = '';
  for (var i = 0; i < list.length; i++) {
    html += getCourseCardHTML(list[i]);
  }
  container.innerHTML = html;
}
