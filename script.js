const appContent = document.getElementById("appContent");

document.getElementById("journalBtn").addEventListener("click", showJournal);
document.getElementById("homeBtn").addEventListener("click", showHome);

document.addEventListener("click", e => {
  if (e.target.classList.contains("mood")) {
    document.querySelectorAll(".mood").forEach(b => b.classList.remove("selected"));
    e.target.classList.add("selected");
    document.getElementById("moodInput").value = e.target.dataset.mood;
  }
});

function saveMood() {
  const moodInput = document.getElementById("moodInput");
  if (!moodInput) return;

  const mood = moodInput.value.trim();

  if (!mood) {
    alert("Please select your mood first!");
    return;
  }

  const journal = JSON.parse(localStorage.getItem("journal")) || [];

  const entry = {
    mood: mood,
    date: new Date().toLocaleString()
  };

  journal.push(entry);
  localStorage.setItem("journal", JSON.stringify(journal));

  moodInput.value = "";
  alert("Mood saved to journal! 😊");
}

function showJournal() {
  const journal = JSON.parse(localStorage.getItem("journal")) || [];

  appContent.innerHTML = `
    <section>
      <h2>Your Journal</h2>
      <div id="entries"></div>
    </section>
  `;

  const entriesDiv = document.getElementById("entries");

  if (journal.length === 0) {
    entriesDiv.innerHTML = "<p>No entries yet.</p>";
    return;
  }

  journal.forEach(entry => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${entry.date}</strong></p>
      <p>Mood: ${entry.mood}</p>
      <hr>
    `;
    entriesDiv.appendChild(div);
  });
}
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.shiftKey && e.key === "X") {
    if (confirm("Clear journal?")) {
      localStorage.removeItem("journal");
      alert("Journal cleared.");
    }
  }
});


function showHome() {
  appContent.innerHTML = `
    <section class="welcome-screen">
      <h2>Welcome!!!</h2>
      <p>How are you feeling today?</p>

      <div id="moodPicker">
        <button class="mood" data-mood="😊">😊</button>
        <button class="mood" data-mood="😢">😢</button>
        <button class="mood" data-mood="😡">😡</button>
        <button class="mood" data-mood="😍">😍</button>
        <button class="mood" data-mood="😴">😴</button>
      </div>

      <input type="hidden" id="moodInput">
      <button id="saveMood">Save</button>
    </section>
  `;

  document.getElementById("saveMood").addEventListener("click", saveMood);
}

document.getElementById("saveMood").addEventListener("click", saveMood);
