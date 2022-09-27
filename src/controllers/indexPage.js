export const indexPage = async (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error Occured'});
  } 
}