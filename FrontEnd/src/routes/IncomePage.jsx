import React, { useState, useEffect, useRef } from 'react';
import { Table, Popconfirm, Tooltip, Button, message, Modal, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import Api from '../helpers/core/Api';
import WrapperForm from '../components/core/controls/WrapperForm';
import SubmitButton from '../components/core/controls/SubmitButton';

const IncomePage = () => {
  const submitButtonRef = useRef(null);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const handleGet = () => {
    Api.get('/api/income')
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        message.error('Failed to fetch data');
        throw err;
      });
  };

  const handlePost = newData => {
    Api.post('/api/income', newData)
      .then(() => {
        message.success('Item added successfully');
        handleGet(); // Refresh data after successful post
      })
      .catch(err => {
        message.error('Failed to create item');
        throw err;
      });
  };

  const handleDelete = id => {
    Api.delete(`/api/income/${id}`)
      .then(() => {
        message.success('Item deleted successfully');
        handleGet();
      })
      .catch(err => {
        message.error('Failed to delete item');
        throw err;
      });
  };

  const handleEdit = (id, updatedData) => {
    Api.patch(`/api/income/${id}`, updatedData)
      .then(() => {
        message.success('Item updated successfully');
        handleGet();
      })
      .catch(err => {
        message.error('Failed to update item');
        throw err;
      });
  };

  const showModal = record => {
    setCurrentRecord(record);
    form.setFieldsValue({
      title: record.title,
      amount: record.amount
    });
    setIsModalVisible(true);
  };

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

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    handleGet();
  }, []);

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

  // Custom validation function for amount > 0
  const validateAmount = (rule, value) => {
    if (value > 0) {
      return Promise.resolve();
    }
    throw new Error('Amount must be greater than 0');
  };

  return (
    <div>
      <WrapperForm form={form} onSubmit={handlePost} submitBtn={submitButtonRef}>
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
      <br />
      <Table dataSource={data} columns={columns} rowKey="_id" />

      <Modal title="Edit Income" open={isModalVisible} onOk={handleSuccess} onCancel={handleCancel}>
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
    </div>
  );
};

export default IncomePage;
