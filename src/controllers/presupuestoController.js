import prisma from "../database/db_prisma.js";

export const nuevoPresupuesto = async (req, res) =>{
  try {
    let { tipo_arreglo, id_orden, tipo_repuesto, decision_cliente, calidad_elegida, precio_arreglo } = req.body;
    tipo_repuesto === '' ? tipo_repuesto = 'No Necesita Repuesto' : tipo_repuesto;
    let presupuestoCreado = await prisma.presupuesto.create({
      data: {
        decision_cliente: decision_cliente,
        calidad_elegida: calidad_elegida,
        precio_arreglo: parseFloat(precio_arreglo),
        orden: {
          connect: {
            id: Number(id_orden),
          },
        },
        tipo_arreglo: {
          connectOrCreate: {
            where: { tipo_arreglo: tipo_arreglo },
            create: {
              tipo_arreglo: tipo_arreglo,
            },
          },
        },
        tipo_repuesto: {
          connectOrCreate: {
            where: { tipo_repuesto: tipo_repuesto },
            create: {
              tipo_repuesto: tipo_repuesto,
            },
          },
        },
      },
    });
    res.json({presupuestoCreado})
  } catch (error) {
    let message = error;
    res.json({ message })
  }
}

export const listarPresupuestoPorOrdenID = async (req, res) =>{
  try {
    let id_orden = req.params.id_orden;
    let presupuesto = await prisma.presupuesto.findMany({
      where:{
        id_orden: Number(id_orden)
      }     
    });
    res.json(presupuesto)
  } catch (error) {
    let message = error;
    res.json({ message })
  }
}

export const editarPresupuesto = async (req, res) =>{
  try {
    let { id_presupuesto, tipo_arreglo, id_orden, tipo_repuesto, decision_cliente, calidad_elegida, precio_arreglo } = req.body;
    let presupuestoActualizado = await prisma.presupuesto.update({
      where:{
        id: Number(id_presupuesto)
      }, 
      data:{
        decision_cliente: decision_cliente,
        calidad_elegida: calidad_elegida,
        precio_arreglo: precio_arreglo,
        orden:{
          connect:{
            id: Number(id_orden)
          }
        },
        tipo_arreglo: {
          connectOrCreate:{
            where:{ tipo_arreglo: tipo_arreglo },
            create:{
              tipo_arreglo: tipo_arreglo
            }
          }
        },
        tipo_repuesto: {
          connectOrCreate:{
            where:{ tipo_repuesto: tipo_repuesto },
            create:{
              tipo_repuesto: tipo_repuesto
            }
          }
        }
      }
    });
    res.json(presupuestoActualizado)
  } catch (error) {
    let message = error;
    res.json({ message })
  }
}

// NO SE PUEDE BORRAR PORQUE TIENE FOREIGN KEYS, POR ENDE HABRIA QUE CONFIGURARLO PARA QUE BORRE EN CASCADA, ESTO BORRARIA LOS PEDIDOS DE REPUESTOS; ESTO CAUSARIA PROBLEMAS PORQUE NO SABRIAMOS QUE PASO Y CUANDO, MEJOR GUARDA REGISTRO DE TODO 
// export const borrarPresupuestoPorID = async (req, res) =>{
//   try {
//     let { id_presupuesto } = req.params.id_presupuesto;
//     let presupuestoBorrado = await prisma.presupuesto.delete({
//       where:{
//         id: Number(id_presupuesto)
//       }
//     });
//     res.json(presupuestoBorrado)
//   } catch (error) {
//     let message = error;
//     res.json({ message })
//   }
// }