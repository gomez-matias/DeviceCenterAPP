import prisma from "../database/db_prisma.js";

export const nuevoPagoOrden = async (req, res) =>{
  try {
    let { id_presupuesto, medio_pago, precio_cliente, plata_que_llego } = req.body;
    let nuevoPagoOrden = await prisma.pago_orden.create({
      data:{
        id_presupuesto: Number(id_presupuesto),
        medio_pago: medio_pago,
        precio_cliente: parseFloat(precio_cliente),
        plata_que_llego: parseFloat(plata_que_llego)
      }
    });
    res.json(nuevoPagoOrden);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}
export const listarPagosOrdenes = async (req, res) =>{
  try {
    let listaPagosOrdenes = await prisma.pago_orden.findMany();
    res.json(listaPagosOrdenes);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}
    
export const buscarPagoOrdenPorID = async (req, res) =>{
  try {
    let id_pago_orden = req.params.id_pago_orden;
    let pagoOrdenEncontrado = await prisma.pago_orden.findUnique({
      where:{
        id: Number(id_pago_orden)
      }
    });
    res.json(pagoOrdenEncontrado);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}
export const buscarPagoOrdenPorIdOrden = async (req, res) =>{
  
    let id_orden = req.params.id_orden;
    id_orden = Number(id_orden);
    let pagoOrdenEncontradoPorIDorden = await prisma.pago_orden.findMany({
      where:{
        presupuesto:{
          id_orden: id_orden
        }
        // id: Number(id_orden)
      },
    });
    try {
    res.json(pagoOrdenEncontradoPorIDorden);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}
export const editarPagoOrden = async (req, res) =>{
  try {
    let { id_pago_orden, id_presupuesto, medio_pago, precio_cliente, plata_que_llego } = req.body;
    let pagoOrdenActuliazado = await prisma.pago_orden.update({
      where:{
        id: Number(id_pago_orden)
      },
      data:{
        id_presupuesto: Number(id_presupuesto),
        medio_pago: medio_pago,
        precio_cliente: parseFloat(precio_cliente),
        plata_que_llego: parseFloat(plata_que_llego)
      }
    });
    res.json(pagoOrdenActuliazado);
  } catch (error) {
    let message = error;
    res.json(message);
  }
}