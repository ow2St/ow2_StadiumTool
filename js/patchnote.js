// ------------------------------
// 処理部
// ------------------------------

const accordionContainer = document.getElementById("accordion-container");
let allData = []; // 全てのデータを保持

// データの読み込み
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
        const organizedData = result.organizedData;

        // パッチ情報を構築して表示
        buildAccordion(organizedData);
    })
    .catch(error => {
        console.error("データの読み込み中にエラーが発生しました:", error);
        accordionContainer.textContent = "データの読み込みに失敗しました。";
    });

// ------------------------------
// 関数部
// ------------------------------

/**
 * データを年、月、日、キャラクターで階層整理する関数
 * @param {any[]} data パッチノートデータの配列
 * @return {organizedData: object, latestData: object, latestDateString: string} 整理されたデータと最新日付のデータ
 */
function organizeData(data) {
    const organized = {};
    // 最終日付データ退避用変数
    let latestDateString = null;

    data.forEach(item => {

        const datetimeString = item.date;
        if (!datetimeString) return;

        // 最新日付の更新チェック
        if (!latestDateString || new Date(datetimeString) > new Date(latestDateString)) {
            latestDateString = datetimeString;
        }

        // 日付を分割
        const [year, month, day] = item.date.split("/");
        const character = item.hero || "システム";

        if (!organized[year]) {
            organized[year] = {};
        }
        if (!organized[year][month]) {
            // 月の下に日を格納するためのオブジェクト
            organized[year][month] = {};
        }
        if (!organized[year][month][day]) {
            // 日の下にキャラクターごとのオブジェクトを格納
            organized[year][month][day] = {};
        }
        if (!organized[year][month][day][character]) {
            // キャラクターの下にアイテムの配列を格納
            organized[year][month][day][character] = [];
        }
        organized[year][month][day][character].push(item);
    });

    // 最新日付のデータを退避
    let latestData = null;
    if (latestDateString) {
        const [latestYear, latestMonth, latestDay] = latestDateString.split('/');
        // 最新日付のデータを取り出す
        latestData = organized[latestYear][latestMonth][latestDay];
    }

    return {
        organizedData: organized,
        latestData: latestData,
        latestDateString: latestDateString // YYYY/MM/DD形式の最新日付も退避
    };
}

/**
 * アイテムの詳細情報（カテゴリ、サブカテゴリ、レアリティ、名前、内容）を生成する関数
 * @param {any[]} item パッチ対象のアイテムデータ
 * @return {HTMLElement} アイテムの詳細情報を含むHTML要素
 */
function createItemDetailsElement(item) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-details");
    
    const p = document.createElement("p");

    // 内容を除く情報を1行で表示
    if(item["category"] == "パワー" || item["category"] == "パッシブ" || item["category"] == "サブ攻撃"){
        p.innerHTML = item["name"]  + " - " + item["category"];
    }else if(item["category"] == "アイテム"){
        p.innerHTML = item["name"] + " - " + item["subcategory"]  + "・" + item["category"] + "(" + item["rarity"] + ")";
    }else if(item["category"] == "システム"){
        p.innerHTML = item["name"];
    }

    itemDiv.appendChild(p);

    // 内容を箇条書きで表示
    if (item.content) {
        const contentList = document.createElement("ul");
        item.content.split("/").forEach(line => {
            const li = document.createElement("li");
            li.textContent = line.trim();
            contentList.appendChild(li);
        });
        itemDiv.appendChild(contentList);
    } else {
        const p = document.createElement("p");
        p.textContent = "-";
        itemDiv.appendChild(p);
    }

    return itemDiv;
}

/**
 * 全体の表示を構築する関数
 * @param {object} organizedData 階層整理されたパッチノートデータ
 * @return {HTMLElement} アイテムの詳細情報を含むHTML要素
 */
function buildAccordion(organizedData) {
    const sortedYears = Object.keys(organizedData).sort((a, b) => parseInt(b) - parseInt(a));

    sortedYears.forEach(year => {
        // ▶年見出し
        const yearHeader = document.createElement("div");
        yearHeader.classList.add("year-header");
        yearHeader.textContent = `▶${year}年`;
        accordionContainer.appendChild(yearHeader);

        const yearContent = document.createElement("div");
        yearContent.classList.add("year-content");
        yearContent.style.display = "none";
        accordionContainer.appendChild(yearContent);

        const sortedMonths = Object.keys(organizedData[year]).sort((a, b) => parseInt(b) - parseInt(a));

        sortedMonths.forEach(month => {
            // ▶月見出し
            const monthHeader = document.createElement("div");
            monthHeader.classList.add("month-header");
            const displayMonth = parseInt(month);
            monthHeader.textContent = "▶"+ displayMonth + "月";
            yearContent.appendChild(monthHeader);

            const monthContent = document.createElement("div");
            monthContent.classList.add("month-content");
            monthContent.style.display = "none";
            yearContent.appendChild(monthContent);

            const sortedDays = Object.keys(organizedData[year][month]).sort((a, b) => parseInt(b) - parseInt(a));

            sortedDays.forEach(day => {
                // ▶日見出し
                const dayHeader = document.createElement("div");
                dayHeader.classList.add("day-header");
                const displayday = parseInt(day);
                dayHeader.textContent = "▶" + displayMonth + "月" + displayday + "日パッチノート";
                monthContent.appendChild(dayHeader);

                // 日ごとのキャラクター見出しと内容のコンテナ
                const dayContent = document.createElement("div");
                dayContent.classList.add("day-content");
                dayContent.style.display = "none";
                monthContent.appendChild(dayContent);

                // その日のキャラクター名を抽出
                const charactersInDay = Object.keys(organizedData[year][month][day]);

                charactersInDay.forEach(character => {
                    // キャラクター名表示
                    const characterNameDiv = document.createElement("div");
                    characterNameDiv.classList.add("character-name");
                    characterNameDiv.textContent = character;

                    // キャラクター名が"-"の場合は"システム"を表示
                    if(characterNameDiv.textContent == "-"){
                        characterNameDiv.textContent = "システム";
                    }

                    dayContent.appendChild(characterNameDiv);

                    // キャラクター名の下に直接コンテンツを配置
                    const characterDataContainer = document.createElement("div");
                    characterDataContainer.classList.add("character-data-container");
                    dayContent.appendChild(characterDataContainer);

                    // そのキャラクターの全情報を追加
                    organizedData[year][month][day][character].forEach(item => {
                        characterDataContainer.appendChild(createItemDetailsElement(item));
                    });
                });

                // 日見出しのクリックイベント
                dayHeader.addEventListener("click", () => {
                    const isHidden = dayContent.style.display == "none";
                    
                    // 同じ月の他の日のコンテンツを閉じる
                    Array.from(monthContent.children).forEach(child => {
                        if (child.classList.contains("day-content") && child !== dayContent) {
                            child.style.display = "none";
                            const correspondingDayHeader = child.previousElementSibling;
                            
                            if (correspondingDayHeader && correspondingDayHeader.classList.contains("day-header")) {
                                correspondingDayHeader.textContent = correspondingDayHeader.textContent.replace("▼", "▶");
                            }
                        }
                    });
                    dayContent.style.display = isHidden ? "block" : "none";
                    dayHeader.textContent = isHidden ? dayHeader.textContent.replace("▶", "▼") : dayHeader.textContent.replace("▼", "▶");
                });
            });

            // 月見出しのクリックイベント
            monthHeader.addEventListener("click", () => {
                const isHidden = monthContent.style.display == "none";
                // 同じ年の他の月のコンテンツを閉じる
                Array.from(yearContent.children).forEach(child => {
                    if (child.classList.contains("month-content") && child !== monthContent) {

                        child.style.display = "none";
                        const correspondingMonthHeader = child.previousElementSibling;
                        
                        if (correspondingMonthHeader && correspondingMonthHeader.classList.contains("month-header")) {
                            correspondingMonthHeader.textContent = correspondingMonthHeader.textContent.replace("▼", "▶");
                            
                            // 内部の日コンテンツも閉じる
                            Array.from(child.querySelectorAll(".day-content")).forEach(grandchild => {
                                
                                grandchild.style.display = "none";
                                const correspondingHeader = grandchild.previousElementSibling;
                                
                                if (correspondingHeader && correspondingHeader.classList.contains("day-header")) {
                                    correspondingHeader.textContent = correspondingHeader.textContent.replace("▼", "▶");
                                }
                            });
                        }
                    }
                });
                monthContent.style.display = isHidden ? "block" : "none";
                monthHeader.textContent = isHidden ? monthHeader.textContent.replace("▶", "▼") : monthHeader.textContent.replace("▼", "▶");

                if (isHidden) {
                    
                    Array.from(monthContent.children).forEach(child => {
                        
                        if (child.classList.contains("day-content")) {
                            
                            child.style.display = "none";
                            const correspondingDayHeader = child.previousElementSibling;
                            
                            if (correspondingDayHeader && correspondingDayHeader.classList.contains("day-header")) {
                                correspondingDayHeader.textContent = correspondingDayHeader.textContent.replace("▼", "▶");
                            }
                        }
                    });
                }
            });
        });

        // 年見出しのクリックイベント
        yearHeader.addEventListener("click", () => {
            
            const isHidden = yearContent.style.display == "none";
            yearContent.style.display = isHidden ? "block" : "none";
            yearHeader.textContent = isHidden ? yearHeader.textContent.replace("▶", "▼") : yearHeader.textContent.replace("▼", "▶");

            if (isHidden) {
                Array.from(yearContent.children).forEach(child => {
                    if (child.classList.contains("month-content")) {
                        
                        child.style.display = "none";
                        const correspondingMonthHeader = child.previousElementSibling;
                        
                        if (correspondingMonthHeader && correspondingMonthHeader.classList.contains("month-header")) {
                            correspondingMonthHeader.textContent = correspondingMonthHeader.textContent.replace("▼", "▶");
                        }
                        
                        Array.from(child.querySelectorAll(".day-content")).forEach(grandchild => {
                            
                            grandchild.style.display = "none";
                            const correspondingHeader = grandchild.previousElementSibling;
                            
                            if (correspondingHeader && correspondingHeader.classList.contains("day-header")) {
                                correspondingHeader.textContent = correspondingHeader.textContent.replace("▼", "▶");
                            }
                        });
                    }
                });
            }
        });
    });
}

/**
 * 日付を日本語形式に変換する関数
 * @param {string} dateString スラッシュ区切りの日付文字列 (例: "2024/01/01")
 * @return {string} 日本語形式の日付文字列 (例: "2024年1月1日")
 */
function formatSlashDateToJapanese(dateString) {
    const parts = dateString.split('/');
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    return `${year}年${month}月${day}日`;
}

/**
 * 最新日付の全データを専用領域に表示する関数
 * @param {object} latestData 最新日付のパッチノートデータ
 * @param {string} latestDateString スラッシュ区切りの日付文字列 (例: "2024/01/01")
 * @return {void}
 */
function displayLatestData(latestData, latestDateString) {
    // 表示コンテナの取得
    const displayContainer = document.getElementById('latest-data-display');
    
    // データが存在しない場合
    if (!displayContainer || !latestData) {
        displayContainer.textContent = '最新情報がありません。';
        return;
    }

    // コンテナをクリア
    displayContainer.innerHTML = '';
    
    // 見出しを追加
    const formattedDate = formatSlashDateToJapanese(latestDateString);
    const dateTitle = document.createElement('h3');
    dateTitle.textContent = ` ${formattedDate}パッチノート（最新）`;
    displayContainer.appendChild(dateTitle);

    // キャラクターごとのデータを表示
    const charactersInLatest = Object.keys(latestData).sort();

    charactersInLatest.forEach(character => {
        // キャラクター名表示
        const characterNameDiv = document.createElement("div");
        characterNameDiv.classList.add("character-name");
        characterNameDiv.style.marginTop = '15px';
        characterNameDiv.textContent = character == "-" ? "システム" : character;
        displayContainer.appendChild(characterNameDiv);

        // コンテンツを配置
        const dataContainer = document.createElement("div");
        dataContainer.classList.add("character-data-container");
        displayContainer.appendChild(dataContainer);

        // そのキャラクターの全情報を追加
        latestData[character].forEach(item => {
            dataContainer.appendChild(createItemDetailsElement(item));
        });
    });
}

