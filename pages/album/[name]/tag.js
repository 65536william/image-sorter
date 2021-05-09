import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useEffect, useState } from 'react'

const fetcher = async (...args) => {
    const res = await fetch(...args)
    return res.json()
}

export default function Tag() {
    const router = useRouter()
    const { name } = router.query
    const { data } = useSWR(`/api/album/${name}`, fetcher)
    const [ currentImage, setCurrentImage ] = useState()

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.keyCode === 37) {
                console.log("you pressed left key")
            }
            if (e.keyCode === 39) {
                console.log("you pressed right key")
            }
        }
    
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    return (
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
                <div>
                    <img src={currentImage} />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Is the person wearing glasses?
                    </h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                        </p>
                    </div>
                </div>
            </div>
            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                    Deactivate
                </button>
                <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                    Cancel
                </button>
                <button onClick={() => setCurrentImage(urlList[0])} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                    Begin
                </button>
            </div>
        </div>
    )
}