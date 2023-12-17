export const inputBase = {
    height: '2.2rem',
    minHeight: '2.2rem',
    appearance: 'none',
    resize: 'none',
    boxSizing: 'border-box',
    width: '100%',
    display: 'block',
    textAlign: 'left',
    border: '0.0625rem solid $border',
    transition: 'border-color 100ms ease',
    padding: 'calc(2.2rem / 3)',
    borderRadius: '$md',
    outlineColor: '$primary',

    variants: {
        size: {
            sm: {
                height: '1.85rem',
                minHeight: '1.85rem',
                paddingLeft: 'calc(1.85rem / 3)',
                paddingRight: 'calc(1.85rem / 3)',
            }
        },
        error: {
            true: {
                color: '$red',
                borderColor: '$red',
            }
        },
    }
}
