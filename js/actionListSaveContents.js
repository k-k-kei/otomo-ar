// モーダルで入力されたmediaコンテンツ情報
const objAddMediaContent = {
  title: $(".modal-title-input").val(),
  category: $(".modal-category-input").val(),
  url: $(".modal-url-input").val(),
  text: $(".modal-text-long").val(),
};

// モーダルで入力されたsnsコンテンツ情報
const objAddSnsContent = {
    title: $(".modal-title-input").val()
}

// Storage内の画像保存先フォルダ
const folderName = {
  manage: "images/",
  sns: "sns-images/"
};

// 保存操作時に使用するボタン
const button = {
  saveMedia: $(".modal-savebtn-media"),
  saveSns: $(".modal-savebtn-sns")
};


//アラート表示
const showAlert = text => alert(text);


//mediaデータ入力時のmodalのinput値を空にする
const clearMediaInputForms = () => {
      $(".modal-title-input").val("");
      $(".modal-category-input").val("");
      $(".modal-url-input").val("");
      $(".modal-text-long").val("");
}

//snsデータ入力時のmodalのinput値を空にする
const clearSnsInputForms = () => {
      $(".modal-title-input").val("");
}


//firestoreのmediaコレクションにデータを保存する
const saveMediaFirestore = imageURL => {
  db.collection("media").add({
    title: objAddMediaContent.title,
    category: objAddMediaContent.category,
    url: objAddMediaContent.url,
    text: objAddMediaContent.text,
    image: imageURL,
  });
};

//firestoreのsnsコレクションにデータを保存する
const saveSnsFirestore = imageURL => {
  db.collection("sns").add({
    title: objAddMediaContent.title,
    image: imageURL,
  });
};


//Storageへ画像を保存、firestoreへデータを保存する関数を発火、
//入力値をクリアまでの一連の処理を実行
const saveData = (folderName, imageUrl, imageName, saveFirestoreName, clearInputFormsName) => {
  storageRef
    .child(folderName + imageName)
    .put(imageUrl)
    .snapshot.ref
    .getDownloadURL()
    .then(downloadURL => {
      //firestoreへmodalで入力したテキストと画像URLを保存する関数
      saveFirestoreName(downloadURL);
      //データ保存後、modalのinputフォームの値をからにする関数
      clearInputFormsName();

      showAlert("保存完了！");
    });
}


// フォームの内容を保存
// 画像データはstrageへ
// 画像URLはfirestoreへ保存

//mediaコンテンツを保存
button.saveMedia.on("click", () => {
  const imageUrl = $(".modal-image-input")[0].files[0];
  const imageName = imageUrl.name;

  saveData(folderName.manage, imageUrl, imageName, saveMediaFirestore, clearMediaInputForms);
});

//snsコンテンツを保存
button.saveSns.on("click", () => {
  const imageUrl = $(".modal-snsimage-input")[0].files[0];
  const imageName = imageUrl.name;

  saveData(folderName.sns, imageUrl, imageName, saveSnsFirestore, clearSnsInputForms);
});