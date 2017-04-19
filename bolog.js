var sheet = SpreadsheetApp.openById("16kky469b_oJCgqeXszctgXMPEzovp_DKdlxHiLnJuNs");
var today = sheet.getSheetByName("Today");
var bo = sheet.getSheetByName("Blackout Issue Log");

function onEdit(e) {
	var todayWorkingColVal = getColIndexByName("Working Correctly", 2);
	var selectedCellRow = e.range.getRow();
	var selectedCellCol = e.range.getColumn();
	var selectedCellVal = today.getRange(selectedCellRow, selectedCellCol).getDisplayValue();
	var todayDetailsColVal = getColIndexByName("Program Details", 2);
	var todayDetailsColCell = today.getRange(selectedCellRow, (todayDetailsColVal + 1)).getDisplayValue();
	if ((selectedCellCol - 1) === todayWorkingColVal) {
		if (selectedCellVal === "No") {
			var rdata = (today.getSheetValues(selectedCellRow, 1, 1, selectedCellCol));
			insertRow(bo, rdata);
		} else if (selectedCellVal === "Yes") {
			var i = 3;
			while ((bo.getRange(i, (todayDetailsColVal + 1)).getDisplayValue()) !== todayDetailsColCell) {
				i++;
			}
			bo.deleteRow(i);
		} else {
			Logger.log("Something is amiss");
		};
	};
}

function insertRow(sheet, rowData, optIndex) {
	var index = optIndex || 3;
	sheet.insertRowBefore(index).getRange(index, 1, 1, rowData[0].length).setValues(rowData);
}

function getColIndexByName(colName, row) {
	var data = today.getDataRange().getValues();
	var col = data[row - 1].indexOf(colName); //returns the index position of the passed column name	
	if (col != -1) {
		return col;
	}
}
