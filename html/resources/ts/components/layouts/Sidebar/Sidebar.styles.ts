import {
    createStyles,
    MantineTheme,
    useMantineColorScheme
} from '@mantine/core'

export default createStyles((theme: MantineTheme, _params) => {
    const { colorScheme } = useMantineColorScheme()
    const dark = colorScheme === 'dark'

    return {
        list: {
            listStyle: 'none',
            padding: 0,
            fontSize: 14,

            'a': {
                display: 'flex',
                alignItems: 'center',
                padding: '7px 15px',
                color: dark ? theme.colors.gray[1] : theme.colors.gray[9],
                textDecoration: 'none',

                '&:hover': {
                    fontWeight: 'bold'
                },

                '.icon': {
                    color: dark ? theme.colors.gray[5] : theme.colors.gray[7],
                    marginRight: 11,
                    fontSize: 16,
                    lineHeight: 0
                },

                '&.active': {
                    color: theme.colors.blue[6],
                    fontWeight: 'bold',

                    '.icon': {
                        color: theme.colors.blue[6],
                    },
                }
            }
        }
    }
})
