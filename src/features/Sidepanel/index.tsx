import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import { StyledBox } from "./styles";
import ChevronLeft from "@/assets/svgs/ChevronLeft";
import { useAppStore } from "@/stores/appStore";
import { useConfiguratorStore } from "@/stores/configuratorStore";
 
import ChairPanel from "./ChairPanel";
import TablePanel from "./TablePanel";

const Sidepanel = ({ width = 350 }) => {
	// Material from appStore
	const open = useAppStore((state) => state.sidepanelOpen);
	const setOpen = (value: boolean | ((prev: boolean) => boolean)) => {
		const next = typeof value === "function" ? value(open) : value;
		useAppStore.getState().update({ sidepanelOpen: next });
	};

	// Category toggle
	const currentCategory = useConfiguratorStore((state) => state.currentCategory);
	const toggleCategory = useConfiguratorStore((state) => state.setCategory);

    
	return (
		<StyledBox $open={open} $width={width}>
			<div className="panel-toggle" onClick={() => setOpen((p) => !p)}>
				<ChevronLeft />
			</div>
			<div className="panel-inner">
				<Title onClick={() => setOpen((p) => !p)}>Flux Starter Template</Title>
				<Subtitle>{currentCategory === "chair" ? "Chair Configurator" : "Table Configurator"}</Subtitle>

				<div className="mode-switch-row">
					<button
						type="button"
						className="mode-switch-btn"
						onClick={() => toggleCategory(currentCategory === "chair" ? "table" : "chair")}
					>
						{currentCategory === "chair" ? "Switch to Table" : "Switch to Chair"}
					</button>
				</div>

				{currentCategory === "chair" ? <ChairPanel /> : <TablePanel />}
			</div>
		</StyledBox>
	);
};

export default Sidepanel;
