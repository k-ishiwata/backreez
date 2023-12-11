import React from 'react'
import { styled } from '@/stitches.config'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import ja from 'date-fns/locale/ja'

registerLocale('ja', ja)

const DatePickerStyle  = styled(ReactDatePicker, {
    inputBase: '',

    variants: {
        size: {
            sm: {
                paddingLeft: 'calc(1.7rem / 3)',
                paddingRight: 'calc(1.7rem / 3)',
            }
        },
        error: {
            true: {
                color: '$red',
                borderColor: '$red',
            }
        },
    }
})


type Props = React.ComponentPropsWithRef<typeof DatePickerStyle> & {
    name: string
    error: boolean
}

export const DatePicker = React.forwardRef<HTMLSelectElement, Props>((
    {
        name,
        ...props
    },
    ref
) => {
    if (props.selected) {
        props.selected = new Date(props.selected)
    }

    return (
        <DatePickerStyle
            {...props}
            name={name}
            locale="ja"
            showTimeSelect
            isClearable={true}
            dateFormat="yyyy-MM-dd HH:mm"
            autoComplete="off"
        />
    )
})
