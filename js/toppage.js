// ------------------------------
// 処理部
// ------------------------------

// patchNoteData.jsonを読み込み、最新日付を特定して表示する処理
fetch("patchNoteData.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        allData = data;
        const result = organizeData(allData);
        const latestData = result.latestData;
        const latestDateString = result.latestDateString;
        displayLatestData(latestData, latestDateString);
    })
    .catch(error => {
        console.error("データの読み込み中にエラーが発生しました:", error);
        document.getElementById('latest-data-display').textContent = 'データの読み込みに失敗しました。';
    });
    
// ------------------------------
// 関数部
// ------------------------------
