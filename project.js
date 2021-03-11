//הגדרת מערך בסקופ גלובלי
let notes = [];
//הגדרת זמן נוכחי לשימוש בכמה פונקציות
const current_time = new Date();
const actuelTime = current_time.toISOString();
//בפעם הראשונה שטוענים את הדף
if (localStorage.notes)
    notes = JSON.parse(localStorage.notes);
displayNotes(notes);

function displayNotes(notes) {
    //inserNote אם הטעינה באה אחרי פונקציה     
    if (localStorage.notes)
        notes = JSON.parse(localStorage.notes);
    //מביא אלמנט קונטיינר כדי להוריד ילדים ולמנוע שכפול
    let element = document.getElementById("note_container");
    // while (element.firstChild) {
    //     element.removeChild(element.firstChild);
    // }
    //רץ על המערך ועושה בדיקת זמן אקטואלי
    for (let i = 0; i < (notes.length); i++) {
        const date_and_time = notes[i].noteDate + notes[i].noteTime;
        console.log("date: " + date_and_time);
        if (date_and_time < actuelTime) {
            notes.splice(i, 1);//אם זמן הפתק יותר קטן מזמן נוכחי, מוריד את הפתק
            const notes_json = JSON.stringify(notes);//עדכון מערך חדש
            localStorage.setItem("notes", notes_json);//שמירה בלוקל סטורג
            notes = JSON.parse(localStorage.notes);//שליפה מלוקל סטורג
            displayNotes(notes);//חוזר להתחלת הפונקציה לבדיקה חוזרת
        } else {
            printToHTML(notes, i);//עוברים להדפסת הפתקיות
        }
    }
}

function insertNote() {
    //מביא את הערכים כדי לבנות אוביקט הפתק החדש
    let note = {};
    const noteText = document.getElementById("noteText").value;
    let dateNote = document.getElementById("DateID").value;
    let timeNote = document.getElementById("TimeID").value;


    note.todo = noteText;
    note.noteDate = dateNote;
    note.noteTime = timeNote;


    const date_and_time = note.noteDate + note.noteTime;
    // const current_time = new Date();

    console.log("date: " + date_and_time);
    // const actuelTime = current_time.toISOString();
    //בדיקת זמנים בעת מילוי השדה תאריך ושעה
    if (date_and_time < actuelTime) {
        alert("You have to put a valid date and time!");
        return;
    }
    if (note.todo == "") {//ולדציה שבודקת אם טקסט קיים בשדה 
        alert("Please enter text");
    }
    else if (note.noteDate == "") {//ולדציה שבודקת אם מילאו תאריך בשדה
        alert("Please enter a valid date");
    }
    else if (note.noteTime == "") {//ולדציה שבודקת אם מילאו שעה בשדה
        alert("Please enter a valid time");
    }
    else {
        console.log(note.todo);
        console.log(note.noteDate);
        console.log(note.noteTime);
        notes.push(note);//אם הכל בסדר מוסיפים את הפתק למערך

        const notes_json = JSON.stringify(notes);//ומעדכנים את הלוקל סטורג
        localStorage.setItem("notes", notes_json);
        displayNotes(note);//קוראים לפונקציה דיספליי
        Clear();//מוחקים את כל השדות
    }
}


function printToHTML(note, i) {
    //בניית הפתקיה
    console.log(notes, i);
    const postIt = document.createElement("div");//מייצרים דיב לפתק
    postIt.className = "postIt fade-in col-3";//נותנים לו קלס
    let note_container = document.getElementById("note_container");
    note_container.appendChild(postIt);//מוסיפים לקונטיינר
    const littleRow = document.createElement("div");//לאייקון מייצרים row 
    littleRow.className = "row";
    postIt.appendChild(littleRow);//מוסיפים לפתק
    const icone = document.createElement("i");//אייקון מייצרים
    icone.classList.add("fi-xwluxl-times-wide");//נותנים לו קלס
    icone.onclick = function () { XClicked(this, i) };//האייקון מפעילה פונקצית מחיקה
    icone.id = "mybutton";//הוספתי id כדי לשלוט טוב יותר באייקון
    littleRow.appendChild(icone);
    const postItnote = document.createElement("div");//מייצרים דיב לפתק
    postItnote.className = "postItText";//נותנים לו קלס
    postItnote.style.overflowY="scroll";
    postItnote.innerHTML = `${notes[i].todo}`//מכניסים משתנה טקסט מכל אוביקט של המערך
    postIt.appendChild(postItnote);
    const row = document.createElement("div");
    row.className = "row";
    postIt.appendChild(row);
    const noteDate = document.createElement("div");//מייצרים דיב לפתק
    noteDate.className = "noteDate col-12";//נותנים לו קלס
    noteDate.innerHTML = `${notes[i].noteDate}`//מכניסים תאריך מכל אוביקט של המערך
    postIt.appendChild(noteDate);
    const noteTime = document.createElement("div");//מייצרים דיב לפתק
    noteTime.className = "noteTime col-12";//נותנים לו קלס
    noteTime.innerHTML = `${notes[i].noteTime}`//מכניסים תאריך מכל אוביקט של המערך
    postIt.appendChild(noteTime);

}


function XClicked(removed_obj, i) {
    console.log(removed_obj.parentElement.parentElement);
    removed_obj.parentElement.parentElement.remove();
    console.log(i)
    notes.splice(i, 1);//i מוריד 1 אלמנט במקום 
    console.log(notes, "after splice");
    const notes_json = JSON.stringify(notes);
    localStorage.setItem("notes", notes_json);//שומר את המערך החדש בלוקל סטורג
    console.log(JSON.stringify(notes));
    displayNotes();//קורא לפונקציה המציגה את הפתקיות
}

function Clear() {
    //מוחק כל השדות
    document.getElementById("noteText").value = "";
    document.getElementById("DateID").value = "";
    document.getElementById("TimeID").value = "";
}