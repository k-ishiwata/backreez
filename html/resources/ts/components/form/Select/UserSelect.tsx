import React from 'react'
import { Loader } from '@/components'
import { useSelectUsers } from '@/queries/userQuery'
import { SelectWrap, SelectStyle } from './Select'

type Props = React.ComponentPropsWithRef<typeof SelectStyle> & {
    selectedId?: number
    error: boolean
}

/**
 * ユーザー一覧セレクトボックス
 * セレクトボックスユーザー一覧APIからデータを取得
 */
export const UserSelect = React.forwardRef<HTMLSelectElement, Props>((
    {
        selectedId,
        ...props
    },
    ref
) => {
    const { isLoading, error, data } = useSelectUsers()

    if (isLoading) return <Loader size="sm" />
    if (error) return <p>担当者情報の取得に失敗しました。</p>
    if (! data?.length) return <p>データがありません。</p>

    return (
        <SelectWrap>
            <SelectStyle {...props} ref={ref}>
                <option value=""></option>
                {data.map((item, key) => (
                    <option key={key} value={item.value}>{item.label}</option>
                ))}
            </SelectStyle>
        </SelectWrap>
    )
})
