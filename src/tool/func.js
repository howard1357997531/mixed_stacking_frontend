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

// const a = ["1", "1", "1", "1", "1_insert", "1_insert", "1_insert", "2", "1", "2_insert"];
// const a2 = ["1", "1", "2", "1_insert", "1_insert", "2_insert", "2", "3", "3", "3","2_insert"];
// const a3 = ["1_insert", "1_insert", "1", "1", "2", "2_insert", "1_insert", "1_insert", "2", "3", "3", "3","2_insert"];

// const reset_index_org = [2, 4, 8];

export const parseExecutionData = (data, reset_index_org) => {
  const datas = [];
  const insert_index = [];
  const reset_index = [];
  let data_temp = null;
  let insert_temp = null;
  let count = -1;
  let reset_index_count = 0;

  for (const i of data) {
    const count_in_reset_index = reset_index_org.includes(reset_index_count);
    if (i.endsWith("_insert")) {
      data_temp = null;
      const insert_num = i.replace("_insert", "");
      if (insert_temp && !count_in_reset_index) {
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
        insert_index.push(count);
        if (count_in_reset_index) {
          insert_temp = null;
          reset_index.push(count);
        } else {
          insert_temp = insert_num;
        }
      }
    } else {
      insert_temp = null;
      if (data_temp && !count_in_reset_index) {
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
        if (count_in_reset_index) {
          data_temp = null;
          reset_index.push(count);
        } else {
          data_temp = i;
        }
      }
    }
    reset_index_count++;
  }

  return [datas, insert_index, reset_index];
};

// const test1 = parse_execution_data(a, reset_index_org);
// const test2 = parse_execution_data(a2, reset_index_org);
// const test3 = parse_execution_data(a3, reset_index_org);
// const [out1, out2, out3] = test1;
// const [out4, out5, out6] = test2;
// const [out7, out8, out9] = test3;

// console.log(out1, out2, out3);  // Output: ['1*2', '1', '1', '1', '1*2', '2', '1', '2'] [3, 4, 7] [1, 3, 6]
// console.log(out4, out5, out6);  // Output: ['1*2', '2', '1', '1', '2', '2', '3', '3', '3', '2'] [2, 3, 4, 9] [1, 3, 7]
// console.log(out7, out8, out9);  // Output: ['1*2', '1', '1', '2', '2', '1*2', '2', '3*3', '2'] [0, 4, 5, 8] [1, 3, 6]
