import { Box, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { CHAIR_MODELS } from "@/data/catalog";

const MotionBox = motion(Box);

const Overlay = () => {
	const currentChairId = useConfiguratorStore((state) => state.currentChairId);
	const chair = CHAIR_MODELS[currentChairId];

	if (!chair) return null;

	return (
		<Box
			position="absolute"
			top={12}
			left={12}
			zIndex={5}
			pointerEvents="none"
		>
			<AnimatePresence mode="wait">
				<MotionBox
					key={currentChairId}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 20 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					<Text
						fontSize="5xl"
						fontWeight="900"
						textTransform="uppercase"
						letterSpacing="0.1em"
						color="gray.800"
						lineHeight="1"
						textShadow="0 2px 10px rgba(0,0,0,0.05)"
					>
						{chair.name}
					</Text>

				</MotionBox>
			</AnimatePresence>
		</Box>
	);
};

export default Overlay;
