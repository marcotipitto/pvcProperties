import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RentalSearchInput = () => {

    const [location, setLocation] = useState('');
    const history = useHistory();

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearch = () => {
        location ?
            history.push(`/rentals/${location}/homes`) :
            history.push('/');
    }

    return (
        <div className="form-inline my-2 my-lg-0">
            <input 
                onKeyPress={handleKeyPress}
                onChange={e => setLocation(e.target.value)}
                value={location}
                className="form-control mr-sm-2 pvc-search" 
                type="search" 
                placeholder="Ex: New York"
            />
            <button 
                onClick={handleSearch}
                className="btn btn-outline-success my-2 my-sm-0 btn-pvc-main" 
                type="submit"
            >
                Search
            </button>
        </div>
    );
};

export default RentalSearchInput