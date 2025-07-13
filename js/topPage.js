// ------------------------------
// 処理部
// ------------------------------

const linkContainer = document.getElementById("latest-info-link-container");

// patchNoteData.jsonを読み込み、リンクを生成
fetch("patchNoteData.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.length > 0) {
            const dates = [];

            data.forEach(item => {
                if (item.datetime) {
                    // date型に変換して配列に格納
                    dates.push(new Date(item.datetime));
                }
            });

            // 最新日付を取得して文字列に変換
            let latestDate = new Date(Math.max(...dates));
            const year = latestDate.getFullYear();
            const month = (latestDate.getMonth() + 1).toString().padStart(2, "0");
            const day = latestDate.getDate().toString().padStart(2, "0");
            const displayLatestDate = `${year}年${month}月${day}日`;
            latestDate = `${year}/${month}/${day}`;

            const link = document.createElement("a");
            const latestDateSpan = document.createElement("span");

            // URLエンコードして付与
            link.href = `patchNote.html?date=${encodeURIComponent(latestDate)}&autoExpand=true`;
            link.textContent = "最新パッチノート";
            latestDateSpan.innerHTML = `（${displayLatestDate}）`;
            linkContainer.appendChild(link);
            linkContainer.appendChild(latestDateSpan);
        } else {
            linkContainer.textContent = "表示する最新パッチノートがありません。";
        }
    })
    .catch(error => {
        console.error("データの読み込み中にエラーが発生しました:", error);
        linkContainer.textContent = "リンクの生成に失敗しました。";
    });
    
// ------------------------------
// 関数部
// ------------------------------