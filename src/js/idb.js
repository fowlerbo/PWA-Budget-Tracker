const indexedDB = window.indexedDB;

let db;

const request = indexedDB.open("txtDB", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  db.createObjectStore("pendingTx", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;
  if (window.navigator.onLine) {
    console.log("Window online.");
    checkIndexDB();
  }
};

request.onerror = function (event) {
  console.log("An error occurred with IndexDB");
  console.log(event.target.console.errorCode);
};

// Save a record in the transaction if the app fails to connect
function saveRecord(record) {
  //Get a transaction on the objectStore with readwrite access
  const transaction = db.transaction("pendingTx", "readwrite");
  //Get the pending transaction objectStore
  const store = transaction.objectStore("pendingTx");
  // Add record to the created store
}
