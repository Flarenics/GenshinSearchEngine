// else if (userInput == "artifact"){
//     try{
//         const characterName = document.getElementById("characterName").value.toLocaleLowerCase();
//         const response = await fetch(`https://genshin.jmp.blue/artifacts/${characterName}`)

//         if(!response.ok){
//             throw new Error("Could not fetch again womp");
//         }

//         const data = await response.json();
//         const circletImg = (`https://genshin.jmp.blue/artifacts/${characterName}/circlet-of-logos`);
//         const flowerImg = (`https://genshin.jmp.blue/artifacts/${characterName}/flower-of-life`);
//         const gobletImg = (`https://genshin.jmp.blue/artifacts/${characterName}/goblet-of-eonothem`);
//         const plumeImg = (`https://genshin.jmp.blue/artifacts/${characterName}/plume-of-death`);
//         const sandsImg = (`https://genshin.jmp.blue/artifacts/${characterName}/sands-of-eon`);
        
//         const imgElementCirclet = document.getElementById('artCirclet')
//         const imgElementFlower = document.getElementById('artFlower')
//         const imgElementGoblet = document.getElementById('artGoblet')
//         const imgElementPlume = document.getElementById('artPlume')
//         const imgElementSands = document.getElementById('artSands')

//         imgElementCirclet.src = circletImg;
//         imgElementCirclet.style.display = "block";
//         imgElementFlower.src = flowerImg;
//         imgElementFlower.style.display = "block";
//         imgElementGoblet.src = gobletImg;
//         imgElementGoblet.style.display = "block";
//         imgElementPlume.src = plumeImg;
//         imgElementPlume.style.display = "block";
//         imgElementSands.src = sandsImg;
//         imgElementSands.style.display = "block";

//         circletTitle.textContent = "Circlet"
//         flowerTitle.textContent = "Flower"
//         gobletTitle.textContent = "Goblet"
//         plumeTitle.textContent = "Plume"
//         sandsTitle.textContent = "Sands"

//         console.log(data);
        
//     }
//     catch(error){
//         console.error(error);
//     }
// }