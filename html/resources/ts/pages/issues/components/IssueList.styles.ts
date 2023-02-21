import {
    createStyles,
    MantineTheme
} from '@mantine/core'

export default createStyles((theme: MantineTheme) => {
    return {
        wrapper: {
            background: theme.other.secondaryBG,
            border: theme.other.line,
            marginBottom: 20
        },
    }
})