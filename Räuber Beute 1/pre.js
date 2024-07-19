

$s("Wesen_Geburtenrate", 0.8);
$s("Wesen_Sterberate", 0.2);
$s("Wesen_Anzahl", 100);


function createWesen() {
  if ($is_null("Wesen_Anzahl")) {
    alert("Anzahl leer");
    return;
  }
  if ($is_null("Wesen_Geburtenrate")) {
    alert("Geburtenrate leer");
    return;
  }
  if ($is_null("Wesen_Sterberate")) {
    alert("Sterberate leer");
    return;
  }

  let wesen = new Wesen(
    Number($v("Wesen_Anzahl")),
    Number($v("Wesen_Geburtenrate")),
    Number($v("Wesen_Sterberate")),
    $v("Wesen_Name"),
    $v("Wesen_Farbe")
  );

  let id = tag("input", "row" + wesen.id);
  id.readOnly = true;
  let name = tag("input", "row" + wesen.id);
  let anzahl = tag("input", "row" + wesen.id);
  let geburtenrate = tag("input", "row" + wesen.id);
  let sterberate = tag("input", "row" + wesen.id);
  let color = tag("input", "row" + wesen.id);

  id.value = wesen.id;
  name.value = wesen.name;
  anzahl.value = wesen.Anzahl;
  geburtenrate.value = wesen.Geburtenrate;
  sterberate.value = wesen.Sterberate;
  color.value = wesen.color;

  id.type = "number"
  anzahl.type = "number";
  geburtenrate.type = "number";
  sterberate.type = "number";
  color.type = "color";

  name.onchange = () => {
    wesen.name = name.value;
  };
  anzahl.onchange = () => {
    wesen.Anzahl = anzahl.value;
  };
  geburtenrate.onchange = () => {
    wesen.Geburtenrate = geburtenrate.value;
  };
  sterberate.onchange = () => {
    wesen.Sterberate = sterberate.value;
  };
  color.onchange = () => {
    wesen.color = color.value;
  };

  anzahl.step = 1;
  geburtenrate.step = 0.001;
  sterberate.step = 0.001;

  get("Wesen_Grid").append(id,name, anzahl, geburtenrate, sterberate, color);


  let option = tag('option');
  option.value = wesen.id;
  option.display_value = wesen.name;
  get("Wesen_Liste").appendChild(option);
}

function createBeziehung() {
  if ($is_null("Beziehung_Räuber")) {
    alert("Räuber leer");
    return;
  }
  if ($is_null("Beziehung_Beute")) {
    alert("Beute leer");
    return;
  }

  let r_id = Number($v("Beziehung_Räuber"));
  let b_id = Number($v("Beziehung_Beute"));

  if(Beziehung_Raeuber_Beute.exist(r_id,b_id)){
    alert("Beziehung  zwischen " + Wesen.all[r_id].name + " als Räuber und " + Wesen.all[b_id].name + " als Beute existiert schon")
    return;
  }

  let beziehung = new Beziehung_Raeuber_Beute(
    Wesen.all[r_id],
    Wesen.all[b_id]
  );


  let raeuber = tag("input", "row" + beziehung.id);
  let beute = tag("input", "row" + beziehung.id);



  get("Beziehung_Grid").append(raeuber,beute);
  
  //get('Beziehung_Grid').innerHTML = get('Beziehung_Grid').innerHTML.replace(/input/gim,'input list="Wesen_Liste"')

  raeuber.value = beziehung.Raeuber.id;
  beute.value = beziehung.Beute.id;
  
  raeuber.onchange = () => {
    beziehung.Raeuber = Wesen.all(raeuber.value);
  };
  beute.onchange = () => {
      beziehung.Beute = Wesen.all(beute.value);
  };

}

