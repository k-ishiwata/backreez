import { createStitches, createTheme } from '@stitches/react'

export const { styled, keyframes } = createStitches({
    theme: {
        colors: {
            black: 'rgba(19, 19, 21, 1)',
            white: 'rgba(255, 255, 255, 1)',
            gray: 'rgba(134, 142, 150, 1)',
            grayLight: 'rgba(248, 249, 250, 1)',
            blue: 'rgba(51, 155, 240, 1)',
            blueHover: 'rgb(133,198,255)',
            blueLight: 'rgba(240, 249, 255, 1)',
            red: 'rgba(250, 82, 82, 1)',
            redLight: 'rgba(255, 245, 245, 1)',
            yellow: 'rgba(255, 221, 0, 1)',
            pink: 'rgba(232, 141, 163, 1)',
            orange: 'rgba(255, 135, 31, 1)',
            primary: '$blue',
            primaryHover: '$blueHover',
            primaryLight: '$blueLight',
            border: 'rgba(206, 212, 218, 1)',
            font: 'rgba(19, 19, 21, 1)',
            bg: 'rgba(255, 255, 255, 1)',
            bgHover: 'rgba(245, 245, 245, 1)',
        },
        fonts: {
            sans: 'Inter, sans-serif',
        },
        fontSizes: {
            sm: '11px',
            md: '13px',
            lg: '15px',
        },
        space: {
            1: '4px',
            2: '8px',
            3: '16px',
            4: '32px',
            5: '64px',
            6: '128px',
        },
        sizes: {
            1: '4px',
            2: '8px',
            3: '16px',
            4: '32px',
            5: '64px',
            6: '128px',
        },
        radii: {
            sm: '2px',
            md: '4px',
            lg: '8px',
            round: '100%',
        },
        fontWeights: {},
        lineHeights: {},
        letterSpacings: {},
        borderWidths: {},
        borderStyles: {},
        shadows: {},
        zIndices: {},
        transitions: {},
    },
    media: {
        bp1: '(min-width: 575px)',
        bp2: '(min-width: 750px)',
    }
})

export const darkTheme = createTheme({
    colors: {
        black: 'rgba(255, 255, 255, 1)',
        white: 'rgba(19, 19, 21, 1)',
        border: 'rgba(100, 100, 100, 1)',
        font: 'rgba(240, 240, 240, 1)',
        bg: 'rgba(19, 19, 19, 1)',
        bgHover: 'rgba(50, 50, 50, 1)',
    },
})
