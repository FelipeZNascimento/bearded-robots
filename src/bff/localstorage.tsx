const localStorageDB = require('localstoragedb/localstoragedb');
const md5 = require('md5');
const TABLE_TESTS = "tests"
const lib = new localStorageDB("testmanager", localStorage);

export const initDB = () =>  {
    if(lib.isNew()){
        lib.createTable(TABLE_TESTS, ["id", "Device", "Steps"]);
        lib.commit();
    }
}
export const storeTest = (testData:any) => {
    const newID = md5(JSON.stringify(testData));
    const check = lib.queryAll(TABLE_TESTS, {
        query: {id: newID}
    });
    if(!check.length){
        lib.insert(TABLE_TESTS,{id: md5(JSON.stringify(testData)), ...testData})
        lib.commit();
    }
}
export const getTest = (id:string) => {
    return lib.queryAll(TABLE_TESTS, {
        query: {id}
    });
}

export const getTests = () => {
    return lib.queryAll(TABLE_TESTS);
}

export const deleteTest = (id: string) => {
    lib.deleteRows(TABLE_TESTS, {id});
    lib.commit();
}