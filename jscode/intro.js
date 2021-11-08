// let obj = {
//     name: "jatin",
//     add:{
//         country : "India",
//         state:{
//             city: "del",
//             code: " 1000"
//         }
//     }

// }

// // let obj2 = obj;
// // let obj2 = {...obj}
// // obj2.name = "tony"

// // obj2 = {...obj}
// // obj2.add.country = "usa"

// // obj2 = {...obj,add:{...obj.add,state:{...obj.state}}}
// // obj2.add.state.code = 110032

// let obj2 = JSON.parse(JSON.stringify(obj))
// obj2.add.state.code = 110092


// console.log(obj);
// console.log(obj2)



// ************ object destucturing **********

arr = ["hi", "i", "am", "jatin"]
let [a,b,c,d] = arr

console.log(a,b,c)