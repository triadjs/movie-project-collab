
async function main() {
  document.querySelector('h1')
    .addEventListener('click',  () => {
    console.log('clicked');
  });
}


main().catch(console.error)