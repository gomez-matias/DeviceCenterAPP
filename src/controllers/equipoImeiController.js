
import prisma from "../database/db_prisma.js";

// export const nuevoEquipoImei = async (req, res) => {
//   try {
//     let { imei, id_equipo } = req.body;
//     const equipoImeiCreado = await prisma.equipo_imei.create({
//       data: {
//         imei: imei,
//         id_equipo: id_equipo
//       }
//     })
//     res.json({equipoImeiCreado})
//   } catch (error) {
//     let message = error;
//     res.json({message})
//   }
// }
export const buscarEquiposPorImei = async (req, res) => {
  try {
    let imei = req.params.imei;
    let equiposEncontrados = await prisma.equipo_imei.findMany({
      where:{
        imei: imei
      }
    })
    res.json({equiposEncontrados})
  } catch (error) {
    let message = error;
    res.json({message})
  }
}
export const listarEquiposConImei = async (req, res) => {
  try {
    let listadoEquiposConImei = await prisma.equipo_imei.findMany();
    res.json(listadoEquiposConImei)
  } catch (error) {
    let message = error;
    res.json({message})
  }
}
export const editarImeiEquipo = async (req, res) => {
  try {
    let { id_equipo_imei, imei } = req.body;
    let imeiEquipoActualizado = await prisma.equipo_imei.update({
      where:{
        id: Number(id_equipo_imei)
      },
      data:{
        imei: String(imei)
      }
    });
    res.json({imeiEquipoActualizado});
  } catch (error) {
    let message = error;
    res.json({message})
  }
}