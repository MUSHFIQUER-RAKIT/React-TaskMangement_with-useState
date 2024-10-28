import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearctTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

const initialTask = {
  id: crypto.randomUUID(),
  title: "Learn React",
  description:
    "I want to learn React such than I can treat It like my slave and make it do  whatever I want to do",
  tags: ["web", "react", "js"],
  priority: "High",
  isFavorite: true,
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState([initialTask]);
  const [showAddModal, setShowAddModal] = useState(false);

  function handleAddTask(event, newTask) {
    event.preventDefault();
    setTasks([...tasks, newTask]);
    setShowAddModal(false);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && <AddTaskModal onSave={handleAddTask} />}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearctTask />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction onAddClick={() => setShowAddModal(true)} />
          <TaskList tasks={tasks} />
        </div>
      </div>
    </section>
  );
}
