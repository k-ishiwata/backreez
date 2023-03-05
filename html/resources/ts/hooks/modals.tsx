import { AxiosError } from 'axios'
import { Text } from '@mantine/core'
import { useModals as useBaseModals } from '@mantine/modals'
import type { UseMutationResult } from '@tanstack/react-query/src/types'
import { ReactNode } from "react"

export const overlayOption = {
    opacity: 0.25,
    blur: 3,
}

/**
 * 確認モーダル
 */
export const useConfirmModal = <T extends { id: number }>(
    confirmAction: UseMutationResult<T, AxiosError, number>
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
                onConfirm: () => confirmAction.mutate(item.id),
                overlayProps: overlayOption,
                padding: 'xl',
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
        children,
        size = 'lg'
    }: {
        title: string
        children: ReactNode
        size?: string
    }) => {
        modals.openModal({
            title: title,
            children: children,
            size: size,
            overlayProps: overlayOption,
            padding: 'xl',
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
