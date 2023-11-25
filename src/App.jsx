import { Auth } from './components/Auth'
import './App.css'
import { db, auth, storage } from './config/firebase'
import { useEffect, useState } from 'react'
import { getDocs, addDoc, deleteDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies")

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setMovieList(filteredData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])



  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState("")
  const [isNewMovieOscar, setIsNewMovieOscar] = useState("")

  const onSubmitMovie = async () => {
    try {

      await addDoc(moviesCollectionRef, {
        userId: auth?.currentUser?.uid,
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar
      })
    } catch (err) {
      console.error(err)
    }
    getMovieList()
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
      getMovieList()
    } catch (err) {
      console.error(err)
    }
  }

  const [updatedTitle, setUpdatedTitle] = useState("")
  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await updateDoc(movieDoc, { title: updatedTitle })
      getMovieList()
    } catch (err) {
      console.error(err)
    }
  }


  const [fileUpload, setFileUpload] = useState(null)
  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <div>

        <Auth />
      </div>
      <br />
      <div>
        <input type="text" placeholder='movie title...' onChange={e => { setNewMovieTitle(e.target.value) }} />
        <input type="number" placeholder='release date...' onChange={e => { setNewReleaseDate(Number(e.target.value)) }} />
        <input type="checkbox" onChange={e => { setIsNewMovieOscar(e.target.checked) }} />
        <label htmlFor=""> Received an Oscar</label>
        <button type='submit' onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map(movie => (
          <div key={movie.title}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => { deleteMovie(movie.id) }}>Delete movie</button>

            <input type="text" placeholder='new title...' onChange={e => { setUpdatedTitle(e.target.value) }} />
            <button onClick={() => { updateMovieTitle(movie.id) }}>Update title</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={e => { setFileUpload(e.target.files[0]) }} />
        <button type="submit" onClick={uploadFile}>Upload Image</button>
      </div>
    </div>
  )
}

export default App
