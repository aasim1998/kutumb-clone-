import { by, device, expect, element } from 'detox';
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have Sign In screen', async () => {
    await expect(element(by.id('SignInTitle'))).toBeVisible();
  });

  it('should have Email input', async () => {
    await expect(element(by.id('EmailInput'))).toBeVisible();
  });

  it('should have Password input', async () => {
    await expect(element(by.id('PasswordInput'))).toBeVisible();
  });

});
