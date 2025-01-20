import { createSpinner } from "nanospinner";
import chalkColors from "../utils/chalkColors.js";
import { readTasks, saveTasks } from "../utils/dbFile.js";
import dateFormatter from "../utils/dateFormatter.js";
import sleep from "../utils/sleep.js";
import inquirer from "inquirer";

export async function updateTaskStatus ( id, newStatus ) {
    const spinner = createSpinner( 'Updating task status...' ).start();

    try {
        const taskId = parseInt( id );

        if ( isNaN( taskId ) ) {
            spinner.error( {
                text: chalkColors.error( 'Please provide a valid numeric ID' )
            } );
        }

        const tasks = await readTasks();
        const taskIndex = tasks.findIndex( task => task.id === taskId );

        if ( taskIndex === -1 ) {
            spinner.error( {
                text: chalkColors.error( `Task with ID ${ taskId } not found` )
            } );
        }

        tasks[ taskIndex ] = {
            ...tasks[ taskIndex ],
            status: newStatus,
            updatedAt: dateFormatter()
        };

        await saveTasks( tasks );
        await sleep();

        spinner.success( {
            text: chalkColors.success(
                `Successfully marked task "${ tasks[ taskIndex ].description }" as ${ newStatus }`
            )
        } );
    } catch ( error ) {
        spinner.error( {
            text: chalkColors.error( `Failed to update task status: ${ error.message }` )
        } );
    }
}


export async function updateTaskDescription ( id ) {
    const spinner = createSpinner( 'Updating task...' );

    try {
        const taskId = parseInt( id );

        if ( isNaN( taskId ) ) {
            spinner.error( {
                text: chalkColors.error( 'Please provide a valid numeric ID' )
            } );
        }

        const tasks = await readTasks();
        const taskIndex = tasks.findIndex( task => task.id === taskId );

        if ( taskIndex === -1 ) {
            spinner.error( {
                text: chalkColors.error( `Task with ID ${ taskId } not found` )
            } );
        }

        const { newDescription } = await inquirer.prompt( [ {
            name: 'newDescription',
            type: 'input',
            message: 'Enter new task description:',
            default: tasks[ taskIndex ].description,
            validate: input => input.trim() ? true : 'Description can not be empty'
        } ] );

        spinner.start();

        tasks[ taskIndex ] = {
            ...tasks[ taskIndex ],
            description: newDescription.trim(),
            updatedAt: dateFormatter()
        };

        await saveTasks( tasks );
        await sleep();

        spinner.success( {
            text: chalkColors.success( `Successfully updated task description to: ${ newDescription }` )
        } );
    } catch ( error ) {
        spinner.error( {
            text: chalkColors.error( `Failed to update task: ${ error.message }` )
        } );
    }
}
