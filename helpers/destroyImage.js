import cloudinary  from 'cloudinary';

export const destroyImage = async(image) => { 
const imgID =  image.split("/").pop().split(".")[0];  
cloudinary.uploader.destroy(imgID, async (error, result) => { console.log(result, error) })
}