import { DatePicker, Form, Input, Select } from "antd"
import React from "react"
const { Option } = Select;
const FormComponent = ({ form, onFinish, onChange }) => {
    return (
        <Form
            id="ToDoForm"
            form={form}
            name="basic"
            // labelCol={{ span: 8 }}
            style={{ maxWidth: 600, }}
            onFinish={onFinish}
            onChange={onChange}
        >
            <Form.Item label="Task Name" name="name" rules={[{
                required: true,
                message: 'This field is required',
            }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="priority"
                label="Priority level"
                rules={[
                    {
                        required: true, message: 'This field is required'
                    },
                ]}
            >
                <Select
                    placeholder="Select priority"
                    onChange={onChange}
                    allowClear
                >
                    <Option value="high">High</Option>
                    <Option value="normal">Normal</Option>
                    <Option value="easy">Easy</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Due date" name="due_date" rules={[{
                required: true,
                message: 'This field is required',
            }]}>
                <DatePicker onChange={onChange} />
            </Form.Item>
            <Form.Item
                name="status"
                label="Status"
                rules={[
                    {
                        required: true, message: 'This field is required'
                    },
                ]}
            >
                <Select
                    placeholder="Select status"
                    onChange={onChange}
                    allowClear
                >
                    <Option value="started">Started</Option>
                    <Option value="inProgress">In Progress</Option>
                    <Option value="completed">Completed</Option>
                </Select>
            </Form.Item>
        </Form>
    )
}

export default FormComponent