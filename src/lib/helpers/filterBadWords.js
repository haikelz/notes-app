// WIP: just for my experiment, filtering some bad words without any library
/*const listBadWords = [

];

export const filterBadWords = (badWord) => {
  let newArr = [];
  const splitBadWord = badWord.split(" ");

  for (let i = 0; i <= splitBadWord.length - 1; i++) {
    if (splitBadWord[i] === badWord[i]) newArr.push(splitBadWord[i]);
  }

  return newArr;
};
*/

export const filterBadWords = (badWord) => {
  return badWord.split(" ").map((value) => value);
};
