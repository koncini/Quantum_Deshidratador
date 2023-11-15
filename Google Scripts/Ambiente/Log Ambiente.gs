var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

function doGet(e) {
  var tempSensor1 = e.parameter.tempSensor1;
  var tempSensor2 = e.parameter.tempSensor2;
  var humMatte = e.parameter.humMatte;
  var tempMatte = e.parameter.tempMatte;
  var currentdate = new Date();
  var dateTime = currentdate.getFullYear() + "-"
    + ('0' + (currentdate.getMonth() + 1)).slice(-2) + "-"
    + ('0' + currentdate.getDate()).slice(-2) + "T"
    + ('0' + currentdate.getHours()).slice(-2) + ":"
    + ('0' + currentdate.getMinutes()).slice(-2) + ":"
    + ('0' + currentdate.getSeconds()).slice(-2);
  var params = JSON.stringify(e);
  response = HtmlService.createHtmlOutput(params);

  var values = [
    [dateTime, tempMatte, humMatte, tempSensor1, tempSensor2]
  ];

  var lastRow = sheet.getLastRow();
  var nextAvailableRow = lastRow + 1;
  var range = sheet.getRange("A" + nextAvailableRow + ":E" + nextAvailableRow);

  range.setValues(values);
  return response;
}

function doPost(){
  delAllChartsFromSheet();
  createChart();
  copyLogFile();
  clearLogFile();
  delAllChartsFromSheet();
  createHeaders();
}

function createHeaders() {
  sheet.setFrozenRows(1);
  var values = [
    ["Hora",
    "Temp Aire",
    "Hum Aire" , 
    "Temp Sensor1" , 
    "Temp Sensor2"]
  ];
  var range = sheet.getRange("A1:E1");
  range.setValues(values);
}

function copyLogFile(){ 
  var noArchivedFolder = DriveApp.getFolderById('1GbNYKoxRcKSZpCtfQFikFrPkeZj2M09m');
  var range = sheet.getRange("A1:B3");
  var currentdate = new Date();
  ss.setNamedRange('buildingNameAddress', range);
  var TestRange = ss.getRangeByName('buildingNameAddress').getValues();
  var currentdate = new Date();
  var dateTime = currentdate.getFullYear() + "-"
    + ('0' + (currentdate.getMonth() + 1)).slice(-2) + "-"
    + ('0' + currentdate.getDate()).slice(-2) + "T"
    + ('0' + currentdate.getHours()).slice(-2) + ":"
    + ('0' + currentdate.getMinutes()).slice(-2) + ":"
    + ('0' + currentdate.getSeconds()).slice(-2); 
  var fileToMove = DriveApp.getFileById(ss.getId()).makeCopy(dateTime.toString() + " Log Temperatura y Humedad Quantum ");
  fileToMove.moveTo(noArchivedFolder); 
}

function clearLogFile(){
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("A2:E" + lastRow);
  range.clearContent();
}

function createChart(){
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var lastRow = sheet.getLastRow();
  var humTempChart = sheet.newChart().asLineChart()
  .addRange(sheet.getRange("A1:E" + lastRow))
  .setTitle('Temperatura y Humedad Deshidratador')
  .setXAxisTitle('Hora')
  .setYAxisTitle('Humedad y Temperatura')
  .setPosition(lastRow, 3, 0, 0)
  .setOption('hAxis.gridlines.count', 10)
  .setOption('vAxis.gridlines.count', 10)
  .setNumHeaders(1)
  .build();

  sheet.insertChart(humTempChart);
}

function delAllChartsFromSheet() {
  var chts=sheet.getCharts();
  for(var i=0;i<chts.length;i++){
    sheet.removeChart(chts[i]);
  }
}
