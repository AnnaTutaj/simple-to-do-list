import { Card } from "antd";
import moment from "moment";
import React from "react";

import styles from "./TodoItem.module.scss";

const TodoItem = ({ title, deadline, description }) => {
  return (
    <Card
      title={title}
      extra={moment(deadline).format('YYYY-MM-DD HH:mm')}
      className={styles["todo-item"]}
    >
      <p>{description}</p>
    </Card>
  );
};

export default TodoItem;
