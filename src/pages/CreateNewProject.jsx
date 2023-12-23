import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { addNewProject } from "../redux-toolkit/projectSlice";
import { createSlug, formatDate } from "../utils/util";
import PopupDialogModal from "../modal/PopupDialogModal";
import SuccessFailure from "../modal/SuccessFailure";

export default function CreateNewProject() {
    // Initialize form using react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            description: '',
            startDate: formatDate(new Date()),
            endDate: ''
        }
    });

    // Access projects array from Redux state
    const { projects } = useSelector(state => state.project);
    const dispatch = useDispatch();
    const dialogRef = useRef();

    const navigate = useNavigate()

    // Handle form submission
    const onSubmit = (data) => {
        // Check if a project with the same name already exists
        const projectAdded = projects.some(element => element.name === data.name);

        // Open the dialog modal
        dialogRef.current.open();

        // Set the dialog content based on project existence
        if (projectAdded) {
            dialogRef.current.setContent(
                <SuccessFailure
                    failure={true}
                    message={'Project with the same name already exists!'}
                    handleButtonCLick={closeDialogModal}
                />
            );
        } else {
            // Dispatch action to add a new project
            const slug = createSlug(data.name)
            dispatch(addNewProject({ slug, ...data, tasks: [] }));
            dialogRef.current.setContent(
                <SuccessFailure
                    message={'Project Added Successfully!'}
                    handleButtonCLick={() => closeDialogModal(true, slug)}
                />
            );
        }
    }


    // Function to close the dialog modal
    const closeDialogModal = (success = false, slug) => {
        dialogRef.current.close();
        if (success) {
            navigate(`/project-info/${slug}`)
        }
    }

    // Validation schema for form inputs
    const validationSchema = (name) => {
        return {
            required: `${name} can't be empty!`,
            minLength: {
                value: 3,
                message: 'Please enter a minimum of 3 characters'
            }
        }
    }

    return (
        <>
            {/* PopupDialogModal component for displaying success/failure messages */}
            <PopupDialogModal ref={dialogRef} />

            {/* Form for creating a new project */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex-wrapper gap-6" noValidate>
                <div className="flex items-center self-end gap-8">
                    <Link to={'/'}>
                        <button className="styledButton">Cancel</button>
                    </Link>
                    <button type="submit" className="confirmButton">Save</button>
                </div>

                {/* Custom input fields */}
                <CustomInput
                    validationSchema={validationSchema('Name')}
                    errors={errors}
                    register={register}
                    name={'name'}
                    label={'name'}
                />
                <CustomInput
                    validationSchema={validationSchema('Description')}
                    errors={errors}
                    register={register}
                    name={'description'}
                    textarea={true}
                    label={'description'}
                />

                <CustomInput
                    validationSchema={{}}
                    errors={errors}
                    register={register}
                    name={'startDate'}
                    disabled
                    label={'start date'}
                />

                <CustomInput
                    validationSchema={{
                        required: 'Please enter a valid date',
                        validate: {
                            greaterThanCurrentDate: (fieldValue) => {
                                //Check if the end date is not same or earlier than the start date
                                const isDateValid = new Date(fieldValue).getTime() > new Date().getTime()
                                return isDateValid || `End date cannot be the same as today's date or earlier`
                            }
                        }
                    }}
                    errors={errors}
                    register={register}
                    name={'endDate'}
                    type='date'
                    label={'end date'}
                />
            </form>
        </>
    )
}