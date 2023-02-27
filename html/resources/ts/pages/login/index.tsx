import React from 'react'
import {
    Button,
    PasswordInput,
    Container,
    Anchor,
    Group,
    TextInput,
    Stack,
    Title
} from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLogin } from '@/queries/authQuery'
import type { Login } from '@/types/User'

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<Login>()

    const login = useLogin(setError)

    const onSubmit: SubmitHandler<Login> = data => {
        login.mutate({
            email: data.email,
            password: data.password,
        })
    }

    return (
        <Container size="xs" style={{paddingTop: '5%'}}>
            <Title style={{marginBottom: 20}}>ログイン</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <TextInput
                        required
                        label="メールアドレス"
                        error={errors.email?.message}
                        {...register('email', {
                            required: '必ず入力してください。'
                        })}
                        defaultValue="admin@example.com"
                    />
                    <PasswordInput
                        {...register('password', {
                            required: '必ず入力してください。'
                        })}
                        label="パスワード"
                        error={errors.password?.message}
                        required
                        defaultValue="123456789"
                    />
                    <Group>
                        <Button type="submit">ログイン</Button>
                        <Anchor size="sm">新規ユーザー登録</Anchor>
                    </Group>
                </Stack>
            </form>
        </Container>
    )
}

export default LoginPage
