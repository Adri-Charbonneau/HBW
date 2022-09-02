Chart.defaults.global.defaultFontFamily = 'Roboto';
Chart.defaults.global.defaultFontColor = '#333';

function makeChart(price) {
	var date = price.map(function(d) {return d.DATE});
	var original = price.map(function(d) {return +d.ORIGINAL});
	var promo = price.map(function(d) {return +d.PROMO});
	var very_original = price.map(function(d) {return +d.VERY_ORIGINAL});
	
	var chart = new Chart('chart', {
		type: 'line',
		options: {
			maintainAspectRatio: false,
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