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
            const constellationsBox = document.getElementById("constellationsBox");
            const noSearchResult = document.getElementById("noSearchResult");
            noSearchResult.style.display = "none";

            const characterName = document.getElementById("characterName").value.toLocaleLowerCase();
            
            try {
                const response = await fetch(`https://genshin.jmp.blue/characters/${characterName}`);
            
                if(!response.ok){
                    constellationsBox.style.display = "none";
                    totalOutputMid.style.display = "none";
                    noSearchResult.style.display = "block";

                    throw new Error("Could not fetch again womp");
                }

                totalOutputMid.style.display = "flex";
                constellationsBox.style.display = "flex";
    
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
                const charWeapon = document.getElementById("charWeapon");
                const charNation = document.getElementById("charNation");
                const charGender = document.getElementById("charGender");
                const charBirthday = document.getElementById("charBirthday");
                const charReleaseDate = document.getElementById("charReleaseDate");
                const charAffiliation = document.getElementById("charAffiliation");

                // image
                const charVisionImage = document.getElementById("charVisionImage");
                const charRarityImage = document.getElementById("charRarityImage");
                const charWeaponImage = document.getElementById("charWeaponImage");
                const charNationImage = document.getElementById("charNationImage");
                const charNamecardImage = document.getElementById("charNamecardImage");
        
                imgElementSplash.src = characterSplash;
                imgElementSplash.style.display = "block";
                imgElementCard.src = characterCard;
                imgElementCard.style.display = "block";
                //imgElementIcon.src = characterIcon;
                //imgElementIcon.style.display = "block";
                charName.textContent = data.name;
                charName.style.display = "block";
                charTitle.textContent = data.title;
                charDesc.textContent = data.description;
                charRarity.textContent = `(${data.rarity})`;
                charVision.textContent = data.vision;
                charWeapon.textContent = data.weapon;
                charNation.textContent = data.nation;
                charGender.textContent = data.gender;
                charAffiliation.textContent = `"${data.affiliation}"`;

                // function to parse raw birthday data onto readable month and days
                function formatBirthday(birthday) {
                    const [_, month, day] = birthday.split("-"); // Extract month and day
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"];
                    
                    const monthName = monthNames[parseInt(month) - 1]; // Convert month to name
                    const dayNumber = parseInt(day); // Convert day to number
                
                    // Function to get the ordinal suffix (st, nd, rd, th)
                    function getOrdinalSuffix(num) {
                        if (num >= 11 && num <= 13) return "th"; // Special case for 11th, 12th, 13th
                        switch (num % 10) {
                            case 1: return "st";
                            case 2: return "nd";
                            case 3: return "rd";
                            default: return "th";
                        }
                    }
                
                    return `${monthName} ${dayNumber}${getOrdinalSuffix(dayNumber)}`;
                }
                const birthdayData = data.birthday;
                charBirthday.textContent = formatBirthday(birthdayData);

                // function to parse raw release date data onto readable year, month, and days
                function formatReleaseDate(releaseDate) {
                    const [year, month, day] = releaseDate.split("-"); // Extract year, month, day
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"];
                    
                    const monthName = monthNames[parseInt(month) - 1]; // Convert month number to name
                    const dayNumber = parseInt(day); // Convert day to number
                
                    // Function to get the ordinal suffix (st, nd, rd, th)
                    function getOrdinalSuffix(num) {
                        if (num >= 11 && num <= 13) return "th"; // Special case for 11th, 12th, 13th
                        switch (num % 10) {
                            case 1: return "st";
                            case 2: return "nd";
                            case 3: return "rd";
                            default: return "th";
                        }
                    }
                
                    return `${monthName} ${dayNumber}${getOrdinalSuffix(dayNumber)}, ${year}`;
                }
                const releaseDateData = data.release;
                charReleaseDate.textContent = formatReleaseDate(releaseDateData);
                
                // namecard image
                charNamecardImage.src = `images/namecards/${data.name}.webp`;
                
                // vision image
                charVisionImage.src = `images/elements/${data.vision}.svg`;

                // weapon image
                charWeaponImage.src = `images/weapon/${data.weapon}.webp`;

                // nation image
                charNationImage.src = `images/nation/${data.nation}.webp`;

                // rarity image
                charRarityImage.src = `images/rarity/${data.rarity}.webp`;

                // constellations
                const constellations = data.constellations;
                const constellationsContainer = document.getElementById("charConstellations");

                // Loop through each constellation and append it to the container
                constellations.forEach((constellation) => {
                    const { level, name, description } = constellation;

                    // Create a new div for each constellation entry
                    const constellationElement = document.createElement("div");
                    constellationElement.classList.add("constellation-entry"); // Add a CSS class for styling

                    if (level != 6 ) {
                        // Insert HTML content with horizontal line 
                        constellationElement.innerHTML = `
                        <p><strong>Level ${level}:</strong> ${name}</p>
                        <p>${description}</p>
                        <hr>
                        `;
                    } else {
                        // Insert HTML content without horizontal line (only for last entry)
                        constellationElement.innerHTML = `
                        <p><strong>Level ${level}:</strong> ${name}</p>
                        <p class="mb-0">${description}</p>
                        `;
                    }
                    

                    // Append to the container
                    constellationsContainer.appendChild(constellationElement);
                });

                console.log(data);
            } catch (error) {
                constellationsBox.style.display = "none";
                totalOutputMid.style.display = "none";
                noSearchResult.style.display = "block";
                
                throw new Error("Could not fetch again womp");
            }
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
