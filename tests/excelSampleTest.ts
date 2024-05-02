import { test } from './setupFixtures';


test('A sample test to get row and column counts', async({testBase, excel}) => {
    const rowCount = await excel.getRowCount();
    const columnCount = await excel.getColumnCount()
    console.log(rowCount);
    console.log(columnCount);
})


test('A sample tests to read a cell value', async({testBase, excel}) => {
    console.log(await excel.getCellValue('B', 4));
})

test('A sample test to update a cell value', async({testBase, excel}) => {
    await excel.updateCellValue('B', 5, 'HelloThere');
})

