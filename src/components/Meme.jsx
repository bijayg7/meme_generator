import React, {useState, useEffect} from 'react'


export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  })

  const [allMemes, setAllMemes ] = useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
  }, [])

  function getMemeImage() {
    const memesArray = allMemes
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const url = memesArray[randomNumber].url
    setMeme(prevMeme => {
      return {
        ...prevMeme,
        randomImage: url
      }
    }) 
  }

  function changeHandler(event) {
    const{name, value} = event.target
    setMeme(prevMeme => {
      return{
        ...prevMeme,
        [name]: value
      }
    })
  }

   
  return (
    <div className='main'>
        <form className='form'>
          <div >
            <label htmlFor='top-text'> Top Text </label>
              <input  type='text' name="topText" value={meme.topText} placeholder='Top Text' className='form-input' onChange={changeHandler}  />
          </div>
          <div>
            <label htmlFor='bottom-text'>Bottom Text </label>
              <input name="bottomText" value={meme.bottomText} type='text' placeholder='Bottom Text' className='form-input' onChange={changeHandler} />
          </div>
            <button type='button' className='form-button' onClick={getMemeImage} >Get a New Meme</button>
        </form>
        <div className="meme">
                <img src={meme.randomImage} className="image" />
                <h2 type="text" className="meme--text top" > {meme.topText} </h2>
                <h2 type="text" className="meme--text bottom"> {meme.bottomText}</h2>
        </div>
    </div>
      
  )
}
