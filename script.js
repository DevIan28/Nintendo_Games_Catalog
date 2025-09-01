const favBtns = document.querySelectorAll('.fav-btn');
const favList = document.getElementById('favoritos');

function cargarFavoritos() {
  favList.innerHTML = '';
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  if (favoritos.length === 0) {
    favList.innerHTML = '<li class="list-group-item text-center text-muted">Aún no tienes juegos en favoritos</li>';
  } else {
    favoritos.forEach(juego => {
      const li = document.createElement('li');
      li.className = 'list-group-item list-group-item-danger d-flex justify-content-between align-items-center';
      li.innerHTML = `${juego} <span class="badge bg-danger">❤️</span>`;
      favList.appendChild(li);
    });
  }
}

favBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const juego = btn.previousElementSibling.previousElementSibling.textContent;
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (!favoritos.includes(juego)) {
      favoritos.push(juego);
      btn.classList.add("added");
      btn.innerHTML = "✅ Agregado";
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    cargarFavoritos();
  });
});

window.onload = cargarFavoritos;
