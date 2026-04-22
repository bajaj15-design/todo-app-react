import { useState , useEffect} from 'react';
import backgroundImage from './assets/bg-img.jpg';

export default function App() {

  // state
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState (()=>{
    const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
});
  const [editId, setEditId] = useState(null);


  // Save to local Storage

 useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todo));
}, [todo]);

  // add / update task
  const addTask = () => {
    if (input.trim() === "") return;

    if (editId !== null) {
      // update
      setTodo([ { id: editId, text: input },
        ...todo.filter((t) => t.id !== editId 
      )]);
      setEditId(null);
    } else {
      // add
      setTodo([ { id: Date.now(), text: input } ,...todo]);
    }

    setInput('');
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        
      }}
    >

      <h1>Todo App</h1>

      {/* input + button */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", position: 'sticky', zIndex: 1 }}>
        
        <input
          type="text"
          placeholder="Enter Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          style={{
            padding: '10px',
            backgroundColor: 'pink',
            borderRadius: '5px',
            width: '300px',
          
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: '10px',
            backgroundColor: 'pink',
            borderRadius: '5px'
          }}
        >
          {editId !== null ? "Update" : "Add Task"}
        </button>

      </div>

      <ul style={{ listStyle: 'none', padding: 0 , 
       overflowY: 'scroll', scrollbarColor:'transparent transparent' ,
         height: '60vh' }}>

        {todo.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: '5px',
              width: '350px',
              wordBreak: 'break-word',
             
            }}
          >

            <span style={{ flex: 1, textAlign: 'left' }}>
              {item.text}
            </span>

            <div style={{ display: "flex", gap: "5px" }}>
              
              <button
                onClick={() => { 
                  setInput(item.text);
                  setEditId(item.id);
                }}
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setTodo(todo.filter((t) => t.id !== item.id));
                }}
                style={{
                  backgroundColor: "lightcoral",
                  borderRadius: "3px"
                }}
              >
                Delete
              </button>

            </div>

          </li>
        ))}
      </ul>

    </div>
  );
}