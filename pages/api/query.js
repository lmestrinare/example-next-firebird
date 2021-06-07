import { getDB, executeQuery} from '../../utils/fbQuery'
export default async function handler(req, res) {
  var retorno = {}
  try {
    const db = await getDB(req)
    retorno = await executeQuery(db, req.body.query.sql)
  } catch (e) {
    res.status(500).json({ success: false, error: { number: 9, message: e.message }})
    return
  }
  res.status(200).json({ success: true, data: retorno })
}
