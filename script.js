lucide.createIcons();

document.querySelector('.print-button').addEventListener('click', () => window.print());

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
  lucide.createIcons();
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
});

async function loadGithubActivity() {
  const count = document.querySelector('#repo-count');
  const updated = document.querySelector('#last-updated');
  try {
    const response = await fetch('https://api.github.com/users/Davemasibo/repos?per_page=100&sort=updated');
    if (!response.ok) throw new Error('GitHub request failed');
    const repositories = await response.json();
    count.textContent = `${repositories.length}+`;
    if (repositories[0]?.updated_at) {
      updated.textContent = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(repositories[0].updated_at));
    }
  } catch (error) {
    count.textContent = '48+';
    updated.textContent = 'Recently';
  }
}

loadGithubActivity();
