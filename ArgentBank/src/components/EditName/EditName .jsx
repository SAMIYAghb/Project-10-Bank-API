import PropTypes from 'prop-types';
import style from './EditName.module.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProfileUser } from '../../Redux/slices/editProfileSlice';
import { profileUser } from '../../Redux/slices/profileSlice';
// import { profileUser } from '../../Redux/slices/profileSlice';

const EditName = ({ firstName, lastName, onCancel }) => {

    const dispatch = useDispatch();
    const [firstNameInput, setFirstNameInput] = useState(firstName);
    const [lastNameInput, setLastNameInput] = useState(lastName);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form with:", firstNameInput, lastNameInput);

        dispatch(editProfileUser({ firstName: firstNameInput, lastName: lastNameInput }))
            .unwrap() // Use unwrap to handle fulfilled/rejected cases
            .then(() => {
                dispatch(profileUser({ firstName: firstNameInput, lastName: lastNameInput })); // Update profile in Redux

                onCancel(); // Exit editing mode after save

                console.log("Profile updated successfully");
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

    return (
        <>
            <h1 className={style.TitleAccount}>Welcome back</h1>
            <form className={style.EditName} onSubmit={handleSubmit}>
                <div className={style.inputs}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstNameInput}
                        onChange={(e) => setFirstNameInput(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastNameInput}
                        onChange={(e) => setLastNameInput(e.target.value)}
                        required
                    />
                </div>
                <div className={style.buttons}>
                    <button type="submit" className={style.editButton}>Save</button>
                    <button type="button" className={style.editButton} onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </>
    );
}
EditName.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onCancel: PropTypes.func,
};
export default EditName 
