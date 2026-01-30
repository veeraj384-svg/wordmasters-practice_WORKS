// WordMasters Practice — simple working quiz engine

document.addEventListener("DOMContentLoaded", () => {

  // ---------- SAMPLE QUESTIONS ----------
  const WEEK1 = [
    {
      q: "The director gave a brief, ______ speech that avoided unnecessary details.",
      choices: ["verbose", "succinct", "erratic", "arbitrary"],
      a: "succinct"
    },
    {
      q: "Despite the noise, she remained ______ and focused on her work.",
      choices: ["placid", "fickle", "boisterous", "frantic"],
      a: "placid"
    },
    {
      q: "His apology sounded ______, as if he were only saying the words.",
      choices: ["sincere", "glib", "arduous", "solemn"],
      a: "glib"
    }
  ];

  const page = document.body.getAttribute("data-page");
  if (page !== "week1") return;

  const qwrap = document.getElementById("qwrap");
  const checkBtn = document.getElementById("checkBtn");
  const resetBtn = document.getElementById("resetBtn");
  const scoreLine = document.getElementById("scoreLine");

  if (!qwrap || !checkBtn || !resetBtn || !scoreLine) {
    qwrap.innerHTML = "<p>Setup error: missing page elements.</p>";
    return;
  }

  // ---------- RENDER QUESTIONS ----------
  const selects = [];

  WEEK1.forEach((item, i) => {
    const div = document.createElement("div");
    div.style.marginBottom = "12px";

    const p = document.createElement("p");
    p.textContent = `Q${i + 1}. ${item.q}`;

    const sel = document.createElement("select");
    sel.innerHTML = `<option value="">-- choose --</option>`;
    item.choices.forEach(c => {
      const o = document.createElement("option");
      o.value = c;
      o.textContent = c;
      sel.appendChild(o);
    });

    div.appendChild(p);
    div.appendChild(sel);
    qwrap.appendChild(div);

    selects.push({ sel, answer: item.a });
  });

  // ---------- BUTTONS ----------
  checkBtn.onclick = () => {
    let correct = 0;
    selects.forEach(({ sel, answer }) => {
      if (sel.value === answer) {
        sel.style.border = "2px solid #4cd964";
        correct++;
      } else {
        sel.style.border = "2px solid #ff4d6d";
      }
    });
    scoreLine.textContent = `Score: ${correct} / ${selects.length}`;
  };

  resetBtn.onclick = () => {
    selects.forEach(({ sel }) => {
      sel.value = "";
      sel.style.border = "";
    });
    scoreLine.textContent = "";
  };

});






