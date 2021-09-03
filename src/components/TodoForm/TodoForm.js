import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import styles from "./TodoForm.module.scss";
const { TextArea } = Input;

const TodoForm = ({ onFinish }) => {

  return (
    <Form
      name='basic'
      onFinish={onFinish}
      autoComplete='off'
      className={styles["todo-form"]}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item
        label='Title'
        name='title'
        rules={[{ required: true, message: "This field is required!" }]}
        placeholder='What you have to do?'
      >
        <Input />
      </Form.Item>
      <Form.Item label='Description' name='description'>
        <TextArea rows={4} placeholder='Explain in more detail' />
      </Form.Item>

      <Form.Item
        label='Deadline'
        name='deadline'
        rules={[{ required: true, message: "This field is required!" }]}
      >
        <DatePicker
          showTime={{ format: "HH:mm" }}
          format={"YYYY-MM-DD HH:mm"}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
