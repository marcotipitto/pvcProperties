import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FileLoader from 'components/file-upload/FileLoader';

const rentalOptions = ['apartment', 'condo', 'house', 'townhouse'];
const leaseOptions = ['12 month', 'month to month'];
const laundryOptions = ['communal', 'in unit']

const NewRentalForm = ({onSubmit}) => {

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register({name: 'image'});
    }, [register]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    ref={register}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title" />
            </div>

            <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    ref={register}
                    name="city"
                    type="text"
                    className="form-control"
                    id="city" />
            </div>

            <div className="form-group">
                <label htmlFor="street">Address</label>
                <input
                    ref={register}
                    name="address"
                    type="text"
                    className="form-control"
                    id="address" />
            </div>
            <div className="form-group">
                <label htmlFor="street">Zip</label>
                <input
                    ref={register}
                    name="zip"
                    type="text"
                    className="form-control"
                    id="zip" />
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>

                <select className="form-control"
                    ref={register}
                    name="category"
                    id="category">
                    { rentalOptions.map(option => 
                        <option key={option}>{option}</option>
                    )}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="image">Image Url</label>
                <FileLoader 
                    onFileUpload={image => setValue('image', image._id)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                    ref={register}
                    name="bedrooms"
                    type="number"
                    className="form-control"
                    id="bedrooms" />
            </div>
            <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input
                    ref={register}
                    name="bathrooms"
                    type="number"
                    className="form-control"
                    id="bathrooms" />
            </div>
            <div className="form-group">
                <label htmlFor="parkingSpots">Parking Spots</label>
                <input
                    ref={register}
                    name="parkingSpots"
                    type="number"
                    className="form-control"
                    id="parkingSpots" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    ref={register}
                    name="description"
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description">
                </textarea>
            </div>

            <div className="form-group">
                <label htmlFor="price">Price</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                    </div>
                    <input
                        ref={register}
                        name="price"
                        type="number"
                        className="form-control"
                        id="price" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="leaseTerm">Lease Term</label>
                <select className="form-control"
                    ref={register}
                    name="leaseTerm"
                    id="leaseTerm">
                    { leaseOptions.map(option => 
                        <option key={option}>{option}</option>
                    )}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="floorNumber">Floor Number</label>
                <input
                    ref={register}
                    name="floorNumber"
                    type="number"
                    className="form-control"
                    id="floorNumber" />
            </div>
            <div className="form-group">
                <label htmlFor="elevator">Elevator</label>
                <input
                    ref={register}
                    name="elevator"
                    type="checkbox"
                    className="form-control"
                    id="elevator" />
            </div>
            <div className="form-group">
                <label htmlFor="heating">Heating</label>
                <input
                    ref={register}
                    name="heating"
                    type="checkbox"
                    className="form-control"
                    id="heating" />
            </div>
            <div className="form-group">
                <label htmlFor="airCon">Air Conditioning</label>
                <input
                    ref={register}
                    name="airCon"
                    type="checkbox"
                    className="form-control"
                    id="airCon" />
            </div>
            <div className="form-group">
                <label htmlFor="dishwasher">Dishwashwer</label>
                <input
                    ref={register}
                    name="dishwasher"
                    type="checkbox"
                    className="form-control"
                    id="dishwasher" />
            </div>
            <div className="form-group">
                <label htmlFor="refrigerator">Refrigerator</label>
                <input
                    ref={register}
                    name="refrigerator"
                    type="checkbox"
                    className="form-control"
                    id="refrigerator" />
            </div>
            <div className="form-group">
                <label htmlFor="laundry">Washer/Dryer</label>
                <select className="form-control"
                    ref={register}
                    name="laundry"
                    id="laundry">
                    { laundryOptions.map(option => 
                        <option key={option}>{option}</option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="smoking">Smoking</label>
                <input
                    ref={register}
                    name="smoking"
                    type="checkbox"
                    className="form-control"
                    id="smoking" />
            </div>
            <div className="form-group">
                <label htmlFor="pets">Pets</label>
                <input
                    ref={register}
                    name="pets"
                    type="checkbox"
                    className="form-control"
                    id="pets" />
            </div>
            <button
                type="submit"
                className="btn btn-pvc-main">Create
            </button>
        </form>
    )
}

export default NewRentalForm;