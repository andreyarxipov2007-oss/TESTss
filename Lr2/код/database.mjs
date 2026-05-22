import { DatabaseSync } from "node:sqlite";
export function init_db(){
    //бд в синхронном режиме
    const db = new DatabaseSync("articles.db");

    //Инициализация
    db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `);
    function table_insert(table,values){
        const columns = Object.keys(values).join(", ");
        const placeholders = Object.keys(values).map(() => "?").join(", ");
        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders});`;
        const data = Object.values(values);
        const insert = db.prepare(sql);
        insert.run(...data);
    }
    function table_query(table, options=''){
        return db.prepare(`SELECT * FROM ${table} ${options};`).all();
    }
    

    
    return {db,table_insert,table_query};
}