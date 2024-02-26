import {
  amber,
  blueGrey,
  brown,
  deepPurple,
  grey,
  lightBlue,
  lime,
  orange,
  pink,
  red,
  teal,
} from "@mui/material/colors";

export const AiResultAvatarBgcolor = (index) => {
  const colorTotal = [
    teal[200],
    deepPurple[200],
    red[300],
    lightBlue[300],
    pink[300],
    blueGrey[400],
    orange[300],
    blueGrey[400],
    grey[400],
    deepPurple[200],
  ];
  return colorTotal[index];
};

export const parseExecuteName = (data, allData) => {
  var output = [];
  for (let i = 0; i < data.length; i++) {
    const id = data[i].split("*").at(0);
    const nameData = allData.filter((d) => d.id === parseInt(id));
    const name = nameData.at(0).name;
    output.push(name);
  }
  return output;
};

export const parseExecuteIndex = (order_id) => {
  const countArray = order_id.map((order) =>
    order.includes("*") ? parseInt(order.split("*").at(1)) : 1
  );

  var output = [];
  var firstIndex = 1;
  for (let i = 0; i < countArray.length; i++) {
    var temp = [];
    if (countArray[i] !== 1) {
      temp.push(firstIndex);
      temp.push(firstIndex + countArray[i] - 1);
      output.push(temp);
      firstIndex = firstIndex + countArray[i];
    } else {
      temp.push(firstIndex);
      output.push(temp);
      firstIndex = firstIndex + countArray[i];
    }
  }
  return output;
};

const a = ["1", "1", "1", "1_insert", "1_insert", "2", "1", "2_insert"];

export const parseExecutionData = (data) => {
  const datas = [];
  const insert_index = [];
  let data_temp = null;
  let insert_temp = null;
  let count = -1;

  for (const i of data) {
    if (i.endsWith("_insert")) {
      data_temp = null;
      const insert_num = i.replace("_insert", "");
      if (insert_temp) {
        if (insert_num === insert_temp) {
          if (datas[count].includes("*")) {
            const num = datas[count].split("*")[0];
            const times = parseInt(datas[count].split("*")[1]) + 1;
            datas[count] = num + "*" + times;
          } else {
            datas[count] += "*" + "2";
          }
        } else {
          count++;
          datas.push(insert_num);
          insert_index.push(count);
        }
        insert_temp = insert_num;
      } else {
        count++;
        datas.push(insert_num);
        insert_temp = insert_num;
        insert_index.push(count);
      }
    } else {
      insert_temp = null;
      if (data_temp) {
        if (i === data_temp) {
          if (datas[count].includes("*")) {
            const num = datas[count].split("*")[0];
            const times = parseInt(datas[count].split("*")[1]) + 1;
            datas[count] = num + "*" + times;
          } else {
            datas[count] += "*" + "2";
          }
        } else {
          count++;
          datas.push(i);
        }
        data_temp = i;
      } else {
        count++;
        datas.push(i);
        data_temp = i;
      }
    }
  }

  return [datas, insert_index];
};

// const test1 = parse_execution_data(a);
// const test2 = parse_execution_data(a2);
// const test3 = parse_execution_data(a3);
// const [out1, out2] = test1;
// const [out3, out4] = test2;
// const [out5, out6] = test3;

// console.log(out1, out2);  // Output: ['1*3', '1*2', '2', '1', '2'] [1, 4]
// console.log(out3, out4);  // Output: ['1*2', '2', '1*2', '2', '2', '3*3', '2'] [2, 3, 6]
// console.log(out5, out6);  // Output: ['1*2', '1*2', '2', '2', '1*2', '2', '3*3', '2'] [0, 3, 4, 7]
