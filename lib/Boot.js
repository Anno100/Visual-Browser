

let imported_files_js = 0;

const importJs = (path) => {

     
    let e = document.createElement("script");
    e.src = path;
    document.body.appendChild(e);
    imported_files_js++;

}

const importCSS = (path) => {

    let e = document.createElement("link");
    e.href = path;
    e.rel = 'stylesheet';
    document.head.appendChild(e);

    return;
}

const createInput = (name,type="text") => {
    let t = document.createElement('label');
    t.innerHTML = name;
    let e = document.createElement('input');
    e.type = type;
    e.id = name;

    document.body.append(t,e);

    return e;
}
const nextRow = () => document.body.innerHTML += "<br>";

importCSS("../lib/Load.css");


importJs("../lib/createCanvas.js");

// Make imported objects visible
class gameObject{};
importJs("../lib/gameObject.js");
class Rect extends gameObject{};
importJs("../lib/Rect.js");
class Circle extends gameObject{};
importJs("../lib/Circle.js");
class Vector2D extends gameObject{};
importJs("../lib/Vector2D.js");

importJs("Main.js");

// Set some load variables
load_main = true
load_rect = false;
load_circle = false;
load_vector2d = false;

let check_Main = setInterval(()=>{
    try{
        //Main should only be runnable, if all classes are loaded.
        if(Main && load_rect && load_circle && load_vector2d && load_main){
            load_main = false;
            Main();
            clearInterval(check_Main);
        }
        console.log("load...")

    }
    catch(e){
        
    }
},1);

