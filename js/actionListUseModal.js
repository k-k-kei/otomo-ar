
// コンテンツ保存時のモーダル操作
//------------------------------------

//modalのアクションを発火させるボタン群
const modalButtonSave = {
    open: $(".add-btn"),
    close: $(".modal-closebtn")
}

//modalボタンクリック時に発火するアクション
const showModalDisplay = () => $(".modal").css("display", "block");
const hideModalDisplay = () => $(".modal").css("display", "none");

// クリックされたボタンに応じてmodalの開閉を実行
modalButtonSave.open.on("click", () => showModalDisplay());
modalButtonSave.close.on("click", () => hideModalDisplay());

//------------------------------------


// コンテンツ詳細表示時のモーダル操作
//------------------------------------

//モーダルを開閉するボタン群
const modalButtonShowDetail = {
    open: $(".win"),
    close: $(".win-close")
}

//firestoreのデータを挿入するエリア
const modalArea = {
    image: $(".detail-img"),
    category: $(".category"),
    title: $(".title"),
    text: $(".text"),
    url: $(".url")
}

//モーダルを開閉する関数
const openModalDetail = () => $(".win").css("display", "block");
const closeModalDetail = () => $(".win").css("display", "none");


//受け取ったmediaデータをモーダルに挿入する
const insertToModal = (title, text, category, image, url) => {
        modalArea.title.html(title);
        modalArea.text.html(text);
        modalArea.category.html(category);
        modalArea.image.attr("src", image);
        modalArea.url.html(url);
        modalArea.url.attr("href", url);
}

//受け取ったmediaデータをモーダルに挿入するメソッドに渡す。
const showDetail = (data) => {
    openModalDetail();
    const contentInfo = data;
    insertToModal(contentInfo.title, contentInfo.text, contentInfo.category, contentInfo.image, contentInfo.url);
}

//mediaコンテンツのデータを取得して表示メソッドに渡す
const showContentDetail = (docId) => {
    db.collection("media")
    .doc(docId)
    .get()
    .then((doc) => showDetail(doc.data()));
}

// 詳細画面を開く
$(document).on("click", ".items-media", function () {
    const docId = $(this).attr("id");
    showContentDetail(docId);
});

//詳細情報表示時、右上のバツボタンを押してモーダルを閉じる
modalButtonShowDetail.close.on("click",  () => closeModalDetail());
