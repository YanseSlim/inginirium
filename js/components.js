// ============================================================
// Общие компоненты: шапка и подвал.
// Изменяй здесь — обновятся на обеих страницах.
// ============================================================

// Рендерит шапку сайта. activeKey — раздел с подсветкой (courses / about / …)
function renderHeader(activeKey) {
  var navLinks = [
    { key: 'about',          label: 'О нас',          href: '/about/' },
    { key: 'news',           label: 'Новости',        href: '/news/' },
    { key: 'courses',        label: 'Курсы',          href: '/courses/' },
    { key: 'master-classes', label: 'Мастер-классы',  href: '/master-classes/' },
    { key: 'technopark',     label: 'Технопарки',     href: '/technopark/' },
    { key: 'camps',          label: 'Лето',           href: '/camps/' },
    { key: 'branches',       label: 'Центры',         href: '/branches/' },
    { key: 'first',          label: 'Первенство',     href: '/first/' }
  ];

  var navHtml = '';
  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var activeClass = (link.key === activeKey) ? ' class="active"' : '';
    navHtml += '<a href="' + link.href + '"' + activeClass + '>' + link.label + '</a>';
  }

  var html =
    '<header class="header">'
      + '<div class="header__top">'
        + '<div class="container">'
          + '<span class="header__top-title">Центр молодежного инновационного творчества и технопарк</span>'
          + '<span class="header__top-license">Лицензия № 040350 от 25.09.2019</span>'
        + '</div>'
      + '</div>'
      + '<div class="container header__main">'
        + '<a href="/" class="header__logo">'
          + '<img src="img/inginirium.png" alt="Инжинириум">'
        + '</a>'
        + '<nav class="header__nav">'
          + navHtml
          + '<a href="tel:88005005617" class="header__phone">8 800 500 56 17</a>'
        + '</nav>'
        + '<button class="header__cta" onclick="alert(\'Форма записи\')">Записаться</button>'
      + '</div>'
    + '</header>';

  document.getElementById('header').innerHTML = html;
}

// Рендерит подвал сайта
function renderFooter() {
  var html =
    '<footer class="footer">'
      + '<div class="container">'
        + '<div class="footer__row">'
          + '<div class="footer__col">'
            + '<div class="footer__col-title">Инжинириум</div>'
            + '<a href="/about/">О нас</a>'
            + '<a href="/news/">Новости</a>'
            + '<a href="/feedback/">Отзывы</a>'
            + '<a href="/press/">СМИ о нас</a>'
          + '</div>'
          + '<div class="footer__col">'
            + '<div class="footer__col-title">Обучение</div>'
            + '<a href="/courses/">Курсы</a>'
            + '<a href="/master-classes/">Мастер-классы</a>'
            + '<a href="/technopark/">Технопарки</a>'
            + '<a href="/camps/">Летние программы</a>'
          + '</div>'
          + '<div class="footer__col">'
            + '<div class="footer__col-title">Документы</div>'
            + '<a href="/docs/">Сведения об образовательной организации</a>'
            + '<a href="/offer/">Оферта</a>'
            + '<a href="/userconsent/">Согласие на обработку данных</a>'
          + '</div>'
          + '<div class="footer__col">'
            + '<div class="footer__col-title">Контакты</div>'
            + '<a href="tel:88005005617">8 800 500 56 17</a>'
            + '<a href="mailto:press@emtc.ru">press@emtc.ru</a>'
            + '<a href="mailto:a@inginirium.ru">a@inginirium.ru</a>'
            + '<div class="footer__social">'
              + '<a href="https://vk.com/inginirium" title="ВКонтакте">VK</a>'
              + '<a href="https://rutube.ru/channel/41512182/videos/" title="Rutube">RT</a>'
            + '</div>'
          + '</div>'
        + '</div>'
        + '<div class="footer__bottom">'
          + '<span>© 2026 Инжинириум МГТУ им. Н.Э. Баумана</span>'
          + '<span>Все права защищены</span>'
        + '</div>'
      + '</div>'
    + '</footer>';

  document.getElementById('footer').innerHTML = html;
}
