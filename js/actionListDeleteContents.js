// コンテンツを表示しているHTMLタグのセレクターを取得
// appendで挿入されている。
const item = {
    manage: ".items-manage",
    sns: ".items-sns",
}


//コンテンツをfirestoreから削除する
const deleteItem = (collection, docId) => {
    db.collection(collection)
    .doc(docId)
    .delete()
    .then(() => location.reload());
}


// mediaコンテンツの削除
//アロー関数にすると中でthisが使う得なくなるので注意
$(document).on("click", item.manage, function () {
    const docId = $(this).attr("id");
    showAlert("削除しますか？");
    deleteItem(collectionName.media, docId);
});

// snsコンテンツの削除
$(document).on("click", item.sns, function () {
    const docId = $(this).attr("id");
    showAlert("削除しますか？");
    deleteItem(collectionName.sns, docId);
});