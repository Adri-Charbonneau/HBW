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
	// French locale
var locale_fr = d3.formatLocale ({
  "decimal": ",",
  "thousands": " ",
  "currency": ["", " €"]
})
	
	// Request data using D3
d3.csv('./DATA/PRIX_HBW.csv').then(makeChart);

function makeStats(price) {
	var date = price.map(function(d) {return d.DATE});
	var original = price.map(function(d) {return +d.ORIGINAL});
	var promo = price.map(function(d) {return +d.PROMO});
	var very_original = price.map(function(d) {return +d.VERY_ORIGINAL});
	
	// calcul
	maxoriginit = d3.max(original);
	maxpromoinit = d3.max(promo);
	maxtxtinit = d3.max(very_original);
	maxlivorig1 = (maxoriginit/17);
	maxlivpromo1 = (maxpromoinit/17);
	maxlivtxt1 = (maxtxtinit/17);
	
	
	moyoriginit = d3.mean(original);
	moypromoinit = d3.mean(promo);
	moytxtinit = d3.mean(very_original);
	moylivorig1 = (moyoriginit/17);
	moylivpromo1 = (moypromoinit/17);
	moylivtxt1 = (moytxtinit/17);
	
	minoriginit = d3.min(original);
	minpromoinit = d3.min(promo);
	mintxtinit = d3.min(very_original);
	minlivorig1 = (minoriginit/17);
	minlivpromo1 = (minpromoinit/17);
	minlivtxt1 = (mintxtinit/17);
	
	livoriginit = (moyoriginit/17);
	livpromoinit = (moypromoinit/17);
	livtxtinit = (moytxtinit/17);
	
	// arrondi à 2 chiffres
	maxorig = locale_fr.format("$,.2f")(maxoriginit);
	maxpromo = locale_fr.format("$,.2f")(maxpromoinit);
	maxtxt = locale_fr.format("$,.2f")(maxtxtinit);
	maxlivorig = locale_fr.format("$,.2f")(maxlivorig1);
	maxlivpromo = locale_fr.format("$,.2f")(maxlivpromo1);
	maxlivtxt = locale_fr.format("$,.2f")(maxlivtxt1);
	
	moyorig = locale_fr.format("$,.2f")(moyoriginit);
	moypromo = locale_fr.format("$,.2f")(moypromoinit);
	moytxt = locale_fr.format("$,.2f")(moytxtinit);
	moylivorig = locale_fr.format("$,.2f")(moylivorig1);
	moylivpromo = locale_fr.format("$,.2f")(moylivpromo1);
	moylivtxt = locale_fr.format("$,.2f")(moylivtxt1);
	
	minorig = locale_fr.format("$,.2f")(minoriginit);
	minpromo = locale_fr.format("$,.2f")(minpromoinit);
	mintxt = locale_fr.format("$,.2f")(mintxtinit);
	minlivorig = locale_fr.format("$,.2f")(minlivorig1);
	minlivpromo = locale_fr.format("$,.2f")(minlivpromo1);
	minlivtxt = locale_fr.format("$,.2f")(minlivtxt1);
	
	livorig = locale_fr.format("$,.2f")(livoriginit);
	livpromo = locale_fr.format("$,.2f")(livpromoinit);
	livtxt = locale_fr.format("$,.2f")(livtxtinit);
	
	// envoi des valeurs
	var home_maxorig = document.getElementById('maxorig'); home_maxorig.textContent = maxorig;
	var home_maxpromo = document.getElementById('maxpromo'); home_maxpromo.textContent = maxpromo;
	var home_maxtxt = document.getElementById('maxtxt'); home_maxtxt.textContent = maxtxt;
	var home_maxlivorig = document.getElementById('maxlivorig'); home_maxlivorig.textContent = maxlivorig;
	var home_maxlivpromo = document.getElementById('maxlivpromo'); home_maxlivpromo.textContent = maxlivpromo;
	var home_maxlivtxt = document.getElementById('maxlivtxt'); home_maxlivtxt.textContent = maxlivtxt;
	
	var home_moyorig = document.getElementById('moyorig'); home_moyorig.textContent = moyorig;
	var home_moypromo = document.getElementById('moypromo'); home_moypromo.textContent = moypromo;
	var home_moytxt = document.getElementById('moytxt'); home_moytxt.textContent = moytxt;
	var home_moylivorig = document.getElementById('moylivorig'); home_moylivorig.textContent = moylivorig;
	var home_moylivpromo = document.getElementById('moylivpromo'); home_moylivpromo.textContent = moylivpromo;
	var home_moylivtxt = document.getElementById('moylivtxt'); home_moylivtxt.textContent = moylivtxt;
	
	var home_minorig = document.getElementById('minorig'); home_minorig.textContent = minorig;
	var home_minpromo = document.getElementById('minpromo'); home_minpromo.textContent = minpromo;
	var home_mintxt = document.getElementById('mintxt'); home_mintxt.textContent = mintxt;
	var home_minlivorig = document.getElementById('minlivorig'); home_minlivorig.textContent = minlivorig;
	var home_minlivpromo = document.getElementById('minlivpromo'); home_minlivpromo.textContent = minlivpromo;
	var home_minlivtxt = document.getElementById('minlivtxt'); home_minlivtxt.textContent = minlivtxt;
	
	var home_livorig = document.getElementById('livorig'); home_livorig.textContent = livorig;
	var home_livpromo = document.getElementById('livpromo'); home_livpromo.textContent = livpromo;
	var home_livtxt = document.getElementById('livtxt'); home_livtxt.textContent = livtxt;
}

d3.csv('./DATA/PRIX_HBW.csv').then(makeStats);