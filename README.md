# Task Manager CLI Tool

## Project Note
This project was originally inspired by the [Task Tracker Challenge](https://roadmap.sh/projects/task-tracker).

However, I've taken some liberty to enhance the project by incorporating tools like `Commander`, `Inquirer` and `Chalk` to create a more user-friendly experience. These additions have allowed for features such as:
- Adding multiple tasks at once
- Editing task descriptions
- Enhanced command-line interaction and error handling

The goal of these enhancements was to make the tool more versatile while maintaining simplicity and reliability.

## Features
- Add new tasks with a unique ID and store it in `JSON` format.
- List tasks by their status: `to-do`, `in-progress`, or `done`.
- Update the description of an existing task.
- Delete tasks by their ID.
- Mark tasks as `in-progress` or `done`.

## Prerequisites
- Node.js installed on your system

## Installation
**Clone the repository**
```bash
git clone https://github.com/IRAKOZEAimeAubin/cli-task-manager.git

# Navigate to the project
cd cli-task-manager

# Installing dependencies
pnpm install

# Installing the project globally
npm i -g

# Or
npm install -g

# Altenatives to global installation
node index.js       # to run the project locally
npm run <script>    # add a script to package.json
npm link            # to install locally
```

## Usage

> **NOTE:**
> Use `npx task-cli <command>` to run the diffent commands without installing the project

- **Add a task**
```bash
task-cli add
```

- **List all tasks**
```bash
task-cli list
```

- **List tasks by status**
```bash
# To list the tasks that are marked as to-do
task-cli list todo

# To list the tasks that are marked as in-progess
task-cli list in-progress

# To list the tasks that are marked as done
task-cli list done
```

- **Update task status**
```bash
# Mark task as in-progress
task-cli mark-in-progress <task-id> # replace <task-id> with the id of the task

# Mark task as in-progress
task-cli mark-done <task-id> # replace <task-id> with the id of the task
```

- **Update task description**
```bash
# Mark task as in-progress
task-cli update <task-id> # replace <task-id> with the id of the task
```

- **Delete task**
```bash
task-cli delete <task-id> # replace <task-id> with the id of the task
```

### Sample JSON file
```JSON
{
  "tasks": [
    {
      "id": 1,
      "description": "learn rust programming language",
      "status": "in-progress",
      "createdAt": "16 January 25 at 17:00:18",
      "updatedAt": "17 January 25 at 11:47:37"
    },
    {
      "id": 2,
      "description": "buy internet subscription",
      "status": "todo",
      "createdAt": "16 January 25 at 17:00:50",
      "updatedAt": "16 January 25 at 17:00:50"
    }
  ]
}
```

> **NOTE:**
> A `tasks.json` file will be created in a `db` folder the first time the `task-cli add` command is run
