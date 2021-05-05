export const messageArr = [...Array(1000)].map(() =>  
 [...Array(~~(Math.random() * 100  + 3))].map(() =>
    String.fromCharCode(Math.random() * (123 - 97) + 97)
 ).join('') 
);
