import { Html } from "@react-three/drei";
import { Flex, Spinner, Box } from "@chakra-ui/react";

export default function Loader() {
	return (
		<Html fullscreen>
			<Flex
				w="100%"
				h="100%"
				align="center"
				justify="center"
				bg="blackAlpha.600"
				backdropFilter="blur(10px)"
				zIndex="modal">
				<Box textAlign="center" w="50%">
					<Spinner size="xl" w="80px" h="80px" />
				</Box>
			</Flex>
		</Html>
	);
}
