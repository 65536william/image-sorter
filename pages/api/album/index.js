import { firestore } from '../../../lib/firebase.js';

export default (req, res) => {
    firestore
    .collection('folders')
    .get()
    .then((querySnapshot) => {
        const albums = []
        querySnapshot.forEach((collection) =>
            albums.push(collection.data())
        )
        res.json(albums)
    })
    .catch((error) => {
        res.json({ error })
    })
}