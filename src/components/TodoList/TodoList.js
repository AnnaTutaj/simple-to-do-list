import { List, Badge } from "antd";
import React from "react";

import TodoItem from "../TodoItem";
import styles from "./TodoList.module.scss";


const TodoList = ({ todos }) => {
  return (
    <List
      header={
        <h2>
          To Dos <Badge count={todos.length} style={{ backgroundColor: '#1890ff' }}/>
        </h2>
      }
      dataSource={todos}
      size='large'
      renderItem={(item) => (
        <List.Item className={styles["list-container"]}>
          <TodoItem
            key={item.id}
            title={item.title}
            deadline={item.deadline}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default TodoList;
