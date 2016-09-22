function hello() {
  console.log('hello');
}

setTimeout(hello, 0);

for (var i = 0; i < 100000; i++) {
  console.log("here")
}
