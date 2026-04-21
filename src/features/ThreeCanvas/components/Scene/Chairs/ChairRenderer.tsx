import React from 'react';
import { FirenzeChairModel } from './Top/FirenzeChaireModel';
import { BerlinChairModel } from './Top/BerlinChairModel';
import { MalmoChairModel } from './Complete/MalmoChairModel';
// import { FadeTransition } from '../../Transition/FadeTransition';

const CHAIR_COMPONENTS: Record<string, React.FC> = {
        firenze: FirenzeChairModel,
        berlin: BerlinChairModel,
        malmo: MalmoChairModel,
};

interface ChairRendererProps {
        chairId: string;
}

export const ChairRenderer: React.FC<ChairRendererProps> = ({ chairId }) => {
        const ChairComponent = CHAIR_COMPONENTS[chairId];

        if (!ChairComponent) return null;

        // return <FadeTransition componentId={chairId} componentsMap={CHAIR_COMPONENTS} />;

        return <ChairComponent />;
};
