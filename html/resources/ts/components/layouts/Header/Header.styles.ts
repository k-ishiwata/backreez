import {
    createStyles,
    MantineTheme,
    useMantineColorScheme
} from '@mantine/core'

export default createStyles((theme: MantineTheme) => {
    const { colorScheme } = useMantineColorScheme()
    const dark = colorScheme === 'dark'

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
                    color: dark ? theme.colors.gray[1] : theme.colors.gray[9],
                    textDecoration: 'none',

                    '&:hover': {
                        fontWeight: 'bold',
                        color: dark ? theme.colors.gray[2] : theme.colors.gray[7],
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
