import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Login from './Login'
describe('Login Page', () => {
    it('should render with required fields', () => {
        render(<Login />)
        // Get by -> throw error
        // Find by -> async
        // Query by -> null
        expect(screen.getByText(/Sign In/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Forgot Password' })).toBeInTheDocument();
        expect(screen.getByText(/Don't have an account?/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Sign Up' })).toBeInTheDocument();
    })
})