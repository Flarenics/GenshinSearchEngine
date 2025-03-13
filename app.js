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
    const nationName = document.getElementById("nationName");
    const nationElement = document.getElementById("nationElement");
    const nationLeader = document.getElementById("nationLeader");
    const imgNationIcon = document.getElementById("nationIcon");
    imgNationIcon.style.display = "none";
    nationName.textContent = ""
    nationElement.textContent = ""
    nationLeader.textContent = ""

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
    } else if (userInput == "nation"){
        try{
            const characterName = document.getElementById("characterName").value.toLocaleLowerCase();
            const response = await fetch(`https://genshin.jmp.blue/nations/${characterName}`)
    
            if(!response.ok){
                throw new Error("Could not fetch again womp");
            }
    
            const data = await response.json();
            const nationIcon = (`https://genshin.jmp.blue/nations/${characterName}/icon`);
    
            const imgElementSplash = document.getElementById("characterSplash");
            const imgElementCard = document.getElementById("characterCard");
            const imgElementIcon = document.getElementById("characterIcon");

            const nationName = document.getElementById("nationName");
            const nationElement = document.getElementById("nationElement");
            const nationLeader = document.getElementById("nationLeader");
            const imgNationIcon = document.getElementById("nationIcon");
    
            imgNationIcon.src = nationIcon;
            imgNationIcon.style.display = "block";
            nationName.textContent = data.name
            nationElement.textContent = data.element
            nationLeader.textContent = data.archon + ", " + data.controllingEntity
            
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

            const charName = document.getElementById("charName");
            const charTitle = document.getElementById("charTitle");
            const charDesc = document.getElementById("charDesc");
            const imgElementIcon = document.getElementById("characterIcon");
    
            imgElementIcon.src = nationIcon;
            imgElementIcon.style.display = "block";
            charName.textContent = data.name
            charTitle.textContent = data.element
            charDesc.textContent = data.archon + ", " + data.controllingEntity
            
            console.log(data);
        }
        catch(error){
            console.error(error);
        }
    } else {
        console.log('now how did you manage that?')
    }
}