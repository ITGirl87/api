const url = 'hiring.json';
//const url = 'https://fetch-hiring.s3.amazonaws.com/hiring.json'; //If using an external API

fetch(url, {
	mode: "cors",
	credentials: 'include',
	headers: {
      'Content-Type': 'application/json',
    },
	})
    .then ( (response) => response.json() )
    .then((arr) => {
    	let grouped = arr.reduce((acc,value) => {
			if (!acc[value.listId]) {
				acc[value.listId] = [];
			}
			acc[value.listId].push(value);
			return acc;
		},{}); 

		let groups = Object.values(grouped);

		let group = groups.map(group => group.filter(item => item.name).sort((a,b) => a.listId - b.listId || parseInt(a.name.match(/\d+/)) - parseInt(b.name.match(/\d+/)) ))

		console.log(group);

		let html = "";
		    
			for (let i = 0; i < group.length; i++) {
				html+="<table  class='table'>";
			  	html+="<tr class='tableHeader'>";
			    html+="<th>"+ "Id" +"</th>";
			    html+="<th>"+ "ListId" +"</th>";
			    html+="<th>"+ "Name" +"</th>";
			    html+="</tr>";
			  	for (let j=0; j < group[i].length; j++) {
				    html+="<tr class='tableRow'>";
				    html+="<td>"+ group[i][j].id +"</td>";
				    html+="<td>"+ group[i][j].listId +"</td>";
				    html+="<td>"+ group[i][j].name +"</td>";
				    html+="</tr>";
			    }
			    html+="</table>";
		  }

		document.getElementById("table").innerHTML = html;
    });