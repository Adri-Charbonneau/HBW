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
			annotation: {
				drawTime: 'afterDatasetsDraw',
				annotations: [{
					id: 'prix',
					type: 'line',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: 1675,
					borderColor: '#FC5C5C',
					borderWidth: 2,
					borderDash: [10, 5],
					label: {
						content: "Prix d'achat",
						enabled: true
					}
					}, {
					id: 'date',
					type: 'line',
					mode: 'vertical',
					scaleID: 'x-axis-0',
					value: "2022-12-27",
					borderColor: '#FC5C5C',
					borderWidth: 2,
					borderDash: [10, 5],
					label: {
						content: "Date d'achat",
						enabled: true
					}
				}]
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
							'day': 'DD/MM/YY'
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

function makeStats(price) {
	var date = price.map(function(d) {return d.DATE});
	var original = price.map(function(d) {return +d.ORIGINAL});
	var promo = price.map(function(d) {return +d.PROMO});
	var very_original = price.map(function(d) {return +d.VERY_ORIGINAL});
	
	// calcul
	maxoriginit = d3.max(original);
	moyoriginit = d3.mean(original);
	minoriginit = d3.min(original);
	livoriginit = (moyoriginit/17);
	
	maxpromoinit = d3.max(promo);
	moypromoinit = d3.mean(promo);
	minpromoinit = d3.min(promo);
	livpromoinit = (moypromoinit/17);
	
	maxtxtinit = d3.max(very_original);
	moytxtinit = d3.mean(very_original);
	mintxtinit = d3.min(very_original);
	livtxtinit = (moytxtinit/17);
	
	// arrondi à 2 chiffres
	maxorig = d3.format(".2f")(maxoriginit);
	moyorig = d3.format(".2f")(moyoriginit);
	minorig = d3.format(".2f")(minoriginit);
	livorig = d3.format(".2f")(livoriginit);
	
	maxpromo = d3.format(".2f")(maxpromoinit);
	moypromo = d3.format(".2f")(moypromoinit);
	minpromo = d3.format(".2f")(minpromoinit);
	livpromo = d3.format(".2f")(livpromoinit);
	
	maxtxt = d3.format(".2f")(maxtxtinit);
	moytxt = d3.format(".2f")(moytxtinit);
	mintxt = d3.format(".2f")(mintxtinit);
	livtxt = d3.format(".2f")(livtxtinit);
	
	// envoi des valeurs
	var home_maxorig = document.getElementById('maxorig'); home_maxorig.textContent = maxorig;
	var home_moyorig = document.getElementById('moyorig'); home_moyorig.textContent = moyorig;
	var home_minorig = document.getElementById('minorig'); home_minorig.textContent = minorig;
	var home_livorig = document.getElementById('livorig'); home_livorig.textContent = livorig;

	var home_maxpromo = document.getElementById('maxpromo'); home_maxpromo.textContent = maxpromo;
	var home_moypromo = document.getElementById('moypromo'); home_moypromo.textContent = moypromo;
	var home_minpromo = document.getElementById('minpromo'); home_minpromo.textContent = minpromo;
	var home_livpromo = document.getElementById('livpromo'); home_livpromo.textContent = livpromo;
	
	var home_maxtxt = document.getElementById('maxtxt'); home_maxtxt.textContent = maxtxt;
	var home_moytxt = document.getElementById('moytxt'); home_moytxt.textContent = moytxt;
	var home_mintxt = document.getElementById('mintxt'); home_mintxt.textContent = mintxt;
	var home_livtxt = document.getElementById('livtxt'); home_livtxt.textContent = livtxt;
}

d3.csv('./DATA/PRIX_HBW.csv').then(makeStats);