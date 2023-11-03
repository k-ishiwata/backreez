import { styled } from '@/stitches.config';

export const Input = styled('input', {
    height: '2.2rem',
    minHeight: '2.2rem',
    lineHeight: 'calc(2.2rem - 0.125rem)',
    appearance: 'none',
    resize: 'none',
    boxSizing: 'border-box',
    width: '100%',
    display: 'block',
    textAlign: 'left',
    border: '0.0625rem solid $border',
    transition: 'border-color 100ms ease',
    paddingLeft: 'calc(2.2rem / 3)',
    paddingRight: 'calc(2.2rem / 3)',
    borderRadius: '$md',
    outlineColor: '$primary',
    margin: '7px 0',

    variants: {
        size: {
            sm: {
                height: '1.7rem',
                minHeight: '1.7rem',
                lineHeight: 'calc(1.7rem - 0.125rem)',
                paddingLeft: 'calc(1.7rem / 3)',
                paddingRight: 'calc(1.7rem / 3)',
            }
        }
    }
});
