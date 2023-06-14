let person = {
  ism : 'Jacob',
  yosh: 31,
  millayi: 'Uzbek',
  salom_bering(){
    console.log("Salom");
  },
  hayrlashing(){
    console.log("Salomat bo'ling");
  }
};

console.log(person.ism);
console.log(person.yosh);
person.salom_bering();
person.hayrlashing();










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


