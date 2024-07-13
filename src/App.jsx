import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {
  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState('');
  const [showRecipe, setShowRecipe] = useState(null);
  const [show,setShow] = useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchValue();
  }, [search]);

  const searchValue = async () => {
    try{
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        setRecipe(res.data.meals || []);
        if(res.data.meals){
          console.log(res.data.meals);
        }else{
          console.log("not found");
        }
      }
      catch(err) {
        
        console.log(err);
      }
  };
  
  const handleIngredients = (recipe) =>{
    const ingredients = [];
      for(let i=1;i<=20;i++){
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if(ingredient){
          ingredients.push(<p key={i}>{`${ingredient} - ${measure}`}</p>)
        }
      }
      return ingredients;
  }

  const closeButton = () =>{
    setShow(false);
  }
  const showButton = (item) =>{
    setShowRecipe(item);
    setShow(true);
  }
  console.log(search);

  return (
    <>
      <div className="content">
        <div className="logo">
          <img src="/img3.jpg" alt="Logo 1" />
        </div>
        <div className="top-search">
          <h1 style={{color:"darkorange"}}>What Are You Craving Today?</h1>
          <h3>Here The Ingredients and Instructions For Your Meal</h3>
          <i>Cooking is like love. It should be entered into with abandon or not at all.</i><br></br>
          <i>– Harriet van Horne</i><br></br>
        </div>
        <div className="search">
          <input type="text" placeholder="search here ..." value={search} onChange={handleSearch}></input>
        </div>
        <div className="bottom-search">
          <h2>Chef's Picks:</h2>
          <div className="result" id="result">
            { recipe.length > 0 ? (recipe.map((item) => (
              <div className="meal-item" key={item.idMeal}>
                <div className="meal-img">
                  <img src={item.strMealThumb} alt={item.strMeal}></img><br></br>
                </div>
                <div className="meal-name">
                  <b>{item.strMeal}</b>
                  <a href="#" className="meal-recipe-button" onClick={()=>showButton(item)}>Get recipe</a>
                </div>
              </div>
            ))
          ) : (search && <h3 className='not-found'>Sorry, your search meal is not found</h3>)}
          
            
          </div>
          {showRecipe && show &&(
            <div className="recipe-detail">
            <button type="button" id="btn-cls" className="btn-cls" onClick={closeButton}> X</button>
            {/* {showRecipe.length > 0 &&  showRecipe.map((item) => ( */}
              <div className="meal-detail-content">
                <h2 className="recipe-name">{showRecipe.strMeal}</h2>
                <p className="recipe-category">{showRecipe.strCategory}</p>
                <div className="recipe-instruction-ingredient">
                  <div className="recipe-instruction">
                    <h3>Instruction: </h3>
                    <p>{showRecipe.strInstructions}</p>
                  </div>
                  <div className="recipe-ingredient">
                    <h3>Ingredients: </h3>
                    <p>{handleIngredients(showRecipe)}</p>
                  </div>
                </div>  
                  {/* <p>{showRecipe.strIngredient1}</p> */}
                <div className="recipe-img">
                  <a href={showRecipe.strYoutube} target="_blank">
                    <img src={showRecipe.strMealThumb} alt={showRecipe.strMeal} height="100px" width="100px"></img>
                  </a>
                  <p className="recipe-video">watch video</p>
                </div>
                
              </div>
            {/* ))} */}
          </div>
          )}
          
        </div>
      </div>
    </>
  );
}

export default App;


{/* {
          recipe.map((item,index)=>(
            <div key={index}>
              <img src={item.strMealThumb} height="150px" width="150px"></img><br></br>
              <b>{item.strMeal}</b>
              <p>{item.strInstructions}</p>
            </div>
            
          ))
        } */}