import { createSpinner } from "nanospinner";
import chalkColors from "../utils/chalkColors.js";
import { readTasks, saveTasks } from "../utils/dbFile.js";
import dateFormatter from "../utils/dateFormatter.js";
import sleep from "../utils/sleep.js";

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

        await saveTasks(tasks);
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