import { describe, it, expect } from 'vitest';
import { ROUTES } from '../lib/constants';

describe('Project Layout Constants', () => {
  it('should have correct application entry points', () => {
    expect(ROUTES.APP).toBe('/app.html');
    expect(ROUTES.LANDING).toBe('/index.html');
  });

  it('should have authentication routes defined', () => {
    expect(ROUTES.LOGIN).toBe('/login.html');
    expect(ROUTES.SIGNUP).toBe('/signup.html');
  });
});
