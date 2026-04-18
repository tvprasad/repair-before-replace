import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import * as useRepairUserHook from '../hooks/useRepairUser';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

vi.mock('../hooks/useRepairUser');

describe('ProtectedRoute', () => {
  it('redirects unauthenticated user to loginWithRedirect', () => {
    const mockLoginWithRedirect = vi.fn();
    vi.spyOn(useRepairUserHook, 'useRepairUser').mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      loginWithRedirect: mockLoginWithRedirect,
      logout: vi.fn(),
      sub: '',
      name: '',
      picture: ''
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });
});
