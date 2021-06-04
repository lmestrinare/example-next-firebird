import { getDB, executeQuery} from '../../utils/fbQuery'
export default async function handler(req, res) {
  var usuarios = {}
  try {
    const db = await getDB(req)
    usuarios = await executeQuery(db, 'SELECT * FROM USUARIOS')
  } catch (e) {
    res.status(500).json({ success: false, error: { number: 9, message: e.message }})
    return
  }
  res.status(500).json({ success: true, data: usuarios })
}
