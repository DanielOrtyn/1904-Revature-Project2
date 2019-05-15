import React from 'react';

interface IErrorProps {
  errorMessage: string;
}

export class ErrorComponent extends React.PureComponent<IErrorProps> {

  render() {
    return (
      <div className="card col-md-4 col-sm-6 col-xs-12">
        <div className="card-body">
          <h1 className="card-title">Error!</h1>
          <p>{this.props.errorMessage}</p>
        </div>
      </div>
    )
  }
}
