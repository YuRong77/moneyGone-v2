describe('Register Flow', () => {
  it('成功註冊', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/auth/login`)
    cy.get('button[data-test="login_toRegister_btn"]').click()
    cy.url().should('include', '/register')

    cy.intercept('POST', `${Cypress.env('API_URL')}/auth/register`, {
      statusCode: 201,
      body: { status: 201, message: '註冊成功', data: null }
    }).as('registerRequest')

    cy.get('input[data-test="register_name_input"]').type('testName')
    cy.get('input[data-test="register_email_input"]').type('testEmail@example.com')
    cy.get('input[data-test="register_password_input"]').type('testPassword')
    cy.get('input[data-test="register_checkPassword_input"]').type('testPassword')
    cy.get('button[data-test="register_submit_btn"]').click()
    cy.get('button[data-test="register_toLogin_btn"]').should('exist')
    cy.get('button[data-test="register_toLogin_btn"]').click()
    cy.url().should('include', '/login')
  })
})
