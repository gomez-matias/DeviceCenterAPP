
import prisma from "../database/db_prisma.js";

export const nuevaEntregaEquipoCliente = async (req, res) => {
  try {
    let { id_orden, id_usuario, accion, estado_final_equipo, notas_finales } = req.body;
    let nuevaEntregaEquipoCliente = await prisma.entrega_equipo_cliente.create({
      data:{
        id_orden: Number(id_orden),
        id_usuario: Number(id_usuario),
        accion: accion,
        estado_final_equipo: estado_final_equipo,
        notas_finales: notas_finales
      }
    });
    res.json( nuevaEntregaEquipoCliente );
  } catch (error) {
    let { code } = error;
    let message =
      code === "P2002"
        ? "ERROR: Ya Esta Entregado Este Equipo, cambie alguna de las Casillas para entregar nuevamente"
        : error;
    res.json(message);
  }
}

export const buscarEntregaEquipoClienteID = async (req, res) => {
  try {
    let id_entrega_equipo_cliente = req.params.id_entrega_equipo_cliente;
    id_entrega_equipo_cliente = Number(id_entrega_equipo_cliente);
    let EntregaDeEquipoAlCliente = await prisma.entrega_equipo_cliente.findUnique({
      where:{
        id: id_entrega_equipo_cliente
      }
    })
    res.json(EntregaDeEquipoAlCliente)
  } catch (error) {
    let message = error;
    res.json({message}) 
  }
}

export const listarEntregasEquiposClientes = async (req, res) => {
  try {
    let EntregasDeEquiposAClientes = await prisma.entrega_equipo_cliente.findMany()
    res.json( EntregasDeEquiposAClientes )
  } catch (error) {
    let message = error;
    res.json({message})
  }
}

export const editarEntregaEquipoCliente = async (req, res) => {
  try {
    let { id_entrega_equipo_cliente, id_orden, id_usuario, accion, estado_final_equipo, notas_finales } = req.body;
    let entregaEquipoClienteActualizado = await prisma.entrega_equipo_cliente.update({
      where:{
        id: Number(id_entrega_equipo_cliente)
      },
      data:{
        id_orden: Number(id_orden),
        id_usuario: Number(id_usuario),
        accion: accion,
        estado_final_equipo: estado_final_equipo,
        notas_finales: notas_finales
      }
    });
    res.json( entregaEquipoClienteActualizado );
  } catch (error) {
    let message = error;
    res.json({message})
  }
}