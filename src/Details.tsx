import React from 'react';
import pet, { Photo } from '@frontendmasters/pet';
import { navigate, RouteComponentProps } from '@reach/router';
import Modal from './Modal';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';

class Details extends React.Component<RouteComponentProps<{id: string}>> {
	public state = {
		loading: true,
		showModal: false,
		name: '',
		animal: '',
		location: '',
		description: '',
		media: [] as Photo[],
		url: '',
		breed: ''
	};

	public componentDidMount() {
		if (!this.props.id) {
			navigate('/');
			return;
		}
		const { id: animalId } = this.props;
		pet.animal(+animalId).then(({ animal }) => {
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

	public toggleModal = () => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal });
	};

	public adopt = () => {
		const { url } = this.state;
		navigate(url);
	};

	public render() {
		const {
			name,
			animal,
			location,
			description,
			media,
			breed,
			loading,
			showModal
		} = this.state;
		
		if (loading) {
			return <h1>loading ...</h1>;
		}
		return (
			<div className="details">
				<Carousel media={media} />
				<div>
					<h1>{name}</h1>
					<h2>{`${animal} - ${breed} - ${location}`}</h2>
					<ThemeContext.Consumer>
						{([theme]) => (
							<button type="button" style={{ backgroundColor: theme }} onClick={this.toggleModal}>
								Adopt {name}
							</button>
						)}
					</ThemeContext.Consumer>
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

export default function DetailsWithErrorBoundary(props: RouteComponentProps<{id: string}>) {
	const { id } = props;
	return (
		<ErrorBoundary>
			{/* eslint-disable-next-line */}
			<Details id={id} />
		</ErrorBoundary>
	);
}
