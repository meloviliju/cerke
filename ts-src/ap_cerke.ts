"use strict";

// shows who it belongs
type PlayerDirection = "up" | "right" | "down" | "left";

function gain_ap(target_id: number) { // target is also piece
    const piece = choice.piece_element();
    const target = getNth(target_id);
    if (piece === target || typeof choice.value === "string") return;

    piece.parentNode.removeChild(piece);
    target.parentNode.appendChild(piece);

    if (piece.classList.contains("right")) { sendToRight(target_id); }
    else if (piece.classList.contains("down")) { sendToDown(target_id); }
    else if (piece.classList.contains("left")) { sendToLeft(target_id); }
    else { sendToUp(target_id); }

    choice.value = null;
    console.log("gain");
}

function rotateClockwise_ap() {
    if (choice.value === null) { return; }
    else {
        if (choice.piece_element().classList.contains("up")) {
            choice.piece_element().classList.remove("up");
            choice.piece_element().classList.add("right");
        } else if (choice.piece_element().classList.contains("right")) {
            choice.piece_element().classList.remove("right");
            choice.piece_element().classList.add("down");
        } else if (choice.piece_element().classList.contains("down")) {
            choice.piece_element().classList.remove("down");
            choice.piece_element().classList.add("left");
        } else {
            choice.piece_element().classList.remove("left");
            choice.piece_element().classList.add("up");
        }
    }
    choice.value = null;
    console.log("clockwise");
}

function rotateAntiClockwise_ap() {
    if (choice.value === null) { return; }
    else {
        if (choice.piece_element().classList.contains("up")) {
            choice.piece_element().classList.remove("up");
            choice.piece_element().classList.add("left");
        } else if (choice.piece_element().classList.contains("left")) {
            choice.piece_element().classList.remove("left");
            choice.piece_element().classList.add("down");
        } else if (choice.piece_element().classList.contains("down")) {
            choice.piece_element().classList.remove("down");
            choice.piece_element().classList.add("right");
        } else {
            choice.piece_element().classList.remove("right");
            choice.piece_element().classList.add("up");
        }
    }
    choice.value = null;
    console.log("anticlockwise");
}

function sendTo_ap(dest: PlayerDirection | PieceImgName, piece_id: number) {
    const destination = document.getElementById(dest);
    const piece = getNth(piece_id);
    if (null == piece) { console.log("NPE"); return; }

    piece.parentNode.removeChild(piece);
    destination.appendChild(piece);
    choice.value = null;
}

function sendToUp(piece_id: number) {
    const piece = getNth(piece_id);
    piece.classList.remove("left");
    piece.classList.remove("right");
    piece.classList.remove("down");
    piece.classList.add("up");
    sendTo_ap("up", piece_id);
    console.log("to up");
}

function sendToLeft(piece_id: number) {
    const piece = getNth(piece_id);
    piece.classList.remove("up");
    piece.classList.remove("right");
    piece.classList.remove("down");
    piece.classList.add("left");
    sendTo_ap("left", piece_id);
    console.log("to left");
}

function sendToRight(piece_id: number) {
    const piece = getNth(piece_id);
    piece.classList.remove("up");
    piece.classList.remove("left");
    piece.classList.remove("down");
    piece.classList.add("right");
    sendTo_ap("right", piece_id);
    console.log("to left");
}

function sendToDown(piece_id: number) {
    const piece = getNth(piece_id);
    piece.classList.remove("left");
    piece.classList.remove("right");
    piece.classList.remove("up");
    piece.classList.add("down");
    sendTo_ap("down", piece_id);
    console.log("to down");
}

function sendToRest_ap(piece_id: number) {
    const piece = getNth(piece_id);
    piece.classList.remove("up");
    piece.classList.remove("left");
    piece.classList.remove("down");
    piece.classList.remove("right");
    sendTo(pieces[piece_id], piece_id);
    piece_counts[pieces[piece_id]].count += 1;
    console.log("rest");
}

function spawnTo_ap(dest: PlayerDirection | Coordinate, piece_img_name: PieceImgName) {
    const destination = document.getElementById(dest);
    const piece = document.getElementById(piece_img_name).firstChild as HTMLImageElement;

    if (null == piece) { console.log("NPE"); return; }

    if (dest === "up") { piece.classList.add("up"); }
    else if (dest === "right") { piece.classList.add("right"); }
    else if (dest === "down") { piece.classList.add("down"); }
    else if (dest === "left") { piece.classList.add("left"); }
    else { piece.classList.add("down"); }

    piece.parentNode.removeChild(piece);
    destination.appendChild(piece);
    piece_counts[piece_img_name].count -= 1;
    choice.value = null;
}

function spawnToUp(piece_img_name: PieceImgName) { spawnTo_ap("up", piece_img_name); }
function spawnToRight(piece_img_name: PieceImgName) { spawnTo_ap("right", piece_img_name); }
function spawnToDown(piece_img_name: PieceImgName) { spawnTo_ap("down", piece_img_name); }
function spawnToLeft(piece_img_name: PieceImgName) { spawnTo_ap("left", piece_img_name); }

function resetBoard_ap() {
    for (let i = 0; i < pieces.length; i++) {
        if ((getNth(i).parentNode as HTMLElement).classList.contains("rest")) {}
        else { sendToRest_ap(i); }
    }
}

function init_ap() {
    const initial_coord_ap: ReadonlyArray<Coordinate> = [
        "NA", "TA", "ZA", "XA", "CA", "TE", "ZE", "XE", "ZI",
        "PI", "PU", "PO", "PY", "PAI", "MU", "MO", "MY", "CO",
        "CIA", "XIA", "ZIA", "TIA", "NIA", "XAU", "ZAU", "TAU", "ZAI",
        "KAI", "KY", "KO", "KU", "KI", "LY", "LO", "LU", "NO"
    ];
    const pieces_name_ap: ReadonlyArray<PieceImgName> = [
        "rkaun", "rgua", "rnuak", "ruai", "rtuk", "rkauk", "rkua", "rkauk", "rkauk",
        "bkaun", "bgua", "bnuak", "buai", "btuk", "bkauk", "bkua", "bkauk", "bkauk",
        "rkaun", "rgua", "rio", "ruai", "rtuk", "rkauk", "rkua", "rkauk", "rkauk",
        "bkaun", "bgua", "bio", "buai", "btuk", "bkauk", "bkua", "bkauk", "bkauk"
    ];
    const pieces_ap = [
        6, 10, 19, 5, 9, 16, 8, 18, 20,
        2, 13, 29, 3, 14, 15, 0, 17, 21,
        42, 38, 4, 43, 39, 32, 40, 30, 28,
        46, 35, 44, 45, 34, 23, 48, 25, 27
    ];

    resetBoard_ap();

    for (let i = 0; i < initial_coord_ap.length; i++) {
        const piece_id = pieces_ap[i]
        const piece = pieces_name_ap[i];
        const dest = initial_coord_ap[i];
        spawnTo_ap(dest, piece);

        const rotateLeft = () => {
            choice.value = piece_id;
            rotateClockwise_ap();
        };

        const rotateUp = () => {
            choice.value = piece_id;
            rotateClockwise_ap();
            choice.value = piece_id;
            rotateClockwise_ap();
        };

        const rotateRight = () => {
            choice.value = piece_id;
            rotateAntiClockwise_ap();
        };

        if (i < 9) { rotateUp(); }
        else if (i < 18) { rotateRight() }
        else if (i < 27) { }
        else { rotateLeft(); }
    }
    console.log("init ap");
}

const tdClickCallbackFunction_ap = (newtd: HTMLTableCellElement, newid: string) => () => {
    if ((event.target as HTMLElement).tagName !== "IMG" && choice.value !== null) {
        if (typeof choice.value === "string") {
            const piece = choice.piece_element().firstChild;
            if (null == piece) { console.log("EMPTY"); return; }
            else {
                spawnTo_ap(newid as Coordinate, choice.value);
                console.log("spawn");
            }
        } else {
            move(newtd);
        }
    }
};

const pieceClickCallbackFunction_ap = (piece_num: number) => () => {
    if (choice.value !== null) gain_ap(piece_num);
    else choice.value = piece_num;
};

function setup_ap() { setupMaterials_ap(); setupConsole_ap(); }

function setupMaterials_ap() {
    loadBoard(tdClickCallbackFunction_ap); loadRestArea();
    loadPieces(pieceClickCallbackFunction_ap); loadPieceList();
}
function setupConsole_ap() { setButtonFunction_ap(); setKeyShortcut_ap(); }

function setButtonFunction_ap() {
    document.getElementById("send_to_up").addEventListener("click", (event) => {
        if (choice.value !== null) {
            if (typeof choice.value === "string") {
                spawnToUp(choice.value);
            } else sendToUp(choice.value);
        }
    });

    document.getElementById("send_to_right").addEventListener("click", (event) => {
        if (choice.value !== null) {
            if (typeof choice.value === "string") {
                spawnToRight(choice.value);
            } else sendToRight(choice.value);
        }
    });

    document.getElementById("send_to_down").addEventListener("click", (event) => {
        if (choice.value !== null) {
            if (typeof choice.value === "string") {
                spawnToDown(choice.value);
            } else sendToDown(choice.value);
        }
    });

    document.getElementById("send_to_left").addEventListener("click", (event) => {
        if (choice.value !== null) {
            if (typeof choice.value === "string") {
                spawnToLeft(choice.value);
            } else sendToLeft(choice.value);
        }
    });

    document.getElementById("send_to_rest").addEventListener("click", (event) => {
        if (choice.value !== null) {
            if (typeof choice.value === "number") {
                sendToRest(choice.value);
            } else {
                console.log("rest to rest");
            }
        }
    });
}

function setKeyShortcut_ap() {
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "Escape": cancelChoice(); break;
            case "c": rotateAntiClockwise_ap(); break;
            case "r": rotateClockwise_ap(); break;
            case "f": if (typeof choice.value === "number") { sendToRest_ap(choice.value); } break;
            case "w": if (typeof choice.value === "number") { sendToUp(choice.value); } break;
            case "d": if (typeof choice.value === "number") { sendToRight(choice.value); } break;
            case "s": if (typeof choice.value === "number") { sendToDown(choice.value); } break;
            case "a": if (typeof choice.value === "number") { sendToLeft(choice.value); } break;
            case "y": if (window.confirm('四人机戦の初期配置に並べます、よろしいですか？')) { init_ap(); } break;
        }
    })
}