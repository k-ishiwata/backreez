import { createStitches, createTheme } from '@stitches/react'

export const { styled, keyframes } = createStitches({
    theme: {
        colors: {
            black: 'rgb(19,19,21)',
            white: 'rgb(255,255,255)',
            gray: 'rgb(134,142,150)',
            grayHover: 'rgb(236,239,240)',
            grayLight: 'rgb(248,249,250)',
            blue: 'rgb(51,155,240)',
            blueHover: 'rgb(133,198,255)',
            blueLight: 'rgb(240,249,255)',
            green: 'rgb(18,184,134)',
            greenHover: 'rgb(65,205,159)',
            greenLight: 'rgb(183,221,211)',
            grape: 'rgb(132,94,247)',
            grapeHover: 'rgb(170,145,242)',
            grapeLight: 'rgb(210,208,227)',
            red: 'rgb(250,82,82)',
            redLight: 'rgb(255,245,245)',
            yellow: 'rgb(255,221,0)',
            pink: 'rgb(232,141,163)',
            orange: 'rgb(255,135,31)',
            primary: '$blue',
            primaryHover: '$blueHover',
            primaryLight: '$blueLight',
            border: 'rgb(206,212,218)',
            font: 'rgb(19,19,21)',
            bg: 'rgb(255,255,255)',
            bgHover: 'rgb(245,245,245)',
        },
        fonts: {
            sans: 'Inter, sans-serif',
        },
        fontSizes: {
            sm: '11px',
            md: '13px',
            lg: '15px',
            lgx: '17px',
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
