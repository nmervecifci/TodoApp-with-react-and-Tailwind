import { useEffect, useRef, useState } from "react";
import TodoItems from "./TodoItems";
import todo_icon from "./assets/todo_icon.png";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <img className="w-10" src={todo_icon} alt="" />
        <h2 className="text-2xl text-center  font-bold mb-4">TODO LIST</h2>
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add your task"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
          />
          <button
            onClick={add}
            className="absolute right-2 top-2 text-white bg-orange-500 p-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Add
          </button>
        </div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
