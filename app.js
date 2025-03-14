async function fetchInfo(){

    const userInput = document.getElementById("searchPoints").value.toLocaleLowerCase();
    console.log(userInput);

    const imgElementSplash = document.getElementById("characterSplash");
    const imgElementCard = document.getElementById("characterCard");
    const imgElementIcon = document.getElementById("characterIcon");
    imgElementSplash.style.display = "none";
    imgElementCard.style.display = "none";
    imgElementIcon.style.display = "none";
    const charName = document.getElementById("charName");
    const charTitle = document.getElementById("charTitle");
    const charDesc = document.getElementById("charDesc");
    charName.textContent = ""
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

    circletTitle.textContent = ""
    flowerTitle.textContent = ""
    gobletTitle.textContent = ""
    plumeTitle.textContent = ""
    sandsTitle.textContent = ""

    imgElementCirclet.src = "";
    imgElementCirclet.style.display = "none";
    imgElementFlower.src = "";
    imgElementFlower.style.display = "none";
    imgElementGoblet.src = "";
    imgElementGoblet.style.display = "none";
    imgElementPlume.src = "";
    imgElementPlume.style.display = "none";
    imgElementSands.src = "";
    imgElementSands.style.display = "none";

    if (userInput == "character"){
        try{
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
            const imgElementIcon = document.getElementById("characterIcon");
            const charName = document.getElementById("charName");
            const charTitle = document.getElementById("charTitle");
            const charDesc = document.getElementById("charDesc");
    
            imgElementSplash.src = characterSplash;
            imgElementSplash.style.display = "block";
            imgElementCard.src = characterCard;
            imgElementCard.style.display = "block";
            imgElementIcon.src = characterIcon;
            imgElementIcon.style.display = "block";
            charName.textContent = data.name
            charTitle.textContent = data.title
            charDesc.textContent = data.description
            
            console.log(data);
        }
        catch(error){
            console.error(error);
        }
    } else if (userInput == "artifact"){
        try{
            const characterName = document.getElementById("characterName").value.toLocaleLowerCase();
            const response = await fetch(`https://genshin.jmp.blue/artifacts/${characterName}`)
    
            if(!response.ok){
                throw new Error("Could not fetch again womp");
            }
    
            const data = await response.json();
            const circletImg = (`https://genshin.jmp.blue/artifacts/${characterName}/circlet-of-logos`);
            const flowerImg = (`https://genshin.jmp.blue/artifacts/${characterName}/flower-of-life`);
            const gobletImg = (`https://genshin.jmp.blue/artifacts/${characterName}/goblet-of-eonothem`);
            const plumeImg = (`https://genshin.jmp.blue/artifacts/${characterName}/plume-of-death`);
            const sandsImg = (`https://genshin.jmp.blue/artifacts/${characterName}/sands-of-eon`);
            
            const imgElementCirclet = document.getElementById('artCirclet')
            const imgElementFlower = document.getElementById('artFlower')
            const imgElementGoblet = document.getElementById('artGoblet')
            const imgElementPlume = document.getElementById('artPlume')
            const imgElementSands = document.getElementById('artSands')

            imgElementCirclet.src = circletImg;
            imgElementCirclet.style.display = "block";
            imgElementFlower.src = flowerImg;
            imgElementFlower.style.display = "block";
            imgElementGoblet.src = gobletImg;
            imgElementGoblet.style.display = "block";
            imgElementPlume.src = plumeImg;
            imgElementPlume.style.display = "block";
            imgElementSands.src = sandsImg;
            imgElementSands.style.display = "block";

            circletTitle.textContent = "Circlet"
            flowerTitle.textContent = "Flower"
            gobletTitle.textContent = "Goblet"
            plumeTitle.textContent = "Plume"
            sandsTitle.textContent = "Sands"

            console.log(data);
        }
        catch(error){
            console.error(error);
        }
    } else {
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
    const changeMe4 = document.getElementById("characterIcon");


    changeMe.style.color = `rgb(${R},${G},${B})`;
    changeMe.style.filter = `saturate(8) brightness(1.2) drop-shadow(0px 0px 32px rgba(${R},${G},${B}, 0.8))`;

    changeMe2.style.boxShadow = `0px 0px 64px rgba(${R},${G},${B}, 1)`;
    changeMe3.style.boxShadow = `0px 0px 64px rgba(${R},${G},${B}, 1)`;
    changeMe4.style.boxShadow = `0px 0px 64px rgba(${R},${G},${B}, 1)`;

    changeMe2.style.borderColor = `rgba(${R},${G},${B}, 1)`;
    changeMe3.style.borderColor = `rgba(${R},${G},${B}, 1)`;
    changeMe4.style.borderColor = `rgba(${R},${G},${B}, 1)`;
};