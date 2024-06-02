describe('Проверка главной страницы после авторизации', () => {
  beforeEach(() => {
    cy.visit('http://qamid.tmweb.ru/admin');
    cy.fixture('adminLogin').then((admin) => {
      cy.login(admin.validUser.email, admin.validUser.password);
    });
  });

  it('Корректное отображение заголовка главной страницы', () => {
    cy.visit('http://qamid.tmweb.ru');
    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.mainPageTitle).should('be.visible');
    });
  });
});
