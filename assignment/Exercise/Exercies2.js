let row = 5;

for (let i = row; i >= 1; i--) {
  let ster = '';
  for (let j = 0; j < i; j++) {
    ster += "*";
  }
  console.log(ster);
}