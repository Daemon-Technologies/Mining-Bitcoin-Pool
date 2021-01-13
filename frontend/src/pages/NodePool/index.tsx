import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { NodeInfo } from './data';
import { addNodeInfo, getNodeBlockInfo, queryNodeList } from './service';
import { useForm } from 'antd/lib/form/Form';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: NodeInfo) => {
  const hide = message.loading('Adding....');
  try {
    await addNodeInfo({ ...fields });
    hide();
    message.success('Add Successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Add Fail!');
    return false;
  }
};

const TableList: React.FC = () => {

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [form] = useForm();

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<NodeInfo>[] = [
    {
      title: 'Peer Host',
      dataIndex: 'peerHost',
      valueType: 'text',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      valueType: 'text',
    },
    {
      title: 'RPC Port',
      dataIndex: 'rpcPort',
    },
    {
      title: 'Peer Port',
      dataIndex: 'peerPort',
    },
    {
      title: 'Height',
      dataIndex: 'blocks',
    },
    {
      title: 'Verification Progress',
      dataIndex: 'verificationprogress',
    },
    {
      title: 'Operation',
      render: () => {
        return (
          <>
            <Button type='primary'>Import Address</Button>
          </>
        );
      }
    }
  ];

  return (
    <PageContainer>
      <ProTable<NodeInfo>
        headerTitle={'BTC Node Pool'}
        actionRef={actionRef}
        rowKey="peerHost"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        request={async () => {
          const nodeList = await queryNodeList();
          let nodeInfoList: NodeInfo[] = [];
          if (nodeList.status === 200) {
            const records = nodeList.data;
            for (var i = 0; i < records.length; i++) {
              const record = records[i];
              const url = 'http://' + record.username + ':' + record.password + '@' + record.peerHost + ':' + record.rpcPort;
              // const url = 'http://daemontech:daemontech@8.210.73.117:18332';
              const nodeBlockInfo = await getNodeBlockInfo(url);
              if (nodeBlockInfo.status === 200) {
                const blockInfo = nodeBlockInfo.data;
                nodeInfoList.push({
                  ...record,
                  ...blockInfo,
                })
              } else {
                nodeInfoList.push({
                  ...record,
                })
              }
            }
          }
          return { data: nodeInfoList };
        }}
        columns={columns}
      />
      <ModalForm
        title='New BTC Node Info'
        width="500px"
        form={form}
        visible={createModalVisible}
        onVisibleChange={(value) => {
          handleModalVisible(value)
          form.resetFields();
        }}
        onFinish={async (value) => {
          const success = await handleAdd(value as NodeInfo);
          if (success) {
            handleModalVisible(false);
            form.resetFields();
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Peer Host is required',
            },
          ]}
          name="peerHost"
          label="Peer Host"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Peer Host is required',
            },
          ]}
          name="username"
          label="Username"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Peer Host is required',
            },
          ]}
          name="password"
          label="Password"
        />
        <Form.Item
          required={true}
          name='rpcPort'
          label='RPC Port'
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          required={true}
          name='peerPort'
          label='Peer Port'
        >
          <Input type='number' />
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
