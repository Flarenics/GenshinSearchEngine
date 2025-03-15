window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 0) {
      header.classList.add("headerSmaller");
    } else {
      header.classList.remove("headerSmaller");
    }
});

async function fetchInfo(){

    const userInput = document.getElementById("searchPoints").value.toLocaleLowerCase();
    console.log(userInput);

    const imgElementSplash = document.getElementById("characterSplash");
    const imgElementCard = document.getElementById("characterCard");
    //const imgElementIcon = document.getElementById("characterIcon");
    imgElementSplash.style.display = "none";
    imgElementCard.style.display = "none";
    //imgElementIcon.style.display = "none";
    const charName = document.getElementById("charName");
    const charTitle = document.getElementById("charTitle");
    const charDesc = document.getElementById("charDesc");
    charName.textContent = ""
    charName.style.display = "none";
    charTitle.textContent = ""
    charDesc.textContent = ""

    const imgElementCirclet = document.getElementById('artCirclet')
    const imgElementFlower = document.getElementById('artFlower')
    const imgElementGoblet = document.getElementById('artGoblet')
    const imgElementPlume = document.getElementById('artPlume')
    const imgElementSands = document.getElementById('artSands')

    const circletTitle = document.getElementById("circletTitle");
    const flowerTitle = document.getElementById("flowerTitle");
    const gobletTitle = document.getElementById("gobletTitle")
    const plumeTitle = document.getElementById("plumeTitle")
    const sandsTitle = document.getElementById("sandsTitle")

    //circletTitle.textContent = ""
    //flowerTitle.textContent = ""
    //gobletTitle.textContent = ""
    //plumeTitle.textContent = ""
    //sandsTitle.textContent = ""

    //imgElementCirclet.src = "";
    //imgElementCirclet.style.display = "none";
    //imgElementFlower.src = "";
    //imgElementFlower.style.display = "none";
    //imgElementGoblet.src = "";
    //imgElementGoblet.style.display = "none";
    //imgElementPlume.src = "";
    //imgElementPlume.style.display = "none";
    //imgElementSands.src = "";
    //imgElementSands.style.display = "none";

    const totalOutputMid = document.getElementById("totalOutputMid");
    totalOutputMid.style.display = "none";

    //const changeMe = document.getElementById("charName");
    //const changeMe2 = document.getElementById("characterSplash");
    //const changeMe3 = document.getElementById("characterCard");
    //const changeMe4 = document.getElementById("characterIcon");

    //changeMe.style.color = `rgba(184, 184, 184, 0.34)`;
    //changeMe.style.filter = `drop-shadow(0px 0px 32px rgba(184, 184, 184, 0.34))`;

    //changeMe2.style.boxShadow = `0px 0px 2px rgba(184, 184, 184, 0.34)`;
    //changeMe3.style.boxShadow = `0px 0px 2px rgba(184, 184, 184, 0.34)`;
    //changeMe4.style.boxShadow = `0px 0px 2px rgba(255, 255, 255, 0.15)`;

    //changeMe2.style.borderColor = `rgba(184, 184, 184, 0.34)`;
    //changeMe3.style.borderColor = `rgba(184, 184, 184, 0.34)`;
    //changeMe4.style.borderColor = `rgba(255, 255, 255, 0.15)`;

    if (userInput == "character"){
        try{
            const totalOutputMid = document.getElementById("totalOutputMid");
            totalOutputMid.style.display = "flex";

            const characterName = document.getElementById("characterName").value.toLocaleLowerCase();
            const response = await fetch(`https://genshin.jmp.blue/characters/${characterName}`)
    
            if(!response.ok){
                throw new Error("Could not fetch again womp");
            }
    
            const data = await response.json();
            const characterSplash = (`https://genshin.jmp.blue/characters/${characterName}/gacha-splash`);
            const characterCard = (`https://genshin.jmp.blue/characters/${characterName}/gacha-card`);
            const characterIcon = (`https://genshin.jmp.blue/characters/${characterName}/icon-big`);
    
            const imgElementSplash = document.getElementById("characterSplash");
            const imgElementCard = document.getElementById("characterCard");
            //const imgElementIcon = document.getElementById("characterIcon");
            const charName = document.getElementById("charName");
            const charTitle = document.getElementById("charTitle");
            const charDesc = document.getElementById("charDesc");
            const charRarity = document.getElementById("charRarity");
            const charVision = document.getElementById("charVision");
            const charVisionWrapper = document.getElementById("charVisionWrapper");

            const charVisionImage = document.getElementById("charVisionImage");
            const charRarityImage = document.getElementById("charRarityImage");
    
            imgElementSplash.src = characterSplash;
            imgElementSplash.style.display = "block";
            imgElementCard.src = characterCard;
            imgElementCard.style.display = "block";
            //imgElementIcon.src = characterIcon;
            //imgElementIcon.style.display = "block";
            charName.textContent = data.name
            charName.style.display = "block";
            charTitle.textContent = data.title
            charDesc.textContent = data.description

            var newVisionImage = ("");
            var newRarityImage = ("");
            
            charRarity.textContent = data.rarity;
            charVision.textContent = data.vision;
            charRarityWrapper.style.display = "flex";
            charVisionWrapper.style.display = "flex";

            if (data.vision == "Pyro"){
                newVisionImage = ("images\\elements\\Pyro.svg");
            } else if (data.vision == "Hydro"){
                newVisionImage = ("images\\elements\\Hydro.svg");
            } else if (data.vision == "Anemo"){
                newVisionImage = ("images\\elements\\Anemo.svg");
            } else if (data.vision == "Electro"){
                newVisionImage = ("images\\elements\\Electro.svg");
            } else if (data.vision == "Dendro"){
                newVisionImage = ("images\\elements\\Dendro.svg");
            } else if (data.vision == "Cryo"){
                newVisionImage = ("images\\elements\\Cryo.svg");
            } else if (data.vision == "Geo"){
                newVisionImage = ("images\\elements\\Geo.svg");
            };

            if (data.rarity == "4"){
                newRarityImage = ("images\\rarity\\4star.webp");
            } else if (data.rarity == "5"){
                newRarityImage = ("images\\rarity\\5star.webp");
            }

            charVisionImage.src = newVisionImage;
            charRarityImage.src = newRarityImage;

            console.log(data);
        }
        catch(error){
            console.error(error);
        }
    }  else {
        console.log('now how did you manage that?')
    }
}

function getColor(imageElem, ratio) {
    const canvas = document.createElement('canvas');

    let width = canvas.width = imageElem.width;
    let height = canvas.height = imageElem.height;

    const context = canvas.getContext('2d');
    context.drawImage(imageElem, 0, 0);

    let data, length;
    let i = -4, count = 0;

    try {
        data = context.getImageData(0, 0, width, height);
        length = data.data.length;
    } catch (err) {
        console.error(err);
        return {
            R: 0,
            G: 0,
            B: 0
        };
    }

    let R, G, B;
    R = G = B = 0;

    while ((i += ratio * 4) < length) {
        ++count;

        R += data.data[i];
        G += data.data[i + 1];
        B += data.data[i + 2];
    }

    R = ~~(R / count);
    G = ~~(G / count);
    B = ~~(B / count);

    return {
        R,
        G,
        B
    };
}

const image = document.getElementById("characterSplash");
image.onload = function() {
    const { R, G, B } = getColor(image,4);

    const changeMe = document.getElementById("charName");
    const changeMe2 = document.getElementById("characterSplash");
    const changeMe3 = document.getElementById("characterCard");
    //const changeMe4 = document.getElementById("characterIcon");


    changeMe.style.color = `rgb(${R},${G},${B})`;
    changeMe.style.filter = `saturate(4) brightness(1.2) drop-shadow(0px 0px 24px rgba(${R},${G},${B}, 0.8))`;

    changeMe2.style.boxShadow = `0px 0px 32px rgba(${R},${G},${B}, 1)`;
    changeMe3.style.boxShadow = `0px 0px 32px rgba(${R},${G},${B}, 1)`;
    //changeMe4.style.boxShadow = `0px 0px 64px rgba(${R},${G},${B}, 1)`;

    changeMe2.style.borderColor = `rgba(${R},${G},${B}, 1)`;
    changeMe3.style.borderColor = `rgba(${R},${G},${B}, 1)`;
    //changeMe4.style.borderColor = `rgba(${R},${G},${B}, 1)`;
};

function search(event) {
    let value = event.which;
    if(value === 13){
  
     // use this to prevent form submit
       event.preventDefault();
  
     //call your function or anything else
     fetchInfo();
    }
};