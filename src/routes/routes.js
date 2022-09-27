import { Router } from "express";
const router = Router();

// Importacion de Controladores
import * as clienteController from "../controllers/clienteController.js";
import * as equipoController from "../controllers/equipoController.js";
import * as equipoImeiController from "../controllers/equipoImeiController.js";
import * as ordenController from "../controllers/ordenController.js";
import * as indexPage from "../controllers/indexPage.js";
import * as presupuestoController from "../controllers/presupuestoController.js";
import * as tiposGenericosDeCosas from "../controllers/tiposGenericosDeCosas.js";
import * as repuestoController from "../controllers/repuestoController.js";
import * as pagoOrdenController from "../controllers/pagoOrdenController.js";
import * as entregaEquipoClienteController from "../controllers/entregaEquipoClienteController.js";

// /* 
// // Pagina Principal
// */
router.get('/', indexPage.indexPage)
router.get('/nuevaOrden', ordenController.renderNuevaOrdenPage);



router.get('/cliente/todos', clienteController.listarClientes);
router.get('/cliente/buscar/:dni', clienteController.buscarClientePorDni);
router.post('/cliente/nuevo', clienteController.nuevoCliente);
router.put('/cliente/editar', clienteController.editarCliente);



router.get('/equipo/imei/todos', equipoImeiController.listarEquiposConImei);
router.put('/equipo/imei/editar', equipoImeiController.editarImeiEquipo);
router.get('/equipo/imei/buscar/:imei', equipoImeiController.buscarEquiposPorImei);


router.get('/equipo/modelo/todos', equipoController.listarEquiposModelos);
router.put('/equipo/modelo/editar', equipoController.editarEquipoModelo);
router.get('/equipo/modelo/buscar/:modelo', equipoController.buscarEquipoPorModelo);


router.post('/nuevaOrden', ordenController.crearNuevaOrden);
router.get('/pdf/:id_orden', ordenController.generarPDFdeOrden)
router.get('/orden', ordenController.listarOrdenes)
router.get('/orden/buscar/:id_orden', ordenController.listarOrdenPorID)
router.put('/orden/editar', ordenController.editarOrden)



router.get('/presupuesto/orden/:id_orden', presupuestoController.listarPresupuestoPorOrdenID)
router.post('/presupuesto', presupuestoController.nuevoPresupuesto)
router.put('/presupuesto/actualizar/', presupuestoController.editarPresupuesto)



router.get('/tiposGenericos/tiposArreglos', tiposGenericosDeCosas.listarTiposArreglos)
router.post('/tiposGenericos/nuevoTipoArreglo', tiposGenericosDeCosas.nuevoTipoArreglo)

router.get('/repuesto/todos', repuestoController.listarTiposRepuestos)
router.post('/repuesto/nuevo', repuestoController.nuevoTipoRepuesto)

router.get('/repuesto/costo/todos', repuestoController.listarCostosRepuestos)
router.post('/repuesto/costo/nuevo', repuestoController.nuevoCostoRepuesto)
router.put('/repuesto/costo/editar', repuestoController.editarCostoRepuesto)

router.get('/repuesto/pedido/todos', repuestoController.listarPedidosRepuestos)
router.get('/repuesto/pedido/buscar/:id_pedido_repuesto', repuestoController.buscarPedidoRepuestoPorID)
router.post('/repuesto/pedido/nuevo', repuestoController.nuevoPedidoRepuesto)
router.put('/repuesto/pedido/editar', repuestoController.editarPedidoRepuesto)


router.get('/pagoOrden/todos', pagoOrdenController.listarPagosOrdenes)
router.get('/pagoOrden/buscar/:id_pago_orden', pagoOrdenController.buscarPagoOrdenPorID)
router.get('/pagoOrden/buscar/orden/:id_orden', pagoOrdenController.buscarPagoOrdenPorIdOrden)
router.post('/pagoOrden/nuevo', pagoOrdenController.nuevoPagoOrden)
router.put('/pagoOrden/editar', pagoOrdenController.editarPagoOrden)


router.get('/entrega/equiposcliente/todos', entregaEquipoClienteController.listarEntregasEquiposClientes)
router.post('/entrega/equiposcliente/nuevo', entregaEquipoClienteController.nuevaEntregaEquipoCliente )
router.put('/entrega/equiposcliente/editar', entregaEquipoClienteController.editarEntregaEquipoCliente)
router.get('/entrega/equiposcliente/buscar/:id_entrega_equipo_cliente', entregaEquipoClienteController.buscarEntregaEquipoClienteID)



export default router;