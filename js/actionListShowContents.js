
//firestoreのコレクション名
const collectionName = {
    media: "media",
    sns: "sns"
}

//htmlタグを挿入するエリア
const area = {
    media: $(".box-lists-media"),
    manage: $(".box-lists-manage"),
    sns: $(".box-lists-sns")
}


//挿入用HTMLタグ生成
//----------------------------------------------------------------

//mediaページ用のHTMLタグを生成
const createMediaContentsHTML = (id, url) => {
    const content = '<li id="' + id + '" class="items-media"><img src="' + url + '" alt="image"></li>';
    return content;
}

//manageページ用のHTMLタグを生成
const createManageContentsHTML = (id, url) => {
    const content = '<li id="' + id + '" class="items-manage"><img src="' + url + '" alt="image"></li>';
    return content;
}

//mediaページ用のHTMLタグを生成
const createSnsContentsHTML = (id, url) => {
    const content = '<li id="' + id + '" class="items-sns"><img src="' + url + '" alt="image"></li>';
    return content;
}


//firestoreからデータ取得＋表示
//----------------------------------------------------------------

// mediaページのデータをfirestoreから取得
//document IDと画像を用いてHTMLタグを作成して指定したエリアに挿入する
const displayContents = (collection, area, createHtmlFunction) => {
    db.collection(collection)
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                const docId = change.doc.id;
                const contentImage = change.doc.data().image;
                
                area.prepend(createHtmlFunction(docId, contentImage));
            }
        });
    });
}

//mediaページのメインコンテンツ表示
displayContents(collectionName.media, area.media, createMediaContentsHTML);
//manageページのメインコンテンツ表示
displayContents(collectionName.media, area.manage, createManageContentsHTML);
//snsページのメインコンテンツ表示
displayContents(collectionName.sns, area.sns, createSnsContentsHTML);

//----------------------------------------------------------------
