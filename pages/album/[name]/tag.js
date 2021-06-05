import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { firestore } from '../../../lib/firebase.js' 

const fetcher = async (...args) => {
    const res = await fetch(...args)
    return res.json()
}

export default function Tag() {
    const router = useRouter()
    const { name } = router.query
    let { data } = useSWR(`/api/album/${name}`, fetcher)
    const [ currentImageObject, setCurrentImageObject ] = useState()
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [ imageList, setImageList ] = useState([])
    
    //3
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    //1
    useEffect(() => {
        if (data) {
            setImageList(Object.entries(data).sort(() => Math.random() - 0.5))
        }
    }, [data])

    //2
    useEffect(() => {
        if (imageList.length && !currentImageObject) {
            setCurrentImageObject(imageList[0])
        }
    }, [imageList])

    const goToNextImage = () => {
        setCurrentIndex(currentIndex => currentIndex + 1)
    }

    useEffect(() => {
        setCurrentImageObject(imageList[currentIndex])
    }, [currentIndex])

    const handleKeyPress = (e) => {
        if (e.keyCode === 89) {
            // firestore.collection(name).doc(currentImageObject[0]).update({
            //     [variable wearingGlasses] :true
            //     [ hasAFringe ] : true
            // })
            goToNextImage()
        }
        if (e.keyCode === 78) {
            goToNextImage()
        }
    }

    console.log(currentImageObject)


    // once an image is answered, how do we prevent it from displaying again?
    // 1. If a user closes their browser tab, then how can we restore the current state of their tagging again?
        // Answer: we don't need to, it's random
    // 2. We need to paginate the imageList fetching on Line 14 for large datasets, how?
        // Answer: Use SWR's pagination API, https://swr.vercel.app/docs/pagination
        // Impl. note: Paginate 100 images at a time 
    // 3. How do we deal with the database design for tag boolean values?
        // Answer: object for boolean answers: [q1, q2, ...]        
    // 4. How do we associate questions with datasets? Do we want to associate them?
        // Answer: For now, we can associate questions with datasets on the meta collection;
                // possibly, users can add them through the upload interface when they're uploading datasets
    

    return (
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
                <div className="mb-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Is the person wearing glasses?
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                        </p>
                    </div>
                </div>
                <div>
                    {currentImageObject && <img className="max-h-96" src={currentImageObject[1].url} />}
                </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                    Begin
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                    Cancel
                </button>
            </div>
        </div>
    )
}