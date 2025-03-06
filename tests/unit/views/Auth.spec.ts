import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Login from '@/views/Auth/components/Login.vue'
import Register from '@/views/Auth/components/Register.vue'
import ForgotPassword from '@/views/Auth/components/ForgotPassword.vue'
import ResetPassword from '@/views/Auth/components/ResetPassword.vue'
import { authAPI } from '@/apis'
import { Storage } from '@/utils/localStorage'

vi.mock('@/apis', () => ({
  authAPI: {
    login: vi.fn(() => Promise.resolve()),
    testLogin: vi.fn(() => Promise.resolve()),
    register: vi.fn(() => Promise.resolve()),
    sendResetEmail: vi.fn(() => Promise.resolve()),
    resetPassword: vi.fn(() => Promise.resolve())
  }
}))

vi.mock('@/utils/localStorage', () => ({
  Storage: {
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn()
  }
}))

let loginWrapper: VueWrapper<any>
describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    loginWrapper = mount(Login, {
      global: {
        mocks: {
          formData: ref({ email: 'test@example.com', password: '123456' }),
          isLoading: ref(false),
          rememberEmail: ref(false)
        }
      }
    })
  })

  it('點擊登入呼叫 login', async () => {
    const login = vi.spyOn(loginWrapper.vm, 'login')
    const loginBtn = loginWrapper.find('[data-test="login_submit_btn"]')
    await loginBtn.trigger('click')
    await flushPromises()
    expect(login).toHaveBeenCalled()
  })

  it('login 呼叫 login api 並儲存相關資料', async () => {
    expect(loginWrapper.vm.checkRemember).toBeDefined()
    authAPI.login = vi.fn().mockResolvedValue({ token: 'mockToken', lang: 'en-US' })
    await loginWrapper.vm.login()
    await flushPromises()
    expect(authAPI.login).toHaveBeenCalled()
    expect(Storage.set).toHaveBeenCalledWith('token', 'mockToken')
    expect(Storage.remove).toHaveBeenCalledWith('email')
    expect(Storage.set).not.toHaveBeenCalledWith('email', 'test@example.com')
    expect(loginWrapper.vm.locale).toBe('en-US')
  })

  it('點擊測試登入呼叫 test login', async () => {
    const loginTest = vi.spyOn(loginWrapper.vm, 'loginTest')
    const loginBtn = loginWrapper.find('[data-test="login_testAccount_btn"]')
    await loginBtn.trigger('click')
    await flushPromises()
    expect(loginTest).toHaveBeenCalled()
  })

  it('loginTest 呼叫 loginTest api 並儲存相關資料', async () => {
    authAPI.testLogin = vi.fn().mockResolvedValue({ token: 'mockTestToken', lang: 'en-US' })
    await loginWrapper.vm.loginTest()
    await flushPromises()
    expect(authAPI.testLogin).toHaveBeenCalled()
    expect(Storage.set).toHaveBeenCalledWith('token', 'mockTestToken')
    expect(loginWrapper.vm.locale).toBe('en-US')
  })

  it('checkRemember 正確儲存 storage', () => {
    const checkRemember = vi.spyOn(loginWrapper.vm, 'checkRemember')
    loginWrapper.vm.checkRemember()
    expect(checkRemember).toHaveBeenCalled()
    expect(Storage.set).not.toHaveBeenCalledWith('email', 'test@example.com')

    loginWrapper.vm.rememberEmail = true
    loginWrapper.vm.checkRemember()
    expect(Storage.set).toHaveBeenCalledWith('email', 'test@example.com')
  })

  it('點擊忘記密碼前往忘記密碼頁', async () => {
    const forgotBtn = loginWrapper.find('[data-test="login_forgotPassword_btn"]')
    const routerPush = vi.spyOn(loginWrapper.vm.router, 'push')
    await forgotBtn.trigger('click')
    expect(routerPush).toHaveBeenCalledWith({ name: 'ForgotPassword' })
  })

  it('點擊註冊前往註冊頁', async () => {
    const registerBtn = loginWrapper.find('[data-test="login_toRegister_btn"]')
    const routerPush = vi.spyOn(loginWrapper.vm.router, 'push')
    await registerBtn.trigger('click')
    expect(routerPush).toHaveBeenCalledWith({ name: 'Register' })
  })
})

let registerWrapper: VueWrapper<any>
describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    registerWrapper = mount(Register)
  })

  it('點擊註冊呼叫 register', async () => {
    const register = vi.spyOn(registerWrapper.vm, 'register')
    const registerBtn = registerWrapper.find('[data-test="register_submit_btn"]')
    await registerBtn.trigger('click')
    await flushPromises()
    expect(register).toHaveBeenCalled()
  })

  it('register 驗證後呼叫 register api', async () => {
    registerWrapper.vm.register()
    await flushPromises()
    expect(authAPI.register).not.toHaveBeenCalled()
    registerWrapper.find('[data-test="register_name_input"]').setValue('test')
    registerWrapper.find('[data-test="register_email_input"]').setValue('test@example.com')
    registerWrapper.find('[data-test="register_password_input"]').setValue('test1234')
    registerWrapper.find('[data-test="register_checkPassword_input"]').setValue('test1234')
    registerWrapper.vm.register()
    await flushPromises()
    expect(authAPI.register).toHaveBeenCalled()
  })

  it('register api 執行後更新資料，顯示 toLogin 並正確導頁', async () => {
    registerWrapper.vm.formRef.validate = vi.fn((callback) => callback(true))
    registerWrapper.vm.register()
    await flushPromises()
    expect(registerWrapper.vm.isRegistered).toBe(true)
    expect(registerWrapper.vm.isLoading).toBe(false)

    const toLoginBtn = registerWrapper.find('[data-test="register_toLogin_btn"]')
    expect(toLoginBtn.exists()).toBe(true)
    const routerPush = vi.spyOn(registerWrapper.vm.router, 'push')
    await toLoginBtn.trigger('click')
    expect(routerPush).toHaveBeenCalledWith({ name: 'Login' })
  })

  it('點擊取消回到 login', async () => {
    const canaelBtn = registerWrapper.find('[data-test="register_cancel_btn"]')
    const routerPush = vi.spyOn(registerWrapper.vm.router, 'push')
    await canaelBtn.trigger('click')
    expect(routerPush).toHaveBeenCalledWith({ name: 'Login' })
  })
})

let forgotPasswordWrapper: VueWrapper<any>
describe('ForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    forgotPasswordWrapper = mount(ForgotPassword)
  })

  it('點擊發送重置信呼叫 sendResetEmail', async () => {
    const sendResetEmail = vi.spyOn(forgotPasswordWrapper.vm, 'sendResetEmail')
    const resetBtn = forgotPasswordWrapper.find('[data-test="forgotPassword_sendEmail_btn"]')
    await resetBtn.trigger('click')
    await flushPromises()
    expect(sendResetEmail).toHaveBeenCalled()
  })

  it('sendResetEmail 驗證後呼叫 sendResetEmail api', async () => {
    forgotPasswordWrapper.vm.sendResetEmail()
    await flushPromises()
    expect(authAPI.sendResetEmail).not.toHaveBeenCalled()
    forgotPasswordWrapper
      .find('[data-test="forgotPassword_email_input"]')
      .setValue('test@example.com')
    forgotPasswordWrapper.vm.sendResetEmail()
    await flushPromises()
    expect(authAPI.sendResetEmail).toHaveBeenCalled()
  })

  it('sendResetEmail api 執行後更新資料，顯示 toLogin 並正確導頁', async () => {
    forgotPasswordWrapper.vm.formRef.validate = vi.fn((callback) => callback(true))
    forgotPasswordWrapper.vm.sendResetEmail()
    await flushPromises()
    expect(forgotPasswordWrapper.vm.isSendEmail).toBe(true)
    expect(forgotPasswordWrapper.vm.isLoading).toBe(false)

    const toLoginBtn = forgotPasswordWrapper.find('[data-test="forgotPassword_toLogin_btn"]')
    expect(toLoginBtn.exists()).toBe(true)
    const routerPush = vi.spyOn(forgotPasswordWrapper.vm.router, 'push')
    await toLoginBtn.trigger('click')
    expect(routerPush).toHaveBeenCalledWith({ name: 'Login' })
  })

  it('點擊取消回到 login', async () => {
    const canaelBtn = forgotPasswordWrapper.find('[data-test="forgotPassword_cancel_btn"]')
    const routerPush = vi.spyOn(forgotPasswordWrapper.vm.router, 'push')
    await canaelBtn.trigger('click')
    expect(routerPush).toHaveBeenCalledWith({ name: 'Login' })
  })
})

let resetPasswordWrapper: VueWrapper<any>
describe('ResetPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    resetPasswordWrapper = mount(ResetPassword)
  })

  it('點擊重置呼叫 resetPassword', async () => {
    const resetPassword = vi.spyOn(resetPasswordWrapper.vm, 'resetPassword')
    const resetBtn = resetPasswordWrapper.find('[data-test="resetPassword_submit_btn"]')
    await resetBtn.trigger('click')
    await flushPromises()
    expect(resetPassword).toHaveBeenCalled()
  })

  it('resetPassword 驗證後呼叫 resetPassword api', async () => {
    resetPasswordWrapper.vm.resetPassword()
    await flushPromises()
    expect(authAPI.resetPassword).not.toHaveBeenCalled()
    resetPasswordWrapper.find('[data-test="resetPassword_password_input"]').setValue('test1234')
    resetPasswordWrapper
      .find('[data-test="resetPassword_checkPassword_input"]')
      .setValue('test1234')
    resetPasswordWrapper.vm.resetPassword()
    await flushPromises()
    expect(authAPI.resetPassword).toHaveBeenCalled()
  })

  it('resetPassword api 執行後更新資料，顯示 toLogin 並正確導頁', async () => {
    resetPasswordWrapper.vm.formRef.validate = vi.fn((callback) => callback(true))
    resetPasswordWrapper.vm.resetPassword()
    await flushPromises()
    expect(resetPasswordWrapper.vm.isReset).toBe(true)
    expect(resetPasswordWrapper.vm.isLoading).toBe(false)

    const toLoginBtn = resetPasswordWrapper.find('[data-test="resetPassword_toLogin_btn"]')
    expect(toLoginBtn.exists()).toBe(true)
    const routerPush = vi.spyOn(resetPasswordWrapper.vm.router, 'push')
    await toLoginBtn.trigger('click')
    expect(routerPush).toHaveBeenCalledWith({ name: 'Login' })
  })
})
