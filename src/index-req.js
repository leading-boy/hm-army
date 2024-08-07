require('dotenv').config();
const { connectToDB } = require('./config');
connectToDB();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Key } = require('./models');
const { mainPromoCode, login } = require('./util');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const checkToken = async (index = 0) => {
  const data = (await Key.find())[index];

  if (!data.cube) {
    const cube_token = await login();
    await Key.create({ cube_token, cube: [] });
    return;
  }

  if (!data?.cube_token) {
    const cube_token = await login();
    await Key.updateOne({ _id: data._id }, { cube_token });
    return;
  }
};

const check100 = async (index = 0) => {
  const key = (await Key.find())[Number(index)];

  if (!key?.cube?.length || key?.cube?.length < 100) {
    return;
  }

  const indexOne = (await Key.find())[0];

  if (!indexOne._id) {
    return res.status(400).send({ isOk: false, message: 'index one not found' });
  }

  const totalKeys = key.cube;
  await Key.updateOne({ _id: indexOne._id }, { cube: [...indexOne.cube, ...totalKeys] });
  await Key.updateOne({ _id: key._id }, { cube: [] });
};

app.get('/rename', async (req, res) => {
  try {
    await Key.updateMany({}, { $rename: { keys: 'bike' } });
    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key0', async (req, res) => {
  try {
    await checkToken(0);

    const key = (await Key.find())[0];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key1', async (req, res) => {
  try {
    await checkToken(1);

    const key = (await Key.find())[1];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(1);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key2', async (req, res) => {
  try {
    await checkToken(2);

    const key = (await Key.find())[2];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(2);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key3', async (req, res) => {
  try {
    await checkToken(3);

    const key = (await Key.find())[3];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(3);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key4', async (req, res) => {
  try {
    await checkToken(4);

    const key = (await Key.find())[4];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(4);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key5', async (req, res) => {
  try {
    await checkToken(5);

    const key = (await Key.find())[5];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(5);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key6', async (req, res) => {
  try {
    await checkToken(6);

    const key = (await Key.find())[6];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(6);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key7', async (req, res) => {
  try {
    await checkToken(7);

    const key = (await Key.find())[7];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(7);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key8', async (req, res) => {
  try {
    await checkToken(8);

    const key = (await Key.find())[8];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(8);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key9', async (req, res) => {
  try {
    await checkToken(9);

    const key = (await Key.find())[9];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(9);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key10', async (req, res) => {
  try {
    await checkToken(10);

    const key = (await Key.find())[10];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(10);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key11', async (req, res) => {
  try {
    await checkToken(11);

    const key = (await Key.find())[11];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(11);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key12', async (req, res) => {
  try {
    await checkToken(12);

    const key = (await Key.find())[12];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(12);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key13', async (req, res) => {
  try {
    await checkToken(13);

    const key = (await Key.find())[13];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(13);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key14', async (req, res) => {
  try {
    await checkToken(14);

    const key = (await Key.find())[14];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(14);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key15', async (req, res) => {
  try {
    await checkToken(15);

    const key = (await Key.find())[15];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(15);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key16', async (req, res) => {
  try {
    await checkToken(16);

    const key = (await Key.find())[16];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(16);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key17', async (req, res) => {
  try {
    await checkToken(17);

    const key = (await Key.find())[17];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(17);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key18', async (req, res) => {
  try {
    await checkToken(18);

    const key = (await Key.find())[18];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(18);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key19', async (req, res) => {
  try {
    await checkToken(19);

    const key = (await Key.find())[19];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(19);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key20', async (req, res) => {
  try {
    await checkToken(20);

    const key = (await Key.find())[20];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(20);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key21', async (req, res) => {
  try {
    await checkToken(21);

    const key = (await Key.find())[21];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(21);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key22', async (req, res) => {
  try {
    await checkToken(22);

    const key = (await Key.find())[22];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(22);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key23', async (req, res) => {
  try {
    await checkToken(23);

    const key = (await Key.find())[23];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(23);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key24', async (req, res) => {
  try {
    await checkToken(24);

    const key = (await Key.find())[24];
    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.cube.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube: [...key.cube, promoCode.message], cube_token });

    await check100(24);

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

app.get('/get-key25', async (req, res) => {
  try {
    await checkToken(25);

    const key = (await Key.find())[25];

    const promoCode = await mainPromoCode(key?.cube_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    const key24 = (await Key.find())[24];

    if (key24.keys.includes(promoCode.message)) {
      const cube_token = await login();
      await Key.updateOne({ _id: key._id }, { cube_token });
      return res.status(200).send({ isOk: true });
    }

    const cube_token = await login();
    await Key.updateOne({ _id: key._id }, { cube_token });
    await Key.updateOne({ _id: key24._id }, { cube: [...key24.cube, promoCode.message] });

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server run');
});
