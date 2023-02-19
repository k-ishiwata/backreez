import {
    createStyles,
    MantineTheme
} from '@mantine/core'

export default createStyles((theme: MantineTheme) => {
    return {
        body: {
            background: theme.other.secondaryBG,
            border: theme.other.line,
            padding: 50,
            marginBottom: 20,
            whiteSpace: 'pre-wrap'
        },
        info: {
            marginTop: 40,
            '> div': {
                width: '100%',
                borderTop: theme.other.line,
                borderBottom: theme.other.line,
            }
        }
    }
})
