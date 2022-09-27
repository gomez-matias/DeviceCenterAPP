
import prisma from "../database/db_prisma.js";

export const nuevoTipoRepuesto = async (req, res) =>{
  try {
    let { tipo_repuesto } = req.body;
    let nuevoTipoRepuesto = await prisma.tipo_repuesto.upsert({
      where:{ tipo_repuesto: tipo_repuesto },
      update:{ tipo_repuesto: tipo_repuesto },
      create:{ tipo_repuesto: tipo_repuesto }
    });
    res.json(nuevoTipoRepuesto);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}
export const listarTiposRepuestos = async (req, res) =>{
  try {
    let listaTiposRepuestos = await prisma.tipo_repuesto.findMany();
    res.json(listaTiposRepuestos);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}



export const nuevoCostoRepuesto = async (req, res) =>{
  try { 
    let { id_equipo, id_tipo_repuesto, calidad, costo_usd } = req.body;
    id_equipo = Number(id_equipo)
    id_tipo_repuesto = Number(id_tipo_repuesto)
    costo_usd = parseFloat(costo_usd)
    let nuevoCostoRepuesto = await prisma.costo_repuesto.upsert({
      where:{
        id_tipo_repuesto_id_equipo_calidad:{
          id_equipo: id_equipo,
          id_tipo_repuesto: id_tipo_repuesto,
          calidad: calidad
        }
      },
      update: {
        id_equipo: id_equipo,
        id_tipo_repuesto: id_tipo_repuesto,
        calidad: calidad,
        costo_usd: costo_usd
      },
      create: {
        id_equipo: id_equipo,
        id_tipo_repuesto: id_tipo_repuesto,
        calidad: calidad,
        costo_usd: costo_usd
      }
    })
    
    res.json(nuevoCostoRepuesto);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}

export const listarCostosRepuestos = async (req, res) =>{
  try { 
    let listaCostosRepuestos = await prisma.costo_repuesto.findMany()
    res.json(listaCostosRepuestos);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}

export const editarCostoRepuesto = async (req, res) =>{
  try {
    let { id_equipo, id_tipo_repuesto, calidad, costo_usd, id_costo_repuesto } = req.body;
    id_costo_repuesto = Number(id_costo_repuesto)
    id_equipo = Number(id_equipo)
    id_tipo_repuesto = Number(id_tipo_repuesto)
    costo_usd = parseFloat(costo_usd)
    let costoRepuestoActualizado = await prisma.costo_repuesto.update({
      where:{
        id: id_costo_repuesto
      },
      data:{
        id_equipo : id_equipo,
        id_tipo_repuesto: id_tipo_repuesto,
        calidad: calidad,
        costo_usd: costo_usd
      }
    }) 
    res.json(costoRepuestoActualizado);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}



export const nuevoPedidoRepuesto = async (req, res) =>{
  try {
    let { id_presupuesto } = req.body;
    id_presupuesto = Number(id_presupuesto)
    let nuevoPedidoRepuesto = await prisma.pedido_repuesto.create({
      data:{
        presupuesto:{
          connect:{
            id: id_presupuesto
          }
        }
      }
    })
    res.json(nuevoPedidoRepuesto);
  } catch (error) {
    let { code } = error;
    let message =
      code === "P2014"
        ? "ERROR: Ya Existe UN Pedido para el Presupuesto Ingresado"
        : error;
    res.json(message);
  }
}

export const listarPedidosRepuestos = async (req, res) =>{
  try { 
    let listaPedidosRepuestos = await prisma.pedido_repuesto.findMany()
    res.json(listaPedidosRepuestos);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}

export const buscarPedidoRepuestoPorID = async (req, res) =>{
  try { 
    let id_pedido_repuesto = req.params.id_pedido_repuesto;
    let pedidoRepuestoEncontrado = await prisma.pedido_repuesto.findUnique({
      where:{
        id: Number(id_pedido_repuesto)
      }
    });
    res.json(pedidoRepuestoEncontrado);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}

export const editarPedidoRepuesto = async (req, res) =>{
  try {
    let { id_pedido_repuesto, id_equipo, id_presupuesto, costo_pesos, estado_pedido } = req.body;
    id_pedido_repuesto = Number(id_pedido_repuesto)
    id_equipo = Number(id_equipo)
    id_presupuesto = Number(id_presupuesto)
    costo_pesos = parseFloat(costo_pesos)
    let fecha_entrega_tecnico = new Date();
    let pedidoRepuestoActualizado = await prisma.pedido_repuesto.update({
      where:{
        id: id_pedido_repuesto
      },
      data:{
        id_presupuesto: id_presupuesto,
        costo_pesos: costo_pesos,
        estado_pedido: estado_pedido,
        fecha_entrega_tecnico: fecha_entrega_tecnico
      }
    }) 
    res.json(pedidoRepuestoActualizado);
  } catch (error) {
    let { code } = error;
    let message =
      code === "P2003"
        ? "ERROR: El Presupuesto Ingresado NO EXISTE"
        : error;
    res.json(message);
  }
}