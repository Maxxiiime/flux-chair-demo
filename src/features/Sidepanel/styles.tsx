import { colors } from "@/theme/index";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledBox = styled("div", {
	shouldForwardProp: (prop) => !["$open", "$width"].includes(prop),
}) <{ $open: boolean; $width: number }>`
	z-index: 10;
	position: relative;
	height: 100vh;
	width: ${({ $open, $width }) => ($open ? `${$width}px` : "0")};
	min-width: ${({ $open, $width }) => ($open ? `${$width}px` : "0")};
	max-width: ${({ $open, $width }) => ($open ? `${$width}px` : "0")};
	transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	border-left: ${({ $open }) => ($open ? `1px solid ${colors.brand.light_gray}` : "0px solid transparent")};
	overflow: visible;
	flex-shrink: 0;
	will-change: width, min-width, max-width;
	background: rgba(255, 255, 255, 0.85);
	backdrop-filter: blur(10px);

	.panel-inner {
		min-width: ${({ $width }) => `${$width}px`};
		padding: 1rem;
		height: 100vh;
		overflow-y: auto;
	}

	.section-title {
		border-bottom: 1px solid #eaeaea;
		padding-bottom: 0.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-size: 1rem;
		font-weight: 600;
	}

	.button-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.panel-toggle {
		border: 1px solid ${colors.brand.light_gray};
		position: absolute;
		top: 40px;
		left: -35px;
		width: 35px;
		height: 50px;
		background-color: white;
		cursor: pointer;
		border-radius: 6px 0 0 6px;

		display: flex;
		align-items: center;
		justify-content: center;

		svg {
			stroke: #454545;
			stroke-width: 1.5px;
			width: 28px;
			height: 28px;
			transition: transform 0.15s ease-in-out;
			transform: rotate(${({ $open }) => ($open ? "180deg" : "0")});
		}
	}

	.material-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}

	.material-swatch {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 8px;
		border: 1px solid transparent;
		border-radius: 10px;
		background: #fafafa;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			background: #f0f0f0;
			border-color: #d0d0d0;
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		}

		&.active {
			border-color: #2b2b2b;
			background: #fff;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
		}
	}

	.swatch-image {
		width: 50%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 6px;
	}

	.swatch-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #555;
		text-align: center;
	}

	.not-allowed-text {
		font-style: italic;
		color: #666;
		text-align: center;
	}
`;
