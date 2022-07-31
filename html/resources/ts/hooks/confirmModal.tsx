import { AxiosError } from 'axios'
import { Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { modalOption } from '@/components/Modal'
import type { UseMutationResult } from 'react-query/types/react/types'

/**
 * 確認モーダル
 */
export const useConfirmModal = <T extends { id: number }>(
    confirmAcrion: UseMutationResult<T, AxiosError, number>
) => {
    const modals = useModals()

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
            })
    }

    return {
        deleteModal
    }
}
