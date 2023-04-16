import { Button, Input, Space, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodo } from "./features/todo/todoSlice";
import { StatusTag } from "./StatusTag";

// const onChange = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
// };

const Dashboard = () => {
    const { todoList } = useSelector(state => state.todo)
    const dispatch = useDispatch()
    // const [searchText, setSearchText] = useState('');


    const deleteTodoItem = (data) => {
        dispatch(deleteTodo(data))
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Task name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                <div
                    style={{
                        padding: 8,
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <Input
                        placeholder={`Search Todo`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, 'name')}
                        style={{
                            marginBottom: 8,
                            display: 'block',
                        }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, 'name')}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            sorter: (a, b) => a.name.length - b.name.length,
            // onFilter: (value, record) => record.name.includes(value),
            // sorter: (a, b) => a.name - b.name,
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            filters: [
                {
                    text: 'High',
                    value: 'high',
                },
                {
                    text: 'Normal',
                    value: 'normal',
                },
                {
                    text: 'Easy',
                    value: 'easy',
                },
            ],
        },
        {
            title: 'Due Date',
            dataIndex: 'due_date',
            key: 'due_date',
        },
        {
            title: "Status",
            key: "status",
            filters: [
                {
                    text: 'Started',
                    value: 'started',
                },
                {
                    text: 'In Progress',
                    value: 'inProgress',
                },
                {
                    text: 'Completed',
                    value: 'completed',
                },
            ],
            render: (text, record) => <StatusTag status={record.status} />
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link type="primary" to={`/edit-todo/${record.id}`}>Edit</Link>
                    <Button type="danger" onClick={() => deleteTodoItem(record)}>Delete</Button>
                </Space>
            )
        }
    ];

    return (
        <>
            <Link to='/add-todo' type="primary" className="primary">Add todo</Link>
            <Table columns={columns} dataSource={todoList} onChange={handleSearch} pagination={false} />
        </>
    )
}

export default Dashboard