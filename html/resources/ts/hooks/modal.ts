import { atom, useAtom } from 'jotai'

/**
 * 入力モーダル
 */
type ModalAtomType = {[key: string]: any}

const modalAtom = atom<ModalAtomType>({})

export const useInputModal = <T>(
    key: string
) => {
    const [modal, setModal] = useAtom(modalAtom)

    const isVisible = modal.hasOwnProperty(key)

    const item: T = modal[key]

    const openModal = (item: T): void => {
        document.body.style.overflow = 'hidden'
        setModal({
            [key]: item
        })
    }

    const closeModal = (): void => {
        document.body.style.overflow = 'unset'
        setModal({})
    }

    return {item, isVisible, openModal, closeModal}
}

/**
 * 確認ダイアログ
 */
export type ConfirmDialog = {
    title: string
    message: string
    action: () => void
}

type ConfirmDialogAtom = ConfirmDialog & {
    key: string
}

const confirmDialogAtom = atom<ConfirmDialogAtom|undefined>(undefined)

export const useConfirmDialog = (
    key: string
) => {
    const [item, setDialog] = useAtom(confirmDialogAtom)

    const isVisible = item?.key === key

    const openDialog = (item: ConfirmDialog): void => {
        document.body.style.overflow = 'hidden'
        setDialog({...item, key: key})
    }

    const closeDialog = (): void => {
        document.body.style.overflow = 'unset'
        setDialog(undefined)
    }

    return {item, isVisible, openDialog, closeDialog}
}
