const KEY = "wm_teacher_mode";
const KEY_SHOW = "wm_show_teacher_toggle";

function isTeacher(){
  return localStorage.getItem(KEY) === "1";
}
function setTeacher(on){
  localStorage.setItem(KEY, on ? "1" : "0");
  applyTeacher();
  toast(on ? "Teacher Mode ON" : "Teacher Mode OFF");
}
function isShowToggle(){
  return localStorage.getItem(KEY_SHOW) === "1";
}
function setShowToggle(on){
  localStorage.setItem(KEY_SHOW, on ? "1" : "0");
  applyTeacher();
  toast(on ? "Teacher toggle unlocked" : "Teacher toggle hidden");
}

function applyTeacher(){
  const on = isTeacher();
  document.body.classList.toggle("teacher-on", on);

  const showToggle = isShowToggle();
  document.body.classList.toggle("show-teacher-toggle", showToggle);

  // If toggle exists, sync it (even if hidden)
  const toggle = document.getElementById("teacherModeToggle");
  if(toggle) toggle.checked = on;

  const label = document.getElementById("teacherModeLabel");
  if(label) label.textContent = on ? "Teacher Mode" : "Student Mode";

  const badge = document.getElementById("teacherBadge");
  if(badge) badge.style.display = on ? "inline-flex" : "none";
}

function markActiveTab(){
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".pill").forEach(p=>{
    const href = (p.getAttribute("href") || "").toLowerCase();
    if(href.endsWith(current)) p.classList.add("active");
  });
}

/* Toast */
let toastTimer = null;
function ensureToast(){
  let t = document.querySelector(".toast");
  if(!t){
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  return t;
}
function toast(msg){
  const t = ensureToast();
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove("show"), 1400);
}

/* Secret typing: "teach" toggles teacher mode; "toggle" shows/hides the checkbox UI */
let buffer = "";
function onKey(e){
  const ch = (e.key || "").toLowerCase();
  if(ch.length !== 1 || ch < "a" || ch > "z") return;

  buffer = (buffer + ch).slice(-8);

  if(buffer.endsWith("teach")){
    setTeacher(!isTeacher());
  }
  if(buffer.endsWith("toggle")){
    setShowToggle(!isShowToggle());
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  // Normal visible checkbox still works (if you unlock it)
  const toggle = document.getElementById("teacherModeToggle");
  if(toggle){
    toggle.addEventListener("change", ()=> setTeacher(toggle.checked));
  }

  // Double-click logo = toggle teacher mode (hard to find)
  const logo = document.querySelector(".logo");
  if(logo){
    logo.title = ""; // don’t hint
    logo.addEventListener("dblclick", ()=> setTeacher(!isTeacher()));
  }

  document.addEventListener("keydown", onKey);

  applyTeacher();
  markActiveTab();
});
