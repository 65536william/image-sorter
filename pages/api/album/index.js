import { firestore } from '../../../lib/firebase.js';

export default (req, res) => {
    firestore
    .collection('albums')
    .get()
    .then((querySnapshot) => {
        const albums = []
        querySnapshot.forEach((documentSnapshot) =>
            albums.push(documentSnapshot.data())
        )
        res.json(albums)
    })
    .catch((error) => {
        res.json({ error })
    })
}