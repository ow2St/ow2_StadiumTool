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
        const organizedData = organizeData(allData);
        const dateToExpand = getUrlParameter("date");
        const shouldAutoExpand = getUrlParameter("autoExpand") === "true";

        // autoExpand=trueかつdateパラメータがあれば、その日付を展開
        if (shouldAutoExpand && dateToExpand) {
            buildAccordion(organizedData, dateToExpand);
        } else {
            // それ以外の場合は全て閉じた状態で表示
            buildAccordion(organizedData);
        }
    })
    .catch(error => {
        console.error("データの読み込み中にエラーが発生しました:", error);
        accordionContainer.textContent = "データの読み込みに失敗しました。";
    });

// ------------------------------
// 関数部
// ------------------------------

// データを年、月、日、キャラクターで階層整理する関数
function organizeData(data) {
    const organized = {};
    data.forEach(item => {
        const [year, month, day] = item.date.split("/");
        const character = item.hero || "不明なキャラクター";

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
    return organized;
}

// アイテムの詳細情報（カテゴリ、サブカテゴリ、レアリティ、名前、内容）を生成する関数
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

// URLパラメータを取得する関数
function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// 全体の表示を構築する関数
function buildAccordion(organizedData, targetDateString = null) {
    const sortedYears = Object.keys(organizedData).sort((a, b) => parseInt(b) - parseInt(a));

    let targetYear = null;
    let targetMonth = null;
    let targetDay = null;

    if (targetDateString) {
        [targetYear, targetMonth, targetDay] = targetDateString.split("/");
    }

    // 展開するヘッダーを保持する配列
    const headersToExpand = [];

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
                    const isHidden = dayContent.style.display === "none";
                    
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
                // URLパラメータで指定された日付であれば展開
                if (targetDateString && year === targetYear && month === targetMonth && day === targetDay) {
                    headersToExpand.push(yearHeader, monthHeader, dayHeader);
                }
            });

            // 月見出しのクリックイベント
            monthHeader.addEventListener("click", () => {
                const isHidden = monthContent.style.display === "none";
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
            
            const isHidden = yearContent.style.display === "none";
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

    // 最新パッチノートのURLから飛んだ場合に、最新日付の情報を非同期処理で表示
    if (headersToExpand.length > 0) {
        setTimeout(() => {
            headersToExpand.forEach(header => {
                header.click();
            });
        }, 0);
    }
}

