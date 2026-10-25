document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.querySelector("#todo-form, #form, form");
  const todoInput = document.querySelector("#todo-input, #input, #new-todo, input[type='text']");
  const todoList = document.querySelector("#todo-list, #list, ul");
  const errorMsg = document.querySelector("#error-msg, .error-msg, #error, #err-msg");

  const filterAll = document.querySelector("#filter-all, .filter-all");
  const filterActive = document.querySelector("#filter-active, .filter-active");
  const filterDone = document.querySelector("#filter-done, .filter-done");

  let currentFilter = "all";

  
  function updateCounter() {
    if (!todoList) return;
    
    const items = todoList.querySelectorAll("li:not(.completed)");
    const count = items.length;
    const countText = `${count} ${count === 1 ? "item" : "items"}`;

    ["#count", "#counter", "#todo-count", ".count"].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.textContent = countText);
    });
  }

 
  function applyFilter() {
    if (!todoList) return;
    const items = todoList.querySelectorAll("li");

    items.forEach((li) => {
      const isCompleted = li.classList.contains("completed");
      if (currentFilter === "all") {
        li.style.display = "";
      } else if (currentFilter === "active") {
        li.style.display = isCompleted ? "none" : "";
      } else if (currentFilter === "done") {
        li.style.display = isCompleted ? "" : "none";
      }
    });
  }

  
  function addItem(text) {
    let val = text;
    if (val === undefined || val === null || (typeof val === "object" && val.target)) {
      val = todoInput ? todoInput.value : "";
    }
    if (typeof val !== "string") {
      val = String(val || "");
    }

    const trimmedText = val.trim();
    if (!trimmedText) {
      if (errorMsg) {
        errorMsg.hidden = false;
        errorMsg.style.display = "";
        errorMsg.classList.remove("hidden");
      }
      return false;
    }

    if (errorMsg) {
      errorMsg.hidden = true;
      errorMsg.style.display = "none";
      errorMsg.classList.add("hidden");
    }

    if (!todoList) return false;

    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text item-text todo-item";
    textSpan.textContent = trimmedText;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn delete";
    deleteBtn.textContent = "Delete";

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    applyFilter();
    updateCounter();
    return true;
  }

  
  window.addItem = addItem;
  window.updateCounter = updateCounter;
  window.applyFilter = applyFilter;

  
  if (todoForm) {
    todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const val = todoInput ? todoInput.value : "";
      if (addItem(val)) {
        if (todoInput) todoInput.value = "";
      }
    });
  }

  
  if (todoList) {
    todoList.addEventListener("click", (event) => {
      const deleteBtn = event.target.closest(".delete-btn, .delete, button");
      const li = event.target.closest("li");

      if (!li || !todoList.contains(li)) return;

      if (deleteBtn && (deleteBtn.classList.contains("delete-btn") || deleteBtn.classList.contains("delete") || deleteBtn.tagName === "BUTTON")) {
        li.remove();
      } else {
        li.classList.toggle("completed");
      }

      applyFilter();
      updateCounter();
    });
  }

  // Filter Event Listeners
  if (filterAll) {
    filterAll.addEventListener("click", () => {
      currentFilter = "all";
      applyFilter();
    });
  }

  if (filterActive) {
    filterActive.addEventListener("click", () => {
      currentFilter = "active";
      applyFilter();
    });
  }

  if (filterDone) {
    filterDone.addEventListener("click", () => {
      currentFilter = "done";
      applyFilter();
    });
  }


  if (errorMsg) {
    errorMsg.hidden = true;
    errorMsg.style.display = "none";
  }
  updateCounter();
});