import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2021 Mining-Bitcoin-Pool"
    links={[
      {
        key: 'Mining-Bitcoin-Pool',
        title: 'Mining-Bitcoin-Pool',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/Daemon-Technologies/Mining-Bitcoin-Pool',
        blankTarget: true,
      },
    ]}
  />
);
