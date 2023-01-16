Chart.defaults.global.defaultFontFamily = 'Roboto';
Chart.defaults.global.defaultFontColor = '#333';

function makeChart(price) {
	var date = price.map(function(d) {return d.DATE});
	var original = price.map(function(d) {return +d.ORIGINAL});
	var promo = price.map(function(d) {return +d.PROMO});
	var very_original = price.map(function(d) {return +d.VERY_ORIGINAL});
	var ann = ["2022-12-27"];
	var ann_labels = ["Date d'achat"];
	
	var annotations_array = ann.map(function(value, index) {
		return {
			type: 'line',
			id: 'vline' + index,
			mode: 'vertical',
			scaleID: 'x-axis-0',
			value: value,
			borderColor: '#FC5C5C',
			borderWidth: 2,
			borderDash: [10, 5],
			label: {
				enabled: true,
				position: "center",
				content: ann_labels[index]
			}
		}
	});
	console.log(annotations_array)
	
	var chart = new Chart('chart', {
		type: 'line',
		options: {
			maintainAspectRatio: false,
			annotation: {
				drawTime: 'afterDatasetsDraw',
				annotations: annotations_array,
			},
			legend: {
				display: true
			},
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						unit: 'day',
						unitStepSize: 1,
						displayFormats: {
							'day': 'DD/MM'
						}
					},
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Date'
					},
					ticks: {
						major: {
							fontStyle: 'bold',
							fontColor: '#FF0000'
						}
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Prix (€)'
					}}]
			}
		},
		data: {
			labels: date,
			datasets: [
				{
					data: original,
					label: 'Prix original',
					fill: false,
					backgroundColor: "blue",
					borderColor: "blue"
				},
				{
					data: promo,
					label: 'Prix promotionnel',
					fill: false,
					backgroundColor: "red",
					borderColor: "red"
				},
				{
					data: very_original,
					label: 'Prix initial dans le texte',
					fill: false,
					backgroundColor: "green",
					borderColor: "green"
				}
			]
		}
	})
}

// Request data using D3
d3.csv('./DATA/PRIX_HBW.csv').then(makeChart);
