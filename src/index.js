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

  if (!data.army) {
    const army_token = await login();
    await Key.create({ army_token, army: [] });
    return;
  }

  if (!data?.army_token) {
    const army_token = await login();
    await Key.updateOne({ _id: data._id }, { army_token });
    return;
  }
};

const check100 = async (index) => {
  if ([0, 25, 26].includes(index)) {
    return;
  }

  const key = (await Key.find())[Number(index)];

  if (!key?.army?.length || key?.army?.length < 100) {
    return;
  }

  const indexOne = (await Key.find())[0];

  if (!indexOne._id) {
    return;
  }

  const totalKeys = key.army;
  await Key.updateOne({ _id: indexOne._id }, { army: [...indexOne.army, ...totalKeys] });
  await Key.updateOne({ _id: key._id }, { army: [] });
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
    const promoCode = await mainPromoCode(key?.army_token);

    if (!promoCode.isOk) {
      return res.status(200).send({ isOk: false, error: promoCode?.error });
    }

    if (key.army.includes(promoCode.message)) {
      const army_token = await login();
      await Key.updateOne({ _id: key._id }, { army_token });
      return res.status(200).send({ isOk: true });
    }

    const army_token = await login();
    await Key.updateOne({ _id: key._id }, { army: [...key.army, promoCode.message], army_token });

    return res.status(200).send({ isOk: true });
  } catch (error) {
    return res.status(500).send({ isOk: false, error });
  }
});

const loopArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

let currentIndexObj = {
  index1: 0,
  index2: 0,
  index3: 0,
  index4: 0,
  index5: 0,
};

const executeNextRequest = async (loopArr, index = 1) => {
  if (currentIndexObj[`index${index}`] < loopArr.length) {
    try {
      await checkToken(loopArr[currentIndexObj[`index${index}`]]);
      const key = (await Key.find())[loopArr[currentIndexObj[`index${index}`]]];
      const promoCode = await mainPromoCode(key?.army_token);

      if (!promoCode.isOk) {
        currentIndexObj[`index${index}`]++;
        return;
      }

      if (key.army.includes(promoCode.message)) {
        const army_token = await login();
        await Key.updateOne({ _id: key._id }, { army_token });
        currentIndexObj[`index${index}`]++;
        return;
      }

      const army_token = await login();
      await Key.updateOne({ _id: key._id }, { army: [...key.army, promoCode.message], army_token });
      currentIndexObj[`index${index}`]++;

      await check100(loopArr[currentIndexObj[`index${index}`]]);
    } catch (error) {
      console.error(`Error processing request for index:`, error);
      currentIndexObj[`index${index}`]++;
    }
  }
};

const main = async () => {
  while (true) {
    console.time('loopExecution');
    for (let i = 0; i < loopArr.length; i++) {
      await executeNextRequest(loopArr, 1);
    }
    currentIndexObj.index1 = 0;
    console.timeEnd('loopExecution');
  }
};

// const main2 = async () => {
//   while (true) {
//     console.time('loopExecution2');
//     for (let i = 0; i < loopArr2.length; i++) {
//       await executeNextRequest(loopArr2, 2);
//     }
//     currentIndexObj.index2 = 0;
//     console.timeEnd('loopExecution2');
//   }
// };

// const main3 = async () => {
//   while (true) {
//     console.time('loopExecution3');
//     for (let i = 0; i < loopArr3.length; i++) {
//       await executeNextRequest(loopArr3, 3);
//     }
//     currentIndexObj.index3 = 0;
//     console.timeEnd('loopExecution3');
//   }
// };

// const main4 = async () => {
//   while (true) {
//     console.time('loopExecution4');
//     for (let i = 0; i < loopArr4.length; i++) {
//       await executeNextRequest(loopArr4, 4);
//     }
//     currentIndexObj.index4 = 0;
//     console.timeEnd('loopExecution4');
//   }
// };

// const main5 = async () => {
//   while (true) {
//     console.time('loopExecution5');
//     for (let i = 0; i < loopArr5.length; i++) {
//       await executeNextRequest(loopArr5, 5);
//     }
//     currentIndexObj.index5 = 0;
//     console.timeEnd('loopExecution5');
//   }
// };

main();
// main2();
// main3();
// main4();
// main5();

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server run');
});
