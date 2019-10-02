import React, { Component, ErrorInfo } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends Component {
	public state = { hasError: false, redirect: false };

	public static getDerivedStateFromError() {
		return { hasError: true };
	}

	public componentDidUpdate() {
		const { hasError } = this.state;
		if (hasError) {
			setTimeout(() => this.setState({ redirect: true }), 5000);
		}
	}

	public componentDidCatch(error: Error, info: ErrorInfo) {
		console.error('ErrorBOundary caught an error', error, info);
	}

	public render() {
		const { hasError, redirect } = this.state;
		if (redirect) {
			return <Redirect to="/" />;
		}
		if (hasError) {
			return (
				<h1>
					There was an error with this listing. <Link to="/">Click here</Link> to go back to the
					home page or wait five seconds.
				</h1>
			);
		}

		const { children: childrenElements } = this.props;
		return childrenElements;
	}
}

export default ErrorBoundary;
