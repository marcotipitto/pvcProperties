import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FileLoader from 'components/file-upload/FileLoader';
import FormError from './FormError';
import { capitalize } from '../../helpers/functions';

const rentalOptions = ['apartment', 'condo', 'house', 'townhouse'];
const leaseOptions = ['12 month', 'month to month'];
const laundryOptions = ['communal', 'in unit']

const NewRentalForm = ({onSubmit}) => {

    const { register, handleSubmit, setValue, errors } = useForm();

    useEffect(() => {
        register({name: 'image'});
    }, [register]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    ref={register({required: "Title is required", maxLength: {value: 128, message: "Title cannot exceed 128 characters"}})}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title" />
                <FormError errors={errors} name="title">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>

            <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    ref={register({required: "City is required"})}
                    name="city"
                    type="text"
                    className="form-control"
                    id="city" />
                <FormError errors={errors} name="city">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>

            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    ref={register({required: "Address is required", minLength: {value: 4, message: "Address must be at least 4 characters long"}})}
                    name="address"
                    type="text"
                    className="form-control"
                    id="address" />
                <FormError errors={errors} name="address">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>
            <div className="form-group">
                <label htmlFor="zip">Zip Code</label>
                <input
                    ref={register({required: "Zip Code is required", minLength: {value: 5, message: "Zip code must be 5 characters long"}, maxLength: {value: 5, message: "Zip code must be 5 characters long"}})}
                    name="zip"
                    type="text"
                    className="form-control"
                    id="zip" />
                <FormError errors={errors} name="zip">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>

                <select className="form-control"
                    ref={register({required: "Category is required"})}
                    name="category"
                    id="category">
                    { rentalOptions.map(option => 
                        <option key={option}>{option}</option>
                    )}
                </select>
                <FormError errors={errors} name="category">
                    {(message) => <p>{message}</p>}
                </FormError>
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
                    ref={register({required: "Bedrooms is required", min: {value: 0, message: "Bedrooms cannot be negative"}})}
                    name="bedrooms"
                    type="number"
                    className="form-control"
                    id="bedrooms" />
                <FormError errors={errors} name="bedrooms">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>
            <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input
                    ref={register({required: "Bathrooms is required", min: {value: 0, message: "Bathrooms cannot be negative"}})}
                    name="bathrooms"
                    type="number"
                    className="form-control"
                    id="bathrooms" />
                <FormError errors={errors} name="bathrooms">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>
            <div className="form-group">
                <label htmlFor="parkingSpots">Parking Spots</label>
                <input
                    ref={register({required: "Parking Spots is required", min: {value: 0, message: "Parking spots cannot be negative"}})}
                    name="parkingSpots"
                    type="number"
                    className="form-control"
                    id="parkingSpots" />
                <FormError errors={errors} name="parkingSpots">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    ref={register({required: "Description is required"})}
                    name="description"
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description">
                </textarea>
                <FormError errors={errors} name="description">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>

            <div className="form-group">
                <label htmlFor="price">Price</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                    </div>
                    <input
                        ref={register({required: "Price is required", min: {value: 0, message: "Price cannot be negative"}})}
                        name="price"
                        type="number"
                        className="form-control"
                        id="price" />
                    <br/>
                    <FormError errors={errors} name="price">
                        {(message) => <p>{message}</p>}
                    </FormError>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="leaseTerm">Lease Term</label>
                <select className="form-control"
                    ref={register({required: "Lease Term is required"})}
                    name="leaseTerm"
                    id="leaseTerm">
                    { leaseOptions.map(option => 
                        <option key={option}>{option}</option>
                    )}
                </select>
                <FormError errors={errors} name="leaseTerm">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>

            <div className="form-group">
                <label htmlFor="floorNumber">Floor Number</label>
                <input
                    ref={register({required: "Floor Number is required"})}
                    name="floorNumber"
                    type="number"
                    className="form-control"
                    id="floorNumber" />
                <FormError errors={errors} name="floorNumber">
                    {(message) => <p>{message}</p>}
                </FormError>
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
                    ref={register({required: "Washer/Dryer is required"})}
                    name="laundry"
                    id="laundry">
                    { laundryOptions.map(option => 
                        <option key={option}>{capitalize(option)}</option>
                    )}
                </select>
                <FormError errors={errors} name="laundry">
                    {(message) => <p>{message}</p>}
                </FormError>
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