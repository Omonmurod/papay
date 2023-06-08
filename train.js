/* TASK F: Shunday function tuzing, unga string agrument pass bo'lsin.
Function ushbu argumentdagi faqat digitlarni yangi stringda return qilsin. */

function findDigits(a) {
  let array = a.split("");
  let digits = [];

  for (let i = 0; i < array.length; i++) {
    if (!isNaN(parseInt(array[i]))) {
      digits.push(parseInt(array[i]));
    }
  }
  return digits.join("");
}

console.log(findDigits("efdh90dr8gds4s2e5s45fe7s"));


