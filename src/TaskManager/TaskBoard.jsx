import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
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
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddTask(event, newTask, isAdd) {
    event.preventDefault();
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map(task => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    }
    setShowAddModal(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleCloseClick() {
    setTaskToUpdate(null);
    setShowAddModal(false);
  }

  function handeleDeleteTask(tasKId) {
    const taskAfterDelete = tasks.filter(task => task.id !== tasKId);
    setTasks(taskAfterDelete);
  }
  function onDeleteAllClick() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavorite(tasKId) {
    const taskIndex = tasks.findIndex(task => task.id === tasKId);

    const newTasks = [...tasks];

    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  }

  function handleSearch(searchTerm) {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks([...filtered]);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={onDeleteAllClick}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handeleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
