import React from 'react';
import { LoginViewProps } from './types';
import { Button, Card, Divider, Form, Input, Typography } from 'antd';
import { Rule } from 'antd/es/form';
import ErrorAlert from '@/components/ErrorAlert';
import Link from 'next/link';
const { Title } = Typography;

const rules: { [key: string]: Rule[] } = {
    email: [
        {
            type: 'email',
            message: 'Por favor informe um e-mail válido',
        },
        {
            required: true,
            message: 'Por favor informe seu e-mail',
        },
    ],
    password: [
        {
            required: true,
            message: 'Por favor informe sua senha',
        },
    ],
};

export default function LoginView(props: LoginViewProps) {
    const [form] = Form.useForm();
    const { errorMessage, authenticating } = props;
    return (
        <div>
            <Card>
                <Title level={2}>Login</Title>
                <Divider />
                <Form
                    form={form}
                    onFinish={() => props.authenticate(form.getFieldValue('email'), form.getFieldValue('password'))}
                    layout="vertical">
                    <Form.Item name="email" label="E-mail" rules={rules.email}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Senha" rules={rules.password}>
                        <Input type="password" />
                    </Form.Item>
                    {errorMessage && (
                        <Form.Item>
                            <ErrorAlert show={!!errorMessage} title={errorMessage} />
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={authenticating}>
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
                <Link href="/auth/register">Cadastre-se</Link>
            </Card>
        </div>
    );
}
