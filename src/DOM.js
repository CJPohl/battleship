const elements = (() => {
  function initPage() {
    console.log('hi');
  }

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');
  document.body.appendChild(mainContainer);
  return {
    initPage,
  };
})();

export { elements };
