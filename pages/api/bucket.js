import { s3 } from '../../lib/aws.js'

export default async function handler(req, res) {
    await s3.headObject({
        Bucket: process.env.BUCKET_NAME,
        Key: req.query.pathname
    }, function(err, data) {
        if (err) res.status(500).json(err)
        else res.status(200)
    })
}