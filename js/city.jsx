const apiKey = 'c238255423dfd404a720564f3cac2160';
import React from 'react';

export default class City extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			loading: true,//Initial loading
		};

	}
	componentDidMount() {
			
		this.fetch();

		//Update every 10 minutes
		this.timer = setInterval(() => {

			this.setState({refreshing: true}, () => this.fetch());

		}, 10 * 60 * 1000);

	}
	componentWillUnmount() {

		//Abort Requests
		if (this.controller) this.controller.abort();

		clearInterval(this.timer);

	}
	fetch() {

		const params = {
			lat: this.props.lat,
			lon: this.props.lon,
			appid: apiKey,
			units: 'metric',
		};

		const qs = new URLSearchParams(params).toString();
		const url = 'https://api.openweathermap.org/data/2.5/weather?' + qs;
		const {signal} = this.controller = new AbortController();

		//Fetch OpenWeatherMap
		fetch(url, {signal})
		.then((res) => res.json())
		.then((data) => {

			const capitalize = (str) => !str ? str : str.charAt(0).toUpperCase() + str.slice(1);

			this.setState({
				loading: false,
				refreshing: false,
				lastUpdate: new Date(),
				temperature: data.main.temp,
				level: (() => {
					if (data.main.temp <= 5) return 'cold';
					if (data.main.temp > 25) return 'hot';
					return 'mid';
				})(),
				pressure: data.main.pressure,
				humidity: data.main.humidity,
				feelsLike: data.main.feels_like,
				icon: data.weather[0].icon,
				description: capitalize(data.weather[0].description),
			});

		})
		.catch((err) => {

			if (err.name === 'AbortError') return;

			console.error('Error.', err);

		});

	}
	render() {

		return (
			<article className={['item', this.state.loading && 'loading', 'temp-' + this.state.level].filter(Boolean).join(' ')}>

				<h2 className="item-title">{this.props.title}</h2>

				<p className="item-location">{this.props.state}, {this.props.country}</p>

				<div className="item-contents">

					<div className="item-row" title={this.state.description}>

						<p className="item-temperature">
							<span>{parseInt(this.state.temperature) || '00'}</span>
							<sup>°C</sup>
						</p>
						
						<div className="item-icon-wrapper">
							<figure className="item-icon" style={!this.state.icon ? null : {backgroundImage: 'url("https://rodrigokamada.github.io/openweathermap/images/' + this.state.icon + '_t@4x.png")'}} />
						</div>

					</div>

					<p className="item-data">
						<span>Humidity: </span>
						<strong>{this.state.humidity || '00'}%</strong>
					</p>

					<p className="item-data">
						<span>Pressure: </span>
						<strong>{this.state.pressure || '0000'} mb</strong>
					</p>

				</div>

				{this.state.loading && <p className="item-footer">Loading weather information...</p>}

				{!this.state.loading && <p className="item-footer">
					Last updated at {new Intl.DateTimeFormat(undefined, {
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric',
						hour12: true,
					}).format(this.state.lastUpdate)}
				</p>}

			</article>
		);

	}
}