// Helpers de storage
const LS_KEY = 'favoritos';
const getFavs = () => JSON.parse(localStorage.getItem(LS_KEY)) || [];
const setFavs = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

// UI refs
const favList = document.getElementById('favoritos');
const searchInput = document.getElementById('searchInput');
const gamesGrid = document.getElementById('gamesGrid');
const toastEl = document.getElementById('liveToast');
const toastMsg = document.getElementById('toastMsg');
const toast = toastEl ? new bootstrap.Toast(toastEl) : null;

// Modal refs
const detailsModal = document.getElementById('detailsModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalFavBtn = document.getElementById('modalFavBtn');

// Init
document.addEventListener('DOMContentLoaded', () => {
  hookCardButtons();
  renderFavs();
  syncButtons();
  setupSearch();
});

// Vincular botones de cada card (Detalles + Favoritos)
function hookCardButtons(){
  const cards = document.querySelectorAll('.game-card');
  cards.forEach(card => {
    const title = card.dataset.title;
    const desc  = card.dataset.desc;
    const img   = card.dataset.img;

    // Detalles
    const btnDetails = card.querySelector('.btn-details');
    btnDetails.addEventListener('click', () => {
      modalTitle.textContent = title;
      modalDesc.textContent  = desc;
      modalImg.src           = img;
      updateModalFavBtn(title);
    });

    // Fav
    const favBtn = card.querySelector('.fav-btn');
    favBtn.addEventListener('click', () => toggleFav(title));
  });

  // Modal botón favoritos
  modalFavBtn.addEventListener('click', () => {
    const title = modalTitle.textContent.trim();
    toggleFav(title);
    updateModalFavBtn(title);
  });
}

// Agregar/Quitar de favoritos
function toggleFav(title){
  let favs = getFavs();
  const exists = favs.includes(title);

  if (exists){
    favs = favs.filter(t => t !== title);
    showToast(`❌ Eliminado de favoritos: ${title}`);
  } else {
    favs.push(title);
    showToast(`✅ Agregado a favoritos: ${title}`);
  }
  setFavs(favs);
  renderFavs();
  syncButtons();
}

// Render lista de favoritos
function renderFavs(){
  favList.innerHTML = '';
  const favs = getFavs();
  if (favs.length === 0){
    favList.innerHTML = '<li class="list-group-item text-center text-muted">Aún no tienes juegos en favoritos</li>';
    return;
  }
  favs.forEach(title => {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-light';
    li.innerHTML = `
      <span>${title}</span>
      <button class="btn btn-sm btn-outline-danger remove-chip">Eliminar</button>
    `;
    li.querySelector('.remove-chip').addEventListener('click', () => {
      toggleFav(title);
    });
    favList.appendChild(li);
  });
}

// Sincronizar estado de los botones con storage
function syncButtons(){
  const favs = getFavs();

  // botones de cards
  document.querySelectorAll('.game-card .fav-btn').forEach(btn => {
    const title = btn.closest('.game-card').dataset.title;
    if (favs.includes(title)){
      btn.classList.add('added');
      btn.textContent = '✅ Agregado';
    } else {
      btn.classList.remove('added');
      btn.textContent = '❤️ Agregar';
    }
  });

  // botón del modal (si está visible)
  if (modalTitle.textContent){
    updateModalFavBtn(modalTitle.textContent.trim());
  }
}

// Actualiza el botón del modal según estado
function updateModalFavBtn(title){
  const favs = getFavs();
  if (favs.includes(title)){
    modalFavBtn.classList.add('added');
    modalFavBtn.textContent = '✅ Agregado';
  } else {
    modalFavBtn.classList.remove('added');
    modalFavBtn.textContent = '❤️ Agregar a Favoritos';
  }
}

// Buscador en vivo
function setupSearch(){
  if (!searchInput) return;
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const cols = document.querySelectorAll('.game-col');
    cols.forEach(col => {
      const title = col.dataset.title;
      const show = title.includes(q);
      col.style.display = show ? '' : 'none';
    });
  });
}

// Toast feedback
function showToast(message){
  if (!toast) return;
  toastMsg.textContent = message;
  toast.show();
}