console.log("I am here");

function needsTime() {
  const promise = new Promise((resolve) => {
    setTimeout(function () {
      console.log("wait for me");
      resolve(true);
    }, 2000);
  });
  return promise;
}

needsTime().then(() => {
  console.log("I can not wait");
  console.log("end");
});
