

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

const createInput = (name,type="text",DEFAULT=null) => {
    let t = document.createElement('label');
    t.innerHTML = name;
    t.setAttribute('for',name);
    let e = document.createElement('INPUT');
    e.type = type;
    e.id = name;
    e.name = name;

    let div = document.createElement('div');
    div.append(t,e);
    

    document.body.append(div);

    e.value = DEFAULT;

    return e;
}

let button_id = 0;
const createFormButton = (src,txt = null) => {
    let f = document.createElement('form');
    let b = document.createElement('button');
    f.appendChild(b);
    document.body.appendChild(f);

    f.action = `../${src}/Page.html`;
    b.type = 'submit';
    if(txt) b.innerHTML = txt;
    else{
        b.innerHTML = src;
    }

    return b;
}

const nextRow = () => document.body.append(document.createElement('br'));

importCSS("../lib/Load.css");



// Make imported objects visible
class gameObject{};
importJs("../lib/gameObject.js");

class Rect extends gameObject{};
importJs("../lib/Rect.js");
load_rect = false;

class Circle extends gameObject{};
importJs("../lib/Circle.js");
load_circle = false;

class Vector2D extends gameObject{};
importJs("../lib/Vector2D.js");
load_vector2d = false;

class Image extends gameObject{};
importJs("../lib/Img.js");
load_img = false;

class Mouse extends gameObject{};
importJs("../lib/Mouse.js");
load_mouse = false;


class Complex extends Object{};
importJs('../lib/Complex.js');
load_Complex = false;

//addClass


importJs("../lib/createCanvas.js");

importJs("Main.js");

// Set some load variables
load_main = true
let check_Main = setInterval(()=>{
    try{
        //Main should only be runnable, if all classes are loaded.
        if(Main && load_rect && load_circle && load_vector2d && load_img && load_mouse && load_Complex/*load_class*/ && load_main){
            load_main = false;
            Main();
            clearInterval(check_Main);
        }
        console.log("load...")

    }
    catch(e){
        
    }
},1);


