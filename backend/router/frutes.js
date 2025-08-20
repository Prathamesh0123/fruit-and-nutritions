const express = require('express');
const router = express.Router();
const axios = require('axios');
const Fruit = require('../model/fruite');
const accessKey = "BJr6903XY9v4i6XQ_m2uf-sh6bpFr3ibc6TMca0VRN8";
const fruitFact = require('../fruit-facts.json');
router.get('/fruites',async(req,res)=>{
    const { name } = req.query;
    try{
        if(name){
          const response = await fetch(`https://www.fruityvice.com/api/fruit/${name}`);
          if(!response.ok){
            console.log(`fruit not found ${name}`);
            return res.status(404).json({message:'No fruite found!!!'});
          }
          const fruitData = await response.json();
          console.log(fruitData);
          return res.json(fruitData);
        }
        // const response = await fetch(`https://www.fruityvice.com/api/fruit/all`);
        // const fruitesData = await response.json();
        // const filterData = fruitesData.slice(0,10);
        const fruitsFromDB = await Fruit.find({});
        res.status(200).json(fruitsFromDB);
    }catch(err){
        console.log(err.message);
        console.log(err);
        res.status(500).json({message:'server issue!!!'});
    }
});

//function that make api call for each image!!!
async function getImageForFruites(fruiteName){
    try{
        const apiUrl = `https://api.unsplash.com/search/photos`;
        const response = await axios.get(apiUrl,{
            params:{
                query:`${fruiteName} whole fresh fruit`,
                per_page:1,
                orientation:'squarish',
                content_filter: "high",
                order_by: "relevant"
            },
            headers:{
                'Authorization':`Client-ID ${accessKey}`
            }
        })

        // ✅ FIX: Changed 'res' to 'response'
        if (response.data.results.length > 0) {
            return response.data.results[0].urls.regular;
        }
        return null;
    }catch(err){
        console.log('error fetching image',err);
    }
}

//function give fruites fact
function getFruitesFact(fruitName){
    // console.log(fruitFact[fruitName]);
    return fruitFact[fruitName] || '"No fact available for this fruit."'
}

router.post('/getimages', async (req, res) => {
  try {
    const { names, fruitesData , name } = req.body;


    if(name){
        // all tho this will never happen still sanaty check 
        console.log(fruitesData);
        console.log(name);
        let existingFruit = await Fruit.findOne({ id: fruitesData.id });
        if (existingFruit) {
            console.log('✅ Found existing fruit in DB, returning it.');
            return res.status(200).json(existingFruit.toObject());
        }

        console.log('♻️ New fruit, fetching image and fact...');
        const fruitImageUrl = await getImageForFruites(name);
        const fruitFactText = getFruitesFact(name);
        console.log(fruitFactText);
        const combinedFruites = {
        ...fruitesData,
        imageUrl:fruitImageUrl,
        fruiteFact:fruitFactText
        }
        const newFruit = new Fruit(combinedFruites)
        const savedFruit = await newFruit.save();
        console.log('saved in db retur response...');
        return res.status(200).json(savedFruit.toObject());
    }else{
        console.log(`fetching image for ${names.join(', ')}`);
        // fetch images for all fruits
        const imagePromises = names.map(name => getImageForFruites(name));
        console.log(`mapping facts for ${names.join(', ')}`);
        const fruiteFacts = names.map(name => getFruitesFact(name));
        const imageUrls = await Promise.all(imagePromises);


        const results = [];
        
        for (let i = 0; i < fruitesData.length; i++) {
        const fruitData = { ...fruitesData[i], imageUrl: imageUrls[i] , fruiteFact:fruiteFacts[i]};

        // check if fruit already exists by id or name
        let existingFruit = await Fruit.findOne({ id: fruitData.id });

        if (existingFruit) {
            // if exists, just push existing
            // console.log('✅ fetching existed data...');
            
            results.push(existingFruit);
        } else {
            // otherwise save new fruit
            // console.log('♻️ calling Api for new data...');
            const newFruit = new Fruit(fruitData);
            const saved = await newFruit.save();
            results.push(saved);
        }
        }

        res.status(200).json(results);
    }
  } catch (err) {
    console.error("❌ Error saving fruits:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/getfruit',async(req,res)=>{
    try{
        const id = Number(req.query.id);
        // console.log(id);
        if(!id){
            res.status(400).json({message:'fruit id required!!!'});
        }
        const FruitsData = await Fruit.findOne({id:id});
        // console.log(FruitsData);
        res.status(200).json(FruitsData);

    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server issue!!!'});
    }
})



module.exports = router;