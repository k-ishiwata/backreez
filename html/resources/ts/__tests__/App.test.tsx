import React from 'react'
import { render } from '@testing-library/react'
import App from '@/App'

describe('App component', () => {
    it('文字列が表示される。', () => {
        const { container } = render(<App />)
        expect(container.innerHTML).toMatch('Test')
    })
})
