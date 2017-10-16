// Gobal
const createNode       = node           => document.createElement(node),
	  createTextNode   = textNode       => document.createTextNode(textNode),
	  fetchDataToForm  = (url, tableId) => {
			return fetch(url)
				.then(
					response => response.json(),
					error => console.log('Request failed', error)
				).then(
					response => createTable(response, tableId),
					error => console.log('failed', error)
				)
	  },
	  tableHeader    = (data)          => {
				return data
					.map(currentValue => Object.keys(currentValue)) // Getting the object key in an array
					.reduce((accumulator, currentValue) => accumulator.concat(currentValue)) // Making all in a single array
					.filter((element, index, array) => index === array.indexOf(element)); // Removing the duplicated the values
	  };


// Creation of TD and TH	 
const createTableDefinitions = (tdValue, nodeName) =>  {
	let tdNode = createNode(nodeName)
	
	tdNode.appendChild(createTextNode(tdValue));

	return tdNode;
};

// Creation TBody
const createTableBody = dataObject => {

	let tBody = createNode('tBody'),
		tRows = (rows) => rows.map(row => {
			let trNode = createNode('TR');
			
			for (let tdValue in row) {
				trNode.appendChild(createTableDefinitions(row[tdValue], 'TD'));
			}

			tBody.appendChild(trNode);
			
			return tBody;
		});

	tRows(dataObject);
	
	return tBody;
};

// creation of THead
const createTableHead = dataObject => {

	let tHead           = createNode('tHead'),
		tableHeadArray = tableHeader(dataObject);
	
	tableHeadArray.map(tableHead => {
		let thNode = createNode('TH');
		
		thNode.appendChild(createTableDefinitions(tableHead, 'b'));
		tHead.appendChild(thNode);	
	});
	return tHead;
	
};

// creation of TBody
const createTable = (dataObject, tableId) => {

	let tableHead  = createTableHead(dataObject),
		tableBody  = createTableBody(dataObject),
		table      = document.getElementById(tableId);

	table.appendChild(tableBody);
	table.appendChild(tableHead);
};