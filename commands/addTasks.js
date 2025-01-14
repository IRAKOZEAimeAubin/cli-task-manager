import inquirer from "inquirer";
import { createSpinner } from 'nanospinner';
import dateFormater from "../utils/dateFormatter.js";
import { readTasks, saveTasks } from "../utils/dbFile.js";
import chalkColors from "../utils/chalkColors.js";
import sleep from "../utils/sleep.js";

async function input () {
    const answers = await inquirer.prompt( [ {
        name: 'description',
        type: 'input',
        message: 'Please enter a task description:'
    } ] );

    return answers;
};

const askQuestions = async () => {
    const todosArray = [];
    let loop = false;

    do {
        const userResponse = await input();
        todosArray.push( {
            id: todosArray.length + 1,
            ...userResponse,
            status: 'todo',
            createdAt: dateFormater(),
            updatedAt: dateFormater(),
        } );
        const confirmQuestion = await inquirer.prompt( [ { name: 'confirm', type: 'confirm', message: 'Do you want to add more tasks?' } ] );
        if ( confirmQuestion.confirm ) {
            loop = true;
        } else {
            loop = false;
        }
    } while ( loop );

    return todosArray;
};

export default async function addTasks () {
    const spinner = createSpinner( 'Adding tasks...' );

    try {
        const exististingTasks = await readTasks();
        const newTasks = await askQuestions();

        spinner.start();
        await sleep();

        const startId = exististingTasks.length > 0 ? Math.max( ...exististingTasks.map( task => task.id ) ) : 0;

        const adjustedNewTasks = newTasks.map( ( task, index ) => ( {
            ...task,
            id: startId + index + 1
        } ) );

        const updatedTasks = [ ...exististingTasks, ...adjustedNewTasks ];

        await saveTasks( updatedTasks );

        spinner.success( { text: chalkColors.success( `Successfully added ${ newTasks.length } task(s)!` ) } );
    } catch ( error ) {
        spinner.error( {
            text: chalkColors.error( `Failed to add tasks: ${ error.message }` )
        } );
    }
}
