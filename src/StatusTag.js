import React from "react";
import Tag from "antd/lib/tag";

const statusMap = {
    started: <Tag>Started</Tag>,
    completed: <Tag color="green">Complete</Tag>,
    inProgress: <Tag color="orange">In Progress</Tag>
};

export const StatusTag = ({ status }) => statusMap[status];
