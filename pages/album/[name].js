import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (...args) => {
    const res = await fetch(...args)

    return res.json()
}

function City() {
    const router = useRouter()
    const { name } = router.query
    const { data } = useSWR(`/api/album/${name}`, fetcher)

    if (!data) {
        return 'Loading...'
    }

    return (
        <div>
            <p>Population: {console.log(data)}</p>
        </div>
    )
}

export default City