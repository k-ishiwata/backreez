import React from 'react'
import { Button } from '@/components/Button'
import { Container, Stack, Group } from '@/components/layouts'
import { Input, Label } from '@/components/form'
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
        <Container size="sm">
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <div>
                        <Label required>メールアドレス</Label>
                        <Input
                            type="email"
                            {...register('email', {
                                required: '必ず入力してください。'
                            })}
                            defaultValue="admin@example.com"
                        />
                    </div>
                    <div>
                        <Label required>パスワード</Label>
                        <Input
                            type="password"
                            {...register('password', {
                                required: '必ず入力してください。'
                            })}
                            defaultValue="123456789"
                        />
                    </div>

                    <Group>
                        <Button type="submit" primary>ログイン</Button>
                        <a href="#">新規ユーザー登録</a>
                    </Group>
                </Stack>
            </form>
        </Container>
    )
}

export default LoginPage
