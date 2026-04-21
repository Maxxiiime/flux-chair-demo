import ErrorBoundary from "@/components/ErrorBoundary";
import Sidepanel from "@/features/Sidepanel";
import ThreeCanvas from "@/features/ThreeCanvas";
import Overlay from "@/features/ThreeCanvas/components/Overlay";
import { useAppStore } from "@/stores/appStore";
import { Box } from "@chakra-ui/react";

const SIDEPANEL_WIDTH = 350;

const Home = () => {
	const sidepanelOpen = useAppStore((s) => s.sidepanelOpen);

	return (
		<ErrorBoundary>
			<Box
				display="flex"
				flexDirection="row"
				position="relative"
				w="100vw"
				h="100vh"
				overflow="hidden"
			>
				<Box
					w="100%"
					h="100%"
					transform={sidepanelOpen ? `translateX(-${SIDEPANEL_WIDTH / 2}px)` : "translateX(0)"}
					transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
				>
					<ThreeCanvas />
				</Box>

				<Overlay />

				<Box position="absolute" top={0} right={0} h="100%" zIndex={10}>
					<Sidepanel width={SIDEPANEL_WIDTH} />
				</Box>
			</Box>
		</ErrorBoundary>
	);
};

export default Home;
