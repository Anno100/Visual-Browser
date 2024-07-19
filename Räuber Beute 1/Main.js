
function Main() {
    
    generate = () => {
        Beziehung_Raeuber_Beute.all.forEach(e => {e.tick();console.log(e.toString())})
    }


}