// Tabs

window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabs .tabs__tab');
  const tabNames = document.querySelectorAll('.tabs .tabs__tab-name');

  function removeSelectedTabs() {
    tabs.forEach((tab) => {
      tab.classList.remove('tabs__tab_select');
    });
  }

  function selectClickedTab(clickedTag) {
    clickedTag.classList.add('tabs__tab_select');
  }

  function filterBySelectedTab(selectTab) {
    const products = document.querySelectorAll('.tabs .tabs__product');
    products.forEach((product) => {
      if (product.closest(`[data-category="${selectTab}"]`)) {
        product.classList.remove('tabs__product_hidden');
      } else {
        product.classList.add('tabs__product_hidden');
      }
    });
  }

  filterBySelectedTab(tabNames[0].innerHTML);

  document.querySelector('.tabs .tabs__flex-container').addEventListener('click', (e) => {
    const target = e.target;
    const selectTab = target
      .closest('.tabs__tab')
      .querySelector('.tabs__tab-name').innerHTML;

    if (target.closest('.tabs__tab')) {
      tabs.forEach((tab, i) => {
        if (tab === target.closest('.tabs__tab')) {
          removeSelectedTabs();
          selectClickedTab(tabs[i]);
          filterBySelectedTab(selectTab);
        }
      });
    }
  });
});
