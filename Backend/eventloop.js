console.log("this is the starting point of my code");
process.nextTick(() => {
    console.log("this process in the next tick operation")
})
 // setImmediate(() => {
 //     console.log("this is the set immediate operation")
 // })