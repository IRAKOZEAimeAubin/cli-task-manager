import { createSpinner } from "nanospinner";
import { readTasks } from "../utils/dbFile.js";
import sleep from "../utils/sleep.js";
import chalkColors from "../utils/chalkColors.js";

export async function readAllTasks ( status ) {
    const spinner = createSpinner( 'Fetching tasks...' );

    try {
        const tasks = await readTasks();
        let filteredTasks = tasks;

        if ( status ) {
            const normalizedStatus = status.toLowerCase();
            filteredTasks = tasks.filter( task => task.status === normalizedStatus );
        }

        spinner.start();
        await sleep();

        if ( filteredTasks.length === 0 ) {
            const message = status
                ? `No tasks found with status: ${ status }`
                : 'You do not have any tasks yet!';

            spinner.info( {
                text: chalkColors.info( message )
            } );
        } else {
            const title = status
                ? `\n${ status.toUpperCase() } Tasks📝:`
                : '\nTasks📝:';

            console.log( chalkColors.title( title ) );

            filteredTasks.forEach( todo => {
                let color;
                if ( todo.status === 'in-progress' ) {
                    color = chalkColors.inProgress;
                } else {
                    color = chalkColors[ todo.status ];
                }
                console.log( color( `${ todo.id }. ${ todo.description } - ${ todo.status.toUpperCase() }` ) );
            } );
            spinner.success( {
                text: chalkColors.success( `\nSuccessfully fetched ${ filteredTasks.length } task(s)!` )
            } );
        }
    } catch ( error ) {
        spinner.error( {
            text: chalkColors.error( `Failed to fetch tasks: ${ error.message }` )
        } );
    }
}
