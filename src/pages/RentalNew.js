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
            <Redirect to={{pathname: '/'}} />
        }
        return (
            <section id="newRental">
                <div className="pvc-form">
                    <div className="row">
                        <div className="col-md-5">
                            <h1 className="page-title">Create Rental</h1>
                            <NewRentalForm onSubmit={this.onSubmit} />
                            {/* <div>
                            <p>
                                Some Errors
                            </p>
                            </div> */}
                        </div>
                        <div className="col-md-6 ml-auto">
                            <div className="image-container">
                                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                                <img src="/images/create-rental.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default RentalNew;