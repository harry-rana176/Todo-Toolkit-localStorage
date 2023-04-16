import { Button, Form, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import FormComponent from './FormComponent'
import { useDispatch, useSelector } from 'react-redux'
import { editTodo } from './features/todo/todoSlice'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
const EditToDo = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { id } = useParams()
    const { todoList } = useSelector(state => state.todo)
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        if (data.due_date) {
            data.due_date = moment(data.due_date).format('DD-MM-YYYY')
        }
        data.id = Number(id)
        notification.success({ message: 'Todo item updated.' })
        dispatch(editTodo(data))
        navigate('/')
    }

    const handleChange = () => {
        form.validateFields().then(() => {
            setDisabled(false)
        }).catch(
            setDisabled(true)
        )
    }

    useEffect(() => {
        if (todoList.length) {
            const editTodo = todoList.find(_x => _x.id === Number(id))
            form.setFieldsValue({
                name: editTodo.name,
                priority: editTodo.priority,
                due_date: moment(editTodo.due_date, 'DD-MM-YYYY'),
            })
        }
    }, [form, todoList, id])
    return (
        <>
            <FormComponent form={form} onFinish={handleSubmit} onChange={handleChange} />
            <Button disabled={disabled} type='primary' htmlType='submit' form='ToDoForm'>Update</Button>
        </>
    )
}

export default EditToDo