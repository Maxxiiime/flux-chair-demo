import React from 'react';
import { Model as IrasDraaiModel } from './Bottom/Iras_drai';
import { Model as VenusDraaiModel } from './Bottom/Venus_drai';
// import { FadeTransition } from './FadeTransition';

const LEG_COMPONENTS: Record<string, React.FC> = {
        iras_draai: IrasDraaiModel,
        venus_draai: VenusDraaiModel,
};

interface LegRendererProps {
        legId: string;
}

export const LegRenderer: React.FC<LegRendererProps> = ({ legId }) => {
        const LegComponent = LEG_COMPONENTS[legId];

        if (!LegComponent) return null;
        // return <FadeTransition componentId={legId} componentsMap={LEG_COMPONENTS} />;

        return <LegComponent />;
};
