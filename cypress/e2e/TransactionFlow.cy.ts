describe('Transaction Flow', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/auth/login`)
    cy.get('button[data-test="login_testAccount_btn"]').click()
    cy.url().should('include', '/lobby')
  })

  it('至設定頁新增分類', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/setting`)
    cy.url().should('include', '/setting')
    cy.get('div[data-test="setting_category"]').click()
    cy.get('button[data-test="category_add_btn"]').click()
    cy.get('input[data-test="category_name_input"]').type('testCategory')
    cy.get('button[data-test="category_submit_btn"]').click()
    cy.get('.el-drawer__body').contains('testCategory').should('be.visible')
  })

  it('至 lobby 確認新增分類並使用 footer 新增按鈕', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/lobby`)
    cy.url().should('include', '/lobby')
    cy.get('.categories').contains('testCategory').should('be.visible')
    cy.get('button[data-test="footer_transaction_btn"]').click()
    cy.get('.categoryDialog').contains('testCategory').click()

    cy.get('input[data-test="transaction_name_input"]').type('testTransaction')
    cy.get('input[data-test="transaction_amount_input"]').type('100')
    cy.get('button[data-test="transaction_submit_btn"]').click()
    cy.get('.record').contains('testTransaction').should('be.visible')
  })

  it('編輯成功後刪除該紀錄', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/lobby`)
    cy.url().should('include', '/lobby')

    const recordItem = cy.get('.recordItem').filter(':contains("testTransaction")')
    recordItem.find('.action').click()
    recordItem.find('button[data-test="recordItem_edit_btn"]').click()

    cy.get('input[data-test="transaction_name_input"]').clear().type('testEditTransaction')
    cy.get('button[data-test="transaction_submit_btn"]').click()
    cy.get('.record').contains('testEditTransaction').should('be.visible')

    const recordEditItem = cy.get('.recordItem').filter(':contains("testEditTransaction")')
    recordEditItem.find('.action').click()
    recordEditItem.find('button[data-test="recordItem_delete_btn"]').click()

    cy.get('.el-message-box .el-button--primary').click()
    cy.get('.record').contains('testEditTransaction').should('not.exist')
  })
})
