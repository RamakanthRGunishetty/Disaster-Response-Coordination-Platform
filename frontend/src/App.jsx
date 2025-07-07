import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [title, setTitle] = useState('')
  const [locationName, setLocationName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [disasters, setDisasters] = useState([])

  const fetchDisasters = async () => {
    const res = await axios.get('http://localhost:4000/disasters')
    setDisasters(res.data)
  }

  useEffect(() => {
    fetchDisasters()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:4000/disasters', {
      title,
      location_name: locationName,
      description,
      tags: tags.split(','),
      owner_id: 'reliefAdmin'
    })
    fetchDisasters()
    setTitle('')
    setLocationName('')
    setDescription('')
    setTags('')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Create Disaster</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded" />
          <input value={locationName} onChange={e => setLocationName(e.target.value)} placeholder="Location" className="p-2 border rounded" />
          <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="p-2 border rounded" />
          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" className="p-2 border rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
        </form>
      </div>
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Disasters</h2>
        <ul className="space-y-2">
          {disasters.map(d => (
            <li key={d.id} className="p-4 bg-gray-50 border rounded">
              <div className="font-semibold text-lg text-gray-800">{d.title}</div>
              <div className="text-gray-600">{d.location_name}</div>
              <div className="text-sm text-gray-500">{d.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
