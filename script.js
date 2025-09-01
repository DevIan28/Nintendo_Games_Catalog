const favBtns = document.querySelectorAll('.fav-btn');
const favList = document.getElementById('favoritos');

function cargarFavoritos() {
  favList.innerHTML = '';
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  if (favoritos.length === 0) {
    favList.innerHTML = '<li class="list-group-item">Aún no tienes juegos en favoritos</li>';
  } else {
    favoritos.forEach(juego => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = juego;
      favList.appendChild(li);
    });
  }
}

favBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const juego = btn.previousElementSibling.previousElementSibling.textContent;
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (!favoritos.includes(juego)) favoritos.push(juego);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    cargarFavoritos();
  });
});

window.onload = cargarFavoritos;