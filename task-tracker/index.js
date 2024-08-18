const fs = require("fs");
const path = require("path");

const tasksFilePath = path.join(__dirname, "tasks.json");

// Color codes
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

// Function to read tasks from the JSON file
function readTasks() {
  if (fs.existsSync(tasksFilePath)) {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  }
  return [];
}

// Function to write tasks to the JSON file
function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
}

// Function to get the next unique ID
function getNextId(tasks) {
  const ids = tasks.map((task) => task.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

// Function to list tasks by status
function listTasks(status) {
  const tasks = readTasks();
  let filteredTasks = tasks;

  if (status) {
    if (status.toLowerCase() === "done") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (status.toLowerCase() === "to-do") {
      filteredTasks = tasks.filter((task) => !task.completed && !task.inProgress);
    } else if (status.toLowerCase() === "in-progress") {
      filteredTasks = tasks.filter((task) => task.inProgress);
    } else {
      console.log(`${colors.red}Invalid status. Use 'done', 'to-do', or 'in-progress'.${colors.reset}`);
      return;
    }
  }

  if (filteredTasks.length === 0) {
    console.log(`${colors.yellow}No tasks found.${colors.reset}`);
  } else {
    console.log(`${colors.cyan}Listing ${status ? status : "all"} tasks:${colors.reset}`);
    filteredTasks.forEach((task) => {
      console.log(
        `${task.id}. ${task.description} [${task.completed ? colors.green + "Done" : task.inProgress ? colors.yellow + "In-progress" : colors.red + "To-do"}${colors.reset}]`
      );
    });
  }
}

// Function to add a new task
function addTask(description) {
  const tasks = readTasks();
  const newTask = {
    id: getNextId(tasks),
    description: description,
    completed: false,
    inProgress: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  console.log(`${colors.green}Task added successfully! (ID: ${newTask.id})${colors.reset}`);
}

// Function to update a task's description
function updateTask(id, newDescription) {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.description = newDescription;
    writeTasks(tasks);
    console.log(`${colors.green}Task ID ${id} updated successfully!${colors.reset}`);
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
}

// Function to delete a task
function deleteTask(id) {
  const tasks = readTasks();
  const newTasks = tasks.filter((task) => task.id !== parseInt(id));

  if (newTasks.length < tasks.length) {
    writeTasks(newTasks);
    console.log(`${colors.green}Task ID ${id} deleted successfully!${colors.reset}`);
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
}

// Function to mark a task as in-progress
function markInProgress(id) {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.inProgress = true;
    task.completed = false;
    writeTasks(tasks);
    console.log(`${colors.yellow}Task ID ${id} marked as in-progress.${colors.reset}`);
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
}

// Function to mark a task as done
function markDone(id) {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.completed = true;
    task.inProgress = false;
    writeTasks(tasks);
    console.log(`${colors.green}Task ID ${id} marked as done.${colors.reset}`);
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
}

// Command-line interface logic
const args = process.argv.slice(2);
if (args.includes("add")) {
  const taskDescription = args.slice(1).join(" ");
  if (!taskDescription) {
    console.log(`${colors.red}Please provide a task description.${colors.reset}`);
    console.log(`${colors.yellow}Sample: node index.js add "Drink Water"${colors.reset}`);
  } else {
    addTask(taskDescription);
  }
} else if (args.includes("list")) {
  const status = args[1]; // "done", "to-do", "in-progress" (optional)
  listTasks(status);
} else if (args.includes("update")) {
  const id = args[1];
  const newDescription = args.slice(2).join(" ");
  if (!id || !newDescription) {
    console.log(`${colors.red}Please provide a task ID and new description.${colors.reset}`);
    console.log(`${colors.yellow}Sample: node index.js update 1 "Updated task description"${colors.reset}`);
  } else {
    updateTask(id, newDescription);
  }
} else if (args.includes("delete")) {
  const id = args[1];
  if (!id) {
    console.log(`${colors.red}Please provide a task ID.${colors.reset}`);
    console.log(`${colors.yellow}Sample: node index.js delete 1${colors.reset}`);
  } else {
    deleteTask(id);
  }
} else if (args.includes("mark-in-progress")) {
  const id = args[1];
  if (!id) {
    console.log(`${colors.red}Please provide a task ID.${colors.reset}`);
    console.log(`${colors.yellow}Sample: node index.js mark-in-progress 1${colors.reset}`);
  } else {
    markInProgress(id);
  }
} else if (args.includes("mark-done")) {
  const id = args[1];
  if (!id) {
    console.log(`${colors.red}Please provide a task ID.${colors.reset}`);
    console.log(`${colors.yellow}Sample: node index.js mark-done 1${colors.reset}`);
  } else {
    markDone(id);
  }
} else {
  console.log(`${colors.cyan}Usage: node index.js <command> [arguments]${colors.reset}`);
  console.log(`${colors.cyan}Commands:${colors.reset}`);
  console.log(`${colors.yellow}  add <task description>            - Add a new task${colors.reset}`);
  console.log(`${colors.yellow}  list [status]                     - List tasks (status: done, to-do, in-progress)${colors.reset}`);
  console.log(`${colors.yellow}  update <id> <new description>     - Update a task by ID${colors.reset}`);
  console.log(`${colors.yellow}  delete <id>                       - Delete a task by ID${colors.reset}`);
  console.log(`${colors.yellow}  mark-in-progress <id>             - Mark a task as in-progress by ID${colors.reset}`);
  console.log(`${colors.yellow}  mark-done <id>                    - Mark a task as done by ID${colors.reset}`);
}

