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