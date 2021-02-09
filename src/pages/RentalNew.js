import React from 'react';
import NewRentalForm from 'components/forms/NewRentalForm';
import { createRental } from 'actions';
import { Redirect } from 'react-router-dom';

class RentalNew extends React.Component {

    state = {
        shouldRedirect: false
    }

    onSubmit = (rentalData) => {
        createRental(rentalData)
            .then(_ => this.setState({shouldRedirect: true}))
            .catch(_ => console.log('errors'))
    }

    render() {
        const { shouldRedirect } = this.state;
        if (shouldRedirect) {
            return (
                <Redirect to={{pathname: '/'}} />
            )
        }
        return (
            <section id="newRental">
                <div className="pvc-form">
                    <div className="row">
                        <div className="col-md-5">
                            <h1 className="page-title">Create Rental</h1>
                            <NewRentalForm onSubmit={this.onSubmit} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default RentalNew;