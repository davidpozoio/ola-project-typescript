interface TableForm {
  [key: string]: TableContent;
}

interface TableContent {
  id: string | number;
  [key: string]: any;
}

interface Relations {
  nameTable: string;
  foreingTableName: string;
}

interface RecoverFrom {
  recoverFrom: string;
}

const getNestedTables = async <T extends TableForm>(
  tables: T[],
  relations: Relations[] = [],
  options: RecoverFrom
): Promise<any[]> => {
  const groups: { [key: string]: any } = {};
  const arrays: { [key: string]: TableContent[] } = {};

  for (let tableName in tables[0]) {
    groups[tableName] = new Map<number | string, any>();
  }
  for (let table of tables) {
    for (let tableName in table) {
      groups[tableName].set(table[tableName].id, table[tableName]);
    }
  }
  const tableNames: (keyof T)[] = Array.from(Object.keys(groups));

  for (let tableName of tableNames) {
    arrays[tableName as string] = Array.from(
      groups[tableName as string].values()
    );
  }

  for (let relation of relations) {
    for (let arrayTable of arrays[relation.foreingTableName]) {
      if (!arrayTable?.[`${relation.nameTable}s`]) {
        arrayTable[`${relation.nameTable}s`] = [];
      }

      for (let arrayRelationTable of arrays[relation.nameTable]) {
        if (
          arrayTable.id ===
          arrayRelationTable[`${relation.foreingTableName}_id`]
        ) {
          arrayTable[`${relation.nameTable}s`].push(arrayRelationTable);
        }
      }
    }
  }

  return arrays[options.recoverFrom];
};

export default getNestedTables;
