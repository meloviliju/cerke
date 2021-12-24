"use strict";

type PieceImgName = "bkua" | "bmaun" | "bkaun" | "buai" | "rio" | "ruai" | "rkaun" | "rmaun" | "rkua" |
    "rtuk" | "rgua" | "rdau" | "bdau" | "bgua" | "btuk" |
    "bkauk" | "rkauk" | "bkauk" | "rkauk" | "rnuak" | "rkauk" | "bkauk" | "rkauk" | "bkauk" |
    "btam" |
    "bkauk" | "rkauk" | "bkauk" | "rkauk" | "bnuak" | "rkauk" | "bkauk" | "rkauk" | "bkauk" |
    "btuk" | "bgua" | "bdau" | "rdau" | "rgua" | "rtuk" |
    "rkua" | "rmaun" | "rkaun" | "ruai" | "bio" | "buai" | "bkaun" | "bmaun" | "bkua" |
    "rtam" | "bmun" | "bmun" | "bmun" | "rmun" | "rmun" | "rmun" |
    "bsaup" | "bsaup" | "rsaup" | "rsaup" | "bhia" | "bhia" | "rhia" | "rhia";

const initial_coord_yhuap = [
    "KA", "LA", "NA", "TA", "ZA", "XA", "CA", "MA", "PA",
    "KE", "LE", "TE", "XE", "ME", "PE",
    "KI", "LI", "NI", "TI", "ZI", "XI", "CI", "MI", "PI",
    "ZO",
    "KAI", "LAI", "NAI", "TAI", "ZAI", "XAI", "CAI", "MAI", "PAI",
    "KAU", "LAU", "TAU", "XAU", "MAU", "PAU",
    "KIA", "LIA", "NIA", "TIA", "ZIA", "XIA", "CIA", "MIA", "PIA",
];

const pieces: ReadonlyArray<PieceImgName> = [
    "bkua", "bmaun", "bkaun", "buai", "rio", "ruai", "rkaun", "rmaun", "rkua",
    "rtuk", "rgua", "rdau", "bdau", "bgua", "btuk",
    "bkauk", "rkauk", "bkauk", "rkauk", "rnuak", "rkauk", "bkauk", "rkauk", "bkauk",
    "btam",
    "bkauk", "rkauk", "bkauk", "rkauk", "bnuak", "rkauk", "bkauk", "rkauk", "bkauk",
    "btuk", "bgua", "bdau", "rdau", "rgua", "rtuk",
    "rkua", "rmaun", "rkaun", "ruai", "bio", "buai", "bkaun", "bmaun", "bkua",
    "rtam", "bmun", "bmun", "bmun", "rmun", "rmun", "rmun",
    "bsaup", "bsaup", "rsaup", "rsaup", "bhia", "bhia", "rhia", "rhia"
];

const piece_names: ReadonlyArray<PieceImgName> = [
    "bnuak", "rnuak",
    "bkauk", "rkauk",
    "bgua", "rgua",
    "bkaun", "rkaun",
    "bdau", "rdau",
    "bmaun", "rmaun",
    "bkua", "rkua",
    "btuk", "rtuk",
    "buai", "ruai",
    "bio", "rio",
    "btam", "rtam",
    "bmun", "rmun",
    "bsaup", "rsaup",
    "bhia", "rhia"
];

class Choice {
    private _value: null | PieceImgName | number = null;

    get value(): null | PieceImgName | number {
        return this._value;
    }

    set value(new_value: null | PieceImgName | number) {
        // remove old blinking
        if (typeof this._value === "number") {
            document.getElementById(`${this._value}`).classList.remove("blinking");
        } else if (typeof this._value === "string") {
            (document.getElementById(`${this._value}_img`).childNodes[0] as HTMLImageElement).classList.remove("blinking");
        }

        this._value = new_value;
        if (new_value === null) {
            document.getElementById("choice").innerHTML = "";
        } else if (typeof new_value === "number") {
            document.getElementById("choice").innerHTML = `${new_value}`;
            document.getElementById(`${new_value}`).classList.add("blinking");
        } else {
            // If there is no more piece, making it unselectable is less confusing
            if (piece_counts[new_value].count > 0) {
                document.getElementById("choice").innerHTML = new_value;
                (document.getElementById(`${new_value}_img`).childNodes[0] as HTMLImageElement).classList.add("blinking");
            }
        }
    }

    piece_element(): HTMLElement {
        if (this._value === null) {
            console.log("NULL!!!!");
            return document.getElementById("");
        } else if (typeof this._value === "string") {
            return document.getElementById(this._value);
        } else if (typeof this._value === "number") {
            return document.getElementById(`${this._value}`);
        }
    }
}

const choice = new Choice();

class Count {
    private _p: PieceImgName
    private _count: number
    constructor(p: PieceImgName) {
        this._p = p;
    }
    get count(): number {
        return this._count;
    }
    set count(value: number) {
        this._count = value;
        document.getElementById(`${this._p}_num`).innerHTML = `${value}`
    }
}

const piece_counts: { [P in PieceImgName]: Count } = {
    bkua: new Count("bkua"),
    bmaun: new Count("bmaun"),
    bkaun: new Count("bkaun"),
    buai: new Count("buai"),
    rio: new Count("rio"),
    ruai: new Count("ruai"),
    rkaun: new Count("rkaun"),
    rmaun: new Count("rmaun"),
    rkua: new Count("rkua"),
    rtuk: new Count("rtuk"),
    rgua: new Count("rgua"),
    rdau: new Count("rdau"),
    bdau: new Count("bdau"),
    bgua: new Count("bgua"),
    btuk: new Count("btuk"),
    bkauk: new Count("bkauk"),
    rkauk: new Count("rkauk"),
    rnuak: new Count("rnuak"),
    btam: new Count("btam"),
    bnuak: new Count("bnuak"),
    bio: new Count("bio"),
    rtam: new Count("rtam"),
    bmun: new Count("bmun"),
    rmun: new Count("rmun"),
    bsaup: new Count("bsaup"),
    rsaup: new Count("rsaup"),
    bhia: new Count("bhia"),
    rhia: new Count("rhia"),
};

type ChoiceInnerHTMLType = string;

// move the choice(=piece) to td(=grid)
function move(td: HTMLTableCellElement) {
    const piece = choice.piece_element();
    piece.parentNode.removeChild(piece);
    td.appendChild(piece);
    choice.value = null;
    console.log("move");
}

type TargetDotId = number;

function getNth(i: number) {
    return document.getElementById(`${i}`);
}

function gain(target_id: number) { // target is also piece
    const piece = choice.piece_element();
    const target = getNth(target_id);
    if (piece === target || typeof choice.value === "string") return;

    piece.parentNode.removeChild(piece);
    target.parentNode.appendChild(piece);
    if (piece.classList.contains("reverse")) sendToRed(target_id);
    else sendToBlack(target_id);

    choice.value = null;
    console.log("gain");
}

// functions on the button
function rotate() {
    if (choice.value !== null) choice.piece_element().classList.toggle("reverse");
    choice.value = null;
    console.log("rotate");
}

function sendTo(dest: "red" | "black" | PieceImgName, piece_id: number) {
    const destination = document.getElementById(dest);
    const piece = getNth(piece_id);
    if (null == piece) { console.log("NPE"); return; }

    piece.parentNode.removeChild(piece);
    destination.appendChild(piece);
    choice.value = null;
}

function sendToRed(piece_id: number) {
    const piece = getNth(piece_id);
    piece.classList.add("reverse");
    sendTo("red", piece_id);
    console.log("red");
}

function sendToBlack(piece_id: number) {
    const piece = getNth(piece_id);
    piece.classList.remove("reverse");
    sendTo("black", piece_id);
    console.log("black");
}

function sendToRest(piece_id: number) {
    const piece = getNth(piece_id);
    piece.classList.remove("reverse");
    sendTo(pieces[piece_id], piece_id);
    piece_counts[pieces[piece_id]].count += 1;
    console.log("rest");
}

function spawnTo(dest: "black" | "red", piece_id: ChoiceInnerHTMLType) {
    const destination = document.getElementById(dest);
    const piece = document.getElementById(piece_id).firstChild;
    piece.parentNode.removeChild(piece);
    destination.appendChild(piece);
    choice.value = null;
}

function spawnToBlack(piece_img_name: PieceImgName) {
    const piece = document.getElementById(piece_img_name).firstChild;
    if (null == piece) { console.log("NPE"); return; }
    else piece_counts[piece_img_name].count -= 1;
    spawnTo("black", piece_img_name);
}

function spawnToRed(piece_img_name: PieceImgName) {
    const piece = document.getElementById(piece_img_name).firstChild;
    if (null == piece) { console.log("NPE"); return; }
    else piece_counts[piece_img_name].count -= 1;
    (piece as HTMLImageElement).classList.add("reverse");
    spawnTo("red", piece_img_name);
}

function ciurl() {
    let rand = 0;
    for (let i = 0; i < 5; i++) { rand += Math.round(Math.random()); }
    alert(rand);
}

function init_yhuap() {
    for (let i = 0; i < initial_coord_yhuap.length; i++) {
        const piece = document.getElementById(`${i}`);
        piece.parentNode.removeChild(piece);
        document.getElementById(initial_coord_yhuap[i]).appendChild(piece);
        if (i < 24) piece.classList.add("reverse");
        else piece.classList.remove("reverse");
    }
    for (let i = 0; i < initial_coord_yhuap.length; i++) {
        piece_counts[pieces[i]].count = 0;
    }
    console.log("init yhuap");
}

function init_sia() {
    generateBlackSaup();
    generateRedSaup();
    const piece_id_differing_in_sia = [
        0, 1, 2, 3, 7, 8,
        9, 10, 11, 12, 13, 14,
        15, 17, 21, 23,
        24,
        26, 28, 30, 32,
        34, 35, 36, 37, 38, 39,
        40, 41, 42, 43, 47, 48,
        56, 57, 58, 59
    ];
    const differing_pieces_dest = [
        "unused", "unused", "NIA", "TIA", "unused", "unused",
        "unused", "KA", "unused", "unused", "KIA", "unused",
        "LAI", "TAI", "XAI", "MAI",
        "unused",
        "KI", "NI", "CI", "PI",
        "unused", "PIA", "unused", "unused", "PA", "unused",
        "unused", "unused", "NA", "TA", "unused", "unused",
        "LIA", "MIA", "LA", "MA"
    ]
    for (let i = 0; i < initial_coord_yhuap.length; i++) {
        const piece = getNth(i);
        piece.parentNode.removeChild(piece);
        document.getElementById(initial_coord_yhuap[i]).appendChild(piece);
    }
    for (let i = 0; i < initial_coord_yhuap.length; i++) {
        piece_counts[pieces[i]].count = 0;
    }
    for (let i = 0; i < piece_id_differing_in_sia.length; i++) {
        const id = piece_id_differing_in_sia[i];
        const dest = differing_pieces_dest[i];
        if (dest === "unused") {
            sendToRest(id);
        } else {
            const piece = getNth(id);
            piece.parentNode.removeChild(piece);
            document.getElementById(differing_pieces_dest[i]).appendChild(piece);
        }
    }
    console.log("init sia");
}

function cancelChoice() {
    choice.value = null;
}

type Column = "K" | "L" | "N" | "T" | "Z" | "X" | "C" | "M" | "P";
type Row = "A" | "E" | "I" | "U" | "O" | "Y" | "AI" | "AU" | "IA";

function setup() { setupMaterials(); setupConsole(); }

function setupMaterials() { loadBoard(); loadRestArea(); loadPieces(); loadPieceList(); }
function setupConsole() { setButtonFunction(); setCheckboxFuntion(); }

function loadBoard() {
    const column: ReadonlyArray<Column> = ["K", "L", "N", "T", "Z", "X", "C", "M", "P"];
    const row: ReadonlyArray<Row> = ["A", "E", "I", "U", "O", "Y", "AI", "AU", "IA"];
    const tanna = ["ZI", "ZU", "NO", "TO", "XO", "CO", "ZY", "ZAI"];
    const tarfe = ["NI", "CI", "TU", "XU", "TY", "XY", "NAI", "CAI"];
    const table = document.getElementById("board") as HTMLTableElement;

    for (let i = 0; i < row.length; i++) {
        const newtr = table.insertRow(-1);
        for (let j = 0; j < column.length; j++) {
            const newtd: HTMLTableCellElement = newtr.insertCell(-1);
            const newid = `${column[j]}${row[i]}`;

            newtd.id = newid;
            newtd.classList.add("cell");
            if (tarfe.includes(newid)) {
                newtd.classList.add("tarfe");
            } else if (tanna.includes(newid)) {
                newtd.classList.add("tanna");
            } else if (newid === "ZO") {
                newtd.classList.add("tanzo");
            }

            newtd.addEventListener("click", (event) => {
                if ((event.target as HTMLElement).tagName !== "IMG" && choice.value !== null) {
                    if (typeof choice.value === "string") {
                        const piece = choice.piece_element().firstChild;
                        if (null == piece) { console.log("NPE"); return; }

                        piece.parentNode.removeChild(piece);
                        newtd.appendChild(piece);
                        piece_counts[choice.value].count -= 1;
                        choice.value = null;
                        console.log("spawn");

                    } else move(newtd);
                }
            });
        }
        const newtd = newtr.insertCell(-1);
        newtd.classList.add("coordinate");
        newtd.innerHTML = `<b>${row[i]}</b>`;
    }
    const newtr = table.insertRow(-1);
    for (let k = 0; k < column.length + 1; k++) {
        const newtd = newtr.insertCell(-1);
        newtd.classList.add("coordinate");
        newtd.innerHTML = k < column.length ? `<b>${column[k]}</b>` : "";
    }
}

function loadRestArea() {
    for (let i = 0; i < piece_names.length; i++) {
        const rest = document.getElementById("rest");
        const newdiv = document.createElement("div");
        rest.appendChild(newdiv);
        newdiv.id = piece_names[i];
    }
}

function loadPieces() {
    for (let i = 0; i < pieces.length; i++) {
        const newimg = document.createElement("img");
        document.getElementById(pieces[i]).appendChild(newimg);
        newimg.className = "piece";
        newimg.id = `${i}`;
        newimg.src = `./pieces/${pieces[i]}.png`;
        newimg.addEventListener("click", () => {
            if (choice.value !== null) gain(i);
            else choice.value = i;
        });
    }
}

function loadPieceList() {
    for (let i = 0; i < 4; i++) {
        const tr_img = document.getElementById(`pl${i}`);
        const tr_num = document.getElementById(`pl${i + 4}`);
        for (let j = 0; j < 7; j++) {
            const num = i * 7 + j;
            // fill blank cells
            const newtd_img = document.createElement("td");
            tr_img.appendChild(newtd_img);
            newtd_img.id = `${piece_names[num]}_img`;
            newtd_img.className = "piece_img";
            const newtd_num = document.createElement("td");
            tr_num.appendChild(newtd_num);
            newtd_num.id = `${piece_names[num]}_num`;
            newtd_num.className = "piece_num";
            if (num < 21) fillPieceCell(num);
        }
    }    
}

function setButtonFunction() {
    document.getElementById("send_to_red").addEventListener("click", (event) => {
        if (choice.value !== null) {
            if (typeof choice.value === "string") {
                spawnToRed(choice.value);
            } else sendToRed(choice.value);
        }
    });

    document.getElementById("send_to_black").addEventListener("click", (event) => {
        if (choice.value !== null) {
            if (typeof choice.value === "string") {
                spawnToBlack(choice.value);
            } else sendToBlack(choice.value);
        }
    });

    document.getElementById("send_to_rest").addEventListener("click", (event) => {
        if (choice.value !== null) {
            if (typeof choice.value === "number") {
                sendToRest(choice.value);
            } else {
                console.log("called in vain");
            }
        }
    });
}

function setCheckboxFuntion() {
    document.getElementById("red_tam_checkbox").addEventListener("change", () => {
        if ((document.getElementById("red_tam_checkbox") as HTMLInputElement).checked) generateRedTam();
        else drainRedTam();
    });

    document.getElementById("mun_checkbox").addEventListener("change", () => {
        if ((document.getElementById("mun_checkbox") as HTMLInputElement).checked) { generateBlackMun(); generateRedMun(); }
        else { drainBlackMun(); drainRedMun(); }
    });

    document.getElementById("saup_checkbox").addEventListener("change", () => {
        if ((document.getElementById("saup_checkbox") as HTMLInputElement).checked) { generateBlackSaup(); generateRedSaup(); }
        else { drainBlackSaup(); drainRedSaup(); }
    });

    document.getElementById("hia_checkbox").addEventListener("change", () => {
        if ((document.getElementById("hia_checkbox") as HTMLInputElement).checked) { generateBlackHia(); generateRedHia(); }
        else { drainBlackHia(); drainRedHia(); }
    });
}

function fillPieceCell(num: number) { loadPieceImgCell(num); loadPieceNumCell(num); }
function drainPieceCell(num: number) { drainPieceImgCell(num); drainPieceNumCell(num); }

function loadPieceImgCell(num: number) {
    const td_img = document.getElementById(`${piece_names[num]}_img`);

    const inner_img = document.createElement("img");
    inner_img.src = `./pieces/${piece_names[num]}.png`;
    inner_img.height = 50;
    inner_img.width = 50;
    const new_val = piece_names[num];
    inner_img.addEventListener("click", () => {
        choice.value = new_val;
    });
    td_img.innerHTML = "";
    td_img.appendChild(inner_img);
}

function loadPieceNumCell(num: number) {
    piece_counts[piece_names[num]].count = document.getElementById(piece_names[num]).children.length;
}

function drainPieceImgCell(num: number) {
    const td_img = document.getElementById(`${piece_names[num]}_img`);
    td_img.innerHTML = "";
}

function drainPieceNumCell(num: number) {
    const td_num = document.getElementById(`${piece_names[num]}_num`);
    td_num.innerHTML = "";
}

// red tam
function generateRedTam() { fillPieceCell(21); }
function drainRedTam() { sendToRest(49); drainPieceCell(21); }

// mun
function generateBlackMun() { fillPieceCell(22); }
function generateRedMun() { fillPieceCell(23); }

function drainBlackMun() {
    sendToRest(50); sendToRest(51); sendToRest(52);
    drainPieceCell(22);
}
function drainRedMun() {
    sendToRest(53); sendToRest(54); sendToRest(55);
    drainPieceCell(23);
}

// saup
function generateBlackSaup() { fillPieceCell(24); }
function generateRedSaup() { fillPieceCell(25); }

function drainBlackSaup() {
    sendToRest(56); sendToRest(57);
    drainPieceCell(24);
}
function drainRedSaup() {
    sendToRest(58); sendToRest(59);
    drainPieceCell(25);
}

// hia
function generateBlackHia() { fillPieceCell(26); }
function generateRedHia() { fillPieceCell(27); }

function drainBlackHia() {
    sendToRest(60); sendToRest(61);
    drainPieceCell(26);
}
function drainRedHia() {
    sendToRest(62); sendToRest(63);
    drainPieceCell(27);
}