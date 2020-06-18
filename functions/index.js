const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.calculo = functions.database.ref('/Medidas/{id_socio}/Mediciones/{id_anio}/{id_mes}/medicion')
  .onWrite(async (change, context) => {

    console.log(" PRIMERA FUNCION EJECUTADA", change);


    let vactual = change.after.val(); // valor actual
    const anio = context.params.id_anio;
    const mestext = context.params.id_mes;
    const socio = context.params.id_socio;

    let vanterior = 0;

    const promises = [];
    promises.push(consultar(anio, mestext, socio));

    await Promise.all(promises).then((values) => {

      console.log("VALORES ", values);
      vanterior = values;
    })


    console.log('ANTERIOR ACTUALIZADO');

    if (vanterior===0){
      vanterior = vactual;
    }

    return change.after.ref.parent.parent.parent.parent.parent.parent.child('/Consumo/' + socio + "/Valores/" + anio + "/" +
      mestext + "/Consumido_m3").set(vactual - vanterior);

  });


function consultar(anio, mes, socio) {

  const n_date = new Date(anio, (mes - 1), 1);
  n_date.setDate(n_date.getDate() - 1);

  anio = n_date.getFullYear();
  mes = n_date.getMonth();

  console.log("ANIO ", anio + "MES ", mes);

  return new Promise((resolve, reject) => {
    try {
      db = admin.database();
      ref2 = db.ref('/Medidas/' + socio + '/Mediciones/' + anio + '/' + (mes + 1) + '/medicion');
      ref2.on('value', function (snap) {

        let anterior = snap.val();

        console.log('ANTERIOR ', anterior, snap);

        resolve(anterior);

      });
    } catch(e){
      reject(0);
    }


  })


}
