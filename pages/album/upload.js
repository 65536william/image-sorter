import { useForm } from 'react-hook-form'
import { storage } from '../../lib/firebase.js'

export default function UploadImages() {

    const { register, handleSubmit } = useForm()

    const randomName = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    const submitImage = formData => {
        const images = formData.uploadedImages
        const promises = Array.from(images).map((file, index) => {
            let renamedFile = new File([file], randomName(), {type: file.type})
            let ref = storage.ref(`${formData.folderName}/${renamedFile.name}`)
            return ref.put(renamedFile).then((snapshot) => console.log(snapshot))
        })
        Promise.all(promises)
        .then(() => console.log("all done")).catch((err) => console.log(err))
    }

    return (
        <div>
            <div class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
                <div class="relative max-w-xl mx-auto">
                    <div class="text-center">
                        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Upload images
                        </h2>
                        <p class="mt-4 text-lg leading-6 text-gray-500">
                            Images must be selected by hand: attempts to upload an album directly will result in error.
                        </p>
                    </div>
                    <div class="mt-12">
                        <form onSubmit={handleSubmit(submitImage)} class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div class="sm:col-span-2">
                                <label for="folderName" class="block text-sm font-medium text-gray-700">Select images</label>
                                <div class="mt-1">
                                    <input {...register('uploadedImages', {required: true})} multiple type="file" name="uploadedImages" id="uploadedImages" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="folderName" class="block text-sm font-medium text-gray-700">Folder name</label>
                                <div class="mt-1">
                                    <input {...register('folderName', {required: true})}  type="text" name="folderName" id="folderName" class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <button type="submit" class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}