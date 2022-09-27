
import prisma from "../database/db_prisma.js";

export const buscarEquipoPorModelo = async (req, res) => {
  try {
    let modelo_exacto = req.params.modelo;
    let equipoEncontrado = await prisma.equipo.findUnique({
      where:{
        modelo_exacto: modelo_exacto
      }
    })
    res.json({equipoEncontrado})
  } catch (error) {
    let message = error;
    res.json({message})
  }
}

export const listarEquiposModelos = async (req, res) => {
  try {
    let equiposModelos = await prisma.equipo.findMany()
    res.json({equiposModelos})
  } catch (error) {
    let message = error;
    res.json({message})
  }
}

export const editarEquipoModelo = async (req, res) => {
  try {
    let { id_equipo, modelo_exacto, modelo_comercial, tipo_equipo, marca } = req.body;
    let modeloEquipoActualizado = await prisma.equipo.update({
      where:{
        id: id_equipo,
        modelo_exacto: modelo_exacto
      },
      data:{
        modelo_comercial: modelo_comercial,
        modelo_exacto: modelo_exacto,
        tipo_equipo:tipo_equipo,
        marca: marca
      }
    });
    res.json({modeloEquipoActualizado});
  } catch (error) {
    let message = error;
    res.json({message})
  }
}