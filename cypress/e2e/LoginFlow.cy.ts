describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/auth/login`)
  })

  it('成功登入', () => {
    cy.get('input[type="email"]').type('test@gmail.com')
    cy.get('input[type="password"]').type('test1234')
    cy.get('button[data-test="login_submit_btn"]').click()
    cy.url().should('include', '/lobby')
  })

  it('使用測試帳號登入', () => {
    cy.get('button[data-test="login_testAccount_btn"]').click()
    cy.url().should('include', '/lobby')
  })
})
