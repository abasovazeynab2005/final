let allStories = null;
let currentCharacter = null;

let BIN_1_URL = "https://api.jsonbin.io/v3/b/6a2142acda38895dfe8577af/latest";
let BIN_2_URL = "https://api.jsonbin.io/v3/b/6a21438eda38895dfe857b6c/latest";


function loadStories() {
  console.log("🔄 Loading...");

  fetch(BIN_1_URL)
    .then(function(res1) {
      return Promise.all([res1.json(), fetch(BIN_2_URL).then(function(res2) {
        return res2.json();
      })]);
    })
    .then(function(results) {
      let data1 = results[0];
      let data2 = results[1];

      // Объединяем через spread
       allStories = { ...data1.record, ...data2.record };

      console.log("✅ Loaded characters:", Object.keys(allStories).length);
      console.log("📋 Characters:", Object.keys(allStories));

      attachCardHandlers();
    })
    .catch(function(error) {
      console.warn("❌ Failed to load from JSONBin, trying locally:", error);

      fetch("./story.json")
        .then(function(res) { return res.json(); })
        .then(function(localData) {
          allStories = localData;
          console.log("✅ Loaded locally:", Object.keys(allStories).length);
          attachCardHandlers();
        })
        .catch(function(err) {
          console.error("❌ Everything broke:", err);
          document.querySelector(".main-title").textContent = "😢 Failed to load stories.";
        });
    });
}


function attachCardHandlers() {
  let cards = document.querySelectorAll(".card");
  console.log("🃏 Карточек в HTML:", cards.length);

  
  Array.from(cards).map(function(card) {
    let characterId = card.dataset.character;

    
    let hasData = allStories && allStories[characterId];

    
    hasData && card.addEventListener("click", function() {
      console.log("👆 Клик:", characterId);
      openChat(characterId);
    });

    return card;
  });
}

function openChat(characterId) {
  currentCharacter = characterId;
  let data = allStories[characterId];

  document.getElementById("main-screen").style.display = "none";
  document.getElementById("story-screen").style.display = "flex";
  document.getElementById("character-name").textContent = data.name;
  document.getElementById("story-card").innerHTML = "";

  goToScene("start");
}

function goToScene(sceneId) {
  let story = allStories[currentCharacter];
  let scene = story.scenes[sceneId];
  let storyCard = document.getElementById("story-card");
  let choicesDiv = document.getElementById("choices-container");

  let msg = document.createElement("div");
  msg.className = "msg bot-msg";
  msg.textContent = scene.text;
  storyCard.appendChild(msg);
  storyCard.scrollTop = storyCard.scrollHeight;

  choicesDiv.innerHTML = "";

  if (scene.ending) {
    showEnding(scene, choicesDiv, storyCard);
    return;
  }

  (scene.choices || []).map(function(choice) {
    let btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.text;

    btn.addEventListener("click", function() {
      let userMsg = document.createElement("div");
      userMsg.className = "msg user-msg";
      userMsg.textContent = choice.text;
      storyCard.appendChild(userMsg);
      storyCard.scrollTop = storyCard.scrollHeight;

     
      goToScene(choice.next);
    });

    choicesDiv.appendChild(btn);
    return btn;
  });
}

function showEnding(scene, choicesDiv, storyCard) {
  let endings = {
    good: { emoji: "🎉", text: "GOOD ENDING!" },
    bad: { emoji: "💀", text: "BAD ENDING!" },
    neutral: { emoji: "😐", text: "NEUTRAL ENDING!" }
  };

  let ending = endings[scene.ending] || endings.neutral;

  let endingEl = document.createElement("div");
  endingEl.className = "ending-text ending-" + scene.ending;
  endingEl.textContent = ending.emoji + " " + ending.text;
  choicesDiv.appendChild(endingEl);

  let replayBtn = document.createElement("button");
  replayBtn.className = "choice-btn end-btn";
  replayBtn.textContent = "🔄 Try Again";
  replayBtn.addEventListener("click", function() {
    storyCard.innerHTML = "";
    goToScene("start");
  });
  choicesDiv.appendChild(replayBtn);

  let backBtn = document.createElement("button");
  backBtn.className = "choice-btn";
  backBtn.textContent = "👥 Choose Another";
  backBtn.addEventListener("click", closeChat);
  choicesDiv.appendChild(backBtn);
}

function closeChat() {
  document.getElementById("main-screen").style.display = "block";
  document.getElementById("story-screen").style.display = "none";
  currentCharacter = null;
}

document.getElementById("back-btn").addEventListener("click", closeChat);

loadStories();