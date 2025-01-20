import { createSpinner } from "nanospinner";
import chalkColors from "../utils/chalkColors.js";
import sleep from "../utils/sleep.js";
import { readTasks, saveTasks } from "../utils/dbFile.js";

export default async function deleteTask ( id ) {
    const spinner = createSpinner( 'Deleting task...' ).start();
    try {
        const taskId = parseInt( id );

        if ( isNaN( taskId ) ) {
            spinner.error( {
                text: chalkColors.error( 'Please provide a valid numeric ID' )
            } );
        }

        const tasks = await readTasks();
        const taskToDelete = tasks.find( task => task.id === taskId );

        if ( !taskToDelete ) {
            spinner.error( { text: chalkColors.error( `Task with ID ${ taskId } not found` ) } );
            return;
        }

        const updatedTasks = tasks.filter( task => task.id !== taskId );
        await saveTasks( updatedTasks );

        await sleep();
        spinner.success( {
            text: chalkColors.success( `Successfully deleted task: ${ taskToDelete.description }` )
        } );
    } catch ( error ) {
        spinner.error( {
            text: chalkColors.error( `Failed to delete task: ${ error.message }` )
        } );
    }
}