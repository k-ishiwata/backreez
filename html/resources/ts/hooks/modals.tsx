import { AxiosError } from 'axios'
import { Text } from '@mantine/core'
import { useModals as useBaseModals } from '@mantine/modals'
import type { UseMutationResult } from 'react-query/types/react/types'
import { ReactNode } from "react"

export const modalOption = {
    overlayOpacity: 0.25,
    overlayBlur: 3
}

/**
 * 確認モーダル
 */
export const useConfirmModal = <T extends { id: number }>(
    confirmAcrion: UseMutationResult<T, AxiosError, number>
) => {
    const modals = useBaseModals()

    const deleteModal = (item: T) => {
        modals.openConfirmModal(
            {
                title: '削除確認',
                children: (
                    <Text size="sm">本当に削除しますか？</Text>
                ),
                labels: { confirm: '削除する', cancel: 'キャンセル' },
                confirmProps: { color: 'red' },
                onConfirm: () => confirmAcrion.mutate(item.id),
                ...modalOption,
                styles: () => ({
                    title: {
                        'fontSize': 22,
                        'fontWeight': 'bold'
                    }
                })
            }
        )
    }

    return {
        deleteModal
    }
}

/**
 * コンテンツモーダル
 */
export const useContentModal = () => {
    const modals = useBaseModals()

    const openModal = ({
       title,
       children
    }: {
        title: string
        children: ReactNode
    }) => {
        modals.openModal({
            title: title,
            children: children,
            size: 'lg',
            ...modalOption,
            styles: () => ({
                title: {
                    'fontSize': 22,
                    'fontWeight': 'bold'
                }
            })
        })
    }

    return {
        openModal
    }
}