import React from 'react';
import pet from '@frontendmasters/pet';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import Modal from './Modal';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';

class Details extends React.Component {
	state = { loading: true, showModal: false };

	componentDidMount() {
		const { id: animalId } = this.props;
		pet.animal(animalId).then(({ animal }) => {
			this.setState({
				url: animal.url,
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

	toggleModal = () => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal });
	};

	adopt = () => {
		const { url } = this.state;
		navigate(url);
	};

	render() {
		const { name, animal, location, description, media, breed, loading, showModal } = this.state;
		if (loading) {
			return <h1>loading ...</h1>;
		}
		return (
			<div className="details">
				<Carousel media={media} />
				<div>
					<h1>{name}</h1>
					<h2>{`${animal} - ${breed} - ${location}`}</h2>
					<button
						type="button"
						style={{ backgroundColor: this.props.theme }}
						onClick={this.toggleModal}
					>
						Adopt {name}
					</button>
					<p>{description}</p>
					{showModal ? (
						<Modal>
							<div>
								<h1>Would you like to adopt {name}?</h1>
								<div className="buttons">
									<button type="button" onClick={this.adopt}>
										Yes
									</button>
									<button type="button" onClick={this.toggleModal}>
										No, I am a monster
									</button>
								</div>
							</div>
						</Modal>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ theme }) => ({ theme });

const WrappedDetails = connect(mapStateToProps)(Details);

export default function DetailsWithErrorBoundary(props) {
	const { id } = props;
	return (
		<ErrorBoundary>
			<WrappedDetails id={id} />
		</ErrorBoundary>
	);
}
