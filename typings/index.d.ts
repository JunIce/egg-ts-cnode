import 'egg';

declare module 'egg' {
  interface mysql {
    get(tableName: String, find: {}): Promise<Any>;
    select(tableName: String, options: {
      where?: any
      columns?: any
      orders?: any
      limit?: number,
      offset?: number
    }): Promise<Any>;

    insert(tableName: String, row: object): Promise<Any>;

    update(tableName: String, row: object, options: {
      where?: any
    }): Promise<Any>;

    query(sql: String, values: Any[]): Promise<Any>;
  }
  interface Application {
    mysql: mysql;
  }
}
