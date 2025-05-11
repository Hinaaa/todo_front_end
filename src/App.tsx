import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [todos, setTodos] = useState([]); //get
    const [newTodo,setNewTodo] = useState("");

    //get
    useEffect( () => {
        axios.get("/api/todo").then(response => {
                setTodos(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the todos!", error); // handle error if fetching fails
            });
    },[])
    //add todo post, body needed
    function handleSend() {
        axios.post("/api/todo", {
            description: newTodo, status: "OPEN"  //this is bod body: {} using newTodo state here. newTodo (the text input from the user)
        })
            .then((response) => setTodos([...todos, response.data])) // spread operator (...) to take the existing todos array and append the new todo that was returned in response.data
            .catch(error => {
                console.error("There was an error adding the todo!", error); // handle error if post fails
            });
    }
        //Delete by id
        function handleDelete(id:string) {
            axios.delete("/api/todo/"+id) //url
                .then(()=>{
                    setTodos(todos.filter(todo => todo.id !== id));
                })
                .catch((error) => {
                    console.error("There was an error deleting the todo!", error); //catch error
                });
        }


    return (
        <>
            <h1>todo App</h1>

            {/*  List of Todo's*/}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <h2>{todo.description}</h2>
                        <p>{todo.status}</p>
                        {/* delete */}
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Input to add todo */}
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                />
            <button onClick={handleSend}>Add</button>

        </>
    );
}
export default App
