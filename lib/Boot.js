
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


class Canvas{};

/*[CLASS_INIT]*/


	importJs('../lib/Canvas.js');
	load_Canvas = false;

	/*[CLASS_IMPORT]*/

    importJs("Main.js");

    // Set some load variables
    main_is_loading = true
    let check_Main = setInterval(() => {
        try {
            //Main should only be runnable, if all classes are loaded.
            if (Main && load_Canvas/*[CLASS_LOAD]*/ && main_is_loading) {
                main_is_loading = false;
                Main();
                clearInterval(check_Main);
            }

        }
        catch (e) {
            console.log("load...")

        }
    }, 1);

