const template = document.createElement('template');
template.innerHTML = `
<head>

  <link rel="stylesheet" href="style.css">
</head>
    

  <div class="navbar">
    <a href="/home" class="logo"><img src="img/icon.png" alt="Logo"></a>

    <ul id="menu" hidden>
      <li><a href="/home">Home</a></li>
      <li><a href="/sobre">Sobre Nós</a></li>
      <li><a href="/infos">Infos Técnicas</a></li>
  

    <div class="buttons">
      <button id="modeToggle">🌙</button>
      <a href="/contato" class="btn">Contacte-nos</a>
    </div>
      </ul>

    <button class="menu-btn">☰</button>
  </div>
`;

class MeuWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));

    // Adiciona eventos dentro do shadow DOM
    const toggleBtn = this.shadowRoot.getElementById("modeToggle");
    const menuBtn = this.shadowRoot.querySelector(".menu-btn");
    const menu = this.shadowRoot.getElementById("menu");

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      document.body.classList.toggle("light-mode");
      toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
    });

    menuBtn.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
    });
  }
}

customElements.define('meu-widget', MeuWidget);
