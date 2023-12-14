import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import React from 'react';

export default function AppLoader() {
    return (
        <Flex style={{ height: '100vh', width: '100vw' }} justify="center" align="center" vertical>
            <div>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
        </Flex>
    );
}
