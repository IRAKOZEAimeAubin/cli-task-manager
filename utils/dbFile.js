import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from "url";

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const dbPath = path.join( __dirname, '..', 'db', 'tasks.json' );

async function ensureDbExists () {
    try {
        const dbDir = path.dirname( dbPath );

        try {
            await fs.access( dbDir );
        } catch ( error ) {
            await fs.mkdir( dbDir, { recursive: true } );
        }

        try {
            await fs.access( dbPath );
        } catch ( error ) {
            await fs.writeFile( dbPath, JSON.stringify( { tasks: [] }, null, 2 ), 'utf8' );
        }
    } catch ( error ) {
        throw new Error( `Failed to setup database: ${ error.message }` );
    }
}

export async function readTasks () {
    await ensureDbExists();
    try {
        const data = await fs.readFile( dbPath, 'utf8' );
        if ( !data.trim() ) {
            return [];
        }
        return JSON.parse( data ).tasks;
    } catch ( error ) {
        if ( error instanceof SyntaxError ) {
            await fs.writeFile( dbPath, JSON.stringify( { tasks: [] }, null, 2 ), 'utf8' );
            return [];
        }
    }
}

export async function saveTasks ( tasks ) {
    await fs.writeFile( dbPath, JSON.stringify( { tasks }, null, 2 ), 'utf8' );
}