const express = require('express');

const app = express();

app.get('/sum', (req, res) => {
  const val1 = Number(req.query.a);
  const val2 = Number(req.query.b);
  const val3 = val1 + val2;

  res.send(`The sum of ${val1} and ${val2} is ${val3}`);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const upperText = text.toUpperCase();
  const upperTextArray = upperText.split('');
  const shift = Number(req.query.shift);

  let charCodeArray = [];
  let shiftedCharCodeArray = [];

  upperTextArray.forEach(element => charCodeArray.push(element.charCodeAt(0)));
  charCodeArray.forEach(element => {
    let newCode = element + shift;
    if (newCode > 90) {
      let difference = newCode - 90;
      newCode = 64 + difference;
    }
    shiftedCharCodeArray.push(newCode);
  }
  );

  const shiftedTextArray = [];
  shiftedCharCodeArray.forEach(element => shiftedTextArray.push(String.fromCharCode(element)));


  const shiftedText = shiftedTextArray.join('');
  res.send(shiftedText);
});

app.get('/lotto', (req, res) => {
  const userNumArray = req.query.arr;
  let randomNumArray = [];

  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20];

  for (let i = 0; i < 6; i++) {
    const num = Math.floor(Math.random() * nums.length);
    randomNumArray.push(nums[num]);
    nums.splice(num, 1);
  }

  /*   for (let i = 0; i < 6; i++) {
      randomNumArray.push(Math.floor(Math.random() * 9) + 1);
    } */

  let matches = 0;
  randomNumArray.forEach((randomNum) => {
    userNumArray.forEach((userNum) => {
      if ((Number(userNum) === randomNum)) {
        matches++;
      }
    });
  });

  if (matches < 4) {
    res.send('Sorry, you lose');
  } else if (matches === 4) {
    res.send('Congratulations, you win a free ticket');
  } else if (matches === 5) {
    res.send('Congratulations! You win $100!');
  } else {
    res.send('Wow! Unbelievable! You could have won the mega millions!');
  }

  console.log(`matches: ${matches}`);
  console.log(userNumArray);
  console.log(randomNumArray);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000');
});

