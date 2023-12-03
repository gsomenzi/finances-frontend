import React from 'react';
import { Wrapper } from './styles';
import { ErrorAlertProps } from './types';
import { Alert } from 'antd';

export default function ErrorAlert(props: ErrorAlertProps) {
    const { show, title, description } = props;
    return (
        show && (
            <Wrapper>
                <Alert message={title} description={description} type="error" showIcon />
            </Wrapper>
        )
    );
}
