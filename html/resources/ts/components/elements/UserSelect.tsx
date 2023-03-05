import React from 'react'
import { Loader, Select } from '@mantine/core'
import { useSelectUsers } from '@/queries/userQuery'
import { SelectProps } from '@mantine/core'

type Props = Omit<SelectProps, 'data'> & {
    selectedId?: number
}

/**
 * ユーザー一覧セレクトボックス
 * セレクトボックスユーザー一覧APIからデータを取得
 *
 * @param selectedId 初期選択ID
 * @param props
 */
export const UserSelect: React.FC<Props> = ({
    selectedId,
    ...props
}) => {
    const { isLoading, error, data: users } = useSelectUsers()

    if (isLoading) return <Loader />
    if (error) return <p>担当者情報の取得に失敗しました。</p>
    if (! users?.length) return <p>データがありません。</p>

    return (
        <Select
            data={users}
            defaultValue={String(selectedId)}
            clearable
            {...props}
        />
    )
}
