import React from 'react'
import { styled } from '@/stitches.config'
import { inputBase } from '@/components/form/base.styles'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import ja from 'date-fns/locale/ja'

registerLocale('ja', ja)

const DatePickerStyle  = styled(ReactDatePicker, {
    ...inputBase,
})

type Props = React.ComponentPropsWithRef<typeof DatePickerStyle> & {
    name: string
    error?: boolean
    dateFormat?: string
}

export const DatePicker = React.forwardRef<HTMLSelectElement, Props>((
    {
        name,
        dateFormat = 'yyyy-MM-dd HH:mm',
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
            isClearable={true}
            dateFormat={dateFormat}
            autoComplete="off"
        />
    )
})
