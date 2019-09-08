import React from 'react';
import { Link } from '@reach/router';
import { css, keyframes } from '@emotion/core';
import colors from './colors';

const NavBar = () => {
	const Spin = keyframes`
    to {
      transform: rotate(360deg);
    }
  `;

	return (
		<header
			css={css`
				background-color: ${colors.dark};
				position: sticky;
				top: 0;
				z-index: 10;

				&:hover {
					text-decoration: underline;
				}
			`}
		>
			<Link to="/">Adopt Me!</Link>
			<span
				css={css`
					color: #fff;
					font-size: 60px;
					display: inline-block;
					animation: 1s ${Spin} linear infinite;
				`}
				role="img"
				aria-label="logo"
			>
				🐩
			</span>
		</header>
	);
};

export default NavBar;
