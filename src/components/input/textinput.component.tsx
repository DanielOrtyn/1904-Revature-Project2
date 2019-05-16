import React from 'react';

interface IInputProps {
    valueUpdate: (username: string) => void;
    placeHolder: string;
}

export class TextInputComponent extends React.PureComponent<IInputProps> {
    updateValue = (event) => {
        const newValue = event.target.value;
        this.props.valueUpdate(newValue);
    }

    render() {
        return (
            <input className="textInputBoxInput" type='string'
                placeholder={this.props.placeHolder}
                onChange={this.updateValue} />
        )
    }
}
