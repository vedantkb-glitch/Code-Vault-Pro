function showTab(tab, event) {
  document.querySelectorAll("textarea").forEach(t => t.classList.remove("active"));
  document.getElementById(tab).classList.add("active");

  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

function saveCode() {
  const title = document.getElementById("title").value;
  if (!title) return alert("Enter project name");

  const data = {
    html: html.value,
    css: css.value,
    js: js.value
  };

  localStorage.setItem(title, JSON.stringify(data));
  loadList();
  alert("Saved!");
}

function loadList() {
  saved.innerHTML = '<option value="">📂 Saved Projects</option>';
  for (let key in localStorage) {
    saved.innerHTML += `<option value="${key}">${key}</option>`;
  }
}

function loadCode() {
  const key = saved.value;
  if (!key) return;

  const data = JSON.parse(localStorage.getItem(key));
  title.value = key;
  html.value = data.html;
  css.value = data.css;
  js.value = data.js;
}

function runCode() {
  const title = document.getElementById("title").value;
  if (!title) return alert("Save project first");

  window.open(`output.html?project=${encodeURIComponent(title)}`, "_blank");
}

function deleteCode() {
  const key = saved.value;
  if (!key) return alert("Select project");

  if (confirm("Delete permanently?")) {
    localStorage.removeItem(key);
    title.value = html.value = css.value = js.value = "";
    loadList();
  }
}

loadList();
