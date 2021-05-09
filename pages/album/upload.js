import { useForm } from 'react-hook-form'
import { storage } from '../../lib/firebase.js'
import { firestore } from '../../lib/firebase.js'
import firebase from '../../lib/firebase.js'

export default function UploadImages() {

    const { register, handleSubmit } = useForm()

    const generateRandomId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    const submitImages = ({ uploadedImages, folderName }) => {
        const promises = Array.from(uploadedImages).map(image => {
            let anonymisedImage = new File([image], generateRandomId(), {type: image.type})
            let ref = storage.ref(`${folderName}/${anonymisedImage.name}`)
            return ref.put(anonymisedImage)
            .then(() => ref.getDownloadURL())
            .then((downloadUrl) => firestore.collection('albums').doc(folderName).set({
                [anonymisedImage.name]: {
                    url: downloadUrl
                }
            }, { merge: true }))
            .then(() => firestore.collection('meta').doc('albums').set({
                [folderName]: {
                    count: firebase.firestore.FieldValue.increment(1)
                }
            }, { merge: true }))
        })
        Promise.all(promises)
        .then(() => console.log("All images uploaded to Cloud Storage")).catch((err) => console.log(err))
    }

    return (
        <div class="m-20">
            <div>
                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Upload images
                </h2>
                <p class="mt-4 text-lg leading-6 text-gray-500">
                    Images must be selected manually; attempts to upload an album directly will result in error.
                </p>
            </div>
            <div class="mt-12">
                <form onSubmit={handleSubmit(submitImages)} class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div class="sm:col-span-2">
                        <label for="uploadedImages" class="block text-sm font-medium text-gray-700">Select images</label>
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
    )
}