import React from "react";
import ErrorHandler from "./contexts/ErrorProvider";


/**
 * @author Lovesh Singh.
 * @since 30-03-2022.
 * @description Base Component.
 */
export class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * @author Lovesh Singh.
     * @since 30-03-2022.
     * @description secure function to render component.
     */
    renderAppComponent(): JSX.Element{};

    render() {
        return (
            <ErrorHandler>
                {this.renderAppComponent()}
            </ErrorHandler>
        )
    }
}
