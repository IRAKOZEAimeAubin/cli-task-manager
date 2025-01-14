import { createSpinner } from "nanospinner";
import { readTasks } from "../utils/dbFile.js";
import sleep from "../utils/sleep.js";
import chalkColors from "../utils/chalkColors.js";

export async function readAllTasks () {
    const spinner = createSpinner( 'Fetching tasks...' );

    try {
        const tasks = await readTasks();

        spinner.start();
        await sleep();

        if ( tasks.length === 0 ) {
            spinner.info( {
                text: chalkColors.info( 'You do not have any tasks yet!' )
            } );
        } else {
            console.log( chalkColors.title( '\nTasks📝:' ) );
            tasks.forEach( todo => {
                let color;
                if ( todo.status === 'in-progress' ) {
                    color = chalkColors.inProgress;
                } else {
                    color = chalkColors[ todo.status ];
                }
                console.log( color( `${ todo.id }. ${ todo.description } - ${ todo.status.toUpperCase() }` ) );
            } );
            spinner.success( {
                text: chalkColors.success( `\nSuccessfully fetched ${ tasks.length } task(s)!` )
            } );
        }
    } catch ( error ) {
        spinner.error( {
            text: chalkColors.error( `Failed to fetch tasks: ${ error.message }` )
        } );
    }
}
