import React from 'react'
import { useForm } from 'react-hook-form'
import { sameAs } from '../../helpers/validators'
import FormError from './FormError'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const RegisterForm = ({ onSubmit }) => {

    const { register, handleSubmit, errors, getValues } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    ref={register({required: "Username is required"})}
                    name="username"
                    type="text"
                    className="form-control"
                    id="username" />
                <FormError errors={errors} name="username">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    ref={register({required: "Email is required", pattern: {value: EMAIL_PATTERN, message: "Invalid email format"}})}
                    name="email"
                    type="email"
                    className="form-control"
                    id="email" />
                <FormError errors={errors} name="email">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    ref={register({required: "Password is required", minLength: {value: 8, message: "Password must be at least 8 characters long"}})}
                    name="password"
                    type="password"
                    className="form-control"
                    id="password" />
                <FormError errors={errors} name="password">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>

            <div className="form-group">
                <label htmlFor="passwordConfirmation">Confirm Password</label>
                <input
                    ref={register({required: "Confirm password is required", minLength: {value: 8, message: "Password must be at least 8 characters long"}, validate: {sameAs: sameAs('password', getValues), message: "Passwords do not match"}})}
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    id="confirmPassword" />
                <FormError errors={errors} name="confirmPassword">
                    {(message) => <p>{message}</p>}
                </FormError>
            </div>
            <button
                type="submit"
                className="btn btn-pvc-main">Submit</button>
        </form>
    )
}

export default RegisterForm