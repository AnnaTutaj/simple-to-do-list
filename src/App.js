import React, { useEffect, useState, useCallback } from "react";
import { Button, Divider, Spin } from "antd";

import TodoList from "./components/TodoList";
import "./App.scss";
import TodoForm from "./components/TodoForm/TodoForm";
import moment from "moment";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodosHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://simple-to-do-list-69f1a-default-rtdb.europe-west1.firebasedatabase.app/todos.json"
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong...");
      }

      const data = await response.json();
      const loadedTodos = [];


      for (const key in data) {
        loadedTodos.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
          deadline: data[key].deadline,
        });
      }

      setTodos(loadedTodos);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTodosHandler();
  }, [fetchTodosHandler]);

  const onFinishHandler = async (values) => {
    const parsedValues = JSON.stringify({
      title: values.title,
      description: values.description,
      deadline: moment(values.deadline).second(0).format(),
    });

    const response = await fetch(
      "https://simple-to-do-list-69f1a-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
      {
        method: "POST",
        body: parsedValues,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    //todo refresh list after add item
  };

  return (
    <React.Fragment>
      <div className='main-layout'>
        <section>
          <TodoForm onFinish={onFinishHandler} />
        </section>
        <section>
          <div style={{ textAlign: "right" }}>
            <Button
              type='primary'
              onClick={fetchTodosHandler}
              loading={isLoading}
            >
              Refresh To Dos
            </Button>
          </div>
          {isLoading ? (
            <Spin size='large' className='spinner' />
          ) : (
            <>{error ? <p>{error}</p> : <TodoList todos={todos} />}</>
          )}
        </section>
      </div>
    </React.Fragment>
  );
}

export default App;
