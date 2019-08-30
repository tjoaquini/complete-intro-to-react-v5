import React from 'react';
import pet from '@frontendmasters/pet';

class Details extends React.Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		loading: true,
	// 	};
	// }
	state = { loading: true };

	componentDidMount() {
		const { id: animalId } = this.props;
		pet.animal(animalId).then(({ animal }) => {
			this.setState({
				name: animal.name,
				animal: animal.type,
				location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
				description: animal.description,
				media: animal.photos,
				breed: animal.breeds.primary,
				loading: false,
			});
		}, console.error);
	}

	render() {
		const { name, animal, location, description, media, breed, loading } = this.state;
		if (loading) {
			return <h1>loading ...</h1>;
		}
		return (
			<div className="details">
				<div>
					<h1>{name}</h1>
					<h2>{`${animal} - ${breed} - ${location}`}</h2>
					<button>Adopt {name}</button>
					<p>{description}</p>
				</div>
			</div>
		);
	}
}

export default Details;
