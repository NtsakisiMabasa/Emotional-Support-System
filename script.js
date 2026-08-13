// ==============================
// MindBridge Frontend JavaScript
// ==============================


// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        const user = {
            username,
            email,
            password
        };


        localStorage.setItem(
            "mindbridgeUser",
            JSON.stringify(user)
        );


        alert("Account created successfully 💙");

        window.location.href = "dashboard.html";

    });
}



// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;


        const storedUser =
            JSON.parse(localStorage.getItem("mindbridgeUser"));


        if (
            storedUser &&
            storedUser.email === email &&
            storedUser.password === password
        ) {

            localStorage.setItem("loggedIn", "true");

            window.location.href = "dashboard.html";

        } else {

            alert("Incorrect email or password.");

        }

    });
}



// DASHBOARD USERNAME
const usernameElement =
    document.getElementById("dashboardUsername");

if (usernameElement) {

    const user =
        JSON.parse(localStorage.getItem("mindbridgeUser"));

    if (user) {
        usernameElement.textContent = user.username;
    }

}



// MOOD
function saveMood(mood) {

    const moods =
        JSON.parse(localStorage.getItem("moods")) || [];

    moods.push({
        mood: mood,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "moods",
        JSON.stringify(moods)
    );

    alert(`Mood saved: ${mood} 💙`);

    displayMoods();
}


function selectMood(mood) {

    saveMood(mood);

    window.location.href = "mood.html";

}


function displayMoods() {

    const history =
        document.getElementById("moodHistory");

    if (!history) return;


    const moods =
        JSON.parse(localStorage.getItem("moods")) || [];


    if (moods.length === 0) {

        history.innerHTML =
            "<p>No mood entries yet.</p>";

        return;
    }


    history.innerHTML = "";


    moods.slice().reverse().forEach(entry => {

        const div =
            document.createElement("div");

        div.className = "post";

        div.innerHTML = `
            <div>
                <strong>${entry.mood}</strong>
                <p>${entry.date}</p>
            </div>
        `;

        history.appendChild(div);

    });

}


displayMoods();



// JOURNAL
function saveJournal() {

    const title =
        document.getElementById("journalTitle").value;

    const content =
        document.getElementById("journalContent").value;


    if (!title || !content) {

        alert("Please complete your journal entry.");

        return;
    }


    const journals =
        JSON.parse(localStorage.getItem("journals")) || [];


    journals.push({

        title,
        content,

        date:
            new Date().toLocaleString()

    });


    localStorage.setItem(
        "journals",
        JSON.stringify(journals)
    );


    document.getElementById("journalTitle").value = "";

    document.getElementById("journalContent").value = "";


    alert("Journal entry saved 💙");

    displayJournals();

}


function displayJournals() {

    const container =
        document.getElementById("journalEntries");

    if (!container) return;


    const journals =
        JSON.parse(localStorage.getItem("journals")) || [];


    container.innerHTML = "";


    journals.slice().reverse().forEach(entry => {

        const div =
            document.createElement("div");

        div.className = "post";

        div.innerHTML = `
            <div>
                <h3>${entry.title}</h3>
                <small>${entry.date}</small>
                <p>${entry.content}</p>
            </div>
        `;

        container.appendChild(div);

    });

}


displayJournals();



// COMMUNITY
function createPost() {

    const content =
        document.getElementById("postContent").value;


    if (!content.trim()) {

        alert("Please write something first.");

        return;

    }


    const postContainer =
        document.getElementById("communityPosts");


    const post =
        document.createElement("article");

    post.className = "post";


    post.innerHTML = `
        <span class="anonymous-avatar">A</span>

        <div>
            <strong>Anonymous</strong>

            <p>${content}</p>

            <button>💙 Support</button>
        </div>
    `;


    postContainer.prepend(post);


    document.getElementById("postContent").value = "";

}



// BREATHING EXERCISE
function startBreathing() {

    const box =
        document.getElementById("breathingBox");

    const text =
        document.getElementById("breathingText");


    box.classList.remove("hidden");


    let breathingIn = true;


    setInterval(() => {

        if (breathingIn) {

            text.textContent =
                "Breathe in slowly...";

        } else {

            text.textContent =
                "Breathe out slowly...";

        }

        breathingIn = !breathingIn;

    }, 4000);

}

// ==============================
// MINDFULNESS
// ==============================

function startMindfulness() {

    const modal = document.getElementById("wellnessModal");
    const icon = document.getElementById("wellnessModalIcon");
    const title = document.getElementById("wellnessModalTitle");
    const text = document.getElementById("wellnessModalText");
    const reflection = document.getElementById("reflectionInput");

    icon.textContent = "🧘";

    title.textContent = "Mindfulness";

    text.innerHTML = `
        Find a comfortable position.<br><br>

        Take a slow breath in.<br>
        Hold it gently.<br>
        Slowly breathe out.<br><br>

        Notice what you can see, hear and feel
        around you.<br><br>

        You don't need to change anything.
        Simply be present.
    `;

    reflection.classList.add("hidden");

    modal.classList.remove("hidden");
}


// ==============================
// REFLECTION
// ==============================

function startReflection() {

    const modal = document.getElementById("wellnessModal");
    const icon = document.getElementById("wellnessModalIcon");
    const title = document.getElementById("wellnessModalTitle");
    const text = document.getElementById("wellnessModalText");
    const reflection = document.getElementById("reflectionInput");

    icon.textContent = "💭";

    title.textContent = "Take a moment to reflect";

    text.textContent =
        "What is one thing you're grateful for today? " +
        "It can be something small.";

    reflection.classList.remove("hidden");

    modal.classList.remove("hidden");
}


// ==============================
// SAVE REFLECTION
// ==============================

function saveReflection() {

    const input =
        document.getElementById("reflectionText");

    const reflection =
        input.value.trim();

    if (!reflection) {

        alert("Please write something before saving.");

        return;
    }

    const reflections =
        JSON.parse(
            localStorage.getItem("reflections")
        ) || [];

    reflections.push({

        text: reflection,

        date:
            new Date().toLocaleString()

    });

    localStorage.setItem(
        "reflections",
        JSON.stringify(reflections)
    );

    input.value = "";

    alert("Reflection saved 💙");

    closeWellnessModal();
}


// ==============================
// CLOSE MODAL
// ==============================

function closeWellnessModal() {

    const modal =
        document.getElementById("wellnessModal");

    modal.classList.add("hidden");

}