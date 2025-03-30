import React from 'react';

export default class App extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			cities: [
				{
					title: 'Joinville',
					state: 'SC',
					country: 'Brazil',
				},
				{
					title: 'San Francisco',
					state: 'CA',
					country: 'USA',
				},
				{
					title: 'Urubici',
					state: 'SC',
					country: 'Brazil',
				},
			],
		};

	}
	componentDidMount() {



	}
	render() {

		return (
			<div className="app">

				<header className="header">
					<h1 className="head-title">Weather</h1>
					<p className="head-caption">Check the weather in some of the relevant cities for the ProjectMark team.</p>
				</header>

				<section className="list">
					{this.state.cities.map((item, i) => {

						return (
							<article className="item">
								<h2 className="item-title">{item.title}</h2>
								<p className="item-location">{item.state}, {item.country}</p>
							</article>
						);

					})}
				</section>

				<footer className="footer">
					<p>Project developed by Augusto Rey in 2025 for ProjectMark's front-end coding challenge.</p>
				</footer>

			</div>
		);

	}
}