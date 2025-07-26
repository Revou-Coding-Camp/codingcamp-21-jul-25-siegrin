let tasks = [];
let editingIndex = null;
let showOnlyPending = false;

function addTask() {
    // function to add a task
    const taskInput = document.getElementById("taskInput");
    const dueDate = document.getElementById("dueDate");
    const title = taskInput.value.trim();
    const date = dueDate.value;

    // Check if taskInput and dueDate are empty
    if (!title || !date) {
    alert("Please enter a task and due date.");
    return;
    }
    
    if (editingIndex !== null) {
        // Update the existing task
        tasks[editingIndex].title = title;
        tasks[editingIndex].dueDate = date;
        editingIndex = null;

        document.querySelector("form button").textContent = "+"; // Reset button text to "Add Task"
    } else {
        tasks.push({
            title: title,
            dueDate: date,
            status: "Pending" // default status
        });
    }

    taskInput.value = "";
    dueDate.value = "";

    renderTasks();
}

  function filterTasks() {
      showOnlyPending = !showOnlyPending;
      document.querySelector(".btn-group button").textContent =
        showOnlyPending ? "FILTER: Show All" : "FILTER: Show Pending";
      renderTasks();
}

function deleteAllTasks() {
    // function to delete all tasks
    tasks = [];
    editingIndex = null;
    console.log("All tasks deleted");

    renderTasks();
}

function markDone(index) {
      tasks[index].status = "Done";
      renderTasks();
}

function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById("taskInput").value = task.title;
    document.getElementById("dueDate").value = task.dueDate;
    editingIndex = index;

    document.querySelector("form button").textContent = "Update";
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the current list

    const filteredTasks = showOnlyPending
        ? tasks.filter(t => t.status === "Pending")
        : tasks;

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
        return;
    }

    filteredTasks.forEach((task, index) => {
       const row = document.createElement("tr");
        row.innerHTML = `
          <td>${task.title}</td>
          <td>${task.dueDate}</td>
          <td class="${task.status === 'Done' ? 'status-done' : 'status-pending'}">${task.status}</td>
          <td>
            <button class="action-btn-done" onclick="markDone(${index})">✓</button>
            <button class="action-btn-edit" onclick="editTask(${index})">✎</button>
            <button class="action-btn-delete" onclick="deleteTask(${index})">✕</button>
          </td>
        `;
        taskList.appendChild(row);
    });
  }