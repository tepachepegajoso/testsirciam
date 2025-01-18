
//JMAG 17012025
import { Selector, ClientFunction } from 'testcafe';

fixture `Ingreso a SIRCIAM`
    .page `https://adco.sre.gob.mx/sirciam/`;

const clickElement = ClientFunction((selector) => {
    const element = document.querySelector(selector);
    if (element) {
        element.click();
    } else {
        throw new Error(`No se encontró el elemento: ${selector}`);
    }
});

test('Completar formulario, buscar por folio, acceder al mapa, seleccionar opciones y escribir en el formulario', async t => {
  
    const userInput = Selector('#user');
    const passwordInput = Selector('#password');
    const submitButton = Selector('button.ui.red.submit.button');
    const consulAppSelector = 'a.ui.inverted.button[href="administracion/consulapp/nuevo"]';


    await t
        .typeText(userInput, 'Denisse Ruiz') // Credenciales del Operador
        .typeText(passwordInput, 'Lo$Vag4bundo5') 
        .click(submitButton); 

    await t.expect(Selector(consulAppSelector).exists).ok('Modulo 1 OK');
    await clickElement(consulAppSelector); 

    const folioInput = Selector('#folio');
    const buscarButton = Selector('button.ui.button.back-button');

    await t
        .typeText(folioInput, 'ConsulApp-250116C000106') // Cambiar el folio ConsulApp
        .click(buscarButton); 

    const eyeIcon = Selector('i.eye.icon');
    const mapIcon = Selector('i.map.marker.alternate.icon');

    await t
        .expect(eyeIcon.exists).ok('Botón 1 Ok.')
        .click(eyeIcon) 
        .expect(mapIcon.exists).ok('Botón 2 Ok');


    await clickElement('i.map.marker.alternate.icon'); 

    await t.wait(5000); // Puse esta pausa para dejar que reaccione el sistema

    const statusSelect = Selector('select#status').nth(0);

    const estatusSelect = Selector('select#status').nth(1);

    await t
        .click(statusSelect)
        .click(statusSelect.child('option[value="1"]')) // Cambiar con valores de 1 a 5 para cambiar entre estatus

        // Select 2 porque se llaman igual alv
        .click(estatusSelect)
        .click(estatusSelect.child('option[value="1"]')) // Cambiar con valores del 1 al 7 para cambiar entre opción del catalogo 

        const anotacionesTextArea = Selector('#anotaciones');
        await t.typeText(anotacionesTextArea, 'Texto de ejemplo para las anotaciones');  // Cambiar las anotaciones

        const saveButton = Selector('button.ui.button.back-button').withText('Guardar Estatus ConsulApp');
        await t
            .click(saveButton)
            .wait(3000); // Esta pausa si hay que dejarla para que no se muera
});
