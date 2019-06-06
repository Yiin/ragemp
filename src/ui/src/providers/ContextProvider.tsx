import React from 'react';

import UserContext from '~/contexts/UserContext';

const ContextProvider = (Target: any): typeof Target =>
    class extends React.PureComponent {
        render() {
            return [UserContext].reduce(
                (children, Context) => <Context>{children}</Context>,
                <Target />,
            );
        }
    };

export default ContextProvider;
