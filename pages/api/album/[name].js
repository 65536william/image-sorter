import { firestore } from '../../../lib/firebase.js';

export default (req, res) => {
    firestore
    .collection('albums')
    .doc(req.query.name)
    .get()
    .then((documentSnapshot) => {
        res.json(documentSnapshot.data())
    })
    .catch((error) => {
        res.json({ error })
    })
}