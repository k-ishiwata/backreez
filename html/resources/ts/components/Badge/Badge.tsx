import { styled } from '@/stitches.config'

export const Badge = styled('span', {
    fontSize: '$sm',
    height: '1.25rem',
    lineHeight: 'calc(1.25rem - 0.125rem)',
    textDecoration: 'none',
    padding: '0 calc(1rem / 1.5)',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: '2rem',
    fontWeight: '700',
    letterSpacing: '0.015625rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    background: '$gray',
    color: '$white',
    border: '0.0625rem solid transparent',
})
