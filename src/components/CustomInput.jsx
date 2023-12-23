
export default function CustomInput({ label, name, textarea, register, errors, validationSchema, ...props }) {

    const styles = 'w-full px-2 py-2 border-b-[2.5px] border-stone-400 bg-stone-200 rounded focus:outline-none focus:border-stone-700'

    return (
        <div className="">
            <label htmlFor={name} className="text-sm font-bold uppercase text-stone-500">{label}</label>
            {
                textarea ?
                    <textarea {...register(name, validationSchema)} id={name} {...props} rows={2} className={`${styles} resize-none`} ></textarea>
                    : <input {...register(name, validationSchema)} id={name} {...props} className={`${styles}`} />
            }
            {errors[name] && <span className="text-red-500 ">{errors[name].message}</span>}
        </div>
    )
}
