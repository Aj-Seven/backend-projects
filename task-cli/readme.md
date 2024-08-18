# Task Tracker

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

This is a simple command-line interface (CLI) application for managing tasks.

## Features

- Add new tasks with a unique ID and store it in `JSON` format.
- List tasks by their status: `to-do`, `in-progress`, or `done`.
- Update the description of an existing task.
- Delete tasks by their ID.
- Mark tasks as `in-progress` or `done`.

## Prerequisites

- Node.js installed on your system.

## Installation

**Clone the Repository**

   ```bash
   git clone https://github.com/Aj-Seven/roadmap-projects

   # Navigate to the project Directory
   cd roadmap-projects/task-cli
   ```
## Usage

- **Add a Task**
```bash
node index.js add "Drink a Coffee"
```

- **List all Tasks**
```bash
node index.js list
```
- **or by list the tasks by status**
```bash
# To list the tasks that are marked as to-do
node index.js list to-do

# To list the tasks that are marked as in-progess
node index.js list in-progress

# To list the tasks that are marked as done
node index.js list done
```

- **Update a Task**
```bash
node index.js update 1 "Drink a Coffee and Do Coding"
```

- **Mark Task Status**
```bash
# Mark as `in-progress` with containing task ID as 1
node index.js mark-in-progress 1

# Mark as `done` with containing task ID as 1
node index.js mark-done 1
```

- **Delete a Task**
```bash
# Delete the task by containing its ID 1
node index.js delete 1
```

### Sample JSON structure
```JSON
[
  {
    "id": 1,
    "description": "Drink a Coffee",
    "completed": false,
    "inProgress": false
  }
]
```
> Note: Place the JSON file in the same directory as the task code.
