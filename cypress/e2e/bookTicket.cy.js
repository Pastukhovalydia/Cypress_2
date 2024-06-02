describe('Проверка бронирования фильма', () => {
  let seatSelectors = [];

  before(() => {
    // Получаем все селекторы для места из фикстур
    cy.fixture('selectors').then((selectors) => {
      seatSelectors = Object.keys(selectors)
        .filter((key) => key.startsWith('randomSeat'))
        .map((key) => selectors[key]);
    });
  });

  beforeEach(() => {
    cy.visit('http://qamid.tmweb.ru/admin');
    cy.fixture('adminLogin').then((admin) => {
      cy.login(admin.validUser.email, admin.validUser.password);
    });
  });

  it('Бронирование билета в доступный зал и получение кода бронирования', () => {
    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.hallControlHeader).scrollIntoView();
      cy.get(selectors.hallSelector).click();
      cy.visit('http://qamid.tmweb.ru');
      cy.contains('Зал 1').click();
      cy.get(selectors.movieTitle).contains('Зверополис').click();

      // Выбираем время сеанса с указанным селектором
      cy.get(selectors.seanceTime).click();

      // Выбираем случайный селектор для выбора места
      const randomSeatSelector = Cypress._.sample(seatSelectors);
      cy.get(randomSeatSelector).click();
      
      cy.contains('Забронировать').click();
      
      // Проверяем заголовок "Вы выбрали билеты"
      cy.get(selectors.ticketCheckTitle).should('be.visible').and('contain', 'Вы выбрали билеты');
      
      // Проверяем наличие кнопки "Получить код бронирования"
      cy.get(selectors.acceptinButton).should('be.visible').click();

      // Проверяем, что мы на странице с кодом бронирования
      cy.contains('Электронный билет').should('be.visible');
      
      // Проверяем наличие QR-кода
      cy.get(selectors.ticketQRCode).should('be.visible');
    });
  });
});
