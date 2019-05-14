import React from 'react';
import { IDisplayName } from '../../model/IDisplayName';

interface IDropDownListInputProps {
    optionsList: IDisplayName[];
    updateSelection: (newSelection: IDisplayName) => void;
}

export class DropDownListInputComponent extends React.PureComponent<IDropDownListInputProps> {

    sendChangeInfo = (event) => {
        let selectedObject: IDisplayName = this.props.optionsList[event.target.selectedIndex];
        this.props.updateSelection(selectedObject);
    }

    render() {
        return (
            <select onChange={this.sendChangeInfo}>
                {this.props.optionsList.map(optionOfList => (
                    <option key={optionOfList.displayName()} value={optionOfList.displayName()}>
                        {optionOfList.displayName()}
                    </option>
                ))}
            </select >
        )
    }
}
