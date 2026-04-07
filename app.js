// =====================
// Vintage Postcard Maker
// app.js
// =====================

let currentFont   = "'Playfair Display', serif";
let currentBg     = "#F5EED5";
let currentText   = "#5C3D11";
let numSlots      = 1;
let photoData     = [null, null, null, null];
let currentSide   = "front";

// ── DOM references ──────────────────────────────────────────
const captionInput = document.getElementById("captionInput");
const msgInput     = document.getElementById("msgInput");
const addr1        = document.getElementById("addr1");
const addr2        = document.getElementById("addr2");
const addr3        = document.getElementById("addr3");
const captionText  = document.getElementById("captionText");
const backMsg      = document.getElementById("backMsg");
const backAddr1    = document.getElementById("backAddr1");
const backAddr2    = document.getElementById("backAddr2");
const backAddr3    = document.getElementById("backAddr3");
const captionBar   = document.getElementById("captionBar");
const frontSide    = document.getElementById("frontSide");
const backSide     = document.getElementById("backSide");
const photoGrid    = document.getElementById("photoGrid");
const frontBtn     = document.getElementById("frontBtn");
const backBtn      = document.getElementById("backBtn");

// ── Font selection ──────────────────────────────────────────
document.getElementById("fontGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".font-btn");
  if (!btn) return;
  document.querySelectorAll(".font-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFont = btn.dataset.font;
  applyFont();
});

function applyFont() {
  captionText.style.fontFamily = currentFont;
  backMsg.style.fontFamily     = currentFont;
}

// ── Card color ──────────────────────────────────────────────
document.getElementById("cardColorRow").addEventListener("click", (e) => {
  const s = e.target.closest(".color-swatch");
  if (!s) return;
  document.querySelectorAll("#cardColorRow .color-swatch").forEach(x => x.classList.remove("active"));
  s.classList.add("active");
  currentBg = s.dataset.bg;
  frontSide.style.background  = currentBg;
  captionBar.style.background = currentBg;
  backSide.style.background   = currentBg;
});

// ── Text color ───────────────────────────────────────────────
document.getElementById("textColorRow").addEventListener("click", (e) => {
  const s = e.target.closest(".color-swatch");
  if (!s) return;
  document.querySelectorAll("#textColorRow .color-swatch").forEach(x => x.classList.remove("active"));
  s.classList.add("active");
  currentText = s.dataset.color;
  captionText.style.color = currentText;
  backMsg.style.color     = currentText;
});

// ── Photo slots ──────────────────────────────────────────────
document.getElementById("slotGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".slot-btn");
  if (!btn) return;
  document.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  numSlots = parseInt(btn.dataset.slots);
  rebuildGrid();
});

function rebuildGrid() {
  const gridClasses = ["photo-grid-1","photo-grid-2","photo-grid-3","photo-grid-4"];
  photoGrid.className = gridClasses[numSlots - 1];

  photoGrid.innerHTML = "";
  for (let i = 0; i < numSlots; i++) {
    const cell = document.createElement("div");
    cell.className = "photo-cell";
    cell.id = `cell${i}`;

    if (numSlots === 3 && i === 0) {
      cell.style.gridRow = "span 2";
    }

    if (photoData[i]) {
      const img = document.createElement("img");
      img.src = photoData[i];
      img.alt = "";
      cell.appendChild(img);
    } else {
      const icon = document.createElement("span");
      icon.className = "add-icon";
      icon.textContent = "+";
      cell.appendChild(icon);
    }

    const fileInput = document.createElement("input");
    fileInput.type   = "file";
    fileInput.accept = "image/*";
    fileInput.dataset.idx = i;
    fileInput.addEventListener("change", handleFileChange);
    cell.appendChild(fileInput);

    photoGrid.appendChild(cell);
  }
}

function handleFileChange(e) {
  const idx  = parseInt(e.target.dataset.idx);
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    photoData[idx] = ev.target.result;
    rebuildGrid();
  };
  reader.readAsDataURL(file);
}

// ── Text inputs ──────────────────────────────────────────────
captionInput.addEventListener("input", () => {
  captionText.textContent = captionInput.value;
});

msgInput.addEventListener("input", () => {
  backMsg.textContent = msgInput.value;
});

addr1.addEventListener("input", () => { backAddr1.textContent = addr1.value; });
addr2.addEventListener("input", () => { backAddr2.textContent = addr2.value; });
addr3.addEventListener("input", () => { backAddr3.textContent = addr3.value; });

// ── Side toggle ───────────────────────────────────────────────
frontBtn.addEventListener("click", () => showSide("front"));
backBtn.addEventListener("click",  () => showSide("back"));

function showSide(side) {
  currentSide = side;
  if (side === "front") {
    frontSide.style.display = "flex";
    backSide.style.display  = "none";
    frontBtn.classList.add("active");
    backBtn.classList.remove("active");
  } else {
    frontSide.style.display = "none";
    backSide.style.display  = "grid";
    backBtn.classList.add("active");
    frontBtn.classList.remove("active");
  }
}

// ── Download ─────────────────────────────────────────────────
document.getElementById("downloadBtn").addEventListener("click", async () => {
  const postcard = document.getElementById("postcard");

  // hide file inputs temporarily
  const fileInputs = postcard.querySelectorAll("input[type=file]");
  fileInputs.forEach(i => i.style.display = "none");

  try {
    const canvas = await html2canvas(postcard, {
      useCORS: true,
      scale: 2,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = "vintage-postcard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) {
    alert("Download failed: " + err.message);
  } finally {
    fileInputs.forEach(i => i.style.display = "");
  }
});

// ── Init ──────────────────────────────────────────────────────
(function init() {
  rebuildGrid();
  applyFont();
  frontSide.style.background  = currentBg;
  captionBar.style.background = currentBg;
  backSide.style.background   = currentBg;
  captionText.style.color     = currentText;
  backMsg.style.color         = currentText;
  backMsg.textContent         = msgInput.value;
})();
