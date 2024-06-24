import React, { useState, useEffect, useRef } from 'react';
import { Table, Popconfirm, Tooltip, Button, message, Modal, Form, Input, Alert, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import Api from '../helpers/core/Api';
import WrapperForm from '../components/core/controls/WrapperForm';
import SubmitButton from '../components/core/controls/SubmitButton';

const ExpensePage = (/* { onTotalExpenseChange } */) => {
  const submitButtonRef = useRef(null);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const totalAmount = () => {
    const total = data.reduce((acc, item) => acc + item.amount, 0);
    return total;
  };
  const totalExpenses = () => data.length;

  // Handle get incomes from the server
  const handleGet = () => {
    Api.get('/api/expense')
      .then(response => {
        setData(response.data);
        /* const total = totalAmount();
        onTotalExpenseChange(total); */
      })
      .catch(err => {
        message.error('Failed to fetch data');
        throw err;
      });
  };
  // Handle post expense to the server
  const handlePost = newData => {
    Api.post('/api/expense', newData)
      .then(() => {
        message.success('Item added successfully');
        handleGet(); // Refresh data after successful post
      })
      .catch(err => {
        message.error('Failed to create item');
        throw err;
      });
  };
  // Handle delete expense from the server
  const handleDelete = id => {
    Api.delete(`/api/expense/${id}`)
      .then(() => {
        message.success('Item deleted successfully');
        handleGet();
      })
      .catch(err => {
        message.error('Failed to delete item');
        throw err;
      });
  };
  // Handle edit expense on the server
  const handleEdit = (id, updatedData) => {
    Api.patch(`/api/expense/${id}`, updatedData)
      .then(() => {
        message.success('Item updated successfully');
        handleGet();
      })
      .catch(err => {
        message.error('Failed to update item');
        throw err;
      });
  };
  // Show modal for editing expense
  const showModal = record => {
    setCurrentRecord(record);
    form.setFieldsValue({
      title: record.title,
      amount: record.amount
    });
    setIsModalVisible(true);
  };
  // Handle success for editing operation
  const handleSuccess = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        setIsModalVisible(false);
        handleEdit(currentRecord._id, values);
      })
      .catch(err => {
        throw err;
      });
  };
  // Handle cancel for editing operation
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  // Fetch expenses on component mount
  useEffect(() => {
    handleGet();
  }, []);
  // Table columns
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Id',
      dataIndex: '_id',
      key: 'id'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text, record) => (
        <>
          <Tooltip title="Edit">
            <Button type="link" onClick={() => showModal(record)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="link" danger>
                <FontAwesomeIcon icon={faSquareMinus} />
              </Button>
            </Tooltip>
          </Popconfirm>
        </>
      )
    }
  ];

  // Validate only if amount is greater than 0
  const validateAmount = (rule, value) => {
    if (value > 0) {
      return Promise.resolve();
    }
    throw new Error('Amount must be greater than 0');
  };

  return (
    <div>
      <Space>
        <Alert message={`Total Expenses: ${totalAmount()}`} type="error" showIcon />
        <Alert message={`Total Transactions: ${totalExpenses()}`} type="info" showIcon />
        <br />
      </Space>
      <Table dataSource={data} columns={columns} rowKey="_id" />

      <Modal title="Edit Expense" open={isModalVisible} onOk={handleSuccess} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input the title of the item!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              {
                required: true,
                message: 'Please input the amount!'
              },
              { validator: validateAmount }
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
      <WrapperForm form={form} onSubmit={handlePost} submitBtn={submitButtonRef}>
        <h2>Add expense</h2>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of the item!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please input the amount!' }, { validator: validateAmount }]}
        >
          <Input type="number" />
        </Form.Item>
        <SubmitButton iconPosition="end" ref={submitButtonRef} type="primary">
          {t('common.save')}
        </SubmitButton>
      </WrapperForm>
    </div>
  );
};

export default ExpensePage;
