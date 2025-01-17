#!/usr/bin/env node

import addTasks from "./commands/addTasks.js";
import deleteTask from "./commands/deleteTask.js";
import { updateTaskDescription, updateTaskStatus } from "./commands/editTask.js";
import { readAllTasks } from "./commands/readTasks.js";
import { Command } from "commander";

const program = new Command();

program
    .name( 'task-cli' )
    .description( 'Your terminal task manager!' )
    .version( '1.0.0' );

program
    .command( 'add' )
    .description( 'Create a new task.' )
    .action( addTasks );

program
    .command( 'list' )
    .description( 'List tasks.' )
    .argument( '[status]', 'Filter tasks by status (todo, in-progress, done)' )
    .action( readAllTasks );

program
    .command( 'delete' )
    .description( 'Delete task by ID' )
    .argument( '[id]', 'Task ID to delete' )
    .action( deleteTask );

program
    .command( 'mark-in-progress' )
    .description( 'Mark task as in-progress' )
    .argument( '[id]', 'Task ID' )
    .action( id => updateTaskStatus( id, 'in-progress' ) );

program
    .command( 'mark-done' )
    .description( 'Mark task as done' )
    .argument( '[id]', 'Task ID' )
    .action( id => updateTaskStatus( id, 'done' ) );

program
    .command( 'update' )
    .description( 'Update task description' )
    .argument( '[id]', 'Task ID' )
    .action( updateTaskDescription );

program.parse();
