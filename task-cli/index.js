const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, 'tasks.json');

// Function to read tasks from the JSON file
function readTasks() {
    if (fs.existsSync(tasksFilePath)) {
        const data = fs.readFileSync(tasksFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

// Function to write tasks to the JSON file
function writeTasks(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
}

// Function to get the next unique ID
function getNextId(tasks) {
    const ids = tasks.map(task => task.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

// Function to add a new task
function addTask(description) {
    const tasks = readTasks();
    const newTask = {
        id: getNextId(tasks),
        description: description,
        completed: false
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log('Task added successfully!' + ('ID:')+newTask.id);
}

// Command-line interface for adding tasks
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Please provide a task description.');
} else {
    const taskDescription = args.join(' ');
    addTask(taskDescription);
}

