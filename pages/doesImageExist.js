import { useForm } from 'react-hook-form'

export default function doesImageExist() {
    const { register, handleSubmit } = useForm()

    const doesTheImageExist = async formData => {
        const res = await fetch(`/api/bucket?pathname=${formData.pathname}`)
    }

    const doesIt = async (e) => {
        const res = await fetch(`/api/bucket?pathname=${e}`)
        const { url, fields } = await res.json()

        const upload = await fetch(url, {
            method: 'GET',
            body: formData,
        })
    }

    return (
        <>
            <p>Upload a .png or .jpg image (max 1MB).</p>
            <form onSubmit={handleSubmit(doesTheImageExist)}>
                <input {...register("pathname")}/>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}