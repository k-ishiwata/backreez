import { styled } from '@/stitches.config'

const Wrap = styled('div', {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
    top: 0,
    position: 'fixed',
    width: '100%',
    background: '$bg',
    height: 50,
    zIndex: 100,
    borderBottom: 'solid 1px $border',
})

const AppName = styled('p', {
    fontWeight: 'bold',
    fontSize: 18
})

const MainNavi = styled('ul', {
    listStyle: 'none',
    display: 'flex',

    '& > li': {
        // fontSize: 14,
        marginLeft: 20,
        cursor: 'pointer',

        a: {
            color: '$font',
            textDecoration: 'none',

            '&:hover': {
                fontWeight: 'bold',
                color: '$font',
            },

            '&.active': {
                color: '$primary',
                fontWeight: 'bold'
            }
        }
    }
})

const SubNavi = styled('ul', {
    marginLeft: 'auto',
    display: 'flex',
    gap: 14,
    alignItems: 'center',
})

export {
    Wrap,
    AppName,
    MainNavi,
    SubNavi,
}
