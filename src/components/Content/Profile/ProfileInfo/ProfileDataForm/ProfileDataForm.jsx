import React from 'react';
import {useForm} from "react-hook-form";
import styles from "./ProfileDataForm.module.css"
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import ProfilePictureContainer from "../ProfilePicture/ProfilePictureContainer";
import CloseButton from "../../../../common/Svg/SvgButton/CloseButton";
import AddPhotoIcon from "../../../../common/Svg/SvgImage/AddPhotoIcon";
import InputCreator from "../../../../common/InputCreator/InputCreator";


const ProfileDataForm = ({profile, status, goToNonEditMode, saveProfile, saveProfilePicture, updateStatus}) => {
    const MAX_FULL_NAME_LENGTH = 50;
    const MAX_LOCATION_LENGTH = 30;
    const MAX_WEBSITE_LENGTH = 100;
    const MAX_GITHUB_LENGTH = 100;
    const MAX_BIO_LENGTH = 300;

    const {
        register, handleSubmit, clearErrors, setError, setFocus, watch, formState: {errors},
    } = useForm({
        mode: "onChange", defaultValues: {
            fullName: profile.fullName,
            location: profile.location,
            bio: status,
            github: profile.contacts.github,
            website: profile.contacts.website,
        }
    })
    const onSubmit = async (data) => {
        let profile = Object.assign({
            contacts: {
                github: data.github, website: data.website
            }
        }, {aboutMe: data.location}, {fullName: data.fullName},);
        let status = data.bio;

        let isProfileSuccessful = await saveProfile(profile, setError);
        let isStatusSuccessful = await updateStatus(status, setError);
        let isSuccessful = isProfileSuccessful && isStatusSuccessful;
        isSuccessful && goToNonEditMode()
    }

    let onProfilePictureSelected = (e) => {         // Нельзя загрузить фотку после сохранения формы из-за особенностей апишки
        if (e.target.files[0]) {                    // It is not possible to upload a photo after
            saveProfilePicture(e.target.files[0])   // saving the form due to the nature of an API
        }
    }


    return (<form className={styles.profileDataForm} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formHeader}>
            <CloseButton closeDialog={goToNonEditMode}/>
            <div className={styles.formHeaderTitle}>Edit profile</div>
            <input type={"submit"} value={"Save"} className={styles.saveFormData}/>
        </div>
        <div className={styles.headerBorder}>
            <ProfileHeader/>
        </div>

        <div className={styles.profilePictureWrapper}>
            <ProfilePictureContainer shadow={true}/>

            <div className={styles.addPhotoIconContainer}>
                <div className={styles.addPhotoIconWrapper}>
                    <div className={styles.addPhotoIconCover}>
                        <label className={styles.changeProfilePicture}>
                            <AddPhotoIcon/>
                            {<input type={"file"} onChange={onProfilePictureSelected}/>}
                        </label>

                    </div>
                </div>
            </div>
        </div>

        <div className={styles.formBody}>
            <InputCreator
                inputName={"fullName"} maxInputLength={MAX_FULL_NAME_LENGTH} title={"Name"}
                required={"Name can’t be blank"}
                errors={errors} watch={watch} setFocus={setFocus} clearErrors={clearErrors} register={register}
            />

            <InputCreator
                inputName={"location"} maxInputLength={MAX_LOCATION_LENGTH} title={"Location"} errors={errors}
                watch={watch} setFocus={setFocus} clearErrors={clearErrors} register={register}
            />

            <InputCreator
                inputName={"bio"} maxInputLength={MAX_BIO_LENGTH} title={"Bio"} errors={errors} watch={watch}
                setFocus={setFocus} clearErrors={clearErrors} register={register}
            />

            <InputCreator
                inputName={"website"} maxInputLength={MAX_WEBSITE_LENGTH} title={"Website"} errors={errors}
                watch={watch} setFocus={setFocus} clearErrors={clearErrors} register={register}
            />

            <InputCreator
                inputName={"github"} maxInputLength={MAX_GITHUB_LENGTH} title={"Github"} errors={errors} watch={watch}
                setFocus={setFocus} clearErrors={clearErrors} register={register}
            />

            {errors.server && <p className={styles.errorMessage}>{errors.server.message.toString()}</p>}
        </div>
        <div className={styles.commentary}>
            К сожалению из-за особенностей API сервера, фотография сразу сохраняется при ее выборе.
            Сохранять фотку только по нажатию кнопки Save не получилось. Пожалуйста попробуйте потыкать пустые поля,
            попробовать валидацию, особенно "имени" и тд.
        </div>
        <div className={styles.commentary}>
            Unfortunately, due to server API nature, photo saves immediately after selecting file.
            It is not possible to save photo only after pressing Save button. Please try touching the empty fields, try
            validation, especially on "name" and so on.
        </div>
    </form>)
}

export default ProfileDataForm;