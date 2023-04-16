import { Button, Form, notification } from 'antd'
import React, { useState } from 'react'
import FormComponent from './FormComponent'
import { useDispatch } from 'react-redux'
import { addTodo } from './features/todo/todoSlice'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
const AddToDo = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch();
    const handleSubmit = async (data) => {
        if (data.due_date) {
            data.due_date = moment(data.due_date).format('DD-MM-YYYY')
        }
        notification.success({ message: 'Todo item added.' })
        dispatch(addTodo(data))
        navigate('/')
    }
    const handleChange = () => {
        form.validateFields().then(() => {
            setDisabled(false)
        }).catch(
            setDisabled(true)
        )
    }
    return (
        <>
            <FormComponent form={form} onFinish={handleSubmit} onChange={handleChange} />
            <Button disabled={disabled} type='primary' htmlType='submit' form='ToDoForm'>Submit</Button>
        </>
    )
}

export default AddToDo