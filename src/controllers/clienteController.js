
import prisma from "../database/db_prisma.js";


/*
 * Add New Client / Añadir Nuevo Cliente
 */
export const nuevoCliente = async (req, res) => {
  try {
    let { dni, nombre, telefono, domicilio } = req.body;
    dni = String(dni);
    const clienteNuevo = await prisma.cliente.upsert({
      where: {
        dni_nombre: {
          dni,
          nombre,
        }
      },
      update: {
        telefono: telefono,
        domicilio: domicilio,
      },
      create: {
        dni: dni,
        nombre: nombre,
        telefono: telefono,
        domicilio: domicilio,
      }
    });
    res.json({clienteNuevo})
  } catch (error) {
    res.json({error})
  }
}
/*
 * View All Clients / Ver Todos los Clientes
 */
export const listarClientes = async (req, res) => {
  try {
    let clientesLista = await prisma.cliente.findMany();
    res.json({clientesLista})
  } catch (error) {
    res.json({error})
  }
}
/*
 * Search Client / Buscar Cliente
 */
export const buscarClientePorDni = async (req, res) => {
  try {
    let dni = req.params.dni;
    dni = String(dni);
    let clientesEncontrados = await prisma.cliente.findMany({
      where:{
        dni: dni
      }
    });
    res.json({clientesEncontrados})
  } catch (error) {
    let message = error;
    res.json({message})
  }
}
/*
 * Edit Client / Editar Cliente
 */
export const editarCliente = async (req, res) => {
  try {
    let {id_cliente, dni, nombre, telefono, domicilio} = req.body;
    id_cliente = Number(id_cliente);
    dni = String(dni);
    telefono = String(telefono);
    let clienteActualizado = await prisma.cliente.update({
      where:{
        id: id_cliente
      },
      data:{
        dni: dni,
        nombre: nombre,
        telefono: telefono,
        domicilio: domicilio
      }
    });
    
    res.json({clienteActualizado});
  } catch (error) {
    let message = error;
    res.json({message})
  }
}
// /*
//  * Borrar Client / Borrar Cliente
//  */
// export const borrarCliente = async (req, res) => {
  
//     let {id} = req.body;
//     let clienteBorrado = await prisma.cliente.delete({
//       where:{
//         id: Number(id)
//       }
//     })
//     try {
//     res.json({clienteBorrado})
//   } catch (error) {
//     let message = error;
//     res.json({message})
//   }
// }