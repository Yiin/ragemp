export const fathers = [
  { id: 0,name:'Benjamin' },
  { id: 1,name:'Daniel' },
  { id: 2,name:'Joshua' },
  { id: 3,name:'Noah' },
  { id: 4,name:'Andrew' },
  { id: 5,name:'Juan' },
  { id: 6,name:'Alex' },
  { id: 7,name:'Isaac' },
  { id: 8,name:'Evan' },
  { id: 9,name:'Ethan' },
  { id: 10,name:'Vincent' },
  { id: 11,name:'Angel' },
  { id: 12,name:'Diego' },
  { id: 13,name:'Adrian' },
  { id: 14,name:'Gabriel' },
  { id: 15,name:'Michael' },
  { id: 16,name:'Santiago' },
  { id: 17,name:'Kevin' },
  { id: 18,name:'Louis' },
  { id: 19,name:'Samuel' },
  { id: 20,name:'Anthony' },
  { id: 42,name:'Claude' },
  { id: 43,name:'Niko' },
  { id: 44,name:'John' },
];

export const mothers = [
  { id: 21, name: 'Hannah' },
  { id: 22, name: 'Audrey' },
  { id: 23, name: 'Jasmine' },
  { id: 24, name: 'Giselle' },
  { id: 25, name: 'Amelia' },
  { id: 26, name: 'Isabella' },
  { id: 27, name: 'Zoe' },
  { id: 28, name: 'Ava' },
  { id: 29, name: 'Camila' },
  { id: 30, name: 'Violet' },
  { id: 31, name: 'Sophia' },
  { id: 32, name: 'Evelyn' },
  { id: 33, name: 'Nicole' },
  { id: 34, name: 'Ashley' },
  { id: 35, name: 'Grace' },
  { id: 36, name: 'Brianna' },
  { id: 37, name: 'Natalie' },
  { id: 38, name: 'Olivia' },
  { id: 39, name: 'Elizabeth' },
  { id: 40, name: 'Charlotte' },
  { id: 41, name: 'Emma' },
  { id: 45, name: 'Misty' },
];

export function getRandomFather() {
  return fathers[Math.floor(Math.random() * fathers.length)].id;
}

export function getRandomMother() {
  return mothers[Math.floor(Math.random() * mothers.length)].id;
}

export function getRandomResemblance(gender) {
  return Math.random() * (gender ? 0.5 : 1);
}
