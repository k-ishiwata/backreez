import { styled } from '@/stitches.config'
import React from 'react'
import { inputBase } from '@/components/form/base.styles'

export const SelectWrap  = styled('div', {
    position: 'relative',
    width: '100%',

    '&::after': {
        position: 'absolute',
        content: '',
        width: 8,
        height: 8,
        right: 10,
        top: '50%',
        marginTop: -3,
        transform: 'translateY(-50%) rotate(45deg)',
        borderBottom: '2px solid $gray',
        borderRight: '2px solid $gray',
        pointerEvents: 'none'
    },
})

export const SelectStyle = styled('select', {
    ...inputBase,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 32,

    variants: {
        ...inputBase.variants,
        size: {
            sm: {
                height: '1.85rem',
                minHeight: '1.85rem',
                paddingLeft: 'calc(1.85rem / 3)',
                paddingRight: 32,
            }
        },
    }
})

type Props = React.ComponentPropsWithRef<typeof SelectStyle> & {
    data: {value: string, label: string}[]
    error?: boolean
}

export const Select = React.forwardRef<HTMLSelectElement, Props>((
    {
        data,
        ...props
    },
    ref
) => {
    return (
        <SelectWrap>
            <SelectStyle {...props} ref={ref}>
                {!props.required && <option value=""></option>}
                {data.map((item, key) => (
                    <option key={key} value={item.value}>{item.label}</option>
                ))}
            </SelectStyle>
        </SelectWrap>
    )
})
