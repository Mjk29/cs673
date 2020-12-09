
var ICD10ALL = null;
var ICD10TopN = null;
var CPTCodesALL = null;
var CPTCodesTopN = null;
var billInputFields = {};

var createNewInputForm = true;
var fieldsUsedForAutoPopulation={}
var inputFieldCounter={}
var currentBillViewState = 'Open'



// $(function() {
//   $("#myTable").tablesorter({
//   	 theme : 'blue',
//   	 sortList: [[0,0],[1,0]]
//   });
// });


// $(function() {
//   $("#myTable").tablesorter({ sortList: [[0,0], [1,0]] });https://web.njit.edu/~mjk29/cs673/dashboard.html#
// });


// $(".myTable").tablesorter({
//     theme : 'blue',
//     // sort on the first column and second column in ascending order
//     sortList: [[0,0],[1,0]]
//   });




function startup() {
	reinstateTable()
	queryForBills('Open')


	jQuery("#setBillsToClosed").click(function(e){
		document.getElementById("openClosedSelectDropdownSub").innerHTML='Closed Bills'
		reinstateTable()
		queryForBills('Closed')
		currentBillViewState = 'Closed'
	});

	jQuery("#setBillsToOpen").click(function(e){
		document.getElementById("openClosedSelectDropdownSub").innerHTML='Open Bills'
		reinstateTable()
		queryForBills('Open')
		currentBillViewState = 'Open'
	});


	jQuery("#changeBillStateToOpen").click(function(e){
		console.log("ASUIDHILASUDHILOASHU")
		changeBillState('Open')
	});

	jQuery("#changeBillStateToClosed").click(function(e){
		changeBillState('Closed')
	});
}



	
function testUpdate() {
	// console.log('sending')
	sendData  = {
		transactionID: '100044',
		// POSTTYPE : "getAllICD10"
		POSTTYPE : "getTopICD10",
		senderKey: "cs673SuperSecureKey"
		
	}
	$.ajax({
		type: 'POST',
		url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
		data: sendData,
		success: function(data) {
			// console.log(data)
			// console.log(JSON.parse(data))
			// displayQRResult(data)
		},
	});
}


function testUpdate2() {
	// console.log('sending')
	sendData  = {
		transactionID: '100044',
		POSTTYPE : "getAllICD10"
		// POSTTYPE : "getTopICD10"
		
	}
	$.ajax({
		type: 'POST',
		url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
		data: sendData,
		success: function(data) {
			// console.log("below data")
			// console.log(JSON.parse(data))
			// console.log("------------")
			// displayQRResult(data)
		},
	});
}


function addNewRowToTable(tableID){
	// console.log(tableID)
	var tableElement = document.getElementById(tableID);
	// console.log(tableElement)
}



function createNewBillTable(targetDivID, buttonID){
	var tableElement = document.getElementById(targetDivID);
	// var createButton = document.getElementById(buttonID);
	// createButton.remove();


	if (createNewInputForm == false){
		return
	}
	createNewInputForm=false

	// Add submit to top bar
	// {"value":"Submit Bill","type":"button", "callFunction":"submitBill('newBillTable')"}
// {"value":"Insurance ID","type":"text", "billInputField":true}



	var elementsToCreate=[
	[{"value":"Patient First Name","type":"text", "billInputField":true, "id":"patient_first_name"}, {"value":"Patient Middle Name","type":"text", "billInputField":true, "id":"patient_middle_name"}, {"value":"Patient Last Name","type":"text", "billInputField":true, "id":"patient_last_name"}],
	[{"value":"Phone Number","type":"text", "billInputField":true, "id":"patient_contact_number"}, {"value":"Email","type":"email", "billInputField":true, "id":"patient_emailid"}, {"value":"Patient Sex","type":"text", "billInputField":true, "id":"patient_sex"}],
	[{"value":"Patient ID","type":"text", "billInputField":true, "id":"patient_id"},{"value":"Patient SSN","type":"text", "billInputField":true, "id":"patient_ssn"}, {"value":"Patient DOB","type":"date", "billInputField":true, "id":"patient_dob"}],
	[{"value":"Address Line 1","type":"text", "billInputField":true, "id":"patient_address_line_1"}, {"value":"City","type":"text", "billInputField":true, "id":"patient_address_city"}, {"value":"State","type":"text", "billInputField":true, "id":"patient_address_state"}],
	[{"value":"Address Line 2","type":"text", "billInputField":true, "id":"patient_address_line_2"},{"value":"Zipcode","type":"text", "billInputField":true, "id":"patient_zip_code"},],
	[{"value":"Patient Insurance ID","type":"text", "billInputField":true, "id":"patient_insurance_id"}, {"value":"Patient Insurance Company","type":"text", "billInputField":true, "id":"insurance_company_name"}, {"value":"Patient Insurance Group Number","type":"text", "billInputField":true, "id":"insurance_group_number"}],
	[{"value":"Patient Plan Name","type":"text", "billInputField":true, "id":"insurance_plan_name"},{"value":"Patient Insurance Contact Number","type":"text", "billInputField":true, "id":"insurance_contact_number"},{"value":"Patient Insurance Pharmacy Network","type":"text", "billInputField":true, "id":"insurance_pharmacy_network"}],
	[{"value":"Notes","type":"text", "billInputField":true, "colspan":3, "id":"billing_notes"}],
	// [{"value":"Add ICD10 Code","type":"button", "callFunction":"addICD10ToTable('newBillTable')"},{"value":"Add CPT Code","type":"button", "callFunction":"addCPTToTable('newBillTable')"}, {"value":"Add Other Expense","type":"button", "callFunction":"addOtherExpense('newBillTable')"}]
	]

	// console.log(tableElement)

	tableMain = document.createElement("table"); 
	// tableMain.setAttribute("class", "table table-striped"); 
	tableMain.setAttribute("class", "table table-bordered"); 
	tableMain.setAttribute("id", "newBillTable");

	// console.log(elementsToCreate.length)
	var tableRows=[]

	for (var i = 0; i < elementsToCreate.length; i++) {
		tableMain.appendChild(createNewBillTableRow(elementsToCreate[i]))
	}

	// console.log(tableRows)
	tableElement.appendChild(tableMain);  



	tableMain2 = document.createElement("table"); 
	// tableMain.setAttribute("class", "table table-striped"); 
	tableMain2.setAttribute("class", "table table-bordered"); 
	tableMain2.setAttribute("id", "createBillTopMenuBarTable");



	var createBillTopMenuBarElement = document.getElementById("createBillTopMenuBar");

	var menuOptions = [[{"value":"Submit Bill","type":"button", "callFunction":"submitBill('newBillTable')", "class":"btn btn-success"},{"value":"Auto Populate Fields","type":"button", "callFunction":"autoPopulateBillFields('newBillTable')", "class":"btn btn-warning"},{"value":"Clear Input","type":"button", "callFunction":"clearInuptFields()", "class":"btn btn-danger"},{"value":"Add ICD10 Code","type":"button", "callFunction":"addICD10ToTable('newBillTable')"},{"value":"Add CPT Code","type":"button", "callFunction":"addCPTToTable('newBillTable')"}, {"value":"Add Other Expense","type":"button", "callFunction":"addOtherExpense('newBillTable')"}]]
	for (var k = 0; k < menuOptions.length; k++) {
		// console.log(k)
		tableMain2.appendChild(createNewBillTableRow(menuOptions[k]))

		// console.log(createNewBillTableRow(menuOptions[k]))
	}
	createBillTopMenuBarElement.appendChild(tableMain2)
	// console.log("------------------------")

}


function createNewBillTableRow(rowElements, optionalBillData){
	rowTR = document.createElement("tr");
	for (var i = 0; i < rowElements.length; i++) {

		// console.log(rowElements[i])

		// create buton td
		if (rowElements[i].type == "button") {

			rowTD = document.createElement("td"); 
			rowBUTTON = document.createElement("button"); 
			rowBUTTON.setAttribute("id", rowElements[i].value);
			
			if ("class" in rowElements[i]){
				rowBUTTON.setAttribute("class", rowElements[i].class);
			}
			else{
				rowBUTTON.setAttribute("class", "btn btn-primary");
			}


			rowBUTTON.setAttribute("onclick", rowElements[i].callFunction);
			rowBUTTON.innerHTML = rowElements[i].value;
			rowTD.appendChild(rowBUTTON);
			rowTR.appendChild(rowTD);
		}
		// create option field
		else if (rowElements[i].type == "option"){
			// console.log("list optiopn topye")
			
			

			rowTD = document.createElement("td"); 
			rowTD.setAttribute("colspan", "2");

			rowDIV0 = document.createElement("div"); 
			rowDIV0.setAttribute("class", "input-group mb-3");

			rowDIV1 = document.createElement("div"); 
			rowDIV1.setAttribute("class", "input-group-prepend");

			rowSPAN = document.createElement("span"); 
			rowSPAN.setAttribute("class", "input-group-text");
			rowSPAN.innerHTML = rowElements[i].value;

			rowINPUT = document.createElement("input"); 
			rowINPUT.setAttribute("class", "form-control");
			rowINPUT.setAttribute("type", rowElements[i].type);

			// inputFieldCounter

			// console.log('------')
			// console.log(rowElements[i].id)
			// console.log('------')
			// || rowElements[i].id.includes('otherExpense_')
			if (rowElements[i].id.includes('cpt_') || rowElements[i].id.includes('icd10_') ) {
				// inputFieldCounter
				console.log(rowElements[i].value)
				console.log(inputFieldCounter[rowElements[i].value])
				if (rowElements[i].value in inputFieldCounter) {
					console.log("here")
					inputFieldCounter[rowElements[i].value]+=1
					rowINPUT.setAttribute("id", rowElements[i].id+inputFieldCounter[rowElements[i].value].toString(10));
				}
				else{
					console.log('there')
					inputFieldCounter[rowElements[i].value] = 0
					rowINPUT.setAttribute("id", rowElements[i].id+inputFieldCounter[rowElements[i].value].toString(10));
				}
				// console.log("CONTAINS CPT OR ICDO120")
			}
			else{
				rowINPUT.setAttribute("id", rowElements[i].id);
			}

			rowINPUT.setAttribute("maxlength", 50);
			rowINPUT.setAttribute("list", rowElements[i].list);




			rowDATALIST = document.createElement("datalist"); 




			// if (rowElements[i].list == 'CPTCodesTopN'){

			// }
			if (rowElements[i].list == "ICD10TopNList"){

				rowDATALIST.setAttribute("id", "ICD10TopNList");
			// for (var j = 0; j < rowElements[i].list.length; j++) {
				for (var j = 0; j < ICD10TopN.length; j++) {
					// console.log(ICD10TopN[i].list[j]['ABBREVIATED_DESCRIPTION']);
					// console.log('***')
					// console.log(rowElements[i])
					// console.log(ICD10TopN[j]['ABBREVIATED_DESCRIPTION'])
					datalistItem = document.createElement("option"); 
					// Change this to dynamic col
					// datalistItem.setAttribute("value", rowElements[i]['ABBREVIATED_DESCRIPTION']);

						datalistItem.setAttribute("value", ICD10TopN[j]['ABBREVIATED_DESCRIPTION'])
					// datalistItem.setAttribute("value", rowElements[i]['CPT_DESCRIPTION']);
					// console.log(rowElements[i])
					       
					rowDATALIST.appendChild(datalistItem);
				}
			}

			else if (rowElements[i].list == "CPTCodesTopN"){
				rowDATALIST.setAttribute("id", "CPTCodesTopN");

			// for (var j = 0; j < rowElements[i].list.length; j++) {
				for (var j = 0; j < CPTCodesTopN.length; j++) {
					// console.log(ICD10TopN[i].list[j]['ABBREVIATED_DESCRIPTION']);
					// console.log('***')
					// console.log(rowElements[i])
					// console.log(CPTCodesTopN[j]['CPT_DESCRIPTION'])
					datalistItem = document.createElement("option"); 
					// Change this to dynamic col
					// datalistItem.setAttribute("value", rowElements[i]['ABBREVIATED_DESCRIPTION']);

						datalistItem.setAttribute("value", CPTCodesTopN[j]['CPT_DESCRIPTION'])
					// datalistItem.setAttribute("value", rowElements[i]['CPT_DESCRIPTION']);
					// console.log(rowElements[i])
					       
					rowDATALIST.appendChild(datalistItem);
				}
			}

			if (rowElements[i].billInputField == true) {
				billInputFields[rowINPUT.id] = rowINPUT
			}

			rowDIV1.appendChild(rowSPAN);  
			rowDIV0.appendChild(rowDIV1);  
			rowDIV0.appendChild(rowINPUT);  
			rowTD.appendChild(rowDIV0);  
			rowTD.appendChild(rowDATALIST);
			rowTR.appendChild(rowTD);
		}




		else if (rowElements[i].type == "display"){
			// console.log(rowElements[i])
			// console.log(rowElements[i].id)
			// console.log(optionalBillData[rowElements[i].displayValue])

			cellParent = document.createElement("td");
			cellLabel = document.createElement("td");
			cellValue = document.createElement("td");

			// cellParent.setAttribute("class", "33.333%");			



			if ("colspan" in rowElements[i]) {
				// rowTD.setAttribute("colspan", rowElements[i].colspan);
				if (rowElements[i].colspan == 2) {
					cellParent.setAttribute("width", "66.666%");	
				}
				if (rowElements[i].colspan == 3) {
					cellParent.setAttribute("width", "100%");	
				}
			}
			else{
				cellParent.setAttribute("width", "33.333%");
			}

			cellLabel.setAttribute("width", "50%");
			cellValue.setAttribute("width", "50%");


			cellParent.setAttribute("style", "display:inline-flex; padding:0px")


			if (("novalue" in rowElements[i])) {
				cellLabel.setAttribute("style", "flex:1; background-color:  #ccddff; font-weight: bold;")	
			}
			else{
				cellLabel.setAttribute("style", "flex:1; background-color: white; font-weight: bold;")
			}
			cellValue.setAttribute("style", "flex:1; background-color: white;")


			cellLabel.innerHTML=rowElements[i].value
			if (rowElements[i].displayValue.includes('price')) {
				console.log("------------------------")
				console.log(optionalBillData[rowElements[i].displayValue])
				cellValue.innerHTML='$'+parseFloat(optionalBillData[rowElements[i].displayValue]).toFixed(2).toString()
			}

			else if ("single" in rowElements[i] || rowElements[i].displayValue.includes('price')) {
				cellValue.innerHTML='$'+rowElements[i].displayValue
			}
			else{
				cellValue.innerHTML=optionalBillData[rowElements[i].displayValue]
			}
			


			cellParent.appendChild(cellLabel);
			if (!("novalue" in rowElements[i])) {
				cellParent.appendChild(cellValue);	
			}

			rowTR.appendChild(cellParent);
		}





		else if (rowElements[i].type == "changeState"){
			console.log('999999999999999999999')
			console.log(rowElements[i])
			console.log(optionalBillData)
			// console.log(rowElements[i].id)
			// console.log(optionalBillData[rowElements[i].displayValue])

			cellParent = document.createElement("td");
			cellLabel = document.createElement("td");
			
			cellLabel.innerHTML=`<div class="btn-group">
				<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Change Bill State
				</button>
				<div class="dropdown-menu">
				<a id="changeBillStateToOpen" class="dropdown-item" onclick='changeBillState("Open", `+optionalBillData.bill_id+`)' >Open</a>
				<a id="changeBillStateToClosed" class="dropdown-item" onclick='changeBillState("Closed", `+optionalBillData.bill_id+`)'>Closed</a>
				</div>
				</div>`



			cellValue = document.createElement("td");

			cellParent.setAttribute("class", "33.333%");			



			// if ("colspan" in rowElements[i]) {
			// 	// rowTD.setAttribute("colspan", rowElements[i].colspan);
			// 	if (rowElements[i].colspan == 2) {
			// 		cellParent.setAttribute("width", "66.666%");	
			// 	}
			// 	if (rowElements[i].colspan == 3) {
			// 		cellParent.setAttribute("width", "100%");	
			// 	}
			// }
			// else{
			// 	cellParent.setAttribute("width", "33.333%");
			// }

			cellLabel.setAttribute("width", "50%");
			cellValue.setAttribute("width", "50%");


			cellParent.setAttribute("style", "display:inline-flex; padding:0px")


			// if (("novalue" in rowElements[i])) {
			// 	cellLabel.setAttribute("style", "flex:1; background-color:  #ccddff; font-weight: bold;")	
			// }
			// else{
				cellLabel.setAttribute("style", "flex:1; background-color: white; font-weight: bold; padding:0px; text-align: center;")
			// }
			// cellValue.setAttribute("style", "flex:1; background-color: white;")


			// cellLabel.innerHTML=rowElements[i].value
			// if (rowElements[i].displayValue.includes('price')) {
			// 	console.log("------------------------")
			// 	console.log(optionalBillData[rowElements[i].displayValue])
			// 	cellValue.innerHTML='$'+parseFloat(optionalBillData[rowElements[i].displayValue]).toFixed(2).toString()
			// }

			// else if ("single" in rowElements[i] || rowElements[i].displayValue.includes('price')) {
			// 	cellValue.innerHTML='$'+rowElements[i].displayValue
			// }
			// else{
			// 	cellValue.innerHTML=optionalBillData[rowElements[i].displayValue]
			// }
			


			cellParent.appendChild(cellLabel);
			// if (!("novalue" in rowElements[i])) {
			// 	cellParent.appendChild(cellValue);	
			// }

			rowTR.appendChild(cellParent);
		}




		// create any other input field
		else {

			rowTD = document.createElement("td"); 

			rowDIV0 = document.createElement("div"); 
			rowDIV0.setAttribute("class", "input-group mb-3");

			rowDIV1 = document.createElement("div"); 

			rowDIV1.setAttribute("class", "input-group-prepend");

			rowSPAN = document.createElement("span"); 
			rowSPAN.setAttribute("class", "input-group-text");
			rowSPAN.innerHTML = rowElements[i].value;

			rowINPUT = document.createElement("input"); 
			rowINPUT.setAttribute("class", "form-control");
			rowINPUT.setAttribute("type", rowElements[i].type);
			
			rowINPUT.setAttribute("maxlength", 50);



			if ("colspan" in rowElements[i]) {
				rowTD.setAttribute("colspan", rowElements[i].colspan);
			}

			if ("id" in rowElements[i]) {
				if (rowElements[i].id.includes('otherExpense_') || rowElements[i].id.includes('cpt_') || rowElements[i].id.includes('icd10_')) {
					console.log("CONTAINS OTHER EXPENSE")
					if (rowElements[i].value in inputFieldCounter) {
						console.log("here")
						inputFieldCounter[rowElements[i].value]+=1
						rowINPUT.setAttribute("id", rowElements[i].id+inputFieldCounter[rowElements[i].value].toString(10));
					}
					else{
						console.log('there')
						inputFieldCounter[rowElements[i].value] = 0
						rowINPUT.setAttribute("id", rowElements[i].id+inputFieldCounter[rowElements[i].value].toString(10));
					}

				}
				else{
					rowINPUT.setAttribute("id", rowElements[i].id);
				}
			}

			if (rowElements[i].billInputField == true) {
				billInputFields[rowINPUT.id] = rowINPUT
			}

			rowDIV1.appendChild(rowSPAN);  
			rowDIV0.appendChild(rowDIV1);  
			rowDIV0.appendChild(rowINPUT);  
			rowTD.appendChild(rowDIV0);  
			rowTR.appendChild(rowTD);
		}
	}
	return rowTR
}








function addICD10ToTable(tableName) {
	// console.log("addICD10ToTableaddICD10ToTableaddICD10ToTable")
	

	var existingErrorMessage = document.getElementById("createBillErrorMsg");

	if (existingErrorMessage != null){
		existingErrorMessage.remove()
	}

	// console.log(inputFieldCounter)
	if (inputFieldCounter["ICD10 Code"]>=9) {
		var topBarDisplay = document.getElementById("rightOfCreateNewBill")
		var errorMsgDispaly = document.createElement("div"); 
		errorMsgDispaly.setAttribute("style", "color:red; background-color:#ffe6e6;");
		errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
		errorMsgDispaly.innerHTML = "Can not add more than 10 ICD10 codes to single bill."
		topBarDisplay.appendChild(errorMsgDispaly)
		return
	}



	var tableElement = document.getElementById(tableName);

	// console.log(tableElement)

	// if idc10 list is not populated, make ajax request, then create input 
	if (ICD10TopN == null){
		// ICD10TopN = 123


		sendData  = {
			// POSTTYPE : "getAllICD10"
			POSTTYPE : "getTopICD10"		
		}
		$.ajax({
			type: 'POST',
			url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
			data: sendData,
			success: function(data) {
				// console.log("below data")
				// console.log(data)
				// console.log(JSON.parse(data))
				// console.log("------------")
				ICD10TopN = JSON.parse(data)

				for (var i = 0; i < ICD10TopN.length; i++) {
					// console.log(ICD10TopN[i]['ABBREVIATED_DESCRIPTION'])
				}

				// displayQRResult(data)
				// populateICD10DropdownField(tableElement)
				tableElement.appendChild(createNewBillTableRow([{"value":"ICD10 Code","type":"option", "list":"ICD10TopNList", "billInputField":true,"id":"icd10_input"},{"value":"ICD10 Price","type":"text", "billInputField":true,"id":"icd10_price"}]))
			},
		});

	}
	else{
		tableElement.appendChild(createNewBillTableRow([{"value":"ICD10 Code","type":"option", "list":"ICD10TopNList", "billInputField":true,"id":"icd10_input"},{"value":"ICD10 Price","type":"text", "billInputField":true,"id":"icd10_price"}]))
	}
}


function addCPTToTable(tableName) {
	var existingErrorMessage = document.getElementById("createBillErrorMsg");

	if (existingErrorMessage != null){
		existingErrorMessage.remove()
	}
	// console.log(inputFieldCounter["CPT Code"])
	if (inputFieldCounter["CPT Code"]>=9) {
		var topBarDisplay = document.getElementById("rightOfCreateNewBill")
		var errorMsgDispaly = document.createElement("div"); 
		errorMsgDispaly.setAttribute("style", "color:red; background-color:#ffe6e6;");
		errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
		errorMsgDispaly.innerHTML = "Can not add more than 10 CPT codes to single bill."
		topBarDisplay.appendChild(errorMsgDispaly)
		return
	}

	var tableElement = document.getElementById(tableName);

	if (CPTCodesTopN == null) {
		var sendData  = {
			POSTTYPE : "getTopCPT",
			// POSTTYPE : "getAllCPT",
			COUNT : 25	
		}
		sendAjax(sendData)
			.then((responseData) =>{
				// console.log(responseData)
				CPTCodesTopN = JSON.parse(responseData)
				// console.log(CPTCodesALL)
				// console.log("===")
				for (var i = 0; i < CPTCodesTopN.length; i++) {
					// console.log(CPTCodesTopN[i])
				}
				// console.log("===")
				createRowConfig =[{"value":"CPT Code","type":"option", "list":"CPTCodesTopN", "billInputField":true,"id":"cpt_input"},{"value":"CPT Price","type":"text", "billInputField":true,"id":"cpt_price"}];
				tableElement.appendChild(createNewBillTableRow(createRowConfig))
			})

	}
	else{
		// console.log("else statement")
		createRowConfig =[{"value":"CPT Code","type":"option", "list":"CPTCodesTopN", "billInputField":true,"id":"cpt_input"},{"value":"CPT Price","type":"text", "billInputField":true,"id":"cpt_price"}];
		tableElement.appendChild(createNewBillTableRow(createRowConfig))
	}



	// var createRowConfig ={"value":"ICD10 Code","type":"option", "list":"CPTCodesTopN", "billInputField":true};

	// if (CPTCodesTopN == null){
	// 	queryDBandCallObjectCreation(tableName, sendData, createRowConfig)
	// }
	// else{
	// 	tableElement.appendChild(createNewBillTableRow([createRowConfig]))
	// }

}



function queryDBandCallObjectCreation(tableName, sendData, createRowConfig){
	var tableElement = document.getElementById(tableName);
	// if (CPTCodesTopN == null){
	// 	sendData  = {
	// 		POSTTYPE : "getTopICD10",
	// 		COUNT : 25	
	// 	}
		$.ajax({
			type: 'POST',
			url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
			data: sendData,
			success: function(data) {
				// console.log(data)
				CPTCodesTopN = JSON.parse(data)
				tableElement.appendChild(createNewBillTableRow([{"value":"ICD10 Code","type":"option", "list":"CPTCodesTopN", "billInputField":true}]))
			},
		});
	// }
	// else{
		// tableElement.appendChild(createNewBillTableRow([{"value":"ICD10 Code","type":"option", "list":"CPTCodesTopN", "billInputField":true}]))
	// }
}



function submitBill(tableID) {


	var existingErrorMessage = document.getElementById("createBillErrorMsg");

	if (existingErrorMessage != null){
		existingErrorMessage.remove()
	}

	// console.log(billInputFields)

	// submissionObj = {}
	// var submissionObj={"patient_first_name":"NULL","patient_middle_name":"NULL","patient_last_name":"NULL","patient_contact_number":"NULL","patient_emailid":"NULL","patient_sex":"NULL","patient_id":"NULL","patient_ssn":"NULL","patient_dob":"NULL","patient_address_line_1":"NULL","patient_address_city":"NULL","patient_address_state":"NULL","patient_address_line_2":"NULL","patient_zip_code":"NULL","patient_insurance_id":"NULL","insurance_company_name":"NULL","insurance_group_number":"NULL","insurance_plan_name":"NULL","insurance_contact_number":"NULL","insurance_pharmacy_network":"NULL","billing_notes":"NULL","icd10_input0":"NULL","icd10_price0":"NULL","icd10_input1":"NULL","icd10_price1":"NULL","cpt_input0":"NULL","cpt_price0":"NULL","cpt_input1":"NULL","cpt_price1":"NULL","otherExpense_code0":"NULL","otherExpense_price0":"NULL","otherExpense_code1":"NULL","otherExpense_price1":"NULL","otherExpense_code2":"NULL","otherExpense_price2":"NULL","icd10_input2":"NULL","icd10_price2":"NULL","icd10_input3":"NULL","icd10_price3":"NULL","icd10_input4":"NULL","icd10_price4":"NULL","icd10_input5":"NULL","icd10_price5":"NULL","icd10_input6":"NULL","icd10_price6":"NULL","icd10_input7":"NULL","icd10_price7":"NULL","icd10_input8":"NULL","icd10_price8":"NULL","icd10_input9":"NULL","icd10_price9":"NULL","cpt_input2":"NULL","cpt_price2":"NULL","cpt_input3":"NULL","cpt_price3":"NULL","cpt_input4":"NULL","cpt_price4":"NULL","cpt_input5":"NULL","cpt_price5":"NULL","cpt_input6":"NULL","cpt_price6":"NULL","cpt_input7":"NULL","cpt_price7":"NULL","cpt_input8":"NULL","cpt_price8":"NULL","cpt_input9":"NULL","cpt_price9":"NULL","otherExpense_code3":"NULL","otherExpense_price3":"NULL","otherExpense_code4":"NULL","otherExpense_price4":"NULL","otherExpense_code5":"NULL","otherExpense_price5":"NULL","otherExpense_code6":"NULL","otherExpense_price6":"NULL","otherExpense_code7":"NULL","otherExpense_price7":"NULL","otherExpense_code8":"NULL","otherExpense_price8":"NULL","otherExpense_code9":"NULL","otherExpense_price9":"NULL"}
	var submissionObj={"patient_first_name":"","patient_middle_name":"","patient_last_name":"","patient_contact_number":"","patient_emailid":"","patient_sex":"","patient_id":"","patient_ssn":"","patient_dob":"","patient_address_line_1":"","patient_address_city":"","patient_address_state":"","patient_address_line_2":"","patient_zip_code":"","patient_insurance_id":"","insurance_company_name":"","insurance_group_number":"","insurance_plan_name":"","insurance_contact_number":"","insurance_pharmacy_network":"","billing_notes":"","icd10_input0":"","icd10_price0":"","icd10_input1":"","icd10_price1":"","cpt_input0":"","cpt_price0":"","cpt_input1":"","cpt_price1":"","otherExpense_code0":"","otherExpense_price0":"","otherExpense_code1":"","otherExpense_price1":"","otherExpense_code2":"","otherExpense_price2":"","icd10_input2":"","icd10_price2":"","icd10_input3":"","icd10_price3":"","icd10_input4":"","icd10_price4":"","icd10_input5":"","icd10_price5":"","icd10_input6":"","icd10_price6":"","icd10_input7":"","icd10_price7":"","icd10_input8":"","icd10_price8":"","icd10_input9":"","icd10_price9":"","cpt_input2":"","cpt_price2":"","cpt_input3":"","cpt_price3":"","cpt_input4":"","cpt_price4":"","cpt_input5":"","cpt_price5":"","cpt_input6":"","cpt_price6":"","cpt_input7":"","cpt_price7":"","cpt_input8":"","cpt_price8":"","cpt_input9":"","cpt_price9":"","otherExpense_code3":"","otherExpense_price3":"","otherExpense_code4":"","otherExpense_price4":"","otherExpense_code5":"","otherExpense_price5":"","otherExpense_code6":"","otherExpense_price6":"","otherExpense_code7":"","otherExpense_price7":"","otherExpense_code8":"","otherExpense_price8":"","otherExpense_code9":"","otherExpense_price9":""}


	if (billInputFields["patient_id"].value.length == 0 || billInputFields["patient_ssn"].value.length == 0) {
		var topBarDisplay = document.getElementById("rightOfCreateNewBill")
		var errorMsgDispaly = document.createElement("div"); 
		errorMsgDispaly.setAttribute("style", "color:red; background-color:#ffe6e6;");
		errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
		errorMsgDispaly.innerHTML = "Please fill in bill before submitting."
		topBarDisplay.appendChild(errorMsgDispaly)
		return
	}

	for (const [key, value] of Object.entries(billInputFields)) {
		// console.log(value.value)
		// console.log(key)
		// if (key.includes('price')==true) {
		// 	if (value.value.length == 0){
		// 		submissionObj[key]='NULL'
		// 	}
		// 	else{
		// 		submissionObj[key]=value.value
		// 	}
		// }
		// else{
			submissionObj[key]=value.value
		// }

	}

	sendData  = {
		POSTTYPE : "submitBill",
		ARGS: submissionObj
	}

	$.ajax({
			type: 'POST',
			url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
			data: sendData,
			success: function(data) {
				// console.log(data)

				try{
					insertReturn = JSON.parse(data)
				}catch (error) {
					var topBarDisplay = document.getElementById("rightOfCreateNewBill")
					var errorMsgDispaly = document.createElement("div"); 
					errorMsgDispaly.setAttribute("style", "color:red; background-color:#ffe6e6;");
					errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
					errorMsgDispaly.innerHTML = "There was some error while submitting the bill, please try again."
					topBarDisplay.appendChild(errorMsgDispaly)
				}


				if (insertReturn == "Bill Successfully submitted"){
					var topBarDisplay = document.getElementById("rightOfCreateNewBill")
					var errorMsgDispaly = document.createElement("div"); 
					errorMsgDispaly.setAttribute("style", "color:green; background-color:#e6ffe6;");
					errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
					errorMsgDispaly.innerHTML = "Bill successfully submitted."
					topBarDisplay.appendChild(errorMsgDispaly)
				}
				else{
					var topBarDisplay = document.getElementById("rightOfCreateNewBill")
					var errorMsgDispaly = document.createElement("div"); 
					errorMsgDispaly.setAttribute("style", "color:red; background-color:#ffe6e6;");
					errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
					errorMsgDispaly.innerHTML = "There was some error while submitting the bill, please try again."
					topBarDisplay.appendChild(errorMsgDispaly)
					
				}
				// console.log(insertReturn)
				
			},
		});



	// console.log("submit bill function")


// doTheThing()
//   .then((data) => {
    // console.log(data)
//     // doSomethingElse()
//   })
//   .catch((error) => {
    // console.log(error)
//   })


	// console.log(asyncTest())
	// console.log(billInputFields)

// 	for(field in billInputFields){
		// console.log(billInputFields[field].value)
// 	}

	// console.log(tableID)
	// tableElementSubmit = document.getElementById(tableID);
	// // console.log(tableElementSubmit)
	// for (node in tableElementSubmit.rows){ console.log(Node)}

	// for (var i = 0; i < tableElementSubmit.rows.length; i++) {
	// 	// console.log(tableElementSubmit.rows[i])
	// 	for (var j = 0; j < tableElementSubmit.rows[i].cells.length; j++) {
	// 		// console.log(tableElementSubmit.rows[i].cells[j])
	// 		// console.log(tableElementSubmit.rows[i].cells[j].hasAttribute("billInputField"))
	// 		// if .hasAttribute("onclick")
	// 	}
	// }
}








// async function asyncTest(){
	// console.log("asnycn tewst function")
// 	stuff = await doAjax();
	// console.log(stuff)

// }



// async function doAjax(args) {
//     const result = await $.ajax({
//         url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
//         type: 'POST',
//         data: {POSTTYPE : "getTopICD10"}
//     });

//     return result;

// }



function queryForBills(billType) {
	// console.log("queryForBills")
	var tableElement = document.getElementById("displayBillsTableBody");
	// $('#displayBillsTableBody').empty();



	sendData  = {
			// POSTTYPE : "getAllICD10"
			POSTTYPE : "queryForBills",
			ARGS: billType
		}
		$.ajax({
			type: 'POST',
			url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
			data: sendData,
			success: function(data) {
				// console.log("below data")
				// console.log(data)
				dataRows = JSON.parse(data)
				console.log(dataRows)


				for (var i = 0; i < dataRows.length; i++) {
					var billRow = document.createElement("tr"); 

					jQuery.each(dataRows[i], function(j, val) {
						var billCol = document.createElement("td");
						billCol.innerHTML = val

						// creaate links for bill and patient views
						if (j == "bill_id") {
							// console.log(j + val)
							billCol.setAttribute("onclick", `inspectSingleBill('${val}')`)
							billCol.setAttribute("class","billtableclickable");

							// inspectSingleBill
						}

						if (j == "patient_id") {
							// console.log(j+val)
						}

						if (j == "total_price") {
							// console.log(j+val)
							billCol.innerHTML = parseFloat(val).toFixed(2)
						}


						billRow.appendChild(billCol)

						// $("#" + i).append(document.createTextNode(" - " + val));
						// console.log(j)
						// console.log(val)
						// var asd = 1
					});
				tableElement.appendChild(billRow)
				}
				$("#displayBillsTable").tablesorter(); 
				runAfterTableLoad()
				// console.log("------------")
				// ICD10TopN = JSON.parse(data)

				// for (var i = 0; i < ICD10TopN.length; i++) {
					// console.log(ICD10TopN[i]['ABBREVIATED_DESCRIPTION'])
				// }

				// displayQRResult(data)
				// populateICD10DropdownField(tableElement)
				// for (var i = 0; i < dataRows.length; i++) {
					// console.log(dataRows[i])
				// 	for (var j = 0; j < dataRows.length; j++) {
						// console.log(dataRows[i][j])
				// 	}


					// tableElement.appendChild(createNewBillTableRow([{"type":"billItemRow", "billRowData":dataRows[i]}]))
				
				// }
			},
		});
}













function sendAjax(sendData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
      type: 'POST',
      data: sendData,
      success: function (data) {
        // console.log(data)
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}



// function asnycnHelperTest() {
	// console.log("asyncHelper")
// 	sendData  = {POSTTYPE : "getTopICD10"}
// 	const asyncHelperReturn = $.ajax({
// 		type: 'POST',
// 		url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
// 		data: sendData,
// 		success: function(data) {
			// console.log(data)
// 			return await data
// 		},
// 	});

// 	return asyncHelperReturn
// }





// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// })







// Functino for sorting table fields
function runAfterTableLoad() {

	$(function() {

	  $("table").tablesorter({
	    theme : "bootstrap",

	    widthFixed: true,

	    // widget code contained in the jquery.tablesorter.widgets.js file
	    // use the zebra stripe widget if you plan on hiding any rows (filter widget)
	    // the uitheme widget is NOT REQUIRED!
	    widgets : [ "filter", "columns", "zebra" ],

	    widgetOptions : {
	      // using the default zebra striping class name, so it actually isn't included in the theme variable above
	      // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
	      zebra : ["even", "odd"],

	      // class names added to columns when sorted
	      columns: [ "primary", "secondary", "tertiary" ],

	      // reset filters button
	      filter_reset : ".reset",

	      // extra css class name (string or array) added to the filter element (input or select)
	      filter_cssFilter: [
	        'form-control',
	        'form-control',
	        'form-control custom-select', // select needs custom class names :(
	        'form-control',
	        'form-control',
	        'form-control',
	        'form-control'
	      ]

	    }
	  })
	  .tablesorterPager({

	    // target the pager markup - see the HTML block below
	    container: $(".ts-pager"),

	    // target the pager page select dropdown - choose a page
	    cssGoto  : ".pagenum",

	    // remove rows from the table to speed up the sort of large tables.
	    // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
	    removeRows: false,

	    // output string - default is '{page}/{totalPages}';
	    // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
	    output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'

	  });

	});

}



// Function for filtering table fields'
$(document).ready(function(){
	$("#filterBillsID").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#displayBillsTableBody tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});





function changeViewToBill(billID) {
 	

	sendData  = {
			POSTTYPE : "getBillInfo",
			ARGS: "billID"
		}
		$.ajax({
			type: 'POST',
			url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
			data: sendData,
			success: function(data) {

				// dataRows = JSON.parse(data)

				// console.log(data)

			},
		});




 } 




function createBillInspection(creationDiv){
	
	creationDivElement = document.getElementById(creationDiv)
	// console.log(creationDivElement)





}





function setViewToCreateBill() {
	document.getElementById("billListArea").classList.remove("centerareadisplayblock");
	document.getElementById("billListArea").classList.add("centerareadisplaynone");

	document.getElementById("billInspectionArea").classList.remove("centerareadisplaynone");
	document.getElementById("billInspectionArea").classList.add("centerareadisplayblock");

	document.getElementById("singleBillInspectionArea").classList.remove("centerareadisplayblock");
	document.getElementById("singleBillInspectionArea").classList.add("centerareadisplaynone");
	
	createNewBillTable('createNewBillArea', 'createNewBillTableButton')
}

function setViewToBillList() {
	document.getElementById("billInspectionArea").classList.remove("centerareadisplayblock");
	document.getElementById("billInspectionArea").classList.add("centerareadisplaynone");

	document.getElementById("billListArea").classList.remove("centerareadisplaynone");
	document.getElementById("billListArea").classList.add("centerareadisplayblock");

	document.getElementById("singleBillInspectionArea").classList.remove("centerareadisplayblock");
	document.getElementById("singleBillInspectionArea").classList.add("centerareadisplaynone");

	reinstateTable()
	queryForBills(currentBillViewState)


}

function setViewToBillInspection() {
	document.getElementById("billInspectionArea").classList.remove("centerareadisplayblock");
	document.getElementById("billInspectionArea").classList.add("centerareadisplaynone");

	document.getElementById("billListArea").classList.remove("centerareadisplayblock");
	document.getElementById("billListArea").classList.add("centerareadisplaynone");

	document.getElementById("singleBillInspectionArea").classList.remove("centerareadisplaynone");
	document.getElementById("singleBillInspectionArea").classList.add("centerareadisplayblock");

	createBillInspection('billInspectSubArea')
}




function testRequestGrp5() {
	// sendData  = {
	// 		Header: "Content-type: application/x-www-form-urlencoded\r\n",
	// 		Token : "xD9NzRSY3e5akTxhum00",
	// 		Type: "APIR",
	// 		Data:[]
	// 	}
	// 	$.ajax({
	// 		type: 'POST',
	// 		url: "https://web.njit.edu/~as2757/ControlPatientIntake/api.php",
	// 		data: JSON.stringify(sendData),
	// 		success: function(data) {

	// 			// dataRows = JSON.parse(data)

				// console.log(data)

	// 		},
	// 	});

	console.log("testRequestGrp5()")
	sendData  = {
			POSTTYPE : "getDataFromGroup5",
			ARGS: "billID"
		}
		$.ajax({
			type: 'POST',
			url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
			data: sendData,
			success: function(data) {
				console.log(data)

				dataRows = JSON.parse(data)
				console.log(dataRows)


			},
		});

}



// for (var i = 0; i < dataRows["ReturnData"]['patients'].length; i++) {
// 	console.log(dataRows["ReturnData"]['patients'][i]['patient_insurance_id'])
// }


function addOtherExpense(tableName) {

	var existingErrorMessage = document.getElementById("createBillErrorMsg");

	if (existingErrorMessage != null){
		existingErrorMessage.remove()
	}
	// console.log(inputFieldCounter["CPT Code"])
	if (inputFieldCounter["Other Expense"]>=9) {
		var topBarDisplay = document.getElementById("rightOfCreateNewBill")
		var errorMsgDispaly = document.createElement("div"); 
		errorMsgDispaly.setAttribute("style", "color:red; background-color:#ffe6e6;");
		errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
		errorMsgDispaly.innerHTML = "Can not add more than 10 Other Expense codes to single bill."
		topBarDisplay.appendChild(errorMsgDispaly)
		return
	}
	var tableElement = document.getElementById(tableName);


	createRowConfig =[{"value":"Other Expense","type":"text", "billInputField":true, "colspan":2, "id":"otherExpense_code"},{"value":"Other Expense Price","type":"text", "billInputField":true, "id":"otherExpense_price"}]
	tableElement.appendChild(createNewBillTableRow(createRowConfig))


	// if (CPTCodesTopN == null) {
	// 	var sendData  = {
	// 		POSTTYPE : "getTopCPT",
	// 		// POSTTYPE : "getAllCPT",
	// 		COUNT : 25	
	// 	}
	// 	sendAjax(sendData)
	// 		.then((responseData) =>{
				// console.log(responseData)
	// 			CPTCodesTopN = JSON.parse(responseData)
				// console.log(CPTCodesALL)
				// console.log("===")
	// 			for (var i = 0; i < CPTCodesTopN.length; i++) {
					// console.log(CPTCodesTopN[i])
	// 			}
				// console.log("===")
	// 			createRowConfig ={"value":"CPT Code","type":"option", "list":"CPTCodesTopN", "billInputField":true};
	// 			tableElement.appendChild(createNewBillTableRow([createRowConfig]))
	// 		})

	// }
	// else{
		// console.log("else statement")
	// 	createRowConfig ={"value":"CPT Code","type":"option", "list":"CPTCodesTopN", "billInputField":true};
	// 	tableElement.appendChild(createNewBillTableRow([createRowConfig]))
	// }



	// var createRowConfig ={"value":"ICD10 Code","type":"option", "list":"CPTCodesTopN", "billInputField":true};

	// if (CPTCodesTopN == null){
	// 	queryDBandCallObjectCreation(tableName, sendData, createRowConfig)
	// }
	// else{
	// 	tableElement.appendChild(createNewBillTableRow([createRowConfig]))
	// }

}


function autoPopulateBillFields(tableName) {
	// console.log(tableName)
	// console.log(billInputFields)
	// var topBarDisplay = document.getElementById("rightOfCreateNewBill")
	var existingErrorMessage = document.getElementById("createBillErrorMsg");

	if (existingErrorMessage != null){
		existingErrorMessage.remove()
	}



	// check patient id first, then Fname+Lname+address


	// console.log(billInputFields["Patient ID"].value)
	// console.log(billInputFields["Patient ID"].value.length)

	patientID = billInputFields["patient_id"]
	patientFName = billInputFields["patient_first_name"]
	patientLName = billInputFields["patient_last_name"]
	patientSSN = billInputFields["patient_ssn"]

	if (patientID.value.length > 0) {patientID.setAttribute("style", "background-color:white;");}
	if (patientFName.value.length > 0) {patientFName.setAttribute("style", "background-color:white;");}
	if (patientLName.value.length > 0) {patientLName.setAttribute("style", "background-color:white;");}
	if (patientSSN.value.length > 0) {patientSSN.setAttribute("style", "background-color:white;");}


	// var patientNameSSN = billInputFields["Patient First Name"].value+billInputFields["Patient Last Name"].value+billInputFields["Patient SSN"].value

	// console.log(patientID.value)
	// console.log(patientFName.value)
	// console.log(patientLName.value)
	// console.log(patientSSN.value)

	// if (billInputFields["Patient ID"].value.length == 0 && billInputFields["Patient ID"].value.length == 0) {


	if (patientID.value.length > 0) {
		// console.log("patient id is poulated, checking if stored in db")
		fieldsUsedForAutoPopulation['patient_id']=true
		fieldsUsedForAutoPopulation['patient_first_name']=false
		fieldsUsedForAutoPopulation['patient_last_name']=false
		fieldsUsedForAutoPopulation['patient_ssn']=false
		autofillBilFromPatientID(patientID.value)
	}
	else if (patientFName.value.length > 0 && patientLName.value.length > 0 && patientSSN.value.length > 0) {
		// console.log("fname lname ssn allee populated ")
		fieldsUsedForAutoPopulation['patient_first_name']=true
		fieldsUsedForAutoPopulation['patient_last_name']=true
		fieldsUsedForAutoPopulation['patient_ssn']=true
		fieldsUsedForAutoPopulation['patient_id']=false
	}
	else{
		fieldsUsedForAutoPopulation['patient_first_name']=false
		fieldsUsedForAutoPopulation['patient_last_name']=false
		fieldsUsedForAutoPopulation['patient_ssn']=false
		fieldsUsedForAutoPopulation['patient_id']=false
		
		// console.log("ERROR IN FIELDS")
		var topBarDisplay = document.getElementById("rightOfCreateNewBill")
		var errorMsgDispaly = document.createElement("div"); 
		errorMsgDispaly.setAttribute("style", "color:red; background-color:#ffe6e6;");
		errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
		errorMsgDispaly.innerHTML = "Unable to automatically populate fields unless 'Patient ID' or ('Patient First Name' and 'Patient Last Name' and 'Patient SSN') are populated"
		topBarDisplay.appendChild(errorMsgDispaly)

		if (patientID.value.length == 0) {patientID.setAttribute("style", "background-color:#ffe6e6;");}
		if (patientFName.value.length == 0) {patientFName.setAttribute("style", "background-color:#ffe6e6;");}
		if (patientLName.value.length == 0) {patientLName.setAttribute("style", "background-color:#ffe6e6;");}
		if (patientSSN.value.length == 0) {patientSSN.setAttribute("style", "background-color:#ffe6e6;");}

	}



}




function autofillBilFromPatientID(patientID) {
	// console.log(patientID)
	clearInuptFields("newAutoFill")

	sendData  = {
			POSTTYPE : "getPatientInfoFromPatientID",
			ARGS: patientID
		}
		$.ajax({
			type: 'POST',
			url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
			data: sendData,
			success: function(data) {

				// console.log(data)
				autoFillDataJSON = JSON.parse(data)

				if ("error" in autoFillDataJSON) {
					// console.log("SOME ERRORR")
					var topBarDisplay = document.getElementById("rightOfCreateNewBill")
					
					var errorMsgDispaly = document.createElement("div"); 
					errorMsgDispaly.setAttribute("style", "color:red; background-color:#ffe6e6;");
					errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
					errorMsgDispaly.innerHTML = autoFillDataJSON["error"]
					topBarDisplay.appendChild(errorMsgDispaly)

					return


				}

				// console.log(autoFillDataJSON)

				patientIDData = autoFillDataJSON['patientIDInfo']["ReturnData"]
				patientInsuranceData = autoFillDataJSON['patientInsuranceInfo']["ReturnData"]

				
				// for (var i = 0; i < autoFillDataJSON['patientIDInfo']["ReturnData"].length; i++) {
				// 	cnosole.log(autoFillDataJSON[i])
				// }

				for (const [key, value] of Object.entries(patientIDData)) {
 					// console.log(`${key}: ${value}`);
 					// console.log(document.getElementById(key))
 					autoFieldInput = document.getElementById(key)
 					if (autoFieldInput != null) {
 						autoFieldInput.value = value
 					}

				}
				// console.log("---------------")
				for (const [key, value] of Object.entries(patientInsuranceData)) {
 					// console.log(`${key}: ${value}`);
 					// console.log(document.getElementById(key))
 					// document.getElementById(key).value = value
					autoFieldInput = document.getElementById(key)
 					if (autoFieldInput != null) {
 						autoFieldInput.value = value
 					}
				}


		var errorMsgDispaly = document.createElement("div"); 
		errorMsgDispaly.setAttribute("style", "color:red; background-color:#ffe6e6;");
		errorMsgDispaly.setAttribute("id", "createBillErrorMsg");
		errorMsgDispaly.innerHTML = "Unable to automatically populate fields unless 'Patient ID' or ('Patient First Name' and 'Patient Last Name' and 'Patient SSN') are populated"


			},
		});

}


function clearInuptFields(clearType) {
	var existingErrorMessage = document.getElementById("createBillErrorMsg");


	// console.log("CHEAR INPUIT FIELDS FUINCTUION")

	// "newAutoFill"

	if (existingErrorMessage != null){
		existingErrorMessage.remove()
	}



	for (const [key, value] of Object.entries(billInputFields)) {
		// console.log(value)
		// console.log(value.id)
		// console.log(fieldsUsedForAutoPopulation[value.id])
		if (value.id in fieldsUsedForAutoPopulation && fieldsUsedForAutoPopulation[value.id] == true && clearType == "newAutoFill") {
			// console.log("DONT CLEATR THIS FILELD")
			// console.log(fieldsUsedForAutoPopulation[value.id])
		}
		else{
			value.style=null
			value.value=null

		}
	}
}






function inspectSingleBill(billID) {
	sendData  = {
			POSTTYPE : "getBillInfo",
			ARGS: billID
		}

		$.ajax({
			type: 'POST',
			url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
			data: sendData,
			success: function(data) {

				// console.log(data)
				dataRows = JSON.parse(data)
				// console.log(dataRows[0])
				createBillInspectionTables(dataRows[0])

			},
		});
 } 



function createBillInspectionTables(billData) {
	console.log(billData)

	var elementsToCreate=[
		[{"value":"Bill Summary","type":"display", "id":"bill_summary_header", "displayValue":"patient_first_name", "colspan":3, "novalue":1}],
		[{"value":"Bill Identifier","type":"display", "id":"inspect_bill_id", "displayValue":"bill_id"},{"value":"Bill Total","type":"display", "id":"inspect_total", "displayValue":"total_price"},{"value":"Bill Status","type":"display", "id":"inspect_bill_status", "displayValue":"bill_state"}],
		[{"value":"Bill Open Date","type":"display", "id":"inspect_billed_date", "displayValue":"submission_datetime"},{"value":"Bill Close Date","type":"display", "id":"inspect_billed_date_close", "displayValue":"bill_close_date"},{"value":"Bill Status","type":"changeState", "id":"inspect_bill_status", "displayValue":"bill_state"}],
		

		[{"value":"Patient Information","type":"display", "id":"patient_information_header", "displayValue":"patient_first_name", "colspan":3, "novalue":1}],
		[{"value":"Patient First Name","type":"display", "id":"inspect_patient_first_name", "displayValue":"patient_first_name"},{"value":"Patient Middle Name","type":"display", "id":"inspect_patient_middle_name", "displayValue":"patient_middle_name"},{"value":"Patient Last Name","type":"display", "id":"inspect_patient_last_name", "displayValue":"patient_last_name"}],
		[{"value":"Phone Number","type":"display", "id":"inspect_patient_contact_number", "displayValue":"patient_contact_number"},{"value":"Email","type":"display", "id":"inspect_patient_emailid", "displayValue":"patient_emailid"},{"value":"Patient Sex","type":"display", "id":"inspect_patient_sex", "displayValue":"patient_sex"}],
		[{"value":"Patient ID","type":"display", "id":"inspect_patient_id", "displayValue":"patient_id"},{"value":"Patient SSN","type":"display", "id":"inspect_patient_ssn", "displayValue":"patient_ssn"},{"value":"Patient DOB","type":"display", "id":"inspect_patient_dob", "displayValue":"patient_dob"}],
		[{"value":"Patient Address Information","type":"display", "id":"patient_address_information_header", "displayValue":"patient_first_name", "colspan":3, "novalue":1}],
		[{"value":"Address Line 1","type":"display", "id":"inspect_patient_address_line_1", "displayValue":"patient_address_line_1"},{"value":"City","type":"display", "id":"inspect_patient_address_city", "displayValue":"patient_address_city"},{"value":"State","type":"display", "id":"inspect_patient_address_state", "displayValue":"patient_address_state"}],
		[{"value":"Address Line 2","type":"display", "id":"inspect_patient_address_line_2", "displayValue":"patient_address_line_2"},{"value":"Zipcode","type":"display", "id":"inspect_patient_zip_code", "displayValue":"patient_zip_code"},],
		[{"value":"Patient Insurance Information","type":"display", "id":"patient_insurance_information_header", "displayValue":"patient_first_name", "colspan":3, "novalue":1}],
		[{"value":"Patient Insurance ID","type":"display", "id":"inspect_patient_insurance_id", "displayValue":"patient_insurance_id"},{"value":"Patient Insurance Company","type":"display", "id":"inspect_insurance_company_name", "displayValue":"insurance_company_name"},{"value":"Patient Insurance Group Number","type":"display", "id":"inspect_insurance_group_number", "displayValue":"insurance_group_number"}],
		[{"value":"Patient Plan Name","type":"display", "id":"inspect_insurance_plan_name", "displayValue":"insurance_plan_name"},{"value":"Patient Insurance Contact Number","type":"display", "id":"inspect_insurance_contact_number", "displayValue":"insurance_contact_number"},{"value":"Patient Insurance Pharmacy Network","type":"display", "id":"inspect_insurance_pharmacy_network", "displayValue":"insurance_pharmacy_network"}],
		[{"value":"Bill Items","type":"display", "id":"bill_items_header", "displayValue":"patient_first_name", "colspan":3, "novalue":1}],
		[{"value":"Notes","type":"display", "colspan":3, "id":"inspect_billing_notes", "displayValue":"billing_notes"}]]


	codesAndPricesList = [
		[
			["icd10_input0","icd10_price0"],
			["icd10_input1","icd10_price1"],
			["icd10_input2","icd10_price2"],
			["icd10_input3","icd10_price3"],
			["icd10_input4","icd10_price4"],
			["icd10_input5","icd10_price5"],
			["icd10_input6","icd10_price6"],
			["icd10_input7","icd10_price7"],
			["icd10_input8","icd10_price8"],
			["icd10_input9","icd10_price9"]
		],
		[
			["cpt_input0","cpt_price0"],
			["cpt_input1","cpt_price1"],
			["cpt_input2","cpt_price2"],
			["cpt_input3","cpt_price3"],
			["cpt_input4","cpt_price4"],
			["cpt_input5","cpt_price5"],
			["cpt_input6","cpt_price6"],
			["cpt_input7","cpt_price7"],
			["cpt_input8","cpt_price8"],
			["cpt_input9","cpt_price9"]
		],
		[
			["otherExpense_code0","otherExpense_price0"],
			["otherExpense_code1","otherExpense_price1"],
			["otherExpense_code2","otherExpense_price2"],
			["otherExpense_code3","otherExpense_price3"],
			["otherExpense_code4","otherExpense_price4"],
			["otherExpense_code5","otherExpense_price5"],
			["otherExpense_code6","otherExpense_price6"],
			["otherExpense_code7","otherExpense_price7"],
			["otherExpense_code8","otherExpense_price8"],
			["otherExpense_code9","otherExpense_price9"]
			]
		]


	itemsHeadersRows=[[{"value":"ICD10 Items","type":"display", "id":"icd10_items_header", "displayValue":"patient_first_name", "colspan":3, "novalue":1}],
		[{"value":"CPT Items","type":"display", "id":"cpt_items_header", "displayValue":"patient_first_name", "colspan":3, "novalue":1}],
		[{"value":"Other Items","type":"display", "id":"other_items_header", "displayValue":"patient_first_name", "colspan":3, "novalue":1}]]


	for (var i = 0; i < codesAndPricesList.length; i++) {
		// console.log(billData[codesAndPricesList[i]])
		elementsToCreate.push(itemsHeadersRows[i])
		console.log(codesAndPricesList[i])


		for (var j = 0; j < codesAndPricesList[i].length; j++) {
			console.log(billData[codesAndPricesList[i][j][0]])
			if (billData[codesAndPricesList[i][j][0]] != null || billData[codesAndPricesList[i][j][1]] != null) {
				console.log(codesAndPricesList[i][j])
				codeandpricerow=[{"value":billData[codesAndPricesList[i][j][0]],"type":"display", "single":true, "displayValue":billData[codesAndPricesList[i][j][1]], "colspan":3}]
				elementsToCreate.push(codeandpricerow)
				// for (var k = 0; k < codesAndPricesList[i][j].length; k++) {
				// 	console.log(codesAndPricesList[i][j][k])
				// 	console.log(billData[codesAndPricesList[i][j][k]])
				// }
				console.log(codeandpricerow)
			}
		}
	}

// {"value":billData[codesAndPricesList[i][j][0]],"type":"display", "id":0, "displayValue":0},
// {"value":billData[codesAndPricesList[i][j][1]],"type":"display", "id":0, "displayValue":0}



	// console.log(tableElement)
	// tableElement = document.createElement("div");
	tableElement = document.getElementById("billInspectionTable")
	$('#billInspectionTable').empty();

	tableMain = document.createElement("table"); 
	// tableMain.setAttribute("class", "table table-striped"); 
	tableMain.setAttribute("class", "table table-bordered"); 
	tableMain.setAttribute("id", "newBillTable");

	// console.log(elementsToCreate.length)
	var tableRows=[]

	for (var i = 0; i < elementsToCreate.length; i++) {
		tableMain.appendChild(createNewBillTableRow(elementsToCreate[i], billData))
	}

	// console.log(tableRows)
	tableElement.appendChild(tableMain);  




	setViewToBillInspection()
}




function reinstateTable() {
		
	tableParent = document.getElementById("displayBillsTableParent")
	$('#displayBillsTableParent').empty();
	tableParent.innerHTML= `<table id="displayBillsTable" class="tablesorter tablesorter-dropbox">
						<thead >
							<tr>
								<th colspan="7" class="ts-pager">
									<div class="form-inline">
										<div class="btn-group btn-group-sm mx-1" role="group">
											<button type="button" class="btn btn-secondary first" title="first">⇤</button>
											<button type="button" class="btn btn-secondary prev" title="previous">←</button>
										</div>
										<span class="pagedisplay"></span>
										<div class="btn-group btn-group-sm mx-1" role="group">
											<button type="button" class="btn btn-secondary next" title="next">→</button>
											<button type="button" class="btn btn-secondary last" title="last">⇥</button>
										</div>
										<select class="form-control-sm custom-select px-4 pagesize" title="Select page size">
											<option selected="selected" value="20">20</option>
											<option value="100">100</option>
											<!-- <option value="20">20</option> -->
											<!-- <option value="30">30</option> -->
											<!-- <option value="all">All Rows</option> -->
										</select>
										<select class="form-control-sm custom-select px-4 mx-1 pagenum" title="Select page number"></select>
									</div>
								</th>
							</tr>
							<tr>
								<th>BILL ID</th>
								<th>Patient ID</th>
								<th>Patient First Name</th>
								<th>Patient Last Name</th>
								<th>Insurance ID</th>
								<th>Bill Datetime</th>
								<th>Total Price</th>
							</tr>
						</thead>
						<tfoot>
							
						</tfoot>



						<tbody id="displayBillsTableBody">
							
						</tbody>
					</table>`
}









function changeBillState(newState, billID){
	console.log("CHANGING BVUIKLL STATE TO "+newState + billID)

		sendData  = {
			POSTTYPE : "changeBillState",
			ARGS: {"bill_id":billID, "new_state":newState}
		}

		$.ajax({
			type: 'POST',
			url: "https://web.njit.edu/~mjk29/cs673/billingRequest.php",
			data: sendData,
			success: function(data) {

				console.log(data)
				dataRows = JSON.parse(data)
				console.log(dataRows[0])
				// createBillInspectionTables(dataRows[0])
				inspectSingleBill(billID)

			},
		});

}


