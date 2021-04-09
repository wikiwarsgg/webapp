import React, { useEffect } from "react";
import tw from "twin.macro";
import Head from "next/head";

var data = [
  { label: "50 %", image: "pictoroue_050POURCENT.jpg" },
  { label: "COMBO", image: "pictoroue_COMBO.jpg" },
  { label: "MAIN", image: "pictoroue_MAIN.jpg" },
  { label: "USA", image: "pictoroue_USA.jpg" },
  { label: "300 %", image: "pictoroue_300POURCENT.jpg" },
  { label: "CTRLF", image: "pictoroue_CTRLF.jpg" },
  { label: "PORTAIL", image: "pictoroue_PORTAIL.jpg" },
  { label: "ARTICLE", image: "pictoroue_ARTICLE.jpg" },
  { label: "FRANCE", image: "pictoroue_FRANCE.jpg" },
  {
    label: "SWITCH",
    image: "recycle-solid.png",
  },
  {
    label: "RANDOM",
    image: "exclamation-solid.png",
  },
];

const WHEEL_SIZE = 500;

const Wheel = () => {
  useEffect(() => {
    var padding = { top: 20, right: 40, bottom: 0, left: 0 },
      w = WHEEL_SIZE - padding.left - padding.right,
      h = WHEEL_SIZE - padding.top - padding.bottom,
      r = Math.min(w, h) / 2,
      rotation = 0,
      oldrotation = 0,
      picked = 100000,
      oldpick = [],
      color = d3.scale.category20(); //category20c()

    function rotTween(to) {
      var i = d3.interpolate(oldrotation % 360, rotation);
      return function (t) {
        return "rotate(" + i(t) + ")";
      };
    }

    var svg = d3
      .select("#chart")
      .append("svg")
      .data([data])
      .attr("width", w + padding.left + padding.right)
      .attr("height", h + padding.top + padding.bottom);

    var container = svg
      .append("g")
      .attr("class", "chartholder")
      .attr(
        "transform",
        "translate(" +
          (w / 2 + padding.left) +
          "," +
          (h / 2 + padding.top) +
          ")"
      );

    var vis = container.append("g");

    var pie = d3.layout
      .pie()
      .sort(null)
      .value((d) => 1);

    var arc = d3.svg.arc().outerRadius(r);

    var arcs = vis
      .selectAll("g.slice")
      .data(pie)
      .enter()
      .append("g")
      .attr("class", "slice");

    arcs
      .append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", (d) => arc(d));

    arcs
      .append("text")
      .attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return (
          "rotate(" +
          ((d.angle * 180) / Math.PI - 90) +
          ")translate(" +
          (d.outerRadius - 10) +
          ")"
        );
      })
      .attr("text-anchor", "end")
      .text(function (d, i) {
        return data[i].label;
      });

    container.on("click", spin);

    function spin(d) {
      container.on("click", null);

      //all slices have been seen, all done
      console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
      if (oldpick.length == data.length) {
        console.log("done");
        container.on("click", null);
        return;
      }

      var ps = 360 / data.length,
        pieslice = Math.round(1440 / data.length),
        rng = Math.floor(Math.random() * 1440 + 360);

      rotation = Math.round(rng / ps) * ps;

      picked = Math.round(data.length - (rotation % 360) / ps);
      picked = picked >= data.length ? picked % data.length : picked;

      if (oldpick.indexOf(picked) !== -1) {
        d3.select(this).call(spin);
        return;
      } else {
        oldpick.push(picked);
      }

      rotation += 90 - Math.round(ps / 2);

      vis
        .transition()
        .duration(6000)
        .attrTween("transform", rotTween)
        .each("end", function () {
          //mark question as seen
          d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr(
            "fill",
            "#111"
          );

          //populate question
          d3.select("#question img").attr("width", WHEEL_SIZE);
          d3.select("#question img").attr("height", WHEEL_SIZE);
          d3.select("#question img").attr(
            "src",
            `pictos/${data[picked].image}`
          );

          oldrotation = rotation;

          container.on("click", spin);
        });
    }

    //make arrow
    svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          (w + padding.left + padding.right) +
          "," +
          (h / 2 + padding.top) +
          ")"
      )
      .append("path")
      .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
      .style({ fill: "black" });

    //draw spin circle
    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 20)
      .style({ fill: "white", cursor: "pointer" });
  }, []);

  return (
    <div tw="bg-white py-10">
      <Head>
        <script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
      </Head>
      <div tw="w-5/6 mx-auto flex flex-row justify-center">
        <div tw="w-1/2 px-2">
          <div id="chart"></div>
        </div>
        <div tw="w-1/2 px-2">
          <div id="question">
            <img />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
