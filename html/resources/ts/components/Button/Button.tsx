import { styled } from '@/stitches.config'

export const Button = styled('button', {
    cursor: 'pointer',
    appearance: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    boxSizing: 'border-box',
    display: 'inline-block',
    borderRadius: '$md',
    fontWeight: 600,
    position: 'relative',
    height: '2rem',
    lineHeight: 1,
    userSelect: 'none',
    border: '1px solid transparent',
    color: '#fff',
    padding: '0.6em 1.1rem',
    backgroundColor: '$gray',
    fontSize: '$md',

    '&:hover': {
        opacity: .9,
    },

    '& svg': {
        display: 'inline-block',
        verticalAlign: 'bottom',
        height: '13px',
        marginLeft: '5px',

        '&.left': {
            marginLeft: 0,
            marginRight: 5,
        }
    },
    variants: {
        primary: {
            true: {
                backgroundColor: '$primary',
            }
        },
        color: {
            gray: {
                backgroundColor: '$gray',
            },
            red: {
                backgroundColor: '$red',
            },
        },
        variant: {
            outline: {
                color: '$primary',
                borderWidth: 1,
                background: 'transparent'
            },
        },
    },
    // compoundVariants: [
    //     {
    //         color: 'primary',
    //         variant: 'outline',
    //         css: {
    //             color: '$primary',
    //             borderColor: '$primary',
    //             background: 'transparent',
    //             '&:hover': {
    //                 backgroundColor: '$primaryLight'
    //             }
    //         },
    //     },
    //     {
    //         color: 'gray',
    //         variant: 'outline',
    //         css: {
    //             color: '$gray',
    //             borderColor: '$gray',
    //             background: 'transparent',
    //             '&:hover': {
    //                 backgroundColor: '$grayLight'
    //             }
    //         },
    //     },
    //     {
    //         color: 'red',
    //         variant: 'outline',
    //         css: {
    //             color: '$red',
    //             borderColor: '$red',
    //             background: 'transparent',
    //             '&:hover': {
    //                 backgroundColor: '$redLight'
    //             }
    //         },
    //     },
    // ],

    // defaultVariants: {
    //     color: 'gray',
    // },
})
