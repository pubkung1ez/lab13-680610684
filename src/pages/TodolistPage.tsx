import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useState , useEffect } from "react";

const STORAGE_KEY = "lecture13.tasks.v2";

const defaultTasks: TaskCardProps[] = [
  {
    id: "1",
    title: "Read a book",
    description: "Vite + React + TS",
    isDone: false,
  },
  {
    id: "2",
    title: "Write code",
    description: "Finish project",
    isDone: false,
  },
  {
    id: "3",
    title: "Deploy app",
    description: "Push to Vercel",
    isDone: false,
  },
];

function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks;
  }
}
function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // เพิ่ม: สร้าง "array ใหม่" จาก array เดิม + ตัวใหม่
  const handleAdd = (newTask: TaskCardProps) => setTasks([...tasks, newTask]);

  // ลบ: filter คืน array ใหม่ ที่เอาตัว id ตรงกันออก
  const deleteTask = (taskId: string) =>
    setTasks(tasks.filter((t) => t.id !== taskId));

  // toggle: map คืน array ใหม่ — ตัวที่ id ตรง สร้าง object ใหม่ที่สลับ isDone, ตัวอื่นคงเดิม
  const toggleDoneTask = (taskId: string) =>
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, isDone: !t.isDone } : t)),
    );

  return (
    <div className="container text-center">
      <h2>Todo List</h2>
      <div className="m-2 text-bg-dark p-3">
        All : ({tasks.length}) Done : ({tasks.filter((task) => task.isDone).length})
      </div>
      <div></div>
      <button
        type="button"
        className="btn btn-primary my-3"
        data-bs-toggle="modal"
        data-bs-target="#todoModal"
      >
        Add
      </button>
      <TodoModal onAdd={handleAdd} />
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          isDone={task.isDone}
          deleteTaskFunc={deleteTask}
          toggleDoneTaskFunc={toggleDoneTask}
        />
      ))}
    </div>
  );
}

// function App() {
//   const [tasks, setTasks] = useState<TaskCardProps[]>([]);

//   const handleAdd = (newTask: TaskCardProps) => {
//     console.log("TODO handleAdd", newTask);
//   };

//   const deleteTask = (taskId: string) => {
//     console.log("TODO deleteTask", taskId);
//   };

//   const toggleDoneTask = (taskId: string) => {
//     console.log("TODO toggleDoneTask", taskId);
//   };

//   return (
//     <div className="col-12 m-2 p-0">
//       <div className="container text-center">
//         <h2>Todo List</h2>
//         <span className="m-2">All : () Done : ()</span>

//         <div>
//           <button
//             type="button"
//             className="btn btn-primary my-3"
//             data-bs-toggle="modal"
//             data-bs-target="#todoModal"
//           >
//             Add
//           </button>
//         </div>

//         <TodoModal onAdd={handleAdd} />
//         <>
//           {tasks.map((task) => (
//             <TaskCard
//               id={task.id}
//               title={task.title}
//               description={task.description}
//               deleteTaskFunc={deleteTask}
//               toggleDoneTaskFunc={toggleDoneTask}
//               isDone={task.isDone}
//               key={task.id}
//             />
//           ))}
//         </>
//       </div>
//     </div>
//   );
// }

export default App;
