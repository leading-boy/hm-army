const { default: mongoose } = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`);
    console.log('DB ga ulandi.');
  } catch (err) {
    console.log('DB da xatolik: ', err);
  }
};

module.exports = { connectToDB };
