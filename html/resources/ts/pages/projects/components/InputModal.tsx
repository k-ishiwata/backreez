import React from 'react'
import Modal from '@/components/Modal'
import {
    Group,
    Input,
    Title,
    Space,
    Button,
    InputWrapper
} from '@mantine/core'
import type { Project } from 'types/Project'

type Props = {
    editItem: Project | null
    isModalOpened: boolean
    setIsModalOpened: (value: React.SetStateAction<boolean>) => void
}

export const InputModal: React.FC<Props> = ({
    editItem,
    isModalOpened,
    setIsModalOpened
}) => {
    return (
        <Modal
            opened={isModalOpened}
            onClose={() => setIsModalOpened(false)}
            size="lg"
            title={<Title order={3}>{editItem ? '編集' : '新規作成'}</Title>}
            padding="xl"
        >
            <InputWrapper
                id="project_key"
                required
                label="プロジェクトID"
                // description="プロジェクトのユニークなキーを入力してください。"
                // error="この項目は必ず入力してください。"
            >
                <Input id="project_key" placeholder="ABCD" defaultValue={editItem?.key}/>
            </InputWrapper>

            <Space h="sm" />

            <InputWrapper
                id="project_name"
                required
                label="プロジェクト名"
                // description="プロジェクト名を入力してください。"
                // error="この項目は必ず入力してください。"
            >
                <Input id="project_name" placeholder="プロジェクトA" defaultValue={editItem?.name}/>
            </InputWrapper>

            <Group spacing="xs" mt="lg">
                <Button>保存</Button>
                <Button variant="outline" onClick={() => setIsModalOpened(false)}>キャンセル</Button>
            </Group>
        </Modal>
    )
}
