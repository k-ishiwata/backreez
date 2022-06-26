import {
    createStyles,
    MantineTheme
} from '@mantine/core'

export default createStyles((theme: MantineTheme) => {
    return {
        wrapper: {
            alignItems: 'center',
            display: 'flex',
            fontSize: 14,
            lineHeight: 1
        },
        appName: {
            fontWeight: 'bold',
            fontSize: 21
        },
        mainNav: {
            listStyle: 'none',
            display: 'flex',

            '.item': {
                // fontSize: 14,
                marginLeft: 20,
                cursor: 'pointer',

                a: {
                    color: theme.colors.gray[9],
                    textDecoration: 'none',

                    '&:hover': {
                        fontWeight: 'bold',
                        color: theme.colors.gray[7],
                    },

                    '&.active': {
                        color: theme.colors.blue[6],
                        fontWeight: 'bold'
                    }
                }
            }
        },
        subNav: {
            marginLeft: 'auto'
        }
    }
})
