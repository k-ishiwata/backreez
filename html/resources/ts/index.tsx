import React from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(
    document.getElementById('app') as HTMLElement
)

root.render(
    <React.StrictMode>
        <div>Test</div>
    </React.StrictMode>
)
