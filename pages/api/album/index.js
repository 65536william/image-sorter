import { firestore } from '../../../lib/firebase.js';

export default (req, res) => {
    firestore
    .collection('meta')
    .doc('albums')
    .get()
    .then((documentSnapshot) => {
        res.json(documentSnapshot.data())
    })
    .catch((error) => {
        res.json({ error })
    })
}