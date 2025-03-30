const apiKey = 'c238255423dfd404a720564f3cac2160';
import React from 'react';
import City from './city';

export default class App extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			cities: [
				{
					id: 'joinville-sc-br',
					title: 'Joinville',
					state: 'SC',
					country: 'Brazil',
					lat: -26.304369811286932,
					lon: -48.8463492359977,
				},
				{
					id: 'san-francisco-ca-usa',
					title: 'San Francisco',
					state: 'CA',
					country: 'USA',
					lat: 37.774926269072324,
					lon: -122.41941499684845,
				},
				{
					id: 'urubici-sc-brazil',
					title: 'Urubici',
					state: 'SC',
					country: 'Brazil',
					lat: -28.014999907250527,
					lon: -49.592952081096755,
				},
			],
		};

		console.log('App.');

	}
	render() {

		return (
			<div className="app">

				<header className="header">
					<h1 className="head-title">Weather@ProjectMark</h1>
					<p className="head-caption">Check the weather conditions for some cities relevant to the ProjectMark team.</p>
				</header>

				<section className="list">
					{this.state.cities.map((item) => <City key={item.id} {...item} />)}
				</section>

				<footer className="footer">
					<p>Project developed by <a href="https://www.linkedin.com/in/augusto-rey/" target="_blank">Augusto Rey</a> in 2025 for <a href="https://www.projectmark.com/" target="_blank">ProjectMark</a>'s front-end coding challenge.</p>
				</footer>

			</div>
		);

	}
}