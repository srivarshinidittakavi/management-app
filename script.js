// ✅ Vehicle image provided
const IMAGE_SRC = "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png";

// ---------------- LOGIN PAGE ----------------
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "admin@gmail.com" && password === "admin1234") {
      alert("Login success");
      window.location.href = "admin.html";
    } else {
      alert("Wrong email or password");
    }
  });
}

// ---------------- ADMIN PAGE ----------------
const fleetForm = document.getElementById("fleet-form");
const fleetGrid = document.getElementById("fleet-grid");

if (fleetForm && fleetGrid) {
  const state = {
    fleets: [],
    filters: { category: "All", availability: "All" },
  };

  const filterCategory = document.getElementById("filter-category");
  const filterAvailability = document.getElementById("filter-availability");
  const clearFilters = document.getElementById("clear-filters");

  fleetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const regNo = document.getElementById("regNo").value.trim();
    const category = document.getElementById("category").value;
    const driver = document.getElementById("driver").value.trim();
    const available = document.getElementById("available").checked;

    if (!regNo || !category || !driver) {
      alert("Please fill all required fields.");
      return;
    }

    const duplicate = state.fleets.some((f) => f.regNo.toLowerCase() === regNo.toLowerCase());
    if (duplicate) {
      alert("Vehicle already exists.");
      return;
    }

    state.fleets.push({ regNo, category, driver, available });
    fleetForm.reset();
    render();
  });

  filterCategory.addEventListener("change", (e) => {
    state.filters.category = e.target.value;
    render();
  });

  filterAvailability.addEventListener("change", (e) => {
    state.filters.availability = e.target.value;
    render();
  });

  clearFilters.addEventListener("click", () => {
    state.filters.category = "All";
    state.filters.availability = "All";
    filterCategory.value = "All";
    filterAvailability.value = "All";
    render();
  });

  function getFilteredFleets() {
    return state.fleets.filter((f) => {
      const categoryMatch =
        state.filters.category === "All" || f.category === state.filters.category;
      const availabilityMatch =
        state.filters.availability === "All" ||
        (state.filters.availability === "Available" && f.available) ||
        (state.filters.availability === "Unavailable" && !f.available);
      return categoryMatch && availabilityMatch;
    });
  }

  function render() {
    const fleets = getFilteredFleets();
    fleetGrid.innerHTML = "";

    fleets.forEach((fleet, index) => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = IMAGE_SRC;
      img.alt = "Vehicle";

      const title = document.createElement("h3");
      title.textContent = fleet.regNo;

      const meta = document.createElement("p");
      meta.textContent = `Category: ${fleet.category}`;

      const driver = document.createElement("p");
      driver.textContent = `Driver: ${fleet.driver}`;

      const availability = document.createElement("p");
      availability.textContent = `Status: ${fleet.available ? "Available" : "Unavailable"}`;

      const actions = document.createElement("div");
      actions.className = "actions";

      const btnUpdateDriver = document.createElement("button");
      btnUpdateDriver.className = "btn";
      btnUpdateDriver.textContent = "Update Driver";
      btnUpdateDriver.addEventListener("click", () => {
        const newName = prompt("Enter new driver name:");
        if (newName === null) return;
        const trimmed = newName.trim();
        if (!trimmed) {
          alert("Driver name cannot be empty.");
          return;
        }
        state.fleets[index].driver = trimmed;
        render();
      });

      const btnToggleAvailability = document.createElement("button");
      btnToggleAvailability.className = "btn";
      btnToggleAvailability.textContent = "Change Availability";
      btnToggleAvailability.addEventListener("click", () => {
        state.fleets[index].available = !state.fleets[index].available;
        render();
      });

      const btnDelete = document.createElement("button");
      btnDelete.className = "btn danger";
      btnDelete.textContent = "Delete Vehicle";
      btnDelete.addEventListener("click", () => {
        const ok = confirm(`Delete vehicle ${fleet.regNo}?`);
        if (!ok) return;
        state.fleets.splice(index, 1);
        render();
      });

      actions.append(btnUpdateDriver, btnToggleAvailability, btnDelete);
      card.append(img, title, meta, driver, availability, actions);
      fleetGrid.append(card);
    });
  }

  // Initial render
  render();
}