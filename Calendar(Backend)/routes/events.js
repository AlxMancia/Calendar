const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

//todas las ruta pasan por el validador del jwt por eso se pone aca asi
router.use(validarJWT);

router.get('/', getEvents );

router.post('/', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha inicio obligatoria').custom(isDate),
        check('end','Fecha final obligatoria').custom(isDate),
        validarCampos
    ]
,createEvent);

router.put('/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha inicio obligatoria').custom(isDate),
        check('end','Fecha final obligatoria').custom(isDate),
        validarCampos
    ]
,updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;