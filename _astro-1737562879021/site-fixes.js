// Minimal replacement for the missing Astro/Vue hydration bundle.
// Toggles the mobile burger menu, since the original client JS was not part of the static export.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.burger').forEach(function (burger) {
    var dropdown = burger.parentElement.querySelector('.block-header-layout-mobile__dropdown');
    if (!dropdown) return;
    burger.addEventListener('click', function () {
      burger.classList.toggle('burger--open');
      dropdown.classList.toggle('block-header-layout-mobile__dropdown--open');
    });
  });
});
