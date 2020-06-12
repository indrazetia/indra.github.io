let dbPromised = idb.open("football_league", 1, function(upgradeDb) {
  let teamObjectStore = upgradeDb.createObjectStore("team", {
    keyPath: "id"
  });
  teamObjectStore.createIndex("title_detail", "title_detail", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("team", "readwrite");
      let store = tx.objectStore("team");
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      M.toast({html: 'League Saved Success'});
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("team", "readonly");
        let store = tx.objectStore("team");
        return store.getAll();
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function getById(idprm) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("team", "readonly");
        let store = tx.objectStore("team");
        return store.get(idprm);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function deleteForLater(idprm) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("team", "readwrite");
      let store = tx.objectStore("team");
      let idparm = Number(idprm);
      return store.delete(idparm);
    })
    .then(function() {
      M.toast({html: 'League Not Saved'});
    });
}
