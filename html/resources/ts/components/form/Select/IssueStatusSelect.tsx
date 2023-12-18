import React from 'react'
import { Loader } from '@/components'
import { useSelectIssueStatuses } from '@/queries/issueStatusQuery'
import { SelectWrap, SelectStyle } from './Select'

type Props = React.ComponentPropsWithRef<typeof SelectStyle> & {
    selectedId?: number
    error?: boolean
}

/**
 * 課題スタータス一覧セレクトボックス
 */
export const IssueStatusSelect = React.forwardRef<HTMLSelectElement, Props>((
    {
        selectedId,
        ...props
    },
    ref
) => {
    const { isLoading, error, data } = useSelectIssueStatuses()

    if (isLoading) return <Loader size="sm" />
    if (error) return <p>ステータスの取得に失敗しました。</p>
    if (! data?.length) return <p>データがありません。</p>

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
