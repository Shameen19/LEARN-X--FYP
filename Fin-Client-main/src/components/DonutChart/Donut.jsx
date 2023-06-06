import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { RadialChart, LabelSeries } from "react-vis";

const Donut = () => {
  const [data1, setData1] = useState(50);
  const [data2, setData2] = useState(25);
  const [data3, setData3] = useState(12);

  const [color1, setcolor1] = useState(getRandomDarkColor());
  const [color2, setcolor2] = useState(getRandomDarkColor());
  const [color3, setcolor3] = useState(getRandomDarkColor());

  const [skill1, setskill1] = useState("");
  const [skill2, setskill2] = useState("");
  const [skill3, setskill3] = useState("");

  var data = [
    { angle: data1, color: color1 },
    { angle: data2, color: color2 },
    { angle: data3, color: color3 },
  ];

  useEffect(() => {
    getskillsdata();
  }, []);
  const getskillsdata = async () => {
    const response = await fetch(`http://localhost:1337/api/top5skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data) {
      setskill1(data.topSkills[0]);
      setskill2(data.topSkills[1]);
      setskill3(data.topSkills[2]);
      console.log("NUJSE " + data.topSkills[0]);
    }
  };

  function getRandomDarkColor() {
    // Generate random values for red, green, and blue channels
    var r = Math.floor(Math.random() * 128);
    var g = Math.floor(Math.random() * 128);
    var b = Math.floor(Math.random() * 128);

    // Convert the values to hexadecimal strings
    var hexR = r.toString(16).padStart(2, "0");
    var hexG = g.toString(16).padStart(2, "0");
    var hexB = b.toString(16).padStart(2, "0");

    // Concatenate the color channels and prepend a hash symbol (#)
    var randomColor = "#" + hexR + hexG + hexB;

    return randomColor;
  }

  function getRandomHexColor() {
    // Generate a random number between 0 and 16777215 (FFFFFF in hexadecimal)
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

    // Pad the string with zeros if the generated hex color is less than 6 characters
    while (randomColor.length < 6) {
      randomColor = "0" + randomColor;
    }

    // Prepend a hash symbol (#) to the color string
    randomColor = "#" + randomColor;

    return randomColor;
  }

  return (
    <div>
      <div>
        <Chart data={data} />
      </div>
      <div
        className="datanum"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="dotdiv"
            style={{ color: color1, borderRadius: "20px", padding: "5px" }}
          ></div>
          <Typography variant="h6" style={{ color: color1 }}>
            #1 {skill1}
          </Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="dotdiv"
            style={{ color: color2, borderRadius: "20px", padding: "5px" }}
          ></div>
          <Typography variant="h6" style={{ color: color2 }}>
            #2 {skill2}
          </Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="dotdiv"
            style={{ color: color2, borderRadius: "20px", padding: "5px" }}
          ></div>
          <Typography variant="h6" style={{ color: color3 }}>
            #3 {skill2}
          </Typography>
        </div>
      </div>
    </div>
  );
};

function Chart({ data }) {
  return (
    <>
      <RadialChart
        colorType="literal"
        innerRadius={100}
        radius={75}
        data={data}
        color={(d) => d.color}
        width={460}
        height={190}
        animation={"gentle"}
      />
    </>
  );
}

export default Donut;
