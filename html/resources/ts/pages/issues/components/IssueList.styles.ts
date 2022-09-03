import {
    createStyles,
    MantineTheme,
} from '@mantine/core'

export default createStyles((theme: MantineTheme) => {
    return {
        wrapper: {
            background: '#fff',
            border: 'solid 1px ' + theme.colors.gray[2],
            marginBottom: 20
        },
    }
})
